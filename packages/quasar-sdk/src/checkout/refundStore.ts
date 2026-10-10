/**
 * @file The headless refund store: a merchant refunds a payment from a connected wallet in the browser.
 */

import { createStore, type StoreApi } from 'zustand/vanilla';

import { QuasarSDKError } from '../core/errors';
import type { Refund, RefundParams, RefundStart, SubmitRefundParams } from '../modules/payments/types';
import type { CheckoutError } from './store';

/**
 * Where a refund stands: `idle`; `requesting` (Quasar prices it); `awaitingTransfer` (send `instructions` from the
 * merchant's wallet, then {@link RefundState.submit}); `submitting`; `confirming` (Quasar follows the transaction);
 * `confirmed` (the credit note is issued) or `failed`.
 */
export type RefundPhase =
  'idle' | 'requesting' | 'awaitingTransfer' | 'submitting' | 'confirming' | 'confirmed' | 'failed';

/** The state and actions of {@link createRefundStore}. */
export interface RefundState {
  /** Where the refund stands. */
  phase: RefundPhase;
  /** The refund, once asked for. */
  refund: Refund | null;
  /** What to send where: chain, asset, recipient (the payer) and amount in base units. */
  instructions: RefundStart['instructions'] | null;
  /** Why the last action failed; cleared by the next one. */
  error: CheckoutError | null;
  /**
   * Asks for a refund of an invoice through `request`.
   *
   * @param invoiceId - The paid or held invoice.
   * @param params - Amount (everything left when omitted), mode and reason.
   * @returns Whether it was asked for; `phase` is then `awaitingTransfer`.
   */
  start: (invoiceId: string, params?: RefundParams) => Promise<boolean>;
  /**
   * Continues a refund that waits for its transaction (asked for earlier, or through the API).
   *
   * @param refund - The refund, `requested`.
   * @param instructions - What to send, as `request` returned it.
   */
  resume: (refund: Refund, instructions: RefundStart['instructions']) => void;
  /**
   * Hands over the refund transaction through `submit`, then follows the refund through `get` until it is final.
   *
   * @param params - The transaction and the merchant wallet it was sent from.
   * @returns Whether it was taken; `phase` is then `confirming`.
   */
  submit: (params: SubmitRefundParams) => Promise<boolean>;
  /** Stops following and returns to `idle`. */
  reset: () => void;
}

/** Options of {@link createRefundStore}: the three calls, which the app runs on its server with the secret key. */
export interface RefundStoreOptions {
  /** Asks for the refund, for example a Server Action that calls `quasar.payments.refund`. */
  request: (invoiceId: string, params: RefundParams) => Promise<RefundStart>;
  /** Hands over its transaction, for example through `quasar.payments.submitRefund`. */
  submit: (refundId: string, params: SubmitRefundParams) => Promise<Refund>;
  /** Reads the refund, for example through `quasar.payments.getRefund`. */
  get: (refundId: string) => Promise<Refund>;
  /** How often to read a refund being confirmed, in milliseconds. Defaults to `5000`. */
  pollMs?: number;
}

/** The store {@link createRefundStore} returns: a vanilla Zustand store. */
export type RefundStore = StoreApi<RefundState>;

function errorOf(error: unknown): CheckoutError {
  if (error instanceof QuasarSDKError) {
    return { code: error.code ?? 'request_failed', message: error.message, status: error.status, issues: error.issues };
  }
  return { code: 'request_failed', message: error instanceof Error ? error.message : String(error) };
}

/**
 * Creates the headless refund of a payment from the merchant's connected wallet: ask for the refund, send its
 * `instructions` with the wallet (Pulsar or the wallet itself; the store sends nothing on-chain), hand over the
 * transaction, then follow the refund until Quasar confirms it and issues the credit note. The secret key never
 * reaches the browser: the store calls `request`, `submit` and `get`, which the app runs on its server (Server
 * Actions or its own routes calling `quasar.payments`).
 *
 * Side effects: the calls the app supplies; while `confirming`, `get` every `pollMs` until the refund is final or
 * `reset` is called.
 *
 * @param options - The three calls and the poll interval.
 * @returns The store.
 *
 * @example
 * ```ts
 * import { createRefundStore } from '@tuwaio/quasar-sdk/checkout';
 *
 * // refundInvoice, submitRefund and getRefund are Server Actions calling quasar.payments
 * const refunds = createRefundStore({ request: refundInvoice, submit: submitRefund, get: getRefund });
 * await refunds.getState().start(invoiceId, { reason: 'Order cancelled' });
 * // Send refunds.getState().instructions with the wallet, then:
 * await refunds.getState().submit({ txHash, from: address });
 * ```
 */
export function createRefundStore(options: RefundStoreOptions): RefundStore {
  const pollMs = options.pollMs ?? 5_000;
  let poll: ReturnType<typeof setInterval> | null = null;

  const stop = () => {
    if (poll) clearInterval(poll);
    poll = null;
  };

  return createStore<RefundState>()((set, get) => {
    const follow = (refundId: string) => {
      stop();
      poll = setInterval(() => {
        void options
          .get(refundId)
          .then((refund) => {
            if (get().refund?.id !== refundId) return;
            if (refund.status === 'confirmed' || refund.status === 'failed') {
              stop();
              set({ refund, phase: refund.status });
            } else {
              set({ refund });
            }
          })
          .catch(() => {
            // A missed read is retried on the next tick
          });
      }, pollMs);
    };

    return {
      phase: 'idle',
      refund: null,
      instructions: null,
      error: null,

      start: async (invoiceId, params = {}) => {
        stop();
        set({ phase: 'requesting', error: null, refund: null, instructions: null });
        try {
          const { refund, instructions } = await options.request(invoiceId, params);
          set({ phase: 'awaitingTransfer', refund, instructions });
          return true;
        } catch (error) {
          set({ phase: 'idle', error: errorOf(error) });
          return false;
        }
      },

      resume: (refund, instructions) => {
        stop();
        set({ phase: 'awaitingTransfer', refund, instructions, error: null });
      },

      submit: async (params) => {
        const refund = get().refund;
        if (!refund) {
          set({ error: { code: 'refund_required', message: 'Ask for the refund first' } });
          return false;
        }
        set({ phase: 'submitting', error: null });
        try {
          const submitted = await options.submit(refund.id, params);
          set({ phase: 'confirming', refund: submitted });
          follow(refund.id);
          return true;
        } catch (error) {
          set({ phase: 'awaitingTransfer', error: errorOf(error) });
          return false;
        }
      },

      reset: () => {
        stop();
        set({ phase: 'idle', refund: null, instructions: null, error: null });
      },
    };
  });
}

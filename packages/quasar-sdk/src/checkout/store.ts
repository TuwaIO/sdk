/**
 * @file The headless checkout store: the state of one invoice's payment in the buyer's browser.
 */

import { createStore, type StoreApi } from 'zustand/vanilla';

import { BASE_API_URL } from '../constants';
import { type QuasarRequestIssue, QuasarSDKError } from '../core/errors';
import type { Buyer, InvoiceLocale, InvoiceStatus } from '../modules/payments/types';
import { checkoutApi } from './api';
import type { CheckoutApi, CheckoutQuote, CheckoutStatusEvent, CheckoutView, GrantPermissionParams } from './types';

/**
 * Where the payment stands:
 *
 * - `loading`: reading the checkout.
 * - `buyer`: the buyer details come first ({@link CheckoutState.setBuyer}).
 * - `selectMethod`: choose a method and connect a wallet, then {@link CheckoutState.requestQuote}.
 * - `quoting`: Quasar screens the payer and locks the price.
 * - `awaitingPayment`: send `quote.instructions` from the wallet (or sign `quote.gasless`), then
 *   {@link CheckoutState.submit} or {@link CheckoutState.relay}.
 * - `submitting`: handing the transaction to Quasar.
 * - `confirming`: Quasar follows the transaction until it is final.
 * - `paid`, `underpaid` (the buyer may top it up), `held` (the merchant looks at the payment), `refunded`, `expired`,
 *   `cancelled`: the invoice's outcome.
 * - `blocked`: AML screening refused the payer's wallet.
 * - `error`: the checkout could not be read (a wrong or retired link, the network).
 */
export type CheckoutPhase =
  | 'loading'
  | 'buyer'
  | 'selectMethod'
  | 'quoting'
  | 'awaitingPayment'
  | 'submitting'
  | 'confirming'
  | 'paid'
  | 'underpaid'
  | 'held'
  | 'refunded'
  | 'expired'
  | 'cancelled'
  | 'blocked'
  | 'error';

/**
 * Why the last action failed: the Payments `code` (`payer_blocked`, `quote_required`, `invoice_expired`…), or
 * `method_required` (no method chosen), `payment_failed` (the transaction failed on-chain; pay again) and
 * `request_failed` (no answer).
 */
export interface CheckoutError {
  /** Stable code. */
  code: string;
  /** What to show or log. */
  message: string;
  /** HTTP status, when the API answered. */
  status?: number;
  /** The fields at fault of an invalid request. */
  issues?: QuasarRequestIssue[];
}

/** The state and actions of {@link createCheckoutStore}. */
export interface CheckoutState {
  /** Where the payment stands. */
  phase: CheckoutPhase;
  /** What the checkout token opens; `null` until loaded. */
  checkout: CheckoutView | null;
  /** State of the invoice, as Quasar last reported it. */
  invoiceStatus: InvoiceStatus | null;
  /** The chosen payment method. */
  methodId: string | null;
  /** The connected wallet as a CAIP-10 account on the method's chain. */
  payer: string | null;
  /** The locked quote. */
  quote: CheckoutQuote | null;
  /** Language of the page and the documents still to be issued. */
  locale: InvoiceLocale | null;
  /** The transaction handed to Quasar. */
  txKey: string | null;
  /** The payment's transaction, once Quasar has one. */
  txHash: string | null;
  /** Why the last action failed; cleared by the next one. */
  error: CheckoutError | null;
  /** The receipt PDF of a paid invoice (a plain `GET`, for a link); `null` before. */
  receiptUrl: string | null;
  /** The ERC-7677 paymaster URL for `wallet_sendCalls` when the quote offers sponsored calls; `null` otherwise. */
  paymasterUrl: string | null;
  /** The merchant's logo (PNG or JPEG, a plain `GET` for an `<img>`); `null` when the merchant has none. */
  logoUrl: string | null;
  /**
   * Reads the checkout (`GET`) and, while the invoice can change, follows it (server-sent events, else a read every
   * `pollMs`). Sets `phase` `error` when the link is wrong or retired.
   *
   * @returns Resolves when the checkout is read.
   */
  load: () => Promise<void>;
  /**
   * Chooses a payment method; a quote for another method is dropped.
   *
   * @param methodId - One of `checkout.methods`.
   */
  selectMethod: (methodId: string) => void;
  /**
   * Sets the connected wallet; a quote locked to another wallet is dropped.
   *
   * @param payer - CAIP-10 account (`eip155:8453:0x…`, `solana:<genesis hash>:<address>`), or `null` for a Solana Pay
   *   QR payment from another device.
   */
  setPayer: (payer: string | null) => void;
  /**
   * Screens the payer and locks the price (`POST quote`).
   *
   * @returns The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
   *   details come first).
   */
  requestQuote: () => Promise<CheckoutQuote | null>;
  /**
   * Sends the buyer details the checkout collects (`POST buyer`); the invoice document is issued with them.
   *
   * @param buyer - The details.
   * @param options - `company: true` for an invoice for a company (name, address line, country and tax ID needed).
   * @returns Whether they were taken.
   */
  setBuyer: (buyer: Buyer, options?: { company?: boolean }) => Promise<boolean>;
  /**
   * Changes the language of the page and of the documents still to be issued (`POST locale`).
   *
   * @param locale - The language.
   * @returns Whether it was saved.
   */
  setLocale: (locale: InvoiceLocale) => Promise<boolean>;
  /**
   * Hands Quasar the transaction the wallet sent (`POST submit`). For an EIP-5792 batch, pass the hash of its
   * transaction (from `wallet_getCallsStatus`), not the batch ID.
   *
   * @param params - `txKey`: transaction hash or Solana signature; `from`: the sender, for a Solana Pay quote without
   *   a payer; `connectorType`: the wallet connector, for the record.
   * @returns Whether Quasar took it; `phase` is then `confirming`.
   */
  submit: (params: { txKey: string; from?: string; connectorType?: string }) => Promise<boolean>;
  /**
   * Sends the payer's signature of `quote.gasless.relay.typedData` (`POST relay`): Quasar sends the transfer and the
   * merchant pays the gas.
   *
   * @param signature - The 65-byte EIP-712 signature.
   * @returns Whether it was relayed; `phase` is then `confirming`.
   */
  relay: (signature: string) => Promise<boolean>;
  /**
   * Passes the wallet's answer to `wallet_grantPermissions` for a subscription's automatic charges (`POST permission`).
   *
   * @param params - The granting account, the permission context, its delegation manager and dependencies.
   * @returns Whether Quasar accepted it; `checkout.autoCharge` is then `active`.
   */
  grantPermission: (params: GrantPermissionParams) => Promise<boolean>;
  /** Stops following the invoice (closes the event stream or the reads). Call it when the page goes away. */
  destroy: () => void;
}

/** The part of the browser's `EventSource` the store uses. */
export interface EventSourceLike {
  /** `2` once closed for good. */
  readyState: number;
  /** Called on a failure; the browser reconnects unless `readyState` is `2`. */
  onerror: ((event: unknown) => void) | null;
  /** Listens to named events. */
  addEventListener: (type: string, listener: (event: { data: string }) => void) => void;
  /** Closes the stream. */
  close: () => void;
}

/** A constructor of {@link EventSourceLike}, such as the browser's `EventSource`. */
export type EventSourceConstructor = new (url: string) => EventSourceLike;

/** Options of {@link createCheckoutStore}. */
export interface CheckoutStoreOptions {
  /** The checkout token of the invoice (from its `checkoutToken` or the end of its `payUrl`). */
  token: string;
  /** The Quasar API. Defaults to {@link BASE_API_URL}. */
  baseUrl?: string;
  /** How often to read the invoice when there is no event stream, in milliseconds. Defaults to `5000`. */
  pollMs?: number;
  /**
   * The `EventSource` to follow the invoice with. Defaults to the global one; `null` reads the invoice every `pollMs`
   * instead.
   */
  EventSource?: EventSourceConstructor | null;
  /**
   * The calls to make instead of the HTTP ones of `token` and `baseUrl`, for tests and simulations (the TUWA docs
   * Playground). With your own calls, pass `EventSource: null` too, or the store opens `api.url('events')`.
   */
  api?: CheckoutApi;
}

/** The store {@link createCheckoutStore} returns: a vanilla Zustand store (use it with `useStore` of `zustand`). */
export type CheckoutStore = StoreApi<CheckoutState>;

/** Invoice states after which the page has nothing to follow. */
const FINAL: ReadonlySet<string> = new Set(['paid', 'held', 'expired', 'cancelled', 'refunded', 'partially_refunded']);

/** The phase an invoice state stands for, once a payment is under way or over. */
function phaseOfStatus(status: InvoiceStatus): CheckoutPhase {
  switch (status) {
    case 'processing':
      return 'confirming';
    case 'paid':
    case 'partially_refunded':
      return 'paid';
    case 'refunded':
    case 'underpaid':
    case 'held':
    case 'expired':
      return status;
    case 'cancelled':
      return 'cancelled';
    default:
      return 'selectMethod';
  }
}

/** Where a freshly read checkout starts. */
function phaseOfView(view: CheckoutView, now: number): CheckoutPhase {
  if (view.invoice.status !== 'open') return phaseOfStatus(view.invoice.status);
  if (view.buyer.required) return 'buyer';
  const expiresAt = view.quote?.expiresAt ? Date.parse(view.quote.expiresAt) : Number.NaN;
  return view.quote && !(expiresAt <= now) ? 'awaitingPayment' : 'selectMethod';
}

/** The phase a refused action leaves, by the refusal's code. */
const PHASE_OF_REFUSAL: Record<string, CheckoutPhase> = {
  payer_blocked: 'blocked',
  payer_not_expected: 'blocked',
  buyer_required: 'buyer',
  invoice_expired: 'expired',
  invoice_processing: 'confirming',
};

function errorOf(error: unknown): CheckoutError {
  if (error instanceof QuasarSDKError) {
    return { code: error.code ?? 'request_failed', message: error.message, status: error.status, issues: error.issues };
  }
  return { code: 'request_failed', message: error instanceof Error ? error.message : String(error) };
}

/**
 * Creates the headless checkout of one invoice for the buyer's browser: a vanilla Zustand store with the invoice,
 * its methods, the locked quote and where the payment stands, and the actions that move it on. The wallet is the
 * app's: the store never sends a transaction, it returns `quote.instructions` (and `quote.gasless`) for Pulsar or the
 * wallet to execute, and takes the result with `submit` or `relay`. It needs no key: the checkout token opens this
 * invoice only. `@tuwaio/nova-payments` renders it.
 *
 * Side effects: requests to `<baseUrl>/v1/payments/checkout/<token>` (the page's origin must be one of the app's
 * domains, when it lists any); after `load`, an `EventSource` on its `events` route (or a `GET` every `pollMs`) until
 * the invoice reaches a final state or `destroy` is called. Nothing is stored in the browser.
 *
 * @param options - The checkout token and optional overrides.
 * @returns The store; call `load()` first.
 *
 * @example
 * ```ts
 * import { createCheckoutStore } from '@tuwaio/quasar-sdk/checkout';
 *
 * const checkout = createCheckoutStore({ token });
 * await checkout.getState().load();
 * checkout.getState().selectMethod(checkout.getState().checkout!.methods[0].id);
 * checkout.getState().setPayer(`eip155:8453:${address}`);
 * const quote = await checkout.getState().requestQuote();
 * // Send quote.instructions with the wallet, then:
 * await checkout.getState().submit({ txKey: hash });
 * ```
 */
export function createCheckoutStore(options: CheckoutStoreOptions): CheckoutStore {
  const api = options.api ?? checkoutApi(options.token, options.baseUrl ?? BASE_API_URL);
  const pollMs = options.pollMs ?? 5_000;
  const EventSourceClass =
    options.EventSource === undefined
      ? ((globalThis as { EventSource?: EventSourceConstructor }).EventSource ?? null)
      : options.EventSource;

  let source: EventSourceLike | null = null;
  let poll: ReturnType<typeof setInterval> | null = null;
  let destroyed = false;

  const store = createStore<CheckoutState>()((set, get) => {
    /** Sets fields and the URLs that follow from them. */
    const update = (partial: Partial<CheckoutState>) => {
      const next = { ...get(), ...partial };
      set({
        ...partial,
        receiptUrl: next.phase === 'paid' || next.phase === 'refunded' ? api.url('receipt') : null,
        paymasterUrl: next.quote?.gasless?.paymaster ? api.url('paymaster') : null,
        logoUrl: next.checkout?.merchant.logo ? api.url('logo') : null,
      });
    };

    const fail = (error: unknown, fallback: CheckoutPhase) => {
      const refusal = errorOf(error);
      update({ error: refusal, phase: PHASE_OF_REFUSAL[refusal.code] ?? fallback });
    };

    const stopWatching = () => {
      source?.close();
      source = null;
      if (poll) clearInterval(poll);
      poll = null;
    };

    const onStatus = (event: CheckoutStatusEvent) => {
      if (destroyed) return;
      const { invoiceStatus: previous, phase, quote } = get();
      const partial: Partial<CheckoutState> = { invoiceStatus: event.status, txHash: event.txHash ?? get().txHash };
      if (event.status === 'open') {
        // Back to open after processing: the transaction failed or was rejected, the buyer may pay again
        if (previous === 'processing') {
          partial.phase = quote ? 'awaitingPayment' : 'selectMethod';
          partial.error = { code: 'payment_failed', message: 'The payment did not go through. Try again.' };
        } else if (phase === 'loading') {
          partial.phase = 'selectMethod';
        }
      } else {
        partial.phase = phaseOfStatus(event.status);
      }
      update(partial);
      if (FINAL.has(event.status)) stopWatching();
    };

    const startPolling = () => {
      if (poll || destroyed) return;
      poll = setInterval(() => {
        void api
          .view()
          .then((view) => {
            if (destroyed) return;
            update({ checkout: view, quote: view.quote ?? get().quote });
            onStatus({
              status: view.invoice.status,
              ledgerSeq: 0,
              txHash: null,
              amountPaid: null,
              quoteExpiresAt: view.quote?.expiresAt ?? null,
            });
          })
          .catch(() => {
            // A missed read is retried on the next tick
          });
      }, pollMs);
    };

    const watch = () => {
      if (destroyed || source || poll || FINAL.has(get().invoiceStatus ?? '')) return;
      if (!EventSourceClass) return startPolling();
      const events = new EventSourceClass(api.url('events'));
      source = events;
      events.addEventListener('status', (message) => {
        try {
          onStatus(JSON.parse(message.data) as CheckoutStatusEvent);
        } catch {
          // Not an event of this API: ignored
        }
      });
      events.onerror = () => {
        // Closed for good (the browser gave up reconnecting): read the invoice instead
        if (events.readyState === 2 && source === events) {
          events.close();
          source = null;
          startPolling();
        }
      };
    };

    return {
      phase: 'loading',
      checkout: null,
      invoiceStatus: null,
      methodId: null,
      payer: null,
      quote: null,
      locale: null,
      txKey: null,
      txHash: null,
      error: null,
      receiptUrl: null,
      paymasterUrl: null,
      logoUrl: null,

      load: async () => {
        update({ phase: 'loading', error: null });
        try {
          const view = await api.view();
          update({
            checkout: view,
            invoiceStatus: view.invoice.status,
            locale: view.invoice.locale,
            quote: view.quote,
            methodId: view.quote?.methodId ?? get().methodId,
            payer: view.quote?.payer ?? get().payer,
            phase: phaseOfView(view, Date.now()),
          });
          watch();
        } catch (error) {
          update({ phase: 'error', error: errorOf(error) });
        }
      },

      selectMethod: (methodId) => {
        const { quote, phase } = get();
        const drop = quote && quote.methodId !== methodId;
        update({
          methodId,
          error: null,
          ...(drop ? { quote: null, phase: phase === 'awaitingPayment' ? 'selectMethod' : phase } : {}),
        });
      },

      setPayer: (payer) => {
        const { quote, phase } = get();
        const drop = quote && quote.payer !== payer;
        update({
          payer,
          ...(drop ? { quote: null, phase: phase === 'awaitingPayment' ? 'selectMethod' : phase } : {}),
        });
      },

      requestQuote: async () => {
        const { methodId, payer, phase } = get();
        if (!methodId) {
          update({ error: { code: 'method_required', message: 'Choose a payment method first' } });
          return null;
        }
        update({ phase: 'quoting', error: null });
        try {
          const quote = await api.quote({ methodId, ...(payer ? { payer } : {}) });
          update({ quote, phase: 'awaitingPayment' });
          return quote;
        } catch (error) {
          fail(error, phase === 'quoting' ? 'selectMethod' : phase);
          return null;
        }
      },

      setBuyer: async (buyer, buyerOptions = {}) => {
        update({ error: null });
        try {
          const view = await api.buyer({ buyer, ...(buyerOptions.company ? { company: true } : {}) });
          update({ checkout: view, phase: phaseOfView(view, Date.now()) });
          return true;
        } catch (error) {
          fail(error, get().phase);
          return false;
        }
      },

      setLocale: async (locale) => {
        const before = get().locale;
        update({ locale, error: null });
        try {
          await api.locale(locale);
          return true;
        } catch (error) {
          update({ locale: before });
          fail(error, get().phase);
          return false;
        }
      },

      submit: async (params) => {
        const phase = get().phase;
        update({ phase: 'submitting', error: null });
        try {
          await api.submit(params);
          update({ txKey: params.txKey, phase: 'confirming' });
          watch();
          return true;
        } catch (error) {
          fail(error, phase === 'submitting' ? 'awaitingPayment' : phase);
          return false;
        }
      },

      relay: async (signature) => {
        const phase = get().phase;
        update({ phase: 'submitting', error: null });
        try {
          const relayed = await api.relay(signature);
          update({ txKey: relayed.txHash ?? null, phase: 'confirming' });
          watch();
          return true;
        } catch (error) {
          fail(error, phase === 'submitting' ? 'awaitingPayment' : phase);
          return false;
        }
      },

      grantPermission: async (params) => {
        update({ error: null });
        try {
          const { permission } = await api.permission(params);
          const checkout = get().checkout;
          if (checkout) {
            update({
              checkout: {
                ...checkout,
                autoCharge: { status: 'active', permission: permission as never },
              },
            });
          }
          return true;
        } catch (error) {
          fail(error, get().phase);
          return false;
        }
      },

      destroy: () => {
        destroyed = true;
        stopWatching();
      },
    };
  });

  return store;
}

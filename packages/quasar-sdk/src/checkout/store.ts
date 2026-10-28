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
 * - `selectMethod`: choose a method, connect a wallet and tick the merchant's consent when there is one, then
 *   {@link CheckoutState.requestQuote}.
 * - `quoting`: Quasar screens the payer and locks the price.
 * - `awaitingPayment`: send `quote.instructions` from the wallet (or sign `quote.gasless`), then
 *   {@link CheckoutState.submit} or {@link CheckoutState.relay}.
 * - `submitting`: handing the transaction to Quasar.
 * - `confirming`: Quasar follows the transaction until it is final.
 * - `paid`, `underpaid` (the buyer may top it up), `held` (the merchant looks at the payment), `refunded`, `expired`,
 *   `cancelled`: the invoice's outcome. An invoice that expires while a payment this store handed over (`submit`,
 *   `relay`) is on its way is not over: the payment may still arrive, and the invoice then becomes `paid` (Quasar
 *   lets a payment it learned of before `dueAt` confirm for up to 30 minutes) or `held` (a late payment the merchant
 *   accepts or returns). The store keeps following it while {@link CheckoutState.paymentOnTheWay} is `true`.
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
 * `method_required` (no method chosen), `consent_required` (the merchant's consent is not ticked), `payment_failed`
 * (the transaction failed on-chain; pay again) and `request_failed` (no answer).
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
  /** Whether the buyer ticked the merchant's consent (`checkout.consent`). */
  consentGiven: boolean;
  /** The locked quote. */
  quote: CheckoutQuote | null;
  /** Language of the page and the documents still to be issued. */
  locale: InvoiceLocale | null;
  /**
   * The transaction handed to Quasar: the hash or signature passed to {@link CheckoutState.submit}, or the hash of a
   * relayed transfer when Quasar returns it. A relay Quasar answers with `sending` has none yet: read
   * {@link CheckoutState.paymentOnTheWay} to know that a payment is on its way.
   */
  txKey: string | null;
  /**
   * Whether a payment this store handed to Quasar ({@link CheckoutState.submit}, {@link CheckoutState.relay}, also a
   * relay still `sending`, without a `txKey`) is on its way: `true` from the hand-over until the payment settles
   * (the invoice becomes `paid`, `underpaid`, `held`, `refunded` or `cancelled`) or fails. It fails when Quasar lists
   * it among the rejected payments (`rejectedTxKeys` of the status events: reverted, dropped, a wrong amount…), then
   * `error` is `payment_failed`, on an `open` invoice too, or when the invoice goes back to `open` after `processing`.
   * On an `expired` invoice it tells the page that the buyer's payment may still arrive: `false` again once Quasar
   * reports no payment of the invoice on its way, or 35 minutes past the later of `dueAt` and the hand-over (an hour
   * after the invoice expired when it has no `dueAt`), when the store stops following the invoice. Read-only: the
   * store sets it.
   */
  readonly paymentOnTheWay: boolean;
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
   * `pollMs`). An event that brings an outcome (underpaid, held, paid, refunded, expired, cancelled) updates
   * `checkout.invoice.amountPaid` at once and reads the checkout again for the rest (`review`, the refund, the invoice
   * that replaced it, `autoCharge`). It stops at a final state, except `expired` while
   * {@link CheckoutState.paymentOnTheWay}: it keeps the event stream while Quasar keeps it open for that payment, and
   * otherwise closes it and reads the checkout every 20 seconds (or every `pollMs`, when longer), until the payment
   * ends the invoice (`paid`, `held`), fails, Quasar reports no payment on its way, 35 minutes past the later of
   * `dueAt` and the hand-over (an hour after the expiry without `dueAt`), or `destroy` is called. It never expires the
   * invoice by the clock: past `dueAt`, a confirming payment stays `confirming` until Quasar reports the outcome. Sets
   * `phase` `error` when the link is wrong or retired.
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
   * Ticks or clears the merchant's consent (`checkout.consent`): a required one must be ticked before
   * {@link CheckoutState.requestQuote}, which sends it with the quote.
   *
   * @param given - Whether the buyer ticked it.
   */
  setConsentGiven: (given: boolean) => void;
  /**
   * Forgets the locked quote and goes back to choosing a method ("Back to methods"), also for a Solana Pay QR quote
   * that no other action drops. Nothing changes once the payment is on its way (`submitting`, `confirming`) or done.
   * Quasar keeps the lock until it ends: a payment of the old quote that still arrives is credited.
   */
  releaseQuote: () => void;
  /**
   * Screens the payer and locks the price (`POST quote`).
   *
   * @returns The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
   *   details come first; `consent_required`, without a request, when a required consent is not ticked).
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
   * @returns Whether Quasar took it; `phase` is then `confirming` (`expired` when the invoice expired meanwhile: Quasar
   *   still takes the transaction, and holds it as a late payment) and {@link CheckoutState.paymentOnTheWay} `true`.
   */
  submit: (params: { txKey: string; from?: string; connectorType?: string }) => Promise<boolean>;
  /**
   * Sends the payer's signature of `quote.gasless.relay.typedData` (`POST relay`): Quasar sends the transfer and the
   * merchant pays the gas.
   *
   * @param signature - The 65-byte EIP-712 signature.
   * @returns Whether it was relayed; `phase` is then `confirming` and {@link CheckoutState.paymentOnTheWay} `true`.
   *   `txKey` is the transfer's hash when Quasar returns it, `null` while the relay is still `sending`.
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

/** Invoice states in which a payment has settled: it is no longer on its way. */
const SETTLED: ReadonlySet<string> = new Set(['paid', 'held', 'cancelled', 'refunded', 'partially_refunded']);

/** Invoice states in which a payment on its way may still fail. */
const UNSETTLED: ReadonlySet<string> = new Set(['open', 'processing', 'underpaid', 'expired']);

/** How long Quasar waits past `dueAt` for a payment it learned of before it, plus a margin for the last reads. */
const LATE_FOLLOW_MS = 35 * 60_000;

/** How long the store follows an expired invoice without a `dueAt` for a payment on its way. */
const LATE_FOLLOW_WITHOUT_DUE_MS = 60 * 60_000;

/** How often the store reads an expired invoice whose payment is on its way, at least. */
const LATE_POLL_MS = 20_000;

/** A payment key as Quasar lists it: EVM hashes in lower case, Solana signatures as they are. */
const keyOf = (key: string) => (key.startsWith('0x') || key.startsWith('0X') ? key.toLowerCase() : key);

/**
 * The outcomes whose details an event does not carry: why a payment waits (`review`), the refund, the invoice that
 * replaced a cancelled one, the automatic payments offer after a paid period. The checkout is read again for them.
 */
const OUTCOMES: ReadonlySet<string> = new Set([...FINAL, 'underpaid']);

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
 * the invoice reaches a final state or `destroy` is called (an invoice that expired while a payment of this store
 * confirms is followed on, until that payment ends it as `paid` or `held`), and a `GET` of the checkout when an event
 * brings an outcome. Nothing is stored in the browser.
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
  let pollEvery = pollMs;
  let destroyed = false;
  /** The keys of the payment this page handed over: its `txKey`, a relay's `userOpHash` and hash. */
  let ownKeys: string[] = [];
  /** The failed payments Quasar listed last, and the ones it had listed when this page handed its payment over. */
  let knownRejected: string[] = [];
  let rejectedAtHandOver: ReadonlySet<string> = new Set();
  /** When the payment was handed over, and how many hand-overs so far (a read started before the last one is stale). */
  let handedOverAt = 0;
  let handOvers = 0;
  /** Following an expired invoice for a payment on its way: until when, and the timer that stops it then. */
  let lateUntil: number | null = null;
  let lateTimer: ReturnType<typeof setTimeout> | null = null;
  /** Whether the last `expired` event said a payment is on its way: Quasar then keeps the stream open. */
  let streamFollows = false;

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

    const stopLate = () => {
      if (lateTimer) clearTimeout(lateTimer);
      lateTimer = null;
      lateUntil = null;
      streamFollows = false;
    };

    const stopWatching = () => {
      source?.close();
      source = null;
      if (poll) clearInterval(poll);
      poll = null;
      stopLate();
    };

    /** The payment this page handed over ended (settled or failed): the fields that say so. */
    const paymentEnded = (): Partial<CheckoutState> => {
      ownKeys = [];
      return { paymentOnTheWay: false };
    };

    /**
     * Whether Quasar reports that this page's payment failed: it lists one of its keys among the rejected payments, or,
     * when the store does not know the key (a relay answered `sending`, then rejected by its transfer's hash), it has no
     * payment on its way and lists a rejection it had not listed at the hand-over.
     */
    const rejectedNow = (event: CheckoutStatusEvent): boolean => {
      if (!event.rejectedTxKeys) return false;
      const listed = event.rejectedTxKeys.map(keyOf);
      if (ownKeys.some((key) => listed.includes(key))) return true;
      return event.pendingPayments === 0 && listed.some((key) => !rejectedAtHandOver.has(key));
    };

    /** Reads the checkout again for the details of an outcome; a failed read leaves the state the event set. */
    const refreshView = () =>
      api
        .view()
        .then((view) => {
          // The details only: the phase follows the events, and the buyer's quote stays as the actions left it
          if (!destroyed) update({ checkout: view });
        })
        .catch(() => {
          // The outcome stands; its details come with the next load
        });

    /** Whether the store follows the invoice: not after a final state, except an expired one with a payment on its way. */
    const following = () => {
      const { invoiceStatus, paymentOnTheWay } = get();
      return !FINAL.has(invoiceStatus ?? '') || (invoiceStatus === 'expired' && paymentOnTheWay);
    };

    const startPolling = () => {
      if (poll || destroyed) return;
      // An expired invoice whose payment is on its way changes once at most: read it calmly
      pollEvery = lateUntil === null ? pollMs : Math.max(pollMs, LATE_POLL_MS);
      poll = setInterval(() => {
        // A read that started before the last hand-over may not count the payment yet
        const startedAt = handOvers;
        void api
          .view()
          .then((view) => {
            if (destroyed) return;
            update({ checkout: view, quote: view.quote ?? get().quote });
            onStatus(
              {
                status: view.invoice.status,
                ledgerSeq: 0,
                txHash: null,
                amountPaid: view.invoice.amountPaid,
                quoteExpiresAt: view.quote?.expiresAt ?? null,
                pendingPayments: view.invoice.pendingPayments,
                rejectedTxKeys: view.invoice.rejectedTxKeys,
              },
              view,
              startedAt === handOvers,
            );
          })
          .catch(() => {
            // A missed read is retried on the next tick
          });
      }, pollEvery);
    };

    /**
     * Follows an expired invoice for this page's payment, for a while: the reads slow down, and the store stops
     * following it 35 minutes past the later of `dueAt` and the hand-over (Quasar waits 30 minutes at most for a
     * payment it learned of before `dueAt`; a later one settles in minutes), or an hour after the expiry without
     * `dueAt`.
     */
    const followLate = () => {
      if (lateUntil === null) {
        const dueAt = Date.parse(get().checkout?.invoice.dueAt ?? '');
        lateUntil = Number.isFinite(dueAt)
          ? Math.max(dueAt, handedOverAt) + LATE_FOLLOW_MS
          : Date.now() + LATE_FOLLOW_WITHOUT_DUE_MS;
        lateTimer = setTimeout(
          () => {
            lateTimer = null;
            if (destroyed) return;
            update(paymentEnded());
            stopWatching();
          },
          Math.max(0, lateUntil - Date.now()),
        );
      }
      if (poll && pollEvery < LATE_POLL_MS) {
        clearInterval(poll);
        poll = null;
        startPolling();
      }
    };

    /**
     * Applies a state of the invoice: from the event stream, or from `view`, a read of the checkout that already has
     * the details. `current` is `false` for a read that started before the last hand-over.
     */
    const onStatus = (event: CheckoutStatusEvent, view?: CheckoutView, current = true) => {
      if (destroyed) return;
      const { invoiceStatus: previous, phase, quote, checkout, paymentOnTheWay } = get();
      if (event.rejectedTxKeys) knownRejected = event.rejectedTxKeys;
      const partial: Partial<CheckoutState> = { invoiceStatus: event.status, txHash: event.txHash ?? get().txHash };
      // What arrived is in the event: the underpaid and expired outcomes show it at once
      if (!view && checkout && event.amountPaid !== undefined && event.amountPaid !== checkout.invoice.amountPaid) {
        partial.checkout = { ...checkout, invoice: { ...checkout.invoice, amountPaid: event.amountPaid } };
      }
      const failed =
        (paymentOnTheWay && current && UNSETTLED.has(event.status) && rejectedNow(event)) ||
        // Back to open after processing: the transaction failed or was rejected
        (event.status === 'open' && previous === 'processing');
      if (failed) {
        // The buyer may pay again while the invoice is payable
        Object.assign(partial, paymentEnded(), {
          error: { code: 'payment_failed', message: 'The payment did not go through. Try again.' },
          phase:
            event.status === 'open' || event.status === 'processing'
              ? quote
                ? 'awaitingPayment'
                : 'selectMethod'
              : phaseOfStatus(event.status),
        });
      } else if (event.status === 'open') {
        if (phase === 'loading') partial.phase = 'selectMethod';
      } else {
        partial.phase = phaseOfStatus(event.status);
      }
      if (paymentOnTheWay && !failed) {
        const nothingOnItsWay = current && event.pendingPayments === 0;
        const settled =
          SETTLED.has(event.status) ||
          // It made the invoice underpaid, or topped up an underpaid one that stays short
          (event.status === 'underpaid' && (previous !== 'underpaid' || nothingOnItsWay)) ||
          // A read of the expired invoice: Quasar has no payment of it on its way any longer
          (event.status === 'expired' && view !== undefined && nothingOnItsWay);
        if (settled) Object.assign(partial, paymentEnded());
      }
      update(partial);

      if (!following()) {
        stopWatching();
      } else if (event.status === 'expired') {
        // Expired while this page's payment is on its way: it may still end it (paid, or held as a late payment)
        streamFollows = (event.pendingPayments ?? 0) > 0;
        followLate();
        if (source && event.pendingPayments === 0) {
          // Quasar ends this stream: read the invoice instead, until a read confirms that nothing is on its way
          source.close();
          source = null;
          startPolling();
        }
      }
      if (!view && event.status !== previous && OUTCOMES.has(event.status)) void refreshView();
    };

    const watch = () => {
      if (destroyed || source || poll || !following()) return;
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
        if (source !== events) return;
        // Closed for good (the browser gave up reconnecting), or ended on an expired invoice that Quasar does not
        // follow (the browser would reconnect every few seconds to a stream that ends at once): read the invoice
        const { invoiceStatus, paymentOnTheWay } = get();
        if (events.readyState === 2 || (invoiceStatus === 'expired' && paymentOnTheWay && !streamFollows)) {
          events.close();
          source = null;
          startPolling();
        }
      };
    };

    /** Takes a payment this page handed over: it is on its way until it settles or fails. */
    const handOver = (keys: (string | null | undefined)[], txKey: string | null) => {
      handOvers += 1;
      handedOverAt = Date.now();
      ownKeys = keys.filter((key): key is string => Boolean(key)).map(keyOf);
      rejectedAtHandOver = new Set(knownRejected.map(keyOf));
      const expired = get().invoiceStatus === 'expired';
      update({ txKey, paymentOnTheWay: true, phase: expired ? 'expired' : 'confirming' });
      if (expired) followLate();
      watch();
    };

    return {
      phase: 'loading',
      checkout: null,
      invoiceStatus: null,
      methodId: null,
      payer: null,
      consentGiven: false,
      quote: null,
      locale: null,
      txKey: null,
      paymentOnTheWay: false,
      txHash: null,
      error: null,
      receiptUrl: null,
      paymasterUrl: null,
      logoUrl: null,

      load: async () => {
        update({ phase: 'loading', error: null });
        try {
          const view = await api.view();
          if (view.invoice.rejectedTxKeys) knownRejected = view.invoice.rejectedTxKeys;
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

      setConsentGiven: (given) => update({ consentGiven: given, error: null }),

      releaseQuote: () => {
        if (get().phase !== 'awaitingPayment') return;
        update({ quote: null, error: null, phase: 'selectMethod' });
      },

      requestQuote: async () => {
        const { methodId, payer, phase, checkout, consentGiven } = get();
        if (!methodId) {
          update({ error: { code: 'method_required', message: 'Choose a payment method first' } });
          return null;
        }
        if (checkout?.consent?.required && !consentGiven) {
          update({ error: { code: 'consent_required', message: 'Tick the consent of the checkout first' } });
          return null;
        }
        update({ phase: 'quoting', error: null });
        try {
          const quote = await api.quote({
            methodId,
            ...(payer ? { payer } : {}),
            ...(checkout?.consent && consentGiven ? { consentGiven: true } : {}),
          });
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
          handOver([params.txKey], params.txKey);
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
          handOver([relayed.userOpHash, relayed.txHash], relayed.txHash ?? null);
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

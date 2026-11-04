/**
 * @file The headless checkout store: the state of one invoice's payment in the buyer's browser.
 */

import { createStore, type StoreApi } from 'zustand/vanilla';

import { BASE_API_URL } from '../constants';
import { type QuasarRequestIssue, QuasarSDKError } from '../core/errors';
import type { Buyer, InvoiceLocale, InvoiceStatus } from '../modules/payments/types';
import { checkoutApi } from './api';
import type {
  CheckoutApi,
  CheckoutPayerProof,
  CheckoutQuote,
  CheckoutRejectedPayment,
  CheckoutStatusEvent,
  CheckoutView,
  GrantPermissionParams,
  PayerProofMessage,
} from './types';

/**
 * Where the payment stands:
 *
 * - `loading`: reading the checkout.
 * - `buyer`: the buyer details come first ({@link CheckoutState.setBuyer}).
 * - `selectMethod`: choose a method, connect a wallet, confirm it with {@link CheckoutState.confirmPayer} when
 *   {@link CheckoutState.payerProof} is `required` (an EVM payment the buyer's wallet sends), tick the merchant's consent
 *   when there is one, then {@link CheckoutState.requestQuote}.
 * - `quoting`: Quasar screens the payer and locks the price.
 * - `awaitingPayment`: send `quote.instructions` from the wallet (or sign `quote.gasless`), then
 *   {@link CheckoutState.submit} or {@link CheckoutState.relay}.
 * - `submitting`: handing the transaction to Quasar.
 * - `confirming`: Quasar follows the transaction until it is final. Also while Quasar reports a payment of the
 *   invoice on its way that this store did not hand over ({@link CheckoutState.invoicePaymentOnTheWay}: the page was
 *   reopened, or Quasar found a Solana Pay transfer): the page does not offer to pay meanwhile.
 * - `unconfirmed`: Quasar could not confirm the payment (the network never returned the transaction, no receipt in
 *   time…), but it may still have gone through: the page asks the buyer to check the wallet before paying again, and
 *   offers no payment; {@link CheckoutState.payAgain} goes back to it once the buyer did. `error` says why
 *   (`payment_unconfirmed`, with the `reason`). Also where a reopened page finds the latest payment of the invoice
 *   unconfirmed or still unresolved ({@link CheckoutState.invoicePaymentUnresolved}), while the store retries
 *   handing over a transaction the wallet sent (`reason` `submit_retrying`, {@link CheckoutState.submit}), while
 *   Quasar decides about a transaction another invoice handed over first (`reason` `tx_already_used`), and for a
 *   payment the network confirmed that Quasar has not recorded yet (`reason` `settlement_failed`); for these two
 *   {@link CheckoutState.payAgain} does nothing.
 * - `paid`, `underpaid` (the buyer may top it up), `held` (the merchant looks at the payment), `refunded`, `expired`,
 *   `cancelled`: the invoice's outcome. An invoice that expires or is cancelled while a payment is on its way (one this
 *   store handed over with `submit` or `relay`, or one Quasar reports) is not over: the payment may still arrive, and
 *   the invoice then becomes `paid` (Quasar lets a payment it learned of before `dueAt` confirm for up to 30 minutes)
 *   or `held` (a late payment, or one to a cancelled invoice, that the merchant accepts or returns). The store keeps
 *   following it while {@link CheckoutState.paymentOnTheWay} or {@link CheckoutState.invoicePaymentOnTheWay} is
 *   `true`, for a limited time.
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
  | 'unconfirmed'
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
 * `method_required` (no method chosen), `consent_required` (the merchant's consent is not ticked),
 * `payer_proof_required` (the wallet has not confirmed the invoice yet: {@link CheckoutState.confirmPayer}; also Quasar's
 * `409` to a quote), `payer_required` (no wallet to confirm), `payer_proof_declined` (the wallet did not sign the
 * confirmation; nothing was sent), the refusals of a confirmation (`payer_proof_invalid` with `reason`
 * `message_mismatch` or `signature_invalid`, `payer_proof_unavailable` with `reason` `rpc_failed` when the network of a
 * smart wallet cannot be asked now, `payer_chain_mismatch`, `origin_required`, `rate_limited`, `too_many_payers`),
 * `payment_failed`
 * (the transaction did not go through: it reverted, was cancelled, its Solana blockhash expired…; pay again),
 * `payment_mismatch` (the transaction succeeded on chain but does not pay the invoice: a wrong amount, asset or
 * recipient, no Solana Pay reference, sent before the quote, already used; it may have moved money, so never say that
 * nothing was charged: say that it does not pay the invoice and to contact the merchant if money left the wallet; the
 * buyer may pay again once it can never pay the invoice; one that may still pay it keeps `phase` `unconfirmed`, with no
 * plain second payment), `payment_unconfirmed` (Quasar could not confirm the transaction, or has not received it yet,
 * but it may still have gone through: check the wallet before paying again; `rechecked` says whether Quasar reads it
 * again; `reason` `tx_already_used` and `settlement_failed` say more, see {@link CheckoutError.reason}) and
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
  /**
   * Why Quasar refused an action, when it says (`details.reason` of the refusal: `signature_invalid` of
   * `payer_proof_invalid`, `feed_unavailable` of `price_unavailable`…). Why Quasar rejected the payment, for
   * `payment_failed`, `payment_mismatch` and `payment_unconfirmed`: a reason of
   * {@link CheckoutRejectedPayment} (`reverted`, `no_matching_transfer`, `not_found`, `timeout`…), `submit_retrying`
   * while the store retries handing over a transaction Quasar has not received yet ({@link CheckoutState.submit}), or
   * `submit_failed` once it gave up after an hour; left out when Quasar did not say. Two reasons of
   * `payment_unconfirmed` are about a payment that left the wallet, and the page offers no payment for them:
   * - `tx_already_used` (with `status` `409`): Quasar tracks the transaction for another invoice whose page handed it
   *   over first (anyone who saw the hash may have done so). Quasar recorded this invoice's claim on it and credits it
   *   to the invoice the wallet that sent it confirmed ({@link CheckoutState.confirmPayer}): when that is this invoice,
   *   it becomes `processing` or `paid` and the error clears; when it is not, Quasar rejects it here with
   *   `tx_already_used` (`payment_mismatch`).
   * - `settlement_failed`: the network confirmed the transaction, but Quasar has not recorded it yet. The money reached
   *   the merchant's address: the buyer contacts the merchant with the transaction hash and does not pay again; never
   *   say that it does not pay the invoice or that nothing was charged. Quasar settles it again daily for 30 days after
   *   it learned of it, while `rechecked` is set; only then may the page say so.
   *
   * `payment_mismatch` with `payer_mismatch` or `payer_unconfirmed`: the transfer came from another wallet than the
   * quoted one, or from one that never confirmed the invoice; it pays no invoice and the merchant returns it to the
   * wallet that sent it.
   */
  reason?: string;
  /**
   * Set on `payment_unconfirmed` while Quasar still reads the payment again (for up to 24 hours after it learned of
   * it; a `settlement_failed` one daily for 30 days): the rejection is `rechecked`
   * ({@link CheckoutRejectedPayment.rechecked}), or there is no rejection and Quasar reports a payment that may still
   * arrive (`unresolvedPayments` above `0`). Only then may the page promise that Quasar checks the payment again. Left
   * out otherwise (`user_operation_lost`, `transaction_failed`, `submit_failed`, a `settlement_failed` past its 30 days,
   * a Quasar that does not say): Quasar never reads that payment again, so the page asks the buyer to contact the
   * merchant with the transaction hash if money left the wallet.
   */
  rechecked?: true;
  /**
   * Set on a `payment_mismatch` with the reason `tx_already_used` when another invoice holds the transfer for a refund
   * only ({@link CheckoutRejectedPayment.held}): say that the transaction is tied to another invoice, never that it pays
   * one.
   */
  held?: true;
  /**
   * The other invoice Quasar names: the one a rejected transaction is credited to or held on, or the one whose hold
   * the merchant refunds instead (`payment_held_elsewhere` of a refund, its `details.invoice`).
   */
  otherInvoice?: string;
  /**
   * The wallet that paid the invoice first, on `payer_mismatch` (`409`) of {@link CheckoutState.requestQuote}: Quasar
   * prices the rest of an underpaid invoice only for that wallet, so the buyer pays the rest from it.
   */
  originWallet?: string;
}

/**
 * Whether the connected wallet must confirm the invoice before it pays (a transfer is
 * credited only to an invoice it is tied to by proof):
 *
 * - `not_needed`: no method chosen, a Solana method (the quote's reference ties the transfer), or a Quasar before payer
 *   proofs.
 * - `required`: an EVM payment the buyer's wallet sends (paying the gas, or a smart wallet with or without the
 *   merchant's paymaster): {@link CheckoutState.confirmPayer} before {@link CheckoutState.requestQuote}, which refuses
 *   with `payer_proof_required` until then. Also when Quasar refused a quote with `409 payer_proof_required`.
 * - `unless_relayed`: an EVM method the gasless relay may pay. The quote comes first; paying with
 *   {@link CheckoutState.relay} needs nothing more (the signed EIP-3009 authorization confirms the wallet), while a
 *   transfer from the wallet or a paymaster payment (`quote.gasless.paymaster`) needs
 *   {@link CheckoutState.confirmPayer} before the wallet sends it: Quasar credits a transfer of an unconfirmed wallet to
 *   no invoice and the merchant returns it.
 * - `confirming`: {@link CheckoutState.confirmPayer} is under way for a wallet that confirms before the price. A
 *   wallet the relay may confirm stays `unless_relayed` meanwhile, so a prompt that never answers blocks no new price.
 * - `confirmed`: the wallet confirmed the invoice: on any EVM network for an ordinary wallet (or through the relay's
 *   authorization), on the method's network for a smart wallet. One confirmation per invoice and wallet: a new quote,
 *   another token or network needs none, also on a reopened page (`checkout.payerProofs`).
 */
export type PayerProofStatus = 'not_needed' | 'required' | 'unless_relayed' | 'confirming' | 'confirmed';

/**
 * Signs the message of a payer proof with the connected wallet: `personal_sign` (EIP-191) of `message` exactly as it
 * is, from `request.payer` (a smart wallet signs it through its own flow, ERC-1271 or ERC-6492). Rejects when the buyer
 * refuses or the wallet cannot sign.
 *
 * @param message - The EIP-4361 message to sign.
 * @param request - What Quasar answered: the message with its site, network, nonce and dates.
 * @returns The signature, as hex.
 */
export type PayerProofSigner = (message: string, request: PayerProofMessage) => Promise<string>;

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
  /**
   * Whether the connected wallet must confirm the invoice before it pays, for the chosen method ({@link PayerProofStatus}).
   * Read-only: the store sets it from the method, the wallet and the confirmations Quasar and this page know of.
   */
  readonly payerProof: PayerProofStatus;
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
   * (the invoice becomes `paid`, `underpaid`, `held`, `refunded` or `cancelled`) or ends. It ends when Quasar lists it
   * among the rejected payments (`rejectedPayments` of the status events, by its `txKey`, the hash it replaced or the
   * relay's `userOpHash`), on an `open` invoice too: with a final reason `error` is `payment_failed` (reverted,
   * cancelled…) or `payment_mismatch` (a wrong amount or recipient…: it may have moved money) and the buyer may pay
   * again; otherwise (not found, no receipt in time…) `error` is
   * `payment_unconfirmed` and `phase` `unconfirmed`. The same when the invoice goes back to `open` after `processing`.
   * On an `expired` or `cancelled` invoice it tells the page that the buyer's payment may still arrive: `false` again
   * once Quasar reports no payment of the invoice on its way, or at {@link CheckoutState.followingUntil}, when the store
   * stops following the invoice (`error` `payment_unconfirmed` then, or on a read without a payment on its way, while
   * {@link CheckoutState.invoicePaymentUnresolved} is `true`). Also `true` while Quasar decides about a transaction
   * another invoice handed over first (`error.reason` `tx_already_used`). Read-only: the store sets it.
   */
  readonly paymentOnTheWay: boolean;
  /**
   * Whether Quasar last reported a payment of the invoice on its way (`pendingPayments` above `0`), whoever handed it
   * over: another tab, the page before it was reloaded, a Solana Pay transfer Quasar found, this invoice's claim on a
   * transaction another invoice handed over first. While it is `true` on a payable invoice the phase is `confirming`,
   * not a payment; on an `expired` or `cancelled` invoice the payment may still arrive, and the store follows it as it
   * follows {@link CheckoutState.paymentOnTheWay}. `false` with a Quasar that does not report it, and once the store
   * stops following an expired or cancelled invoice. Read-only: the store sets it.
   */
  readonly invoicePaymentOnTheWay: boolean;
  /**
   * Until when the invoice waits for a payment Quasar learned of before `dueAt` (`dueAt` plus 30 minutes), while one is
   * on its way; `null` otherwise or with a Quasar that does not report it. The page can say from it, not from the
   * browser's clock, that the payment was sent in time. Read-only: the store sets it.
   */
  readonly paymentCountsUntil: string | null;
  /**
   * Whether Quasar last reported a payment of the invoice that may still arrive (`unresolvedPayments` above `0`, with
   * no time limit: also one stuck past the 25 minutes `pendingPayments` counts, and one whose tracker lost sight of it,
   * which Quasar reads again for 24 hours); with a Quasar that does not report it, `pendingPayments` above `0`. While it
   * is `true` the page never says that nothing was charged, and a reopened page that finds no payment on its way starts
   * in `unconfirmed` (or `expired` with `payment_unconfirmed`). Read-only: the store sets it.
   */
  readonly invoicePaymentUnresolved: boolean;
  /**
   * Whether the payment this store handed over counts as sent before `dueAt`, as Quasar says (one of its keys is in
   * `onTimeTxKeys`): `true` once Quasar lists it, `false` while Quasar lists the payments sent in time without it (one
   * handed over after `dueAt`, which Quasar holds as late), `null` before Quasar reported it, with a Quasar that does
   * not report it, or without a payment of this page. Use it, not the browser clock. Reset by the next hand-over.
   * Read-only: the store sets it.
   */
  readonly paymentSentInTime: boolean | null;
  /**
   * Until when this page follows an `expired` or `cancelled` invoice for a payment on its way (ISO 8601), `null` when it
   * does not (an invoice that can still be paid is followed with no limit). An expired invoice is followed until 35
   * minutes past the later of `dueAt` and the latest hand-over of this page (Quasar waits 30 minutes past `dueAt` at
   * most for a payment it learned of before it, and settles a later one in minutes); when the page found the payment on
   * its way instead (a reload, another tab), the time it found it counts as the hand-over; an hour after the store found
   * the invoice expired when it has no `dueAt`. A cancelled invoice is followed until 35 minutes after the later of when
   * the store found it cancelled and the latest hand-over. A later hand-over moves it on. Past it the page shows nothing
   * more without a reload, so say "this page follows the payment until {time}", never that it shows the outcome
   * whenever it comes; a reloaded page reads the outcome. Read-only: the store sets it.
   */
  readonly followingUntil: string | null;
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
   * that replaced it, `autoCharge`). A checkout whose invoice has a payment on its way (a reloaded or reopened page)
   * starts in `confirming`, not at the payment, and the store follows that payment as its own. One whose latest
   * payment Quasar could not confirm (its latest rejection is not `final`), or that has a payment that may still arrive
   * ({@link CheckoutState.invoicePaymentUnresolved}) with none on its way, starts in `unconfirmed` (`expired` stays
   * `expired`) with `error` `payment_unconfirmed`; one whose latest transaction does not pay the invoice starts with
   * `error` `payment_mismatch` (in `unconfirmed`, with no plain payment, when the rejection is not `final`). A latest
   * rejection that Quasar reads again (`not_found`, `timeout`, `replaced`) no longer counts once Quasar reports no
   * payment that may still arrive (`unresolvedPayments` `0`): Quasar resolved it. Hand-overs this tab kept
   * ({@link CheckoutState.submit}) that Quasar does not list yet are handed over again at once. It stops at a final
   * state, except `expired` and `cancelled` while {@link CheckoutState.paymentOnTheWay} or
   * {@link CheckoutState.invoicePaymentOnTheWay}: it keeps the event stream while Quasar keeps it open for that payment, and
   * otherwise closes it and reads the checkout every 20 seconds (or every `pollMs`, when longer), until the payment
   * ends the invoice (`paid`, `held`), fails, Quasar reports no payment on its way, {@link CheckoutState.followingUntil}
   * comes, or `destroy` is called. A cancelled invoice with a payment that may still arrive
   * and none on its way opens with `error` `payment_unconfirmed`, like an expired one. It never expires the invoice by
   * the clock: past `dueAt`, a confirming payment stays `confirming` until Quasar reports the outcome. Sets `phase`
   * `error` when the link is wrong or retired.
   *
   * @returns Resolves when the checkout is read.
   */
  load: () => Promise<void>;
  /**
   * Chooses a payment method; a quote for another method is dropped.
   *
   * @param methodId - One of `checkout.methods`.
   * @param options - `keepError`: the page chose it, not the buyer, so what it says about a payment that left the wallet
   * stays.
   */
  selectMethod: (methodId: string, options?: { keepError?: boolean }) => void;
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
   * that no other action drops; from the quote of a rest it goes back to the `underpaid` outcome. Nothing changes once
   * the payment is on its way (`submitting`, `confirming`) or done. Quasar keeps the lock until it ends: a payment of the
   * old quote that still arrives is credited.
   */
  releaseQuote: () => void;
  /**
   * Screens the payer and locks the price (`POST quote`).
   *
   * @returns The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
   *   details come first; `consent_required`, without a request, when a required consent is not ticked;
   *   `payer_proof_required`, without a request while {@link CheckoutState.payerProof} is `required`, and from Quasar
   *   for a wallet it wants confirmed first, `phase` back at `selectMethod`). On an underpaid invoice it prices the
   *   rest ({@link CheckoutQuote.amountDue}) at the rate of the first quote, with no consent asked again, and refuses
   *   with `409`, back at `underpaid`: `payer_mismatch` and {@link CheckoutError.originWallet} (the rest is paid from the
   *   wallet that paid first) or `rest_method_mismatch` (in the method that paid first).
   */
  requestQuote: () => Promise<CheckoutQuote | null>;
  /**
   * Confirms that the connected wallet pays this invoice: asks Quasar for the exact message
   * (`POST payer-proof/message`), has `sign` sign it with the wallet (a free signature that moves no funds), and sends
   * the signature (`POST payer-proof`), which Quasar checks (an ordinary wallet's by recovery, a smart wallet's through
   * its contract) and records for the invoice. Call it right after the wallet and the method are chosen, while
   * {@link CheckoutState.payerProof} is `required`, and before a transfer or a paymaster payment while it is
   * `unless_relayed`. A wallet confirms an invoice once: a wallet Quasar or this page already knows as confirmed asks
   * for no signature (also one Quasar answers `proven` for, confirmed from another tab), and a method that needs none
   * (`not_needed`) answers `true` at once. The page stays in its phase meanwhile ({@link CheckoutState.payerProof} is
   * `confirming` for the wallet being asked before the price, never for another one or an `unless_relayed` one). A new call replaces a confirmation under way, so a
   * prompt the buyer closed that never answers blocks nothing: call it again to try again. The replaced attempt's late
   * answer only records the wallet's proof (no `error`, no phase change). Side effect: a wallet prompt through `sign`.
   *
   * @param sign - Signs the message with the wallet ({@link PayerProofSigner}).
   * @returns Whether the wallet confirmed the invoice; {@link CheckoutState.payerProof} is then `confirmed`. `false`
   *   for a replaced attempt that did not confirm it (nothing changes), and with `error` set: `payer_required` (no wallet),
   *   `request_failed` (an `api` without the payer proof calls), `payer_proof_declined` (`sign` rejected: the buyer
   *   refused, or the wallet cannot sign messages), or Quasar's refusal (`payer_proof_invalid`, `payer_proof_unavailable`,
   *   `payer_chain_mismatch`, `origin_required`, `rate_limited`, `too_many_payers`, `invoice_not_payable`;
   *   `payer_not_expected` sets `phase` `blocked`, `invoice_expired` `expired`).
   */
  confirmPayer: (sign: PayerProofSigner) => Promise<boolean>;
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
   * The wallet has already sent the transaction, so a hand-over that gets no answer (the network, HTTP 408, 429 or
   * 5xx, `too_many_pending`) is not a failed payment: `txKey` keeps the transaction, `phase` is `unconfirmed` with
   * `error` `payment_unconfirmed` (`reason` `submit_retrying`), and the store hands it over again after 2, 4, 8, 16
   * and then every 30 seconds (Quasar takes a transaction once per `txKey`), for up to an hour or until `destroy`;
   * after the hour `error.reason` is `submit_failed` (Quasar never received it: the buyer contacts the merchant with
   * the transaction hash if money left the wallet). Once Quasar takes it, the store follows it as below; taken while
   * the invoice is already `paid`, `held` or `refunded`, it leaves the phase as it is (Quasar records it for the
   * merchant) and the store reads the checkout once more; taken while it is `expired` or `cancelled`, the phase stays
   * and the store follows the payment until Quasar holds it (or pays the expired invoice in its grace).
   *
   * Quasar answers `409 tx_already_used` when it tracks the transaction for another invoice whose page handed it over
   * first (EVM invoices share the merchant's address, so anyone who saw the hash may have done so). That is not a
   * refusal of the payment: Quasar records this invoice's claim and credits the transaction to the invoice whose quoted
   * wallet sent it. The store follows it as its payment, with `phase` `unconfirmed` (the outcome's on an expired or
   * cancelled invoice) and `error` `payment_unconfirmed` with `reason` `tx_already_used`, and offers no payment
   * ({@link CheckoutState.payAgain} does nothing) until Quasar decides. It is not handed over again. Any other refusal
   * (4xx) is not retried either.
   *
   * Until Quasar takes or refuses it, the hand-over is kept in the tab's `sessionStorage`
   * ({@link CheckoutStoreOptions.handOverStorage}), so a page closed or reloaded meanwhile hands it over again on the
   * next {@link CheckoutState.load} of the same checkout.
   *
   * @param params - `txKey`: transaction hash or Solana signature; `from`: the sender, for a Solana Pay quote without
   *   a payer; `connectorType`: the wallet connector, for the record.
   * @returns Whether Quasar took it; `phase` is then `confirming` (`expired` or `cancelled` when the invoice expired or
   *   was cancelled meanwhile: Quasar still takes the transaction, and holds it as a late payment) and
   *   {@link CheckoutState.paymentOnTheWay} `true`. `false` while the hand-over is retried, after a refusal, and for
   *   `tx_already_used` (followed all the same).
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
  /**
   * Tells Quasar that the wallet sent the transaction that revokes the permission (`autoCharge.revocation`): Quasar asks
   * the chain (`POST permission/revoked`), and `checkout.autoCharge` follows what it finds.
   *
   * @returns Whether the permission has ended; `false` while the chain does not show it yet, or on an error.
   */
  permissionRevoked: () => Promise<boolean>;
  /**
   * Goes back to the payment from `unconfirmed`, once the buyer checked that the payment did not leave the wallet:
   * `awaitingPayment` while the locked quote is valid, `underpaid` for the rest of an underpaid invoice, otherwise
   * `selectMethod` (the expired quote is dropped); the outcome of an invoice that no longer takes a payment. Nothing
   * changes in another phase, nor while `error.reason` is `tx_already_used` or `settlement_failed`: that payment left
   * the wallet and may still pay the invoice.
   */
  payAgain: () => void;
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
  /**
   * Where the store keeps the hand-overs of transactions the wallet sent that Quasar has not taken yet
   * ({@link CheckoutState.submit}), so that the next {@link CheckoutState.load} of the same checkout hands them over
   * again. Defaults to the browser's `sessionStorage` (the tab, until it closes), or none with your own `api`; `null`
   * keeps nothing. The entry is `quasar-sdk:checkoutHandOvers:<token>`: a JSON array of
   * `{ txKey, from?, connectorType?, at }` (the transaction, the sending wallet and the wallet connector as passed to
   * `submit`, and when the store first got it, in milliseconds since 1970), removed once Quasar takes or refuses it.
   * Failures of the storage are ignored.
   */
  handOverStorage?: CheckoutHandOverStorage | null;
}

/** The part of the browser's `Storage` (`sessionStorage`) the checkout store keeps its hand-overs in. */
export interface CheckoutHandOverStorage {
  /** Reads an entry; `null` when there is none. */
  getItem: (key: string) => string | null;
  /** Writes an entry. */
  setItem: (key: string, value: string) => void;
  /** Removes an entry. */
  removeItem: (key: string) => void;
}

/** The store {@link createCheckoutStore} returns: a vanilla Zustand store (use it with `useStore` of `zustand`). */
export type CheckoutStore = StoreApi<CheckoutState>;

/** A change of the state, the read-only fields too: the store sets them. */
type StateChange = { -readonly [Key in keyof CheckoutState]?: CheckoutState[Key] };

/** Invoice states after which the page has nothing to follow. */
const FINAL: ReadonlySet<string> = new Set(['paid', 'held', 'expired', 'cancelled', 'refunded', 'partially_refunded']);

/** Invoice states in which a payment has settled: it is no longer on its way. */
const SETTLED: ReadonlySet<string> = new Set(['paid', 'held', 'refunded', 'partially_refunded']);

/** Invoice states in which a payment on its way may still fail. */
const UNSETTLED: ReadonlySet<string> = new Set(['open', 'processing', 'underpaid', 'expired', 'cancelled']);

/**
 * Invoice states that no longer take a payment, while a payment on its way still reaches the merchant: Quasar records
 * it and holds it for the merchant (`held`), or pays an expired invoice with it within its grace (`paid`).
 */
const CLOSED: ReadonlySet<string> = new Set(['expired', 'cancelled']);

/** Invoice states in which the buyer may still pay. */
const PAYABLE: ReadonlySet<string> = new Set(['open', 'processing', 'underpaid']);

/** Phases in which the page offers to pay: a payment of the invoice on its way replaces them with `confirming`. */
const OFFERING: ReadonlySet<CheckoutPhase> = new Set([
  'loading',
  'selectMethod',
  'awaitingPayment',
  'underpaid',
  'unconfirmed',
]);

/** How long Quasar counts a tracked transaction as on its way after recording it (its tracking ceiling). */
const TRACKING_CEILING_MS = 25 * 60_000;

/** How long Quasar waits past `dueAt` for a payment it learned of before it, plus a margin for the last reads. */
const LATE_FOLLOW_MS = 35 * 60_000;

/**
 * How long the store follows a cancelled invoice for a payment on its way, from when it found the invoice cancelled:
 * Quasar counts a tracked transaction as on its way for 25 minutes, a later one settles in minutes.
 */
const CANCELLED_FOLLOW_MS = 35 * 60_000;

/** How long the store follows an expired invoice without a `dueAt` for a payment on its way. */
const LATE_FOLLOW_WITHOUT_DUE_MS = 60 * 60_000;

/** How often the store reads an expired invoice whose payment is on its way, at least. */
const LATE_POLL_MS = 20_000;

/**
 * Rejection reasons of a transaction that succeeded on chain without paying the invoice: it may have moved money. Read
 * when Quasar lists the reason without `movedMoney` (it marks the same reasons).
 */
const MOVED_MONEY_REASONS: ReadonlySet<string> = new Set([
  'no_matching_transfer',
  'reference_missing',
  'too_early',
  'tx_already_used',
  'payer_mismatch',
  'payer_unconfirmed',
  'already_paid',
  'native_from_contract_unverifiable',
  'invoice_not_payable',
  'settlement_failed',
]);

/**
 * The rejection of a payment the network confirmed whose settlement keeps failing: the money is on the merchant's
 * address, Quasar settles it again daily (for 30 days, while it marks the rejection `rechecked`). Not "does not pay the
 * invoice", and never a second payment.
 */
const SETTLEMENT_FAILED = 'settlement_failed';

/**
 * The refusal of `/submit` for a transaction Quasar tracks for another invoice of the app (its hash was handed over
 * there first), and the `reason` of the store's error then: Quasar records this invoice's claim and credits the
 * transaction to the invoice the wallet that sent it confirmed.
 */
const TAKEN_ELSEWHERE = 'tx_already_used';

/**
 * Rejection reasons of a payment whose tracker lost sight of it, which Quasar reads again for 24 hours: once Quasar
 * reports no payment that may still arrive, such a rejection was resolved (verified, or closed for good).
 */
const RE_READ_REASONS: ReadonlySet<string> = new Set(['timeout', 'not_found', 'replaced']);

/** The `sessionStorage` entry of the hand-overs Quasar has not taken yet, by checkout token. */
const HAND_OVERS_KEY = 'quasar-sdk:checkoutHandOvers:';

/** A hand-over kept in the tab until Quasar takes or refuses it ({@link CheckoutStoreOptions.handOverStorage}). */
interface KeptHandOver {
  txKey: string;
  from?: string;
  connectorType?: string;
  at: number;
}

/**
 * Rejection reasons of a transfer from a wallet that did not confirm the invoice. Quasar records such a transfer as a
 * held transfer of its own (`held`), which the merchant returns to the wallet that sent it, and the invoice stays as
 * it was; a rejection without `held` promises no refund.
 */
const REFUND_ONLY_REASONS: ReadonlySet<string> = new Set(['payer_mismatch', 'payer_unconfirmed']);

/** Kinds of payer proof that count on every EVM network: the key behind the address signs for it everywhere. */
const ANY_NETWORK_PROOFS: ReadonlySet<string> = new Set(['eoa', 'authorization']);

/** A wallet's confirmation as the store matches it: Quasar's, or one this page got (`kind` unknown: its network only). */
type KnownProof = Pick<CheckoutPayerProof, 'payer' | 'chainId'> & { kind?: CheckoutPayerProof['kind'] };

/** A CAIP-10 account's network and address (an EVM address in lower case); `null` when it is none. */
function accountOf(account: string): { namespace: string; chainId: string; address: string } | null {
  const [namespace, reference, address, ...rest] = account.split(':');
  if (!namespace || !reference || !address || rest.length > 0) return null;
  return {
    namespace,
    chainId: `${namespace}:${reference}`,
    address: namespace === 'eip155' ? address.toLowerCase() : address,
  };
}

/**
 * Whether `payer` confirmed the invoice for a payment from its network: an ordinary wallet's confirmation (or a relay's
 * authorization) counts on every EVM network, a smart wallet's (or one of unknown kind) only on its own.
 */
function confirmedBy(proofs: readonly KnownProof[], payer: string): boolean {
  const wallet = accountOf(payer);
  if (!wallet) return false;
  return proofs.some((proof) => {
    const known = accountOf(proof.payer);
    if (!known || known.namespace !== wallet.namespace || known.address !== wallet.address) return false;
    return (proof.kind && ANY_NETWORK_PROOFS.has(proof.kind)) || proof.chainId === wallet.chainId;
  });
}

/** Pauses between the hand-overs of a transaction Quasar has not received yet, in milliseconds; the last repeats. */
const SUBMIT_RETRY_MS = [2_000, 4_000, 8_000, 16_000, 30_000];

/** How long the store retries handing over a transaction the wallet sent. */
const SUBMIT_RETRY_FOR_MS = 60 * 60_000;

/** Payments refusals that do not refuse the transaction: Quasar may take it on a later hand-over. */
const RETRYABLE_REFUSALS: ReadonlySet<string> = new Set(['too_many_pending']);

/** Whether `/submit` refused the transaction because Quasar tracks it for another invoice of the app. */
const takenElsewhere = (error: unknown) => error instanceof QuasarSDKError && error.code === TAKEN_ELSEWHERE;

/** Whether a failed hand-over got no answer about the transaction (the network, a busy or failing server). */
function retryable(error: unknown): boolean {
  if (!(error instanceof QuasarSDKError)) return true;
  if (error.code && RETRYABLE_REFUSALS.has(error.code)) return true;
  const { status } = error;
  return status === undefined || status === 408 || status === 429 || status >= 500;
}

/** A payment key as Quasar lists it: EVM hashes in lower case, Solana signatures as they are. */
const keyOf = (key: string) => (key.startsWith('0x') || key.startsWith('0X') ? key.toLowerCase() : key);

/** A failed payment as the store matches it: every key it may be known by, why it failed, whether it is final. */
interface Rejection {
  keys: string[];
  reason?: string;
  final: boolean;
  movedMoney?: boolean;
  rechecked?: boolean;
  held?: boolean;
  otherInvoice?: string;
}

/** The failed payments a status lists; `null` when Quasar does not report them. */
function rejectionsOf(signals: Pick<CheckoutStatusEvent, 'rejectedTxKeys' | 'rejectedPayments'>): Rejection[] | null {
  if (signals.rejectedPayments) {
    return signals.rejectedPayments.map(
      ({
        txKey,
        original,
        userOpHash,
        reason,
        final,
        movedMoney,
        rechecked,
        held,
        otherInvoice,
      }: CheckoutRejectedPayment) => ({
        keys: [txKey, original, userOpHash].filter((key): key is string => Boolean(key)).map(keyOf),
        reason,
        final,
        movedMoney: movedMoney === true || MOVED_MONEY_REASONS.has(reason),
        rechecked: rechecked === true,
        held: held === true,
        ...(typeof otherInvoice === 'string' ? { otherInvoice } : {}),
      }),
    );
  }
  // A Quasar before rejection reasons: every rejection ends the payment, as it did then
  return signals.rejectedTxKeys?.map((key) => ({ keys: [keyOf(key)], final: true })) ?? null;
}

/** Whether a locked quote can still be paid. */
const quoteValid = (quote: CheckoutQuote | null, now: number): quote is CheckoutQuote =>
  quote !== null && !(Date.parse(quote.expiresAt ?? '') <= now);

/**
 * The outcomes whose details an event does not carry: why a payment waits (`review`), the refund, the invoice that
 * replaced a cancelled one, the automatic payments offer after a paid period. The checkout is read again for them.
 */
const OUTCOMES: ReadonlySet<string> = new Set([...FINAL, 'underpaid']);

/**
 * Where a page stays while an underpaid invoice stays as it was: paying its rest, whose quote is itself an event, or
 * following a rest on its way or one that may still arrive. Only more money arriving leaves them for the outcome.
 */
const KEEPS_REST: ReadonlySet<CheckoutPhase> = new Set([
  'quoting',
  'awaitingPayment',
  'submitting',
  'confirming',
  'unconfirmed',
]);

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
  payer_mismatch: 'underpaid',
  rest_method_mismatch: 'underpaid',
};

/** Refusals of a quote of a rest that do not lead back to the underpaid outcome. */
const LEAVES_REST: ReadonlySet<string> = new Set(['invoice_expired', 'invoice_processing']);

/** How a payment the store follows, or the latest one of a reopened page, ended without paying the invoice. */
type Ending = {
  final: boolean;
  reason?: string;
  movedMoney?: boolean;
  rechecked?: boolean;
  held?: boolean;
  otherInvoice?: string;
};

/**
 * The error of a payment that ended without paying the invoice, by how it ended: a transfer that may have moved money
 * is `payment_mismatch` whether Quasar calls it final or not (never "did not go through", never the re-check promise).
 */
function endedError(ended: Ending): CheckoutError {
  const reason = ended.reason ? { reason: ended.reason } : {};
  // Confirmed on chain, not recorded yet: the merchant has the money, Quasar may still retry it
  if (ended.reason === SETTLEMENT_FAILED) return settlementFailedError(ended.rechecked);
  if (ended.reason && REFUND_ONLY_REASONS.has(ended.reason)) {
    // Held for a refund to its sender, the invoice still open: the confirmed wallet can pay it
    return {
      code: 'payment_mismatch',
      message: ended.held
        ? 'This transaction came from a wallet that did not confirm this invoice, so it does not pay it. The merchant returns it to the wallet that sent it, and the invoice can still be paid from the wallet that confirmed it.'
        : 'This transaction came from a wallet that did not confirm this invoice, so it does not pay it. If money left your wallet, contact the merchant.',
      ...reason,
      ...(ended.held ? { held: true as const } : {}),
    };
  }
  const other = ended.otherInvoice ? { otherInvoice: ended.otherInvoice } : {};
  if (ended.held) {
    // Held on another invoice for a refund only: it pays neither invoice
    return {
      code: 'payment_mismatch',
      message:
        'This transaction is tied to another invoice, which holds it for a refund to the wallet that sent it. It does not count for this invoice. If it was your payment for this invoice, contact the merchant.',
      ...reason,
      held: true,
      ...other,
    };
  }
  if (ended.movedMoney) {
    return {
      ...other,
      code: 'payment_mismatch',
      message: 'This transaction does not pay the invoice. If money left your wallet, contact the merchant.',
      ...reason,
    };
  }
  if (!ended.final) return unconfirmedError(ended.reason, ended.rechecked);
  return { code: 'payment_failed', message: 'The payment did not go through. Try again.', ...reason };
}

/**
 * The error of a payment that may still have gone through: `rechecked` while Quasar still reads it again; a payment
 * rejected for a reason Quasar never reads again is for the merchant to look at.
 */
function unconfirmedError(reason?: string, rechecked = false): CheckoutError {
  const message = rechecked
    ? 'The payment is not confirmed yet; Quasar checks it again for up to 24 hours. Check your wallet before paying again.'
    : reason
      ? 'The payment could not be confirmed. If it left your wallet, contact the merchant with the transaction hash.'
      : 'The payment could not be confirmed. Check your wallet before paying again.';
  return {
    code: 'payment_unconfirmed',
    message,
    ...(reason ? { reason } : {}),
    ...(rechecked ? { rechecked: true as const } : {}),
  };
}

/** The error while the store hands over again a transaction Quasar has not received ({@link CheckoutState.submit}). */
const retryingError = (): CheckoutError => ({
  code: 'payment_unconfirmed',
  message:
    'The payment has not reached Quasar yet; this page keeps handing it over. Check your wallet before paying again.',
  reason: 'submit_retrying',
});

/** The error once the store gave up handing over a transaction the wallet sent. */
const submitFailedError = (): CheckoutError => ({
  code: 'payment_unconfirmed',
  message:
    'Quasar did not receive the payment. If it left your wallet, contact the merchant with the transaction hash.',
  reason: 'submit_failed',
});

/**
 * The error of a payment the network confirmed that Quasar could not record yet (`settlement_failed`): the daily retry
 * only while Quasar says it retries (`rechecked`, for 30 days).
 */
const settlementFailedError = (rechecked = false): CheckoutError => ({
  code: 'payment_unconfirmed',
  message: rechecked
    ? 'The payment reached the network, but Quasar has not recorded it yet; it tries again daily for up to 30 days. Do not pay again; contact the merchant with the transaction hash.'
    : 'The payment reached the network, but Quasar could not record it. Do not pay again; contact the merchant with the transaction hash.',
  reason: SETTLEMENT_FAILED,
  ...(rechecked ? { rechecked: true as const } : {}),
});

/** The error of a transaction another invoice handed over first ({@link CheckoutState.submit}). */
const takenElsewhereError = (): CheckoutError => ({
  code: 'payment_unconfirmed',
  message:
    'This transaction was handed over for another invoice first. Quasar credits it to the invoice that the wallet which sent it confirmed, and this page shows the result. Do not pay again meanwhile.',
  status: 409,
  reason: TAKEN_ELSEWHERE,
});

/**
 * Whether the error is about a payment that left the wallet and may still pay the invoice, for which the page never
 * goes back to the payment: a transaction another invoice handed over first, or one confirmed on chain whose
 * settlement keeps failing.
 */
const keepsPaymentShut = (error: CheckoutError | null) =>
  error?.code === 'payment_unconfirmed' && (error.reason === TAKEN_ELSEWHERE || error.reason === SETTLEMENT_FAILED);

/** Whether the error is the store's word on a transaction another invoice handed over first. */
const isTakenElsewhere = (error: CheckoutError | null) =>
  error?.code === 'payment_unconfirmed' && error.reason === TAKEN_ELSEWHERE;

/** Whether Quasar reads again a payment of the invoice that may still arrive (it reports `unresolvedPayments`). */
const recheckedOf = (signals: Pick<CheckoutStatusEvent, 'unresolvedPayments'>) => (signals.unresolvedPayments ?? 0) > 0;

/**
 * Whether Quasar resolved a rejection it reads again since: a reason it re-reads, no longer `rechecked`, and
 * Quasar reports no payment of the invoice that may still arrive.
 */
const resolvedSince = (rejection: Rejection, signals: Pick<CheckoutStatusEvent, 'unresolvedPayments'>) =>
  !rejection.final &&
  !rejection.movedMoney &&
  !rejection.rechecked &&
  RE_READ_REASONS.has(rejection.reason ?? '') &&
  signals.unresolvedPayments === 0;

/** The browser's `sessionStorage`, when there is one and the page may use it. */
function browserSessionStorage(): CheckoutHandOverStorage | null {
  try {
    return (globalThis as { sessionStorage?: CheckoutHandOverStorage }).sessionStorage ?? null;
  } catch {
    // Blocked storage throws on access
    return null;
  }
}

/** Whether Quasar reports a payment of the invoice that may still arrive (`pendingPayments` with an older Quasar). */
const unresolvedOf = (signals: Pick<CheckoutStatusEvent, 'pendingPayments' | 'unresolvedPayments'>) =>
  (signals.unresolvedPayments ?? signals.pendingPayments ?? 0) > 0;

/** A read of the checkout as a status event, for the reads that replace the event stream. */
const statusOfView = (view: CheckoutView): CheckoutStatusEvent => ({
  status: view.invoice.status,
  ledgerSeq: 0,
  txHash: null,
  amountPaid: view.invoice.amountPaid,
  quoteExpiresAt: view.quote?.expiresAt ?? null,
  pendingPayments: view.invoice.pendingPayments,
  rejectedTxKeys: view.invoice.rejectedTxKeys,
  rejectedPayments: view.invoice.rejectedPayments,
  paymentCountsUntil: view.invoice.paymentCountsUntil,
  unresolvedPayments: view.invoice.unresolvedPayments,
  onTimeTxKeys: view.invoice.onTimeTxKeys,
});

function errorOf(error: unknown): CheckoutError {
  if (error instanceof QuasarSDKError) {
    const { reason, originWallet } = error.details ?? {};
    return {
      code: error.code ?? 'request_failed',
      message: error.message,
      status: error.status,
      issues: error.issues,
      ...(typeof reason === 'string' ? { reason } : {}),
      ...(typeof originWallet === 'string' ? { originWallet } : {}),
    };
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
 * domains, when it lists any; its `Origin` is the site the payer proof message names); a wallet prompt to sign a
 * message through the `sign` passed to {@link CheckoutState.confirmPayer}, never by itself; after `load`, an `EventSource` on its `events` route (or a `GET` every `pollMs`) until
 * the invoice reaches a final state or `destroy` is called (an invoice that expired or was cancelled while a payment
 * confirms is followed on, for a limited time, until that payment ends it as `paid` or `held`), and a `GET` of the
 * checkout when an event brings an outcome. A hand-over Quasar has not taken yet is kept in the tab's `sessionStorage` under
 * `quasar-sdk:checkoutHandOvers:<token>` ({@link CheckoutStoreOptions.handOverStorage}) until Quasar takes or refuses
 * it; nothing else is stored in the browser.
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
 * // An EVM payment the wallet sends: the wallet confirms the invoice first, with a free signature
 * if (checkout.getState().payerProof === 'required') {
 *   await checkout.getState().confirmPayer((message) => walletClient.signMessage({ account: address, message }));
 * }
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
  /**
   * Whether the store follows a payment of the invoice that it did not hand over (found on its way when the checkout
   * was read, or while the page offered to pay), as it follows its own.
   */
  let adopted = false;
  /** The keys of the failed payments Quasar listed last, and of the ones it had listed when the payment was taken. */
  let knownRejected: string[] = [];
  /** What Quasar last said arrived: an underpaid invoice stays underpaid when more does. */
  let lastPaid: string | null = null;
  let rejectedAtHandOver: ReadonlySet<string> = new Set();
  /** When the payment was handed over, and how many hand-overs so far (a read started before the last one is stale). */
  let handedOverAt = 0;
  let handOvers = 0;
  /** Following an expired invoice for a payment on its way: until when, and the timer that stops it then. */
  let lateUntil: number | null = null;
  let lateTimer: ReturnType<typeof setTimeout> | null = null;
  /** Whether the last `expired` event said a payment is on its way: Quasar then keeps the stream open. */
  let streamFollows = false;
  /**
   * The next hand-over of each transaction Quasar has not received yet, by `txKey` ({@link CheckoutState.submit}): a
   * payment made after it never stops it, the wallet sent both.
   */
  const submitRetries = new Map<string, ReturnType<typeof setTimeout>>();
  /** Whether Quasar last reported a payment of the invoice that it reads again (`unresolvedPayments` above `0`). */
  let quasarRechecks = false;
  /**
   * The number of the latest {@link CheckoutState.confirmPayer} attempt: a new call replaces the one under way (a
   * prompt the buyer closed may never answer), whose late answer only records the wallet's proof.
   */
  let proofAttempt = 0;
  /** The wallet the latest attempt asks to sign, while it is under way; `null` otherwise. */
  let signingPayer: string | null = null;
  /** The confirmations this page got ({@link CheckoutState.confirmPayer}), on top of Quasar's `payerProofs`. */
  const confirmedHere: KnownProof[] = [];
  /** The wallets Quasar refused a quote for until they confirm the invoice (`409 payer_proof_required`). */
  const proofDemanded = new Set<string>();
  const handOverStorage =
    options.handOverStorage !== undefined ? options.handOverStorage : options.api ? null : browserSessionStorage();
  const handOversKey = `${HAND_OVERS_KEY}${options.token}`;

  /** The hand-overs this tab kept for the checkout; none when the entry is missing, unreadable or malformed. */
  const keptHandOvers = (): KeptHandOver[] => {
    try {
      const kept: unknown = JSON.parse(handOverStorage?.getItem(handOversKey) ?? '[]');
      if (!Array.isArray(kept)) return [];
      return kept.filter(
        (entry): entry is KeptHandOver =>
          typeof entry === 'object' &&
          entry !== null &&
          typeof (entry as KeptHandOver).txKey === 'string' &&
          typeof (entry as KeptHandOver).at === 'number',
      );
    } catch {
      return [];
    }
  };
  const keepHandOvers = (entries: KeptHandOver[]) => {
    try {
      if (entries.length > 0) handOverStorage?.setItem(handOversKey, JSON.stringify(entries));
      else handOverStorage?.removeItem(handOversKey);
    } catch {
      // A full or blocked storage: the hand-over is retried while the page lives
    }
  };
  /** Keeps a hand-over until Quasar takes or refuses it: the transaction, its sender and connector, when first kept. */
  const keepHandOver = (params: { txKey: string; from?: string; connectorType?: string }) => {
    if (!handOverStorage) return;
    const kept = keptHandOvers();
    const before = kept.find(({ txKey }) => txKey === params.txKey);
    keepHandOvers([
      ...kept.filter(({ txKey }) => txKey !== params.txKey),
      {
        txKey: params.txKey,
        ...(params.from ? { from: params.from } : {}),
        ...(params.connectorType ? { connectorType: params.connectorType } : {}),
        at: before?.at ?? Date.now(),
      },
    ]);
  };
  const forgetHandOver = (key: string) => {
    if (!handOverStorage) return;
    const kept = keptHandOvers();
    if (kept.some(({ txKey }) => txKey === key)) keepHandOvers(kept.filter(({ txKey }) => txKey !== key));
  };

  /** Whether the connected wallet must confirm the invoice for the chosen method ({@link PayerProofStatus}). */
  const payerProofOf = (state: CheckoutState): PayerProofStatus => {
    const { payer, quote } = state;
    const method = state.checkout?.methods.find(({ id }) => id === state.methodId);
    const demanded = payer !== null && proofDemanded.has(payer);
    // Quasar's `409 payer_proof_required` wins over a checkout read before the merchant changed the method
    const need = demanded ? 'before_quote' : (method?.payerProof ?? 'none');
    if (need === 'none' || !method) return 'not_needed';
    // The quote says whether its wallet confirmed the invoice (the relay's authorization, too)
    const quoted: KnownProof[] =
      quote?.payerProof?.proven === true && quote.payer !== null
        ? [
            {
              payer: quote.payer,
              chainId: accountOf(quote.payer)?.chainId ?? '',
              kind: quote.payerProof.kind ?? undefined,
            },
          ]
        : [];
    if (payer && confirmedBy([...(state.checkout?.payerProofs ?? []), ...confirmedHere, ...quoted], payer)) {
      return 'confirmed';
    }
    // Only the wallet the latest attempt asks to sign waits for it: another one confirms on its own
    // `unless_relayed` stays: the relay confirms the wallet, so a prompt that never answers blocks no new price
    if (payer !== null && payer === signingPayer && need === 'before_quote') return 'confirming';
    return need === 'before_quote' ? 'required' : 'unless_relayed';
  };

  const store = createStore<CheckoutState>()((set, get) => {
    /** Sets fields and the ones that follow from them: the URLs and whether the wallet must confirm the invoice. */
    const update = (partial: Partial<CheckoutState>) => {
      const next = { ...get(), ...partial };
      set({
        ...partial,
        receiptUrl: next.phase === 'paid' || next.phase === 'refunded' ? api.url('receipt') : null,
        paymasterUrl: next.quote?.gasless?.paymaster ? api.url('paymaster') : null,
        logoUrl: next.checkout?.merchant.logo ? api.url('logo') : null,
        payerProof: payerProofOf(next),
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
      if (get().followingUntil !== null) update({ followingUntil: null });
    };

    const stopWatching = () => {
      source?.close();
      source = null;
      if (poll) clearInterval(poll);
      poll = null;
      stopLate();
    };

    /** The payment the store follows ended (settled or failed): the fields that say so. */
    const paymentEnded = (): Partial<CheckoutState> => {
      ownKeys = [];
      adopted = false;
      return { paymentOnTheWay: false };
    };

    /** Follows a payment of the invoice that this page did not hand over, from now. */
    const adopt = () => {
      adopted = true;
      handedOverAt = Date.now();
      rejectedAtHandOver = new Set(knownRejected);
    };

    /**
     * The rejection of the payment the store follows, if Quasar lists it: by one of its keys, or, when the store does
     * not know them (a relay answered `sending`, then rejected by its transfer's hash; a payment found on its way), a
     * rejection it had not listed when the store took the payment, once Quasar has no payment on its way.
     */
    const rejectionNow = (event: CheckoutStatusEvent, rejections: Rejection[] | null): Rejection | null => {
      if (!rejections) return null;
      const own = rejections.find(({ keys }) => keys.some((key) => ownKeys.includes(key)));
      if (own) return own;
      if (event.pendingPayments !== 0) return null;
      return rejections.find(({ keys }) => keys.some((key) => !rejectedAtHandOver.has(key))) ?? null;
    };

    /** The phase to pay again from: the locked quote while valid, the rest of an underpaid invoice, or the methods. */
    const retryPhase = (status: InvoiceStatus | null): Partial<CheckoutState> => {
      if (status === 'underpaid') return { phase: 'underpaid' };
      // An invoice that no longer takes a payment keeps its outcome
      if (status && !PAYABLE.has(status)) return { phase: phaseOfStatus(status) };
      return quoteValid(get().quote, Date.now())
        ? { phase: 'awaitingPayment' }
        : { phase: 'selectMethod', quote: null };
    };

    /** Reads the checkout again for the details of an outcome; a failed read leaves the state the event set. */
    const refreshView = () =>
      api
        .view()
        .then((view) => {
          if (destroyed) return;
          // The details only: the phase follows the events, and the buyer's quote stays as the actions left it. On an
          // underpaid invoice what is left, and the method that paid, are Quasar's
          const rest = view.invoice.status === 'underpaid' && view.quote;
          update({ checkout: view, ...(rest ? { quote: rest, methodId: rest.methodId } : {}) });
        })
        .catch(() => {
          // The outcome stands; its details come with the next load
        });

    /**
     * Whether the store follows the invoice: not after a final state, except an expired or cancelled one with a payment
     * on its way.
     */
    const following = () => {
      const { invoiceStatus, paymentOnTheWay } = get();
      return !FINAL.has(invoiceStatus ?? '') || (CLOSED.has(invoiceStatus ?? '') && (paymentOnTheWay || adopted));
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
            onStatus(statusOfView(view), view, startedAt === handOvers);
          })
          .catch(() => {
            // A missed read is retried on the next tick
          });
      }, pollEvery);
    };

    /**
     * Follows an expired or cancelled invoice for the payment on its way, for a while
     * ({@link CheckoutState.followingUntil}): the reads slow down, and the store stops following an expired one 35
     * minutes past the later of `dueAt` and the latest hand-over (or when the store found the payment on its way):
     * Quasar waits 30 minutes at most for a payment it learned of before `dueAt`, a later one settles in minutes. An
     * hour after the expiry without `dueAt`; a cancelled one 35 minutes after the later of when the store found it
     * cancelled and the latest hand-over. `handedOver`: a hand-over of this page just now, which moves the end on.
     */
    const followLate = (status: string, handedOver = false) => {
      const dueAt = Date.parse(get().checkout?.invoice.dueAt ?? '');
      const until =
        status === 'cancelled'
          ? Math.max(Date.now(), handedOverAt) + CANCELLED_FOLLOW_MS
          : Number.isFinite(dueAt)
            ? Math.max(dueAt, handedOverAt) + LATE_FOLLOW_MS
            : Date.now() + LATE_FOLLOW_WITHOUT_DUE_MS;
      // Set once; a hand-over of this page moves it on, never back
      if (lateUntil === null || (handedOver && until > lateUntil)) {
        lateUntil = until;
        if (lateTimer) clearTimeout(lateTimer);
        lateTimer = setTimeout(
          () => {
            lateTimer = null;
            if (destroyed) return;
            // The store stops following; a payment Quasar still reads again may arrive all the same
            update({
              ...paymentEnded(),
              invoicePaymentOnTheWay: false,
              ...(get().invoicePaymentUnresolved && !get().error
                ? { error: unconfirmedError(undefined, quasarRechecks) }
                : {}),
            });
            stopWatching();
          },
          Math.max(0, lateUntil - Date.now()),
        );
        update({ followingUntil: new Date(lateUntil).toISOString() });
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
      const { invoiceStatus: previous, phase, checkout, paymentOnTheWay } = get();
      // This page's transaction, which another invoice handed over first, waits for Quasar's decision
      const claimShown = isTakenElsewhere(get().error);
      const rejections = rejectionsOf(event);
      const listedBefore = new Set(knownRejected);
      if (rejections) knownRejected = rejections.flatMap(({ keys }) => keys);
      const partial: StateChange = { invoiceStatus: event.status, txHash: event.txHash ?? get().txHash };
      if (current && event.pendingPayments !== undefined) partial.invoicePaymentOnTheWay = event.pendingPayments > 0;
      if (current && event.paymentCountsUntil !== undefined) partial.paymentCountsUntil = event.paymentCountsUntil;
      if (current && (event.unresolvedPayments !== undefined || event.pendingPayments !== undefined)) {
        partial.invoicePaymentUnresolved = unresolvedOf(event);
      }
      if (current && event.unresolvedPayments !== undefined) quasarRechecks = recheckedOf(event);
      if (current && event.onTimeTxKeys && ownKeys.length > 0 && get().paymentSentInTime !== true) {
        // Quasar's word on this page's payment, never the page clock: listed once, it stays sent in time
        const onTime = new Set(event.onTimeTxKeys.map(keyOf));
        partial.paymentSentInTime = ownKeys.some((key) => onTime.has(key));
      }
      // What arrived is in the event: the underpaid and expired outcomes show it at once
      if (!view && checkout && event.amountPaid !== undefined && event.amountPaid !== checkout.invoice.amountPaid) {
        partial.checkout = { ...checkout, invoice: { ...checkout.invoice, amountPaid: event.amountPaid } };
      }
      const followed = paymentOnTheWay || adopted;
      const pending = event.pendingPayments ?? 0;
      const paidMoved = event.amountPaid !== undefined && event.amountPaid !== null && event.amountPaid !== lastPaid;
      if (paidMoved) lastPaid = event.amountPaid;
      // An underpaid invoice that stays as it was: its rest is being paid, on its way, or may still arrive
      const restStands = previous === 'underpaid' && event.status === 'underpaid' && !paidMoved;
      // How the payment the store follows ended, when it did without settling
      let ended: Ending | null = null;
      if (followed && current && UNSETTLED.has(event.status)) {
        ended = rejectionNow(event, rejections);
        // No longer on its way and not rejected on an invoice that stays as it was: Quasar stopped counting a stuck
        // transaction (it counts one for 25 minutes), or one the page found on its way. It may still have gone through
        if (
          !ended &&
          (event.status === 'open' || restStands) &&
          event.pendingPayments === 0 &&
          event.rejectedPayments &&
          (adopted || Date.now() - handedOverAt >= TRACKING_CEILING_MS) &&
          // Quasar still counts this invoice's claim on a transaction another invoice handed over first
          !(claimShown && (event.unresolvedPayments ?? 0) > 0)
        ) {
          ended = { final: false, rechecked: recheckedOf(event) };
        }
      }
      if (!ended && event.status === 'open' && previous === 'processing' && pending === 0) {
        // Back to open after processing: the transaction failed or was rejected. A Quasar that gives reasons says
        // whether for good; one that does not ends the payment, as it did
        ended = event.rejectedPayments
          ? (rejections?.find(({ keys }) => keys.some((key) => !listedBefore.has(key))) ?? {
              final: false,
              rechecked: recheckedOf(event),
            })
          : { final: true };
      }
      if (ended?.final) {
        // The transaction can never pay the invoice (it may still have moved money: `payment_mismatch`): the buyer
        // may pay again while it is payable
        Object.assign(
          partial,
          paymentEnded(),
          { error: endedError(ended) },
          event.status === 'open' || event.status === 'processing' || event.status === 'underpaid'
            ? retryPhase(event.status)
            : { phase: phaseOfStatus(event.status) },
        );
      } else if (ended) {
        // It may still have gone through, or moved money without paying the invoice: the buyer checks the wallet
        // before paying again, with no plain second payment
        Object.assign(partial, paymentEnded(), {
          error: endedError(ended),
          phase: PAYABLE.has(event.status) ? 'unconfirmed' : phaseOfStatus(event.status),
        });
      } else if (event.status === 'open') {
        if (phase === 'loading') partial.phase = 'selectMethod';
      } else if (
        !restStands ||
        !KEEPS_REST.has(phase) ||
        // A read says the rest can no longer be paid, with nothing of it on its way
        (phase === 'awaitingPayment' && view?.invoice.restPayable === false)
      ) {
        partial.phase = phaseOfStatus(event.status);
        // A first part arrived: that is the answer to what went wrong before, unless it moved money without counting
        const earlier = get().error;
        if (
          event.status === 'underpaid' &&
          previous !== 'underpaid' &&
          earlier &&
          earlier.code !== 'payment_mismatch'
        ) {
          partial.error = null;
        }
      }
      if (followed && !ended) {
        const nothingOnItsWay = current && event.pendingPayments === 0;
        const settled =
          SETTLED.has(event.status) ||
          // It made the invoice underpaid, or topped up an underpaid one that stays short
          (event.status === 'underpaid' && !restStands) ||
          // A read of the expired or cancelled invoice: Quasar has no payment of it on its way any longer
          (CLOSED.has(event.status) && view !== undefined && nothingOnItsWay);
        if (settled) Object.assign(partial, paymentEnded());
        // Closed with nothing on its way, but a payment Quasar still reads again may arrive: never "nothing charged"
        if (
          settled &&
          CLOSED.has(event.status) &&
          (partial.invoicePaymentUnresolved ?? get().invoicePaymentUnresolved)
        ) {
          partial.error = unconfirmedError(undefined, quasarRechecks);
        }
      }
      if (current && pending > 0 && UNSETTLED.has(event.status)) {
        // A payment of the invoice is on its way that the store does not follow (another tab, a Solana Pay transfer
        // Quasar found): follow it, and offer no payment meanwhile
        if (!adopted && !(partial.paymentOnTheWay ?? paymentOnTheWay)) adopt();
        // The claim of this invoice counts as on its way: the page keeps saying why it waits
        const waitsForClaim = claimShown && partial.error === undefined;
        if (PAYABLE.has(event.status) && OFFERING.has(partial.phase ?? phase) && !waitsForClaim) {
          partial.phase = 'confirming';
        }
      }
      // The transaction now pays this invoice (or the invoice settled): the claim is decided
      if (
        claimShown &&
        partial.error === undefined &&
        (event.status === 'processing' || (event.status === 'underpaid' && !restStands) || SETTLED.has(event.status))
      ) {
        partial.error = null;
      }
      update(partial);

      if (!following()) {
        stopWatching();
      } else if (CLOSED.has(event.status)) {
        // Expired or cancelled while a payment is on its way: it may still end it (paid in the grace, or held)
        streamFollows = (event.pendingPayments ?? 0) > 0;
        followLate(event.status);
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
        // Closed for good (the browser gave up reconnecting), or ended on an expired or cancelled invoice that Quasar
        // does not follow (the browser would reconnect every few seconds to a stream that ends at once): read it
        const { invoiceStatus, paymentOnTheWay } = get();
        const onItsWay = paymentOnTheWay || adopted;
        if (events.readyState === 2 || (CLOSED.has(invoiceStatus ?? '') && onItsWay && !streamFollows)) {
          events.close();
          source = null;
          startPolling();
        }
      };
    };

    /**
     * Takes a payment this page handed over: it is on its way until it settles or fails. `status` is the invoice's
     * state Quasar answered with: a payment taken for an invoice already settled (a retried hand-over, a late transfer)
     * is Quasar's to record, so the page stays on the outcome and reads the checkout once more for the signals. On an
     * expired or cancelled invoice the page keeps that outcome and follows the payment. `elsewhere`: Quasar tracks the
     * transaction for another invoice that handed it over first and records this invoice's claim on it; the page
     * follows it with an error that says so, and offers no payment while Quasar decides.
     */
    const handOver = (
      keys: (string | null | undefined)[],
      txKey: string | null,
      status?: string,
      elsewhere = false,
    ) => {
      if (SETTLED.has(status ?? get().invoiceStatus ?? '')) {
        const { error, txKey: shown } = get();
        if (error?.reason?.startsWith('submit_') && shown && keys.includes(shown)) update({ error: null });
        void api
          .view()
          .then((view) => {
            if (!destroyed) onStatus(statusOfView(view), view);
          })
          .catch(() => {
            // The outcome stands
          });
        return;
      }
      handOvers += 1;
      handedOverAt = Date.now();
      adopted = false;
      // Added to the keys of a payment still on its way (a retried hand-over taken while the buyer paid again)
      ownKeys = [...ownKeys, ...keys.filter((key): key is string => Boolean(key)).map(keyOf)];
      rejectedAtHandOver = new Set(knownRejected.map(keyOf));
      const { invoiceStatus } = get();
      const closed = invoiceStatus && CLOSED.has(invoiceStatus) ? invoiceStatus : null;
      update({
        txKey,
        paymentOnTheWay: true,
        paymentSentInTime: null,
        error: elsewhere ? takenElsewhereError() : null,
        phase: closed ? phaseOfStatus(closed) : elsewhere ? 'unconfirmed' : 'confirming',
      });
      if (closed) followLate(closed, true);
      watch();
    };

    /**
     * Hands Quasar a transaction the wallet sent ({@link CheckoutState.submit}), and again while it gets no answer.
     * `before` is the phase a refusal goes back to.
     */
    const sendHandOver = async (
      params: { txKey: string; from?: string; connectorType?: string },
      before: CheckoutPhase,
    ): Promise<boolean> => {
      const body = {
        txKey: params.txKey,
        ...(params.from ? { from: params.from } : {}),
        ...(params.connectorType ? { connectorType: params.connectorType } : {}),
      };
      // Kept in the tab first: a page closed before Quasar answers hands it over on the next load
      keepHandOver(body);
      // An invoice already settled keeps its outcome on the page: Quasar records the transaction for the merchant
      const quiet = () => SETTLED.has(get().invoiceStatus ?? '');
      // An expired or cancelled one keeps it too, and follows the payment once Quasar takes it
      const closed = () => CLOSED.has(get().invoiceStatus ?? '');
      if (!quiet() && !closed()) update({ phase: 'submitting', error: null });
      // The same transaction handed over again: this hand-over replaces its retries
      clearTimeout(submitRetries.get(body.txKey));
      submitRetries.delete(body.txKey);
      try {
        const taken = await api.submit(body);
        forgetHandOver(body.txKey);
        handOver([body.txKey], body.txKey, taken?.status);
        return true;
      } catch (error) {
        if (takenElsewhere(error)) {
          // Another invoice handed it over first: it may still pay this one, so no second payment
          forgetHandOver(body.txKey);
          handOver([body.txKey], body.txKey, undefined, true);
          return false;
        }
        if (!retryable(error)) {
          forgetHandOver(body.txKey);
          if (!quiet()) fail(error, before === 'submitting' ? 'awaitingPayment' : before);
          return false;
        }
        // The wallet sent the transaction and Quasar has not received it: never offer to pay again meanwhile
        if (!quiet()) {
          update({ txKey: body.txKey, error: retryingError(), ...(closed() ? {} : { phase: 'unconfirmed' as const }) });
        }
        const retryUntil = Date.now() + SUBMIT_RETRY_FOR_MS;
        /** Whether the page still waits for this hand-over: the retry error of this transaction is shown. */
        const waiting = () => get().error?.reason === 'submit_retrying' && get().txKey === body.txKey;
        const retry = (attempt: number) => {
          const pause = SUBMIT_RETRY_MS[Math.min(attempt, SUBMIT_RETRY_MS.length - 1)];
          if (destroyed) return;
          if (Date.now() + pause > retryUntil) {
            // Given up: the page stops promising to keep trying. The hand-over stays kept for the next load
            if (waiting()) update({ error: submitFailedError() });
            return;
          }
          const timer = setTimeout(() => {
            submitRetries.delete(body.txKey);
            if (destroyed) return;
            api
              .submit(body)
              .then((taken) => {
                if (destroyed) return;
                forgetHandOver(body.txKey);
                handOver([body.txKey], body.txKey, taken?.status);
              })
              .catch((again: unknown) => {
                if (destroyed) return;
                if (retryable(again)) return retry(attempt + 1);
                forgetHandOver(body.txKey);
                // Another invoice handed it over first: followed while the page still waits for this hand-over
                if (takenElsewhere(again)) {
                  if (waiting()) handOver([body.txKey], body.txKey, undefined, true);
                  return;
                }
                // Refused: say why where the page still waits for this hand-over (the buyer may pay again then)
                if (!waiting()) return;
                const refusal = errorOf(again);
                const phaseOfRefusal = PHASE_OF_REFUSAL[refusal.code];
                const now = get().phase;
                update({
                  error: refusal,
                  ...(phaseOfRefusal
                    ? { phase: phaseOfRefusal }
                    : now === 'unconfirmed'
                      ? retryPhase(get().invoiceStatus)
                      : {}),
                });
              });
          }, pause);
          submitRetries.set(body.txKey, timer);
        };
        retry(0);
        return false;
      }
    };

    /**
     * Hands over again, oldest first, the transactions this tab kept that Quasar has not taken (the page closed or
     * reloaded before it answered); the ones Quasar lists already (rejected, or among the payments sent in time) are
     * forgotten.
     */
    const resendKept = (view: CheckoutView) => {
      const kept = keptHandOvers();
      if (kept.length === 0) return;
      const listed = new Set([...(view.invoice.rejectedTxKeys ?? []), ...(view.invoice.onTimeTxKeys ?? [])].map(keyOf));
      const unsent = kept.filter(({ txKey }) => !listed.has(keyOf(txKey))).sort((a, b) => a.at - b.at);
      for (const { txKey } of kept) if (listed.has(keyOf(txKey))) forgetHandOver(txKey);
      void (async () => {
        for (const entry of unsent) {
          if (destroyed) return;
          await sendHandOver(entry, get().phase);
        }
      })();
    };

    return {
      phase: 'loading',
      checkout: null,
      invoiceStatus: null,
      methodId: null,
      payer: null,
      consentGiven: false,
      payerProof: 'not_needed',
      quote: null,
      locale: null,
      txKey: null,
      paymentOnTheWay: false,
      invoicePaymentOnTheWay: false,
      paymentCountsUntil: null,
      invoicePaymentUnresolved: false,
      paymentSentInTime: null,
      followingUntil: null,
      txHash: null,
      error: null,
      receiptUrl: null,
      paymasterUrl: null,
      logoUrl: null,

      load: async () => {
        update({ phase: 'loading', error: null });
        try {
          const view = await api.view();
          const { invoice } = view;
          const rejections = rejectionsOf(invoice);
          if (rejections) knownRejected = rejections.flatMap(({ keys }) => keys);
          lastPaid = invoice.amountPaid;
          let phase = phaseOfView(view, Date.now());
          let error: CheckoutError | null = null;
          // A payment of the invoice is on its way (the page was reloaded or reopened): follow it, offer no payment
          const onItsWay = (invoice.pendingPayments ?? 0) > 0 && UNSETTLED.has(invoice.status);
          if (onItsWay && !get().paymentOnTheWay) adopt();
          if (onItsWay && PAYABLE.has(invoice.status) && OFFERING.has(phase)) phase = 'confirming';
          const latest = rejections?.[0];
          const unresolved = unresolvedOf(invoice);
          const reopenable = invoice.status === 'open' || invoice.status === 'underpaid' || CLOSED.has(invoice.status);
          if (!onItsWay && !get().paymentOnTheWay && reopenable) {
            // No plain payment while the latest one may still arrive or moved money without a final word
            let check = false;
            if (latest && !latest.final && !resolvedSince(latest, invoice)) {
              // The latest payment may still have gone through: the buyer checks the wallet before paying again
              error = endedError(latest);
              check = true;
            } else if (unresolved) {
              // A payment Quasar stopped counting as on its way, but may still arrive
              error = unconfirmedError(undefined, recheckedOf(invoice));
              check = true;
            } else if (latest?.movedMoney) {
              // The latest transaction does not pay the invoice, and may have moved money
              error = endedError(latest);
            }
            if (check && OFFERING.has(phase)) phase = 'unconfirmed';
          }
          if (invoice.unresolvedPayments !== undefined) quasarRechecks = recheckedOf(invoice);
          update({
            checkout: view,
            invoiceStatus: invoice.status,
            locale: invoice.locale,
            quote: view.quote,
            methodId: view.quote?.methodId ?? get().methodId,
            payer: view.quote?.payer ?? get().payer,
            invoicePaymentOnTheWay: (invoice.pendingPayments ?? 0) > 0,
            invoicePaymentUnresolved: unresolved,
            paymentCountsUntil: invoice.paymentCountsUntil ?? null,
            phase,
            error,
          });
          if (adopted && CLOSED.has(invoice.status)) followLate(invoice.status);
          watch();
          resendKept(view);
        } catch (error) {
          update({ phase: 'error', error: errorOf(error) });
        }
      },

      selectMethod: (methodId, options) => {
        const { quote, phase, error } = get();
        const drop = quote && quote.methodId !== methodId;
        update({
          methodId,
          error: options?.keepError ? error : null,
          ...(drop ? { quote: null, phase: phase === 'awaitingPayment' ? 'selectMethod' : phase } : {}),
        });
      },

      setPayer: (payer) => {
        const { quote, phase, invoiceStatus, checkout } = get();
        const drop = quote && quote.payer !== payer;
        // The rest of an underpaid invoice has no methods to go back to, and its outcome reads the amounts of the quote
        const rest = (invoiceStatus ?? checkout?.invoice.status) === 'underpaid';
        if (drop && rest) {
          update({ payer, phase: phase === 'awaitingPayment' ? 'underpaid' : phase });
          return;
        }
        update({
          payer,
          ...(drop ? { quote: null, phase: phase === 'awaitingPayment' ? 'selectMethod' : phase } : {}),
        });
      },

      setConsentGiven: (given) => update({ consentGiven: given, error: null }),

      releaseQuote: () => {
        const { phase, invoiceStatus, checkout } = get();
        if (phase !== 'awaitingPayment') return;
        // The rest of an underpaid invoice has no methods to go back to, and its outcome reads the amounts of the quote
        if ((invoiceStatus ?? checkout?.invoice.status) === 'underpaid') update({ error: null, phase: 'underpaid' });
        else update({ quote: null, error: null, phase: 'selectMethod' });
      },

      requestQuote: async () => {
        const { methodId, payer, phase, checkout, consentGiven, invoiceStatus } = get();
        if (!methodId) {
          update({ error: { code: 'method_required', message: 'Choose a payment method first' } });
          return null;
        }
        // The first payment of an underpaid invoice gave the consent
        const rest = (invoiceStatus ?? checkout?.invoice.status) === 'underpaid';
        if (checkout?.consent?.required && !consentGiven && !rest) {
          update({ error: { code: 'consent_required', message: 'Tick the consent of the checkout first' } });
          return null;
        }
        if (get().payerProof === 'required' || get().payerProof === 'confirming') {
          // The wallet confirms the invoice before the price: Quasar would refuse the quote
          update({
            error: {
              code: 'payer_proof_required',
              message: 'Confirm the paying wallet with a free signature first',
            },
          });
          return null;
        }
        update({ phase: 'quoting', error: null });
        const settledMeanwhile = () => {
          const status = get().invoiceStatus;
          return status !== null && !PAYABLE.has(status);
        };
        // The page goes back to the invoice's outcome, which nothing else would bring back: a final invoice has no events
        const outcomeStands = () => {
          const status = get().invoiceStatus;
          if (status) update({ phase: phaseOfStatus(status), error: null });
          return null;
        };
        try {
          const quote = await api.quote({
            methodId,
            ...(payer ? { payer } : {}),
            ...(checkout?.consent && consentGiven && !rest ? { consentGiven: true } : {}),
          });
          // The invoice settled meanwhile: its outcome stands, and nothing follows it any more
          if (settledMeanwhile()) return outcomeStands();
          update({ quote, phase: get().invoicePaymentOnTheWay ? 'confirming' : 'awaitingPayment' });
          return quote;
        } catch (error) {
          // A wallet Quasar wants confirmed first, although the checkout did not say so (read before the method changed)
          if (error instanceof QuasarSDKError && error.code === 'payer_proof_required' && payer) {
            proofDemanded.add(payer);
          }
          if (settledMeanwhile()) return outcomeStands();
          const refusal = errorOf(error);
          // The rest has no methods to go back to, and its outcome says why, what the payment step has no text for
          if (rest && !LEAVES_REST.has(refusal.code)) update({ error: refusal, phase: 'underpaid' });
          else fail(error, phase === 'quoting' ? 'selectMethod' : phase);
          return null;
        }
      },

      confirmPayer: async (sign) => {
        const { payer } = get();
        if (!payer) {
          update({ error: { code: 'payer_required', message: 'Connect the paying wallet first' } });
          return false;
        }
        if (get().payerProof === 'confirmed' || get().payerProof === 'not_needed') {
          update({ error: null });
          return true;
        }
        const { payerProofMessage, payerProof } = api;
        if (!payerProofMessage || !payerProof) {
          update({
            error: {
              code: 'request_failed',
              message: 'The checkout calls cannot confirm a wallet (payerProofMessage)',
            },
          });
          return false;
        }
        // A new attempt replaces the one under way: its prompt may never answer (the buyer closed it)
        const attempt = ++proofAttempt;
        signingPayer = payer;
        update({ error: null });
        /** Ends the confirmation: `known` is what Quasar recorded, `failure` why it did not. */
        const end = (known: KnownProof | null, failure?: unknown) => {
          if (known) confirmedHere.push(known);
          const latest = attempt === proofAttempt;
          if (latest) signingPayer = null;
          if (destroyed) return;
          // A replaced attempt's late answer only records the proof: the page belongs to the latest one
          // So does a failure of a wallet confirmed meanwhile (an earlier prompt's late signature): nothing is wrong
          if (failure === undefined || !latest || payerProofOf(get()) === 'confirmed') update({});
          else if (failure instanceof Error && failure.name === 'PayerProofDeclined') {
            update({
              error: {
                code: 'payer_proof_declined',
                message:
                  'The wallet did not sign the confirmation. It is free and moves no funds: sign it to pay from this wallet, or choose another wallet or method.',
              },
            });
          } else fail(failure, get().phase);
        };
        try {
          const request = await payerProofMessage({ payer });
          // Confirmed already (another tab): on its network at least
          if (request.proven) {
            end({ payer: request.payer, chainId: request.chainId });
            return true;
          }
          let signature: string;
          try {
            signature = await sign(request.message, request);
          } catch (refusal) {
            const declined = new Error(refusal instanceof Error ? refusal.message : String(refusal));
            declined.name = 'PayerProofDeclined';
            throw declined;
          }
          const proof = await payerProof({ payer, message: request.message, signature });
          end(proof);
          return true;
        } catch (error) {
          end(null, error);
          return false;
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

      submit: (params) => sendHandOver(params, get().phase),

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
          const { autoCharge } = await api.permission(params);
          const checkout = get().checkout;
          if (checkout) update({ checkout: { ...checkout, autoCharge } });
          return true;
        } catch (error) {
          fail(error, get().phase);
          return false;
        }
      },

      permissionRevoked: async () => {
        update({ error: null });
        try {
          const { autoCharge } = await api.permissionRevoked();
          const checkout = get().checkout;
          if (checkout) update({ checkout: { ...checkout, autoCharge } });
          return autoCharge?.status !== 'active';
        } catch (error) {
          fail(error, get().phase);
          return false;
        }
      },

      payAgain: () => {
        // A payment that left the wallet and may still pay the invoice: the merchant or Quasar decides, not the buyer
        if (get().phase !== 'unconfirmed' || keepsPaymentShut(get().error)) return;
        update({ error: null, ...retryPhase(get().invoiceStatus) });
      },

      destroy: () => {
        destroyed = true;
        for (const timer of submitRetries.values()) clearTimeout(timer);
        submitRetries.clear();
        stopWatching();
      },
    };
  });

  return store;
}

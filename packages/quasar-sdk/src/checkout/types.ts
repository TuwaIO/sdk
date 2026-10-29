/**
 * @file Types of the checkout API (`/v1/payments/checkout/:token`): what the buyer's page reads and sends.
 */

import type {
  Buyer,
  InvoiceLocale,
  InvoiceStatus,
  PaymentsCurrency,
  PaymentsEnvironment,
  SubscriptionInterval,
  SubscriptionPermission,
  SubscriptionStatus,
  TaxCategory,
} from '../modules/payments/types';

/** A line of the invoice as the checkout shows it; amounts are decimal strings, `netMinor` in cents. */
export interface CheckoutLine {
  /** What is sold. */
  name: string;
  /** Details under the name. */
  description?: string;
  /** Quantity. */
  quantity: string;
  /** Price of one unit. */
  unitPrice: string;
  /** VAT category. */
  taxCategory: TaxCategory;
  /** VAT rate in percent. */
  taxRate: string;
  /** Net amount of the line in minor units (cents). */
  netMinor: string;
}

/** The invoice the checkout token opens. */
export interface CheckoutInvoice {
  /** Invoice ID. */
  id: string;
  /** Series number; `null` while its document waits for the buyer details. */
  number: string | null;
  /** State of the invoice. */
  status: InvoiceStatus;
  /** Live or test: a test invoice is paid on test networks. */
  environment: PaymentsEnvironment | null;
  /** Currency. */
  currency: PaymentsCurrency;
  /** Total to pay, as a decimal. */
  total: string | number;
  /** Total in minor units (cents). */
  totalMinor: string | null;
  /** The lines. */
  lineItems: CheckoutLine[];
  /** Language of the page and of the documents still to be issued. */
  locale: InvoiceLocale | null;
  /** When it stops being payable. */
  dueAt: string | null;
  /** Where to send the buyer after paying (http(s) only). */
  successUrl: string | null;
  /** Where to send a buyer who gives up (http(s) only). */
  cancelUrl: string | null;
  /** Base units of the quoted asset received so far: an underpaid invoice asks for the rest. */
  amountPaid: string | null;
  /**
   * Why a payment waits for, or was flagged to, the seller ({@link CheckoutReview}); `null` when none does.
   */
  review: CheckoutReview | null;
  /** What was refunded, in minor units (cents) of the invoice currency. */
  refundedTotalMinor: string | null;
  /**
   * Payments of the invoice handed over and still on their way, whoever handed them over: tracked transactions
   * settlement has not verified or rejected yet (recorded within the last 25 minutes: Quasar stops counting a stuck
   * one), gasless relays still sending (within 35 minutes), and claims of this invoice on a transaction another invoice
   * handed over first that Quasar has not decided yet (within 25 minutes). Quasar versions before the payment grace
   * (October 2026) leave it out.
   */
  pendingPayments?: number;
  /**
   * Every key the page may know a failed payment by, latest first: the `txKey` of a rejected transaction, the hash the
   * checkout handed over when a sped-up transaction replaced it, and the `userOpHash` of a gasless relay. Left out like
   * `pendingPayments`; read {@link CheckoutInvoice.rejectedPayments} for why they failed.
   */
  rejectedTxKeys?: string[];
  /**
   * The payments that failed, latest first (at most 10), with the reason and whether the buyer may pay again. Quasar
   * versions before October 28, 2026 leave it out.
   */
  rejectedPayments?: CheckoutRejectedPayment[];
  /**
   * While the invoice is payable and a payment Quasar learned of before `dueAt` is on its way: until when the invoice
   * waits for it (`dueAt` plus 30 minutes), so the page can say that the payment was sent in time. `null` otherwise;
   * left out like `rejectedPayments`.
   */
  paymentCountsUntil?: string | null;
  /**
   * Payments of the invoice that may still arrive, with no time limit: tracked transactions neither confirmed nor
   * rejected for good (also one stuck past the 25 minutes `pendingPayments` counts, and one whose tracker lost sight of
   * it, `not_found`, `timeout` or `replaced`, which Quasar reads again for 24 hours), gasless relays still sending, and
   * claims of this invoice on a transaction another invoice handed over first that Quasar has not decided yet. While it
   * is above `0` the page offers no plain second payment and never says that nothing was charged. Quasar versions
   * before October 29, 2026 leave it out.
   */
  unresolvedPayments?: number;
  /**
   * Every key (`txKey`, hash, the hash a sped-up transaction replaced, a relay's `userOpHash`) of the payments that
   * count as sent in time: Quasar learned of them before `dueAt` (all of them when the invoice has none); at most the
   * latest 20 transactions and 10 relays. Match the page's own keys against it instead of the browser clock. Left out
   * like `unresolvedPayments`.
   */
  onTimeTxKeys?: string[];
  /**
   * The invoice that replaced this one after the seller corrected it: its number and, while it can be paid, its
   * checkout token.
   */
  replacedBy: { number: string | null; checkoutToken: string | null } | null;
  /** The subscription period this invoice bills; `null` for a one-off invoice. */
  subscription: CheckoutSubscription | null;
}

/**
 * Why a payment of a `held` (or flagged) invoice waits for the seller, as {@link CheckoutInvoice.review} says it:
 *
 * - `screening`: the sender did not pass the seller's AML check after paying; no details reach the buyer.
 * - `late`: it arrived after the invoice expired or was cancelled; the seller accepts or returns it.
 * - `overpaid`: more arrived than the invoice asks for, and the seller looks at it.
 * - `quote_expired`: it arrived after its locked quote expired, in an asset whose price moved; the seller accepts or
 *   returns it.
 * - `payer_mismatch` and `payer_unconfirmed`, with `refundOnly: true`: Quasar could tie the transfer to no invoice
 *   (it came from another wallet than the one the quote was locked to, or from that wallet, which never confirmed the
 *   invoice with {@link CheckoutState.confirmPayer}). Anyone who saw its transaction could have handed it over, so the
 *   seller never accepts it for this invoice: it only returns it to the wallet that sent it. Say so, never "the seller
 *   checks your payment": for `payer_mismatch` "The payment came from another wallet than the one that confirmed this
 *   invoice. {merchant} returns it to the wallet that sent it. Pay from the confirmed wallet.", for
 *   `payer_unconfirmed` the same with "from a wallet that did not confirm this invoice". A held invoice takes no other
 *   payment: a payment from the confirmed wallet goes to an invoice that can be paid (a new one from the seller). A
 *   refund-only hold is undone when the same transfer pays another invoice of the seller (the one its wallet
 *   confirmed); the invoice then goes back to where it stood, which the page shows once it reads the checkout again.
 *
 * Quasar versions before October 29, 2026 show a transfer from another wallet as `screening`.
 */
export type CheckoutReview =
  | { reason: 'screening' | 'late' | 'overpaid' | 'quote_expired' }
  | { reason: 'payer_mismatch' | 'payer_unconfirmed'; refundOnly: true };

/** A payment of the invoice that failed, as the checkout lists it ({@link CheckoutInvoice.rejectedPayments}). */
export interface CheckoutRejectedPayment {
  /** The transaction's `txKey`, or the `userOpHash` of a gasless relay that failed before it had a transaction. */
  txKey: string;
  /**
   * Why: `reverted`, `cancelled`, `expired` (a Solana blockhash), `no_matching_transfer` (a wrong amount, asset or
   * recipient), `tx_already_used` (the transaction pays another invoice of the merchant: the one the wallet that sent
   * it confirmed, or whose mark it carries, also when this invoice's page handed it over first or claimed it),
   * `reference_missing`, `too_early`, `not_found` (the network never returned the transaction), `timeout` (no receipt
   * in time), `replaced`, `payer_mismatch` (a transfer from another wallet to an invoice paid or held already; one to a
   * payable invoice is held for a refund only: {@link CheckoutReview}), `payer_unconfirmed` (the same from a wallet that
   * never confirmed the invoice: it pays no invoice, the merchant returns it to the wallet that sent it; final),
   * `native_from_contract_unverifiable`, `invoice_not_payable` (a transfer to an invoice paid, held or refunded
   * already), `settlement_failed` (the network confirmed the transaction, but Quasar has not recorded it yet: not final,
   * never a second payment, the buyer contacts the merchant; Quasar settles it again daily for 30 days after it learned
   * of it, while `rechecked`), `unresolved_after_24h` (no result seen on chain within 24 hours: only a transaction
   * Quasar read again after that day and the network does not have), a relay's reason (`user_operation_lost`…), or
   * `transaction_failed` when Quasar does not know.
   */
  reason: string;
  /**
   * Whether the transaction can never pay the invoice, so the buyer may pay again. When `false` (`not_found`,
   * `timeout`, `replaced`…) the money may still be on its way or already with the merchant: the buyer checks the wallet
   * before paying again. A final rejection may still have moved money: read `movedMoney`.
   */
  final: boolean;
  /** The relay operation the transaction came from, which the page knows when the relay answered `sending`. */
  userOpHash?: string;
  /** The transaction the checkout handed over, when this one replaced it (a payment sped up in the wallet). */
  original?: string;
  /**
   * `true` when the transaction succeeded on chain without paying the invoice (`no_matching_transfer`,
   * `reference_missing`, `too_early`, `tx_already_used`, `payer_mismatch`, `payer_unconfirmed`,
   * `native_from_contract_unverifiable`, `invoice_not_payable`), or Quasar has not recorded it yet
   * (`settlement_failed`): it may have moved money. Never say that it did not go through or that nothing was charged:
   * say that it does not pay the invoice (for `settlement_failed`: that Quasar has not recorded it yet; for
   * `payer_mismatch` and `payer_unconfirmed`: that the merchant returns it to the wallet that sent it), and whom to
   * contact if money left the wallet. Quasar versions before October 29, 2026 leave it out.
   */
  movedMoney?: true;
  /**
   * `true` while Quasar still reads the transaction again: a rejection for `not_found`, `timeout` or `replaced` of a
   * payment Quasar learned of within the last 24 hours that nothing has resolved since (a payment still unresolved
   * after the 24 hours is closed with the final reason `unresolved_after_24h`), or a `settlement_failed` one Quasar
   * still settles again daily (for 30 days after it learned of the payment; Quasar versions before the payer proof,
   * October 29, 2026, never mark it). Only then may the page promise that Quasar checks the payment again. Any other
   * reason that is not `final` (a relay operation lost, `transaction_failed`, a transfer from another wallet…) is never
   * read again: if money left the wallet, the buyer contacts the merchant with the transaction hash. Quasar versions
   * before October 29, 2026 leave it out.
   */
  rechecked?: true;
}

/** The subscription period an invoice bills, as the checkout shows it. */
export interface CheckoutSubscription {
  /** State of the subscription. */
  status: SubscriptionStatus;
  /** Unit of a period. */
  interval: SubscriptionInterval;
  /** Units in a period (`3` with `month` is a quarter). */
  intervalCount: number;
  /** The period this invoice bills, from 1. */
  period: number;
  /** When the period starts. */
  periodStart: string;
  /** When it ends, which is when the next one is billed. */
  periodEnd: string;
  /** How many periods the subscription runs; `null` until it is cancelled. */
  cycles: number | null;
  /** When it ends at the latest, if set. */
  endsAt: string | null;
  /** Whether it ends with the current period. */
  cancelAtPeriodEnd: boolean;
}

/** Who is paid and on what terms, as the checkout shows it. */
export interface CheckoutMerchant {
  /** The name buyers know. */
  name: string;
  /** Website, as an http(s) link. */
  website: string | null;
  /** Where buyers ask for help. */
  supportEmail: string | null;
  /** Whether the merchant has a logo: read it from the `logo` route ({@link CheckoutState.logoUrl}). */
  logo: boolean;
  /** The seller as the invoice document names them. */
  seller: {
    legalName: string | null;
    tradingName: string | null;
    address: string | null;
    country: string | null;
    registrationNumber: string | null;
    taxId: string | null;
  } | null;
  /** The merchant's terms, refund policy and privacy notice (http(s) links only). */
  links: { terms: string | null; refundPolicy: string | null; privacy: string | null };
  /** A page where buyers get the token to pay, shown when the wallet has too little. */
  fundingUrl: string | null;
}

/**
 * A line the merchant asks the buyer to tick before paying, such as a request to start a service at once. The quote
 * records the tick in the invoice's ledger and the receipt email repeats the text.
 */
export interface CheckoutConsent {
  /** The merchant's words, up to 500 characters, shown as they are. */
  text: string;
  /** Whether the buyer cannot pay without ticking it: Quasar refuses the quote with `consent_required`. */
  required: boolean;
}

/** The look of the checkout the merchant chose. */
export interface CheckoutTheme {
  /** `system` follows the buyer's device. */
  mode: 'system' | 'light' | 'dark';
  /** Main button and selection color (`#rrggbb`); `null` for the default. */
  accentColor: string | null;
}

/** A payment method the invoice can be paid with. */
export interface CheckoutMethod {
  /** Method ID, for {@link CheckoutState.selectMethod}. */
  id: string;
  /** Its name. */
  name: string;
  /** Token symbol. */
  symbol: string;
  /** CAIP-2 chain (`eip155:8453`, `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`). */
  chainId: string;
  /** CAIP-19 asset. */
  assetId: string | null;
  /** Decimals of the token. */
  decimals: number;
  /** `auto` when the merchant may sponsor the gas, `off` otherwise. */
  gasless: string | null;
  /** Marked "Popular" by the merchant. */
  featured: boolean;
  /** How much more the method costs than the invoice total, in basis points (`150` is 1.5 %). */
  markupBps: number;
  /** How much less the method costs than the invoice total, in basis points. */
  discountBps: number;
  /**
   * When a payment with the method needs the paying wallet's confirmation of the invoice
   * ({@link CheckoutState.confirmPayer}): `before_quote` (an EVM method: before the price; the quote answers
   * `409 payer_proof_required` without it), `unless_relayed` (an EVM method the gasless relay may pay: the price comes
   * first, the relay's EIP-3009 authorization confirms the wallet, and a transfer or a paymaster payment of it needs
   * the confirmation first), `none` (Solana: the quote's reference ties the transfer to the invoice). Quasar versions
   * before October 29, 2026 leave it out: no confirmation.
   */
  payerProof?: PayerProofNeed;
}

/** When a payment with a method needs the paying wallet's confirmation ({@link CheckoutMethod.payerProof}). */
export type PayerProofNeed = 'before_quote' | 'unless_relayed' | 'none';

/**
 * How a wallet confirmed the invoice: `eoa` (an EIP-191 signature of Quasar's message, which counts on every EVM
 * network), `eip1271` and `eip6492` (a smart wallet's signature its contract accepted, deployed or not yet, which
 * counts on that network only), `authorization` (the EIP-3009 authorization of the invoice's gasless relay, on every
 * EVM network).
 */
export type PayerProofKind = 'eoa' | 'eip1271' | 'eip6492' | 'authorization';

/** A wallet that confirmed the invoice ({@link CheckoutView.payerProofs}). */
export interface CheckoutPayerProof {
  /** The wallet, as a CAIP-10 account on the network it confirmed on (the EVM address checksummed). */
  payer: string;
  /** How it confirmed. */
  kind: PayerProofKind;
  /** The CAIP-2 network it confirmed on: the only one where an `eip1271` or `eip6492` confirmation counts. */
  chainId: string;
  /** When. */
  confirmedAt: string;
}

/**
 * What `POST payer-proof/message` answers: the exact EIP-4361 (Sign-In with Ethereum) message the wallet signs, for
 * free and without moving funds, to confirm that it pays this invoice. Quasar builds it from the page's site (its
 * `Origin`), the wallet, the invoice number, the seller and the total, the network, a nonce derived from the invoice and
 * the wallet, the invoice's creation (`Issued At`) and due date (`Expiration Time`); asked twice, it is the same.
 */
export interface PayerProofMessage {
  /** Always `payer_proof_message`. */
  object: 'payer_proof_message';
  /** The wallet, as a CAIP-10 account (the EVM address checksummed). */
  payer: string;
  /** `true` when the wallet confirmed this invoice already (on this network, for a smart wallet): nothing to sign. */
  proven: boolean;
  /** The message to sign as it is, with `personal_sign` (EIP-191). */
  message: string;
  /** The site the message names: the host of the page that asked. */
  domain: string;
  /** The CAIP-2 network of the wallet. */
  chainId: string;
  /** The nonce of the message. */
  nonce: string;
  /** When the invoice was created (`Issued At`). */
  issuedAt: string;
  /** The invoice's due date (`Expiration Time`), `null` without one. */
  expiresAt: string | null;
}

/** What `POST payer-proof` answers: the wallet's confirmation of the invoice, as Quasar recorded it. */
export interface PayerProofConfirmation {
  /** Always `payer_proof`. */
  object: 'payer_proof';
  /** The wallet, as a CAIP-10 account. */
  payer: string;
  /** Always `true`. */
  proven: true;
  /** How it confirmed. */
  kind: PayerProofKind;
  /** The CAIP-2 network it confirmed on. */
  chainId: string;
  /** When. */
  confirmedAt: string;
}

/** What a wallet needs to pay a locked quote: the exact amount in base units, never rounded again. */
export type PaymentInstructions =
  | {
      /** An EVM chain. */
      family: 'eip155';
      /** EVM chain ID. */
      chainId: number;
      /** The merchant's wallet. */
      to: string;
      /** The token contract, or `native`. */
      token: string;
      /** Amount to send, in base units. */
      amount: string;
      /** Decimals of the token. */
      decimals: number;
      /** Token symbol. */
      symbol: string;
    }
  | {
      /** Solana. */
      family: 'solana';
      /** CAIP-2 chain ID. */
      chainId: string;
      /** The merchant's wallet. */
      to: string;
      /** The mint, or `native` for SOL. */
      token: string;
      /** Amount to send, in base units. */
      amount: string;
      /** Decimals of the token. */
      decimals: number;
      /** Token symbol. */
      symbol: string;
      /** The Solana Pay reference key of the quote: the transfer must carry it. */
      reference: string;
      /** A Solana Pay transfer request, for a QR code a mobile wallet scans. */
      solanaPayUrl: string;
    };

/** EIP-712 typed data of an EIP-3009 transfer authorization, ready for `eth_signTypedData_v4`. */
export interface TransferAuthorizationTypedData {
  /** The token's EIP-712 domain. */
  domain: Record<string, unknown>;
  /** The types, with `EIP712Domain`. */
  types: Record<string, { name: string; type: string }[]>;
  /** `TransferWithAuthorization`. */
  primaryType: string;
  /** The authorization: from the payer to the merchant, the quoted amount, a validity window and a nonce. */
  message: Record<string, string>;
}

/**
 * What the merchant sponsors for a quote: `relay`, an EIP-3009 authorization any wallet signs (Quasar sends the
 * transfer), and `paymaster`, the calls a smart wallet sends with the checkout's ERC-7677 paymaster
 * (`paymasterUrl` of the store).
 */
export interface GaslessOffer {
  /** Sign `typedData` and pass the signature to {@link CheckoutState.relay}. */
  relay?: { typedData: TransferAuthorizationTypedData };
  /** Send these calls with `wallet_sendCalls` and the `paymasterService` capability set to the paymaster URL. */
  paymaster?: { calls: { to: string; value: string; data: string }[] };
}

/** A locked quote: the price for this payer, valid until `expiresAt`. */
export interface CheckoutQuote {
  /** Always `checkout_quote`. */
  object: 'checkout_quote';
  /** The payment method. */
  methodId: string;
  /** CAIP-10 account the quote was locked to; `null` for a Solana Pay QR quote. */
  payer: string | null;
  /** Token amount the merchant receives, in base units. */
  cryptoAmountExpected: string;
  /** Token amount the buyer sends (grossed up for a transfer fee), in base units. */
  amountToSend: string;
  /** The token's transfer fee, when it takes one. */
  transferFee: { bps: number; maxFee: string | null; source: 'contract' | 'method' } | null;
  /** Decimals of the token. */
  decimals: number;
  /** Token symbol. */
  symbol: string;
  /** When it was locked. */
  lockedAt: string | null;
  /** When it expires; ask for a new quote after that. */
  expiresAt: string | null;
  /** The Solana Pay reference key. */
  reference: string | null;
  /** Price rounds used, as evidence. */
  rates: unknown;
  /** Markup of the method in basis points. */
  markupBps: number;
  /** Discount of the method in basis points. */
  discountBps: number;
  /** What the wallet sends. */
  instructions: PaymentInstructions;
  /** What the merchant sponsors, or `null`: the buyer pays the gas. */
  gasless: GaslessOffer | null;
  /**
   * Whether the quoted wallet confirmed the invoice ({@link CheckoutState.confirmPayer}): `required` on an EVM method,
   * `proven` once it did (`kind` says how). An EVM quote without the confirmation exists only for a method the gasless
   * relay may pay: a transfer or a paymaster payment from that wallet needs the confirmation first, or Quasar credits it
   * to no invoice and the merchant returns it. Quasar versions before October 29, 2026 leave it out.
   */
  payerProof?: { required: boolean; proven: boolean; kind: PayerProofKind | null };
}

/** The ERC-7715 `wallet_grantPermissions` request of a subscription with automatic charges. */
export interface PermissionRequest {
  /** Chain as hex. */
  chainId: string;
  /** The app's collector account, which redeems the permission. */
  to: string;
  /** A periodic ERC-20 allowance. */
  permission: {
    type: 'erc20-token-periodic';
    isAdjustmentAllowed: boolean;
    data: {
      tokenAddress: string;
      periodAmount: string;
      periodDuration: number;
      startTime: number;
      justification: string;
    };
  };
  /** Expiry, payee and redeemer rules. */
  rules: { type: string; data: unknown }[];
}

/** For a subscription with automatic charges: whether the page should ask the wallet for the permission. */
export type AutoChargeOffer =
  | {
      /** Ask the wallet with `request`, then pass its answer to {@link CheckoutState.grantPermission}. */
      status: 'available';
      /** The method the charges use. */
      methodId: string;
      /** The request for `wallet_grantPermissions`. */
      request: PermissionRequest;
    }
  | {
      /** Already granted. */
      status: 'active';
      /** The permission. */
      permission: SubscriptionPermission | null;
    }
  | {
      /** Not possible now; the buyer pays each invoice. */
      status: 'unavailable';
      /** Why, as a stable code. */
      reason: string;
    };

/** What the checkout token opens, as {@link CheckoutState.checkout} holds it. */
export interface CheckoutView {
  /** Always `checkout`. */
  object: 'checkout';
  /** Who is paid and on what terms. */
  merchant: CheckoutMerchant;
  /** The look the merchant chose. */
  theme: CheckoutTheme;
  /** The invoice. */
  invoice: CheckoutInvoice;
  /**
   * Whether the page collects the buyer: `collect` is `off`, `email` or `full`; `required` while the invoice document
   * waits for them; `companyInvoice` when the page may offer an invoice for a company.
   */
  buyer: { collect: 'off' | 'email' | 'full'; required: boolean; companyInvoice: boolean };
  /** The line the buyer ticks before paying; `null` when the merchant asks none. */
  consent: CheckoutConsent | null;
  /**
   * `true` when the merchant checks paying wallets before payment (its AML mode is `block` or `flag`); the checkout
   * says so to the buyer only then.
   */
  amlScreening: boolean;
  /** The methods that take this invoice. */
  methods: CheckoutMethod[];
  /**
   * The wallets that confirmed this invoice ({@link CheckoutState.confirmPayer}), oldest first: a page reopened with
   * one of them asks for no new signature. Quasar versions before October 29, 2026 leave it out.
   */
  payerProofs?: CheckoutPayerProof[];
  /** How long a quote holds once locked, in seconds (never past the invoice deadline). */
  quoteTtlSeconds: number;
  /** The locked quote, if any. */
  quote: CheckoutQuote | null;
  /** The automatic-charge offer of a subscription invoice; `null` otherwise. */
  autoCharge: AutoChargeOffer | null;
}

/**
 * The calls a checkout store makes, one per checkout route. {@link createCheckoutStore} makes them over HTTP; pass
 * your own as `api` to drive the store without a network, as tests and the TUWA docs Playground do. A call rejects with
 * a `QuasarSDKError` that carries the Payments `code` when Quasar refuses it.
 */
export interface CheckoutApi {
  /** Reads the checkout (`GET`). */
  view: () => Promise<CheckoutView>;
  /** Locks a quote for a method and, when connected, the payer, with the buyer's consent when given (`POST quote`). */
  quote: (body: { methodId: string; payer?: string; consentGiven?: boolean }) => Promise<CheckoutQuote>;
  /**
   * The message the wallet signs to confirm the invoice (`POST payer-proof/message`). Optional for an `api` written
   * before payer proofs: without it and {@link CheckoutApi.payerProof}, {@link CheckoutState.confirmPayer} fails.
   */
  payerProofMessage?: (body: { payer: string }) => Promise<PayerProofMessage>;
  /** Sends the signed message, which Quasar checks and records (`POST payer-proof`). Optional like `payerProofMessage`. */
  payerProof?: (body: { payer: string; message: string; signature: string }) => Promise<PayerProofConfirmation>;
  /** Sends the buyer details (`POST buyer`) and answers with the checkout. */
  buyer: (body: { buyer: Buyer; company?: boolean }) => Promise<CheckoutView>;
  /** Sets the language of the page and the documents still to be issued (`POST locale`). */
  locale: (locale: InvoiceLocale) => Promise<{ locale: InvoiceLocale }>;
  /** Hands over the transaction the wallet sent (`POST submit`). */
  submit: (body: {
    txKey: string;
    from?: string;
    connectorType?: string;
  }) => Promise<{ txKey: string; status: string }>;
  /** Relays the signed EIP-3009 authorization (`POST relay`). */
  relay: (signature: string) => Promise<{ status: 'submitted' | 'sending'; userOpHash?: string; txHash?: string }>;
  /** Sends the ERC-7715 permission the wallet granted (`POST permission`). */
  permission: (body: GrantPermissionParams) => Promise<{ permission: unknown }>;
  /** The URL of a route that is read without the store: `receipt`, `logo`, `paymaster`, `events`. */
  url: (route: string) => string;
}

/** The answer of the wallet to `wallet_grantPermissions`, as {@link CheckoutState.grantPermission} takes it. */
export interface GrantPermissionParams {
  /** CAIP-10 account that granted it, on the method's chain. */
  payer: string;
  /** The permission context the wallet returned. */
  context: string;
  /** The delegation manager it names. */
  delegationManager: string;
  /** Account deployments the delegator needs first (ERC-7715 `dependencies`). */
  dependencies?: { factory: string; factoryData: string }[];
}

/** One `status` event of the checkout's event stream. */
export interface CheckoutStatusEvent {
  /** State of the invoice. */
  status: InvoiceStatus;
  /** Number of ledger steps so far. */
  ledgerSeq: number;
  /** The payment transaction, once there is one. */
  txHash: string | null;
  /** Amount received, in base units. */
  amountPaid: string | null;
  /** When the locked quote expires. */
  quoteExpiresAt: string | null;
  /**
   * Payments handed over and still on their way, as {@link CheckoutInvoice.pendingPayments}. Quasar keeps the stream of an
   * `expired` or `cancelled` invoice open while it is above `0`.
   */
  pendingPayments?: number;
  /** The keys of the payments that failed, latest first, as {@link CheckoutInvoice.rejectedTxKeys}. */
  rejectedTxKeys?: string[];
  /** The payments that failed and why, latest first, as {@link CheckoutInvoice.rejectedPayments}. */
  rejectedPayments?: CheckoutRejectedPayment[];
  /** Until when a payment sent before the due date counts, as {@link CheckoutInvoice.paymentCountsUntil}. */
  paymentCountsUntil?: string | null;
  /** Payments that may still arrive, with no time limit, as {@link CheckoutInvoice.unresolvedPayments}. */
  unresolvedPayments?: number;
  /** The keys of the payments that count as sent in time, as {@link CheckoutInvoice.onTimeTxKeys}. */
  onTimeTxKeys?: string[];
}

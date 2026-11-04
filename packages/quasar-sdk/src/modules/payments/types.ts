/**
 * @file Request and response types of the Payments API (`/v1/payments`): invoices, refunds, documents, quotes,
 * payment methods and subscriptions, as the Quasar engine takes and returns them.
 */

/** Fiat currency of an invoice or a subscription plan. */
export type PaymentsCurrency = 'USD' | 'EUR';

/** Language of an invoice, its documents and its emails. */
export type InvoiceLocale = 'en' | 'uk' | 'zh-CN' | 'es' | 'it' | 'de';

/**
 * VAT category of a line (EN 16931 UNCL5305): `S` standard rate, `Z` zero rated, `E` exempt (needs
 * `taxExemptionReason`), `AE` reverse charge, `K` intra-community supply, `G` export outside the EU, `O` outside the
 * scope of VAT.
 */
export type TaxCategory = 'S' | 'Z' | 'E' | 'AE' | 'K' | 'G' | 'O';

/**
 * State of an invoice: `open` until paid, `processing` while a payment is being confirmed, then `paid`, `underpaid`
 * (the buyer may top it up), `held` (the merchant releases or refunds it), `partially_refunded`, `refunded`, or
 * `expired`/`cancelled` without a payment.
 */
export type InvoiceStatus =
  'open' | 'processing' | 'paid' | 'underpaid' | 'held' | 'partially_refunded' | 'refunded' | 'expired' | 'cancelled';

/** Whether an invoice or subscription belongs to the live or the test app: the key that issued it decides. */
export type PaymentsEnvironment = 'live' | 'test';

/**
 * The buyer of an invoice (EN 16931 BT-44 to BT-55). Every field is optional; an e-invoice is issued only when the
 * fields it needs are there (otherwise the invoice says what was missing in `eInvoiceSkipped`).
 */
export interface Buyer {
  /** Name of the person or the company. */
  name?: string;
  /** Email address; Quasar Cloud sends the invoice, receipt and credit notes to it. */
  email?: string;
  /** First address line. */
  addressLine1?: string;
  /** Second address line. */
  addressLine2?: string;
  /** Postal code. */
  postalCode?: string;
  /** City. */
  city?: string;
  /** Region or state. */
  region?: string;
  /** ISO 3166-1 alpha-2 country code, for example `DE`. */
  country?: string;
  /** Company registration number. */
  registrationNumber?: string;
  /** VAT or other tax ID; required for a reverse-charge invoice. */
  taxId?: string;
  /** Your ID of the buyer; filter invoices by it with `externalId`. */
  externalId?: string;
}

/** One line of an invoice or a subscription plan, as you send it. */
export interface InvoiceLineInput {
  /** What is sold. */
  name: string;
  /** Optional details under the name. */
  description?: string;
  /** Quantity as a decimal string. Defaults to `'1'`. */
  quantity?: string;
  /** Price of one unit in the invoice currency, as a decimal string (`'49.00'`). */
  unitPrice: string;
  /** VAT category; defaults to the one in the app's document settings. */
  taxCategory?: TaxCategory;
  /** VAT rate in percent (`'21'`); defaults to the one in the app's document settings. */
  taxRate?: string;
  /** UN/ECE Recommendation 20 unit code for e-invoices (`C62` one, `HUR` hour, `MON` month). */
  unitCode?: string;
}

/** The lines of an invoice: give either `lineItems` or a bare `amount`. */
export type InvoiceLinesInput =
  | {
      /** The lines, 1 to 100. */
      lineItems: InvoiceLineInput[];
      amount?: never;
      description?: never;
    }
  | {
      lineItems?: never;
      /** A total as one line, as a decimal string (`'49.00'`). */
      amount: string;
      /** Name of that one line. Defaults to `Payment` (`Subscription` for a plan). */
      description?: string;
    };

/** Terms that an invoice and a subscription plan share. */
export interface InvoiceTermsInput {
  /** Currency. Defaults to `USD`. */
  currency?: PaymentsCurrency;
  /** Language of the documents and emails. Defaults to `en`. */
  locale?: InvoiceLocale;
  /** The buyer. */
  buyer?: Buyer;
  /** The CAIP-10 account you expect to pay (`eip155:8453:0x…`, `solana:<genesis hash>:<address>`). */
  expectedPayer?: string;
  /** BT-10, the reference the buyer asked for. */
  buyerReference?: string;
  /** BT-13, the buyer's purchase order. */
  orderReference?: string;
  /** Your data, returned with the invoice and its webhooks; at most 8 KiB as JSON. */
  metadata?: Record<string, unknown>;
  /** Where the checkout sends the buyer after paying. */
  successUrl?: string;
  /** Where the checkout sends a buyer who gives up. */
  cancelUrl?: string;
  /** A note printed on the invoice. */
  notes?: string;
  /** Whether unit prices include VAT; defaults to the app's document settings. */
  pricesIncludeTax?: boolean;
  /** A reverse-charge invoice (needs `buyer.taxId`). */
  reverseCharge?: boolean;
  /** Why the lines are exempt (needed for category `E`). */
  taxExemptionReason?: string;
}

/** What {@link PaymentsModule.createInvoice} takes. */
export type CreateInvoiceParams = InvoiceLinesInput &
  InvoiceTermsInput & {
    /** When the invoice stops being payable; give it or `expiresInMinutes`. */
    dueAt?: Date | string;
    /** Minutes the invoice stays payable, from 5 to 90 days. */
    expiresInMinutes?: number;
    /** Date of supply (BT-72). Defaults to the issue date. */
    supplyDate?: Date | string;
  };

/** Options of a call that creates something. */
export interface CreateOptions {
  /**
   * Sent as the `Idempotency-Key` header (1–255 characters): a retry with the same key returns what the first call
   * created, with the same payment link, instead of creating it twice.
   */
  idempotencyKey?: string;
}

/** A line of an issued invoice, with its net amount. */
export interface InvoiceLine {
  /** What is sold. */
  name: string;
  /** Details under the name. */
  description?: string;
  /** Quantity as a decimal string. */
  quantity: string;
  /** Price of one unit. */
  unitPrice: string;
  /** VAT category. */
  taxCategory: TaxCategory;
  /** VAT rate in percent. */
  taxRate: string;
  /** Net amount of the line. */
  net: string;
  /** Unit code, when given. */
  unitCode?: string;
}

/** The price an invoice was quoted at, once a buyer chose how to pay. */
export interface InvoiceQuote {
  /** The payment method. */
  methodId: string | null;
  /** CAIP-10 account the quote was issued to. */
  payer: string;
  /** Token amount that settles the invoice, in base units. */
  cryptoAmountExpected: string | null;
  /**
   * What must still arrive, in base units, while the invoice takes a payment: the whole amount, or the rest of an
   * `underpaid` invoice. `null` otherwise.
   */
  amountDue: string | null;
  /**
   * What the buyer sends, in base units: what must still arrive (the whole price, or the rest of an `underpaid` invoice)
   * grossed up for a token's transfer fee.
   */
  amountToSend: string | null;
  /** When the quote was locked. */
  lockedAt: string | null;
  /** When the quote expires. */
  expiresAt: string | null;
  /** The price rounds the quote used, as evidence. */
  rate: unknown;
  /** Solana Pay reference key of the quote. */
  reference: string | null;
}

/**
 * The payment that settled an invoice. An invoice paid in parts has several transfers: this names the last one, and
 * {@link InvoiceDetails.payments} names them all.
 */
export interface InvoiceSettlement {
  /** ID of the payment method paid with (see `listMethods`): its token and network read {@link InvoiceSettlement.amountPaid}. */
  methodId: string | null;
  /** CAIP-2 chain ID of the payment. */
  chainId: string | null;
  /** Transaction hash or Solana signature of the last transfer. */
  txHash: string;
  /** Block (EVM) or slot (Solana) of the last transfer. */
  blockRef: string | null;
  /** Amount received in all, in base units. */
  amountPaid: string | null;
  /** The address that paid. */
  originWallet: string | null;
  /** When it was paid. */
  paidAt: string | null;
  /** Base units received beyond what was due; a refund can return them. */
  overpaid: string;
}

/**
 * The seller of an invoice as printed, copied from the app's payment settings when it was issued. Every field may be
 * missing or `null`: invoices issued before the address had its parts carry only `address`.
 */
export interface InvoiceSeller {
  /** Legal name. */
  legalName?: string | null;
  /** The name buyers know. */
  tradingName?: string | null;
  /** The postal address as one text, as the checkout shows it. */
  address?: string | null;
  /** First address line. */
  addressLine1?: string | null;
  /** Second address line. */
  addressLine2?: string | null;
  /** Postal code. */
  postalCode?: string | null;
  /** City. */
  city?: string | null;
  /** ISO 3166-1 alpha-2 country code. */
  country?: string | null;
  /** Company registration number. */
  registrationNumber?: string | null;
  /** VAT or other tax ID. */
  taxId?: string | null;
  /** Support email address. */
  supportEmail?: string | null;
  /** Website. */
  website?: string | null;
}

/** The payer's AML screening of an invoice. */
export interface InvoiceAml {
  /** `passed`, `flagged`, `blocked` or `failed`. */
  status: string;
  /** Why. */
  reasons: string[];
  /** What screened the payer, when known. */
  coverage: string | null;
}

/** An invoice as the Payments API returns it. Amounts are decimal strings in the invoice currency. */
export interface Invoice {
  /** Invoice ID. */
  id: string;
  /** Always `invoice`. */
  object: 'invoice';
  /** Series number, for example `INV-2026-42` (`TEST-` for test invoices). */
  number: string | null;
  /** State of the invoice. */
  status: InvoiceStatus;
  /** Live or test. */
  environment: PaymentsEnvironment | null;
  /** Currency. */
  currency: PaymentsCurrency;
  /** Language of its documents and emails. */
  locale: InvoiceLocale | null;
  /** When it was issued (ISO 8601). */
  issuedAt: string | null;
  /** Date of supply. */
  supplyDate: string | null;
  /** When it stops being payable. */
  dueAt: string | null;
  /** The seller as printed, from the app's settings at issue. */
  seller: InvoiceSeller | null;
  /** The buyer as printed. */
  buyer: (Buyer & { companyInvoice?: boolean }) | null;
  /** The CAIP-10 account you expected to pay. */
  expectedPayer: string | null;
  /** BT-10. */
  buyerReference: string | null;
  /** BT-13. */
  orderReference: string | null;
  /** The lines. */
  lineItems: InvoiceLine[];
  /** Whether unit prices include VAT. */
  pricesIncludeTax: boolean | null;
  /** Total without VAT. */
  subtotal: string;
  /** VAT. */
  taxTotal: string;
  /** Rounding. */
  rounding: string;
  /** Total to pay. */
  total: string;
  /** VAT per category and rate. */
  taxBreakdown: { taxCategory: TaxCategory; taxRate: string; taxable: string; tax: string }[];
  /** The note printed on the invoice. */
  notes: string | null;
  /** Whether it is a reverse-charge invoice. */
  reverseCharge: boolean | null;
  /** Why its lines are exempt. */
  taxExemptionReason: string | null;
  /** Your data. */
  metadata: Record<string, unknown> | null;
  /** Where the checkout sends the buyer after paying. */
  successUrl: string | null;
  /** Where the checkout sends a buyer who gives up. */
  cancelUrl: string | null;
  /**
   * The checkout token while the invoice can be paid (`open`, `processing`, `underpaid`), for a checkout embedded in
   * your page; `null` otherwise.
   */
  checkoutToken: string | null;
  /** The payment page while the invoice can be paid: the link its emails carry. */
  payUrl: string | null;
  /** The locked quote, once there is one. */
  quote: InvoiceQuote | null;
  /** The payment, once there is one. */
  settlement: InvoiceSettlement | null;
  /**
   * Why the payment waits for you: `overpaid` when the app flags overpayments, `quote_expired` when it arrived after
   * its locked quote expired, `payer_mismatch` when Quasar could tie it to no invoice (from another wallet than the
   * quoted one, or from one that never confirmed the invoice): refund it to the wallet that sent it, it is never
   * released.
   */
  reviewReason: string | null;
  /** The payer's AML screening, once there was one. */
  aml: InvoiceAml | null;
  /** The receipt number, once paid. */
  receiptNumber: string | null;
  /** What the e-invoice lacked when the invoice was issued as a plain PDF, for example `buyer.country`. */
  eInvoiceSkipped: string[] | null;
  /** Refunded so far, in the invoice currency. */
  refundedTotal: string;
  /** The invoice this one corrects. */
  replaces: string | null;
  /** The invoice that corrects this one. */
  replacedBy: string | null;
  /** The subscription it bills. */
  subscriptionId: string | null;
  /** The subscription period it bills. */
  period: number | null;
  /** When it was created. */
  createdAt: string;
  /** When it last changed. */
  updatedAt: string;
}

/**
 * A document issued for an invoice, as {@link PaymentsModule.listInvoiceDocuments} lists it: the invoice, its receipt
 * or a credit note, in one format. {@link PaymentsModule.getDocument} downloads the invoice and the receipt,
 * {@link PaymentsModule.getCreditNote} a credit note by its number or its refund.
 */
export interface InvoiceDocumentRef {
  /** What it is. */
  kind: 'invoice' | 'receipt' | 'credit_note';
  /** `pdf`, or `ubl` for the e-invoice. */
  format: 'pdf' | 'ubl';
  /** Its number. */
  number: string;
  /** The refund a credit note credits; `null` for the invoice, the receipt and the credit note of a correction. */
  refundId: string | null;
  /** When it was issued. */
  issuedAt: string;
}

/** A transfer credited to an invoice. An invoice paid in parts has several. */
export interface InvoicePayment {
  /** Transaction hash or Solana signature. */
  txHash: string;
  /** CAIP-2 chain ID of the transfer. */
  chainId: string | null;
  /** What it credited, in base units of the token of `methodId`. */
  amount: string;
  /** ID of the payment method paid with (see `listMethods`). */
  methodId: string | null;
  /** The addresses that sent it. */
  senders: string[];
  /** Block (EVM) or slot (Solana). */
  blockRef: string | null;
  /** When it was mined, or when it was verified if the network named no time. */
  at: string;
}

/** A transaction that was tied to an invoice and did not pay it. */
export interface InvoiceAttempt {
  /** Transaction hash or Solana signature. */
  txHash: string | null;
  /** CAIP-2 chain ID of the transaction. */
  chainId: string | null;
  /** Why it did not pay the invoice, such as `reverted`, `no_matching_transfer` or `payer_mismatch`. */
  reason: string;
  /** What it carried to you without paying anything, when it did: base units of the invoice's token. */
  amount: string | null;
  /** The addresses that sent what it carried. */
  senders: string[];
  /** The held transfer it became, for a refund to its sender (see `listHeldTransfers`, which keeps its state). */
  heldTransfer: string | null;
  /** When it was recorded. */
  at: string;
}

/** What a wallet signed to confirm an invoice. A wallet that confirms may still not be the one that pays: `InvoicePayment.senders` names who did. */
export interface InvoiceWalletConfirmation {
  /** The wallet, as a CAIP-10 account on the network it signed on. */
  account: string;
  /**
   * How it confirmed: `eoa`, `eip1271` and `eip6492` signed an EIP-4361 message; `authorization` signed the EIP-3009
   * authorization of a relayed payment.
   */
  kind: string;
  /** CAIP-2 chain ID it signed on. */
  chainId: string;
  /** The signature. */
  signature: string | null;
  /** The EIP-4361 message it signed; `null` for an authorization. */
  message: string | null;
  /** The domain the message names. */
  domain: string | null;
  /** The nonce the message names. */
  nonce: string | null;
  /** When it was confirmed. */
  at: string;
}

/**
 * An invoice with its newest refunds and how many refunds and credit notes it has, as
 * {@link PaymentsModule.getInvoice} returns it. It also names what happened to the money, oldest first. Every refund and correction adds a credit note, so the full lists are
 * {@link PaymentsModule.listInvoiceRefunds} and {@link PaymentsModule.listInvoiceDocuments}.
 */
export interface InvoiceDetails extends Invoice {
  /** Its five newest refunds and every refund still under way (`requested`, `submitted`), newest first. */
  refunds: Refund[];
  /** How many refunds it has. */
  refundsTotal: number;
  /** How many credit notes it has (one per refund and correction). */
  creditNotesTotal: number;
  /** Every transfer credited to it, oldest first, also through a correction: an invoice paid in parts has several. */
  payments: InvoicePayment[];
  /** The ten newest transactions that did not pay it, newest first; the ledger has them all. */
  attempts: InvoiceAttempt[];
  /** How many transactions did not pay it. */
  attemptsTotal: number;
  /** What the wallets that confirmed it signed, oldest first. */
  walletConfirmations: InvoiceWalletConfirmation[];
}

/** An invoice with its checkout token and payment page. */
export interface InvoiceWithCheckout {
  /** The invoice. */
  invoice: Invoice;
  /** The checkout token, `null` when the invoice can no longer be paid. */
  checkoutToken: string | null;
  /** The payment page, `null` without a token or when the node has no dashboard URL. */
  payUrl: string | null;
}

/** The answer of {@link PaymentsModule.correctInvoice}: the corrected invoice and the one it replaces. */
export interface InvoiceCorrection extends InvoiceWithCheckout {
  /** The invoice it replaces, now credited. */
  replaced: Invoice;
}

/** What {@link PaymentsModule.correctInvoice} takes. */
export interface CorrectInvoiceParams {
  /** The corrected buyer; the buyer of the invoice stays when omitted. */
  buyer?: Buyer;
  /** The reason the credit note gives. */
  reason?: string;
}

/** Filters and paging of {@link PaymentsModule.listInvoices}. */
export interface ListInvoicesParams {
  /** One status or several. */
  status?: InvoiceStatus | InvoiceStatus[];
  /** Live or test invoices. */
  environment?: PaymentsEnvironment;
  /** `buyer.externalId`. */
  externalId?: string;
  /** Created at or after. */
  createdAfter?: Date | string;
  /** Created before. */
  createdBefore?: Date | string;
  /** Page size, 1 to 100. Defaults to `20`. */
  limit?: number;
  /** `nextCursor` of the previous page. */
  cursor?: string;
}

/**
 * A page of a list, newest first.
 *
 * @typeParam T - Type of the items.
 */
export interface PaymentsList<T> {
  /** Always `list`. */
  object: 'list';
  /** The items of the page. */
  data: T[];
  /** Pass it as `cursor` for the next page; `null` on the last page. */
  nextCursor: string | null;
}

/** One step of an invoice ledger. Each step's `hash` covers the step and `prevHash`. */
export interface LedgerEvent {
  /** Event ID; webhooks of this step carry it as their `id`. */
  id: string;
  /** Position in the ledger, from 1. */
  seq: number;
  /** What happened, for example `invoice.issued`, `quote.locked`, `invoice.paid`. */
  type: string;
  /** Details of the step. */
  data: unknown;
  /** Who acted: `merchant_api`, `system`, `checkout`, `dashboard:<userId>`, `admin:<userId>`… */
  actor: string;
  /** Chain of an on-chain step. */
  chainId: string | null;
  /** Transaction of an on-chain step. */
  txHash: string | null;
  /** When. */
  createdAt: string;
  /** Hash of the previous step. */
  prevHash: string | null;
  /** Hash of this step. */
  hash: string;
}

/** The result of checking a ledger's hash chain: intact, or where and why it breaks. */
export type LedgerVerification =
  { valid: true; events: number } | { valid: false; seq: number; reason: 'sequence' | 'link' | 'hash' | 'head' };

/** Who created an invoice and when its payment steps happened, whatever page of its ledger is read. */
export interface LedgerSummary {
  /** The actor of the first step (`invoice.issued`). */
  createdBy: string | null;
  /** When the first quote was locked and the receipt issued (ISO 8601); `null` before. */
  stepTimes: { quoted: string | null; receipt: string | null };
}

/** A page of an invoice ledger, oldest first, as {@link PaymentsModule.getEvents} returns it. */
export interface InvoiceLedger {
  /** Always `list`. */
  object: 'list';
  /** The steps of the page. */
  data: LedgerEvent[];
  /** How many steps the whole ledger has. */
  total: number;
  /** Pass it as `cursor` for the next page; `null` on the last page. */
  nextCursor: string | null;
  /** Who created the invoice and when its quote was locked and its receipt issued. */
  summary: LedgerSummary;
  /** The check of the whole chain, when asked for with `verify: true`. */
  verification?: LedgerVerification;
}

/** What {@link PaymentsModule.getEvents} takes. */
export interface GetEventsParams {
  /** `true` adds the check of the whole hash chain, whatever the page. */
  verify?: boolean;
  /** Page size, 1 to 100. Defaults to `100`. */
  limit?: number;
  /** `nextCursor` of the previous page. */
  cursor?: string;
}

/** How a refund is priced: at today's price of the invoice amount, or the whole payment as received. */
export type RefundMode = 'fiat_value' | 'exact_received';

/** What {@link PaymentsModule.refund} takes. */
export interface RefundParams {
  /** Amount in the invoice currency; everything left when omitted. Leave it out with `exact_received`. */
  amount?: string;
  /** `fiat_value` (default) or `exact_received`. */
  mode?: RefundMode;
  /** Why; printed on the credit note. */
  reason?: string;
}

/** A refund. You send it from your wallet; Quasar verifies the transaction and issues the credit note. */
export interface Refund {
  /** Refund ID. */
  id: string;
  /** Always `refund`. */
  object: 'refund';
  /** The invoice. */
  invoiceId: string;
  /** `requested` (waits for its transaction), `submitted`, `confirmed` or `failed`. */
  status: 'requested' | 'submitted' | 'confirmed' | 'failed';
  /** Amount in the invoice currency. */
  amount: string;
  /** Invoice currency. */
  currency: string;
  /** How it was priced. */
  mode: RefundMode;
  /** Token amount to send, in base units. */
  cryptoAmount: string;
  /** CAIP-19 asset to send. */
  assetId: string;
  /** CAIP-2 chain to send on. */
  chainId: string;
  /** The payer's address: refunds go back to it. */
  to: string;
  /** The refund transaction, once submitted. */
  txHash: string | null;
  /** The address it was sent from. */
  from: string | null;
  /** Why. */
  reason: string | null;
  /** Why it failed. */
  failureReason: string | null;
  /** Its credit note, once confirmed. */
  creditNoteNumber: string | null;
  /** The held transfer it returns to its sender ({@link HeldTransfer}), or `null` for a refund of the invoice. */
  heldTransfer: string | null;
  /** When it was asked for. */
  createdAt: string;
  /** When it was confirmed. */
  confirmedAt: string | null;
}

/** How far a {@link HeldTransfer} got: held, its refund on the way, refunded, or voided because it paid an invoice. */
export type HeldTransferStatus = 'held' | 'refunding' | 'refunded' | 'voided';

/**
 * A transfer that reached the address of one of your invoices without being tied to it by proof: from another wallet
 * than the one the quote was for (`payer_mismatch`), or from the quoted wallet that never confirmed the invoice
 * (`payer_unconfirmed`). It paid nothing and the invoice stays as it was; refund it as a whole to the wallet that sent
 * it with {@link PaymentsModule.refundHeldTransfer}. When the same transaction is proven to pay an invoice, Quasar
 * voids the record (`voided`, `voidedBy`).
 */
export interface HeldTransfer {
  /** Held transfer ID. */
  id: string;
  /** The invoice whose address it reached. */
  invoice: string;
  /** Where it is. */
  status: HeldTransferStatus;
  /** Why it is tied to no invoice. */
  reason: 'payer_mismatch' | 'payer_unconfirmed' | 'already_paid' | 'quote_changed';
  /** Whether it arrived after the invoice expired or was cancelled. */
  late: boolean;
  /** CAIP-2 chain. */
  chainId: string;
  /** CAIP-19 asset it carried. */
  assetId: string;
  /** Symbol of the token. */
  symbol: string;
  /** Decimals of the token. */
  decimals: number;
  /** Its transaction. */
  txHash: string;
  /** What it carried, in base units. */
  amount: string;
  /** Its value at the rate of the invoice's quote, in minor units of `currency`. */
  valueMinor: string | null;
  /** Currency of `valueMinor`. */
  currency: string | null;
  /** The wallet it came from (CAIP-10): the refund goes back to it. */
  sender: string;
  /** Every wallet that sent it. */
  senders: string[];
  /** The sanctions screening of the sender: `blocked` gets no refund. */
  screening: string | null;
  /** The invoice it paid, once voided. */
  voidedBy: string | null;
  /** When Quasar recorded it. */
  createdAt: string;
  /** When it last changed. */
  updatedAt: string;
}

/** What {@link PaymentsModule.listHeldTransfers} takes. */
export interface ListHeldTransfersParams {
  /** Only the held transfers of one invoice. */
  invoice?: string;
  /** Only those in one state; `held` for those still to refund. */
  status?: HeldTransferStatus;
}

/** The answer of {@link PaymentsModule.refund}: the refund and what to send where. */
export interface RefundStart {
  /** The refund, `requested`. */
  refund: Refund;
  /** The transfer to make from your wallet, then pass its hash to {@link PaymentsModule.submitRefund}. */
  instructions: {
    /** CAIP-2 chain. */
    chainId: string;
    /** CAIP-19 asset. */
    assetId: string;
    /** Recipient: the payer. */
    to: string | null;
    /** Amount in base units. */
    amount: string;
    /** Decimals of the token. */
    decimals: number;
    /** Symbol of the token. */
    symbol: string;
  };
}

/**
 * What a refund would send, as {@link PaymentsModule.previewRefund} returns it. A requested refund holds its amount until
 * it is sent, so look before asking: the same amount in the invoice currency sends a different number of tokens once a
 * volatile asset has moved.
 */
export interface RefundPreview {
  /** The amount in the invoice currency. */
  amount: string;
  /** The invoice currency. */
  currency: string;
  /** What the refund would send now, in base units. */
  cryptoAmount: string;
  /** Symbol of the token. */
  symbol: string;
  /** Decimals of the token. */
  decimals: number;
  /** What the payment brought, in base units. */
  received: string | null;
  /** What this amount was worth in tokens at the rate of the payment, in base units; `null` for `exact_received`. */
  atPaymentRate: string | null;
  /** Whether `exact_received` would be taken now: it returns the whole invoice, so nothing may be refunded yet. */
  exactPossible: boolean;
}

/** What {@link PaymentsModule.submitRefund} takes. */
export interface SubmitRefundParams {
  /** The refund transaction (hash or Solana signature). */
  txHash: string;
  /** Your wallet it was sent from. */
  from: string;
}

/** A stored invoice document, receipt or credit note: PDF (PDF/A-3 with Factur-X when on) or UBL XML. */
export type PaymentDocumentKind = 'invoice' | 'receipt' | 'invoice.xml';

/** A downloaded document, byte for byte as issued. */
export interface PaymentDocument {
  /** The file. */
  bytes: Uint8Array;
  /** Its media type, for example `application/pdf`. */
  contentType: string | null;
  /** Its file name, from `Content-Disposition`. */
  filename: string | null;
}

/** What {@link PaymentsModule.quote} takes. */
export interface QuoteParams {
  /** Amount with up to two decimals (`'49.00'`). */
  amount: string;
  /** Currency. Defaults to `USD`. */
  currency?: PaymentsCurrency;
  /** The payment method. */
  methodId: string;
}

/** The price of an amount in a payment method now; nothing is locked. */
export interface PaymentQuote {
  /** Always `quote`. */
  object: 'quote';
  /** The payment method. */
  methodId: string;
  /** Token symbol. */
  symbol: string;
  /** CAIP-2 chain. */
  chainId: string;
  /** The fiat amount. */
  amount: string;
  /** Its currency. */
  currency: PaymentsCurrency;
  /** Token amount the merchant receives, in base units. */
  cryptoAmount: string;
  /** Token amount the buyer sends (grossed up for a transfer fee), in base units. */
  amountToSend: string;
  /** The token's transfer fee, when it takes one. */
  transferFee: { bps: number; maxFee: string | null; source: 'contract' | 'method' } | null;
  /** Decimals of the token. */
  decimals: number;
  /** Markup of the method in basis points. */
  markupBps: number;
  /** Discount of the method in basis points. */
  discountBps: number;
  /** Price rounds used, as evidence. */
  rates: unknown;
  /** When it was priced. */
  quotedAt: string;
}

/** An active payment method of the app. */
export interface PaymentMethod {
  /** Method ID. */
  id: string;
  /** Always `payment_method`. */
  object: 'payment_method';
  /** Its name. */
  name: string;
  /** Token symbol. */
  symbol: string;
  /** CAIP-2 chain. */
  chainId: string;
  /** CAIP-19 asset. */
  assetId: string | null;
  /** Decimals of the token. */
  decimals: number;
  /** The wallet that receives payments. */
  recipient: string;
  /** Smallest invoice total it takes. */
  minAmount: string | number | null;
  /** Largest invoice total it takes. */
  maxAmount: string | number | null;
  /** Markup in percent. */
  markup: string | number | null;
  /** Discount in percent. */
  discount: string | number | null;
  /** `default` or `confirmed`. */
  finality: string | null;
  /** `off` or `auto`. */
  gasless: string | null;
  /** Marked "Popular" in the checkout. */
  featured: boolean;
}

/** The billing period unit of a subscription. */
export type SubscriptionInterval = 'day' | 'week' | 'month' | 'year';

/**
 * State of a subscription: `trialing`, `incomplete` (its first or resumed period is unpaid), `active`, `past_due`,
 * `paused`, `canceled`, `ended`.
 */
export type SubscriptionStatus = 'trialing' | 'incomplete' | 'active' | 'past_due' | 'paused' | 'canceled' | 'ended';

/** What {@link PaymentsModule.createSubscription} takes: a plan, billed every period as one invoice. */
export type CreateSubscriptionParams = InvoiceLinesInput &
  InvoiceTermsInput & {
    /** Period unit. */
    interval: SubscriptionInterval;
    /** Units per period; a period is at most one year. Defaults to `1`. */
    intervalCount?: number;
    /** Days before the first period starts. */
    trialDays?: number;
    /** Periods to bill, then it ends; give it or `endsAt`. */
    cycles?: number;
    /** When it ends. */
    endsAt?: Date | string;
    /** `send_invoice` (default: the buyer pays each invoice) or `auto_charge` (an ERC-7715 permission). */
    collection?: 'send_invoice' | 'auto_charge';
    /** The payment method to charge or offer first. */
    preferredMethodId?: string;
    /** Days an invoice stays payable after its period starts. */
    graceDays?: number;
  };

/** The automatic-charge permission a buyer granted (ERC-7715), without its context. */
export interface SubscriptionPermission {
  /** Whether it can still be charged. */
  status: 'active' | 'revoked' | 'expired';
  /** CAIP-2 chain. */
  chainId: string | null;
  /** The payment method. */
  methodId: string | null;
  /** The buyer's CAIP-10 account. */
  payer: string | null;
  /** The token. */
  tokenAddress: string | null;
  /** Amount per window, in base units. */
  periodAmount: string | null;
  /** Window length. */
  periodSeconds: number;
  /** When the first window starts. */
  startsAt: string | null;
  /** When it expires. */
  expiresAt: string | null;
  /** When it was granted. */
  grantedAt: string | null;
  /** When it was revoked. */
  revokedAt: string | null;
}

/** A subscription as the Payments API returns it. */
export interface Subscription {
  /** Subscription ID. */
  id: string;
  /** Always `subscription`. */
  object: 'subscription';
  /** State. */
  status: SubscriptionStatus;
  /** Live or test. */
  environment: PaymentsEnvironment;
  /** The buyer. */
  buyer: Buyer | null;
  /** The CAIP-10 account you expect to pay. */
  expectedPayer: string | null;
  /** The plan's lines, as you sent them. */
  lineItems: InvoiceLineInput[];
  /** Currency. */
  currency: PaymentsCurrency;
  /** Period unit. */
  interval: SubscriptionInterval;
  /** Units per period. */
  intervalCount: number;
  /** Trial days. */
  trialDays: number;
  /** How it is collected. */
  collection: 'send_invoice' | 'auto_charge';
  /** The preferred payment method. */
  preferredMethodId: string | null;
  /** The automatic-charge permission, once granted. */
  permission: SubscriptionPermission | null;
  /** Grace days. */
  graceDays: number;
  /** The running period, from 1 (0 during a trial). */
  currentPeriod: number;
  /** Start of the running period. */
  currentPeriodStart: string | null;
  /** End of the running period. */
  currentPeriodEnd: string | null;
  /** Periods bought. */
  cycles: number | null;
  /** When it ends. */
  endsAt: string | null;
  /** Whether it is canceled when the running period ends. */
  cancelAtPeriodEnd: boolean;
  /** When it was canceled. */
  canceledAt: string | null;
  /** Why. */
  cancellationReason: string | null;
  /** When it was paused. */
  pausedAt: string | null;
  /** When it ended. */
  endedAt: string | null;
  /** Your data. */
  metadata: Record<string, unknown> | null;
  /** When it was created. */
  createdAt: string;
}

/** An automatic charge of a subscription period. */
export interface SubscriptionCharge {
  /** Charge ID. */
  id: string;
  /** Always `subscription_charge`. */
  object: 'subscription_charge';
  /** The invoice it pays. */
  invoiceId: string;
  /** The period. */
  period: number | null;
  /**
   * `pending` (waits for its window or a retry), `sending`, `submitted` (its transaction settles the invoice like any
   * payment), `failed` or `canceled`.
   */
  status: 'pending' | 'sending' | 'submitted' | 'failed' | 'canceled';
  /** Why it failed (a stable code). */
  reason: string | null;
  /** Attempts so far. */
  attempts: number;
  /** Amount in base units. */
  amount: string | null;
  /** CAIP-2 chain. */
  chainId: string | null;
  /** The user operation. */
  userOpHash: string | null;
  /** Its transaction. */
  txHash: string | null;
  /** Not before. */
  notBefore: string | null;
  /** When it finished. */
  finishedAt: string | null;
  /** When it was scheduled. */
  createdAt: string;
}

/** Paging of {@link PaymentsModule.listSubscriptionInvoices} and {@link PaymentsModule.listSubscriptionCharges}. */
export interface ListSubscriptionItemsParams {
  /** Page size, 1 to 100. Defaults to `20`. */
  limit?: number;
  /** `nextCursor` of the previous page. */
  cursor?: string;
}

/** Paging of {@link PaymentsModule.listInvoiceRefunds} and {@link PaymentsModule.listInvoiceDocuments}. */
export interface ListInvoiceItemsParams {
  /** Page size, 1 to 100. Defaults to `20`. */
  limit?: number;
  /** `nextCursor` of the previous page. */
  cursor?: string;
}

/** A started or resumed subscription with the invoice of its period and that invoice's payment page. */
export interface SubscriptionStart {
  /** The subscription. */
  subscription: Subscription;
  /** The invoice of its first (or resumed) period; `null` during a trial. */
  invoice: Invoice | null;
  /** That invoice's checkout token. */
  checkoutToken: string | null;
  /** That invoice's payment page. */
  payUrl: string | null;
}

/** Filters and paging of {@link PaymentsModule.listSubscriptions}. */
export interface ListSubscriptionsParams {
  /** One status or several. */
  status?: SubscriptionStatus | SubscriptionStatus[];
  /** Page size, 1 to 100. Defaults to `20`. */
  limit?: number;
  /** `nextCursor` of the previous page. */
  cursor?: string;
}

/** What {@link PaymentsModule.cancelSubscription} takes. */
export interface CancelSubscriptionParams {
  /** Cancel when the running period ends instead of now. */
  atPeriodEnd?: boolean;
  /** Why. */
  reason?: string;
}

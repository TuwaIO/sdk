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
   * Why a payment waits for, or was flagged to, the seller: `screening` (the sender did not pass the check after
   * paying; no details reach the buyer), `late` (it arrived after the invoice expired or was cancelled), `overpaid`.
   */
  review: { reason: 'screening' | 'late' | 'overpaid' } | null;
  /** What was refunded, in minor units (cents) of the invoice currency. */
  refundedTotalMinor: string | null;
  /**
   * The invoice that replaced this one after the seller corrected it: its number and, while it can be paid, its
   * checkout token.
   */
  replacedBy: { number: string | null; checkoutToken: string | null } | null;
  /** The subscription period this invoice bills; `null` for a one-off invoice. */
  subscription: CheckoutSubscription | null;
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
  /** The methods that take this invoice. */
  methods: CheckoutMethod[];
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
  /** Locks a quote for a method and, when connected, the payer (`POST quote`). */
  quote: (body: { methodId: string; payer?: string }) => Promise<CheckoutQuote>;
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
}

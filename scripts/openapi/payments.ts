/**
 * @file The Payments API (`/v1/payments`, secret key) and the checkout API (`/v1/payments/checkout/:token`, checkout
 * token) in the OpenAPI description, and the `payments.v1` webhook. Every response schema is checked against the type
 * `@tuwaio/quasar-sdk` returns for it (phantom type checks), so the description and the SDK cannot drift apart.
 */

import type { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import type {
  Invoice,
  InvoiceCorrection,
  InvoiceDetails,
  InvoiceLedger,
  InvoiceSeller,
  InvoiceWithCheckout,
  PaymentMethod,
  PaymentQuote,
  PaymentsList,
  PaymentWebhookEvent,
  Refund,
  RefundStart,
  Subscription,
  SubscriptionCharge,
  SubscriptionStart,
} from '../../packages/quasar-sdk/src';
import type {
  CheckoutQuote,
  CheckoutRejectedPayment,
  CheckoutStatusEvent,
  CheckoutView,
  PayerProofConfirmation,
  PayerProofMessage,
} from '../../packages/quasar-sdk/src/checkout';

const P = '/v1/payments';
const dateTime = (description: string) => z.string().openapi({ format: 'date-time', description });
const money = (description: string) => z.string().openapi({ description, example: '49.00' });

/**
 * Registers the schemas, routes and webhook of Payments.
 *
 * @param registry - The registry of the description.
 * @param secretKey - Name of the secret key security scheme.
 */
export function registerPayments(registry: OpenAPIRegistry, secretKey: string): void {
  // -------------------------------------------------------------------------
  // Enums and shared parts
  // -------------------------------------------------------------------------
  const Currency = z.enum(['USD', 'EUR']).openapi('PaymentsCurrency', { description: 'Fiat currency.' });
  const Locale = z
    .enum(['en', 'zh-CN', 'es', 'ru', 'uk', 'it'])
    .openapi('InvoiceLocale', { description: 'Language of the invoice, its documents and emails.' });
  const TaxCategory = z.enum(['S', 'Z', 'E', 'AE', 'K', 'G', 'O']).openapi('TaxCategory', {
    description:
      'VAT category (EN 16931 UNCL5305): `S` standard, `Z` zero rated, `E` exempt (needs `taxExemptionReason`), `AE` reverse charge, `K` intra-community, `G` export, `O` outside the scope of VAT.',
  });
  const InvoiceStatus = z
    .enum(['open', 'processing', 'paid', 'underpaid', 'held', 'partially_refunded', 'refunded', 'expired', 'cancelled'])
    .openapi('InvoiceStatus', {
      description:
        '`open` until paid; `processing` while a payment is confirmed; `paid`, `underpaid` (the buyer may top it up), `held` (released or refunded by the merchant), `partially_refunded`, `refunded`; `expired` or `cancelled` without a payment (`expired` up to 30 minutes after `dueAt` while a payment sent before it confirms; a payment that still arrives later makes it `held`, `late`).',
    });
  const Environment = z.enum(['live', 'test']).openapi('PaymentsEnvironment', {
    description: 'Live or test: the key that issued it decides. Test invoices are paid on test networks.',
  });

  const PaymentsError = z
    .object({
      error: z
        .object({
          code: z.string().openapi({ description: 'Stable code, for example `invoice_not_found`.' }),
          message: z.string(),
          issues: z
            .array(z.object({ path: z.string(), message: z.string() }))
            .optional()
            .openapi({ description: 'The fields at fault of an `invalid_request`, for example `buyer.country`.' }),
        })
        .catchall(z.unknown()),
    })
    .openapi('PaymentsError', {
      description: 'A refused Payments call: `{ error: { code, message, issues?, … } }` with its HTTP status.',
    });
  registry.register('PaymentsError', PaymentsError);
  const refused = (description: string) => ({
    description,
    content: { 'application/json': { schema: PaymentsError } },
  });
  // The engine checks the key and the app before the Payments API answers, and refuses in the NestJS shape
  const KeyRefusal = z
    .object({
      statusCode: z.number().int(),
      error: z.string(),
      message: z.string(),
    })
    .openapi('KeyRefusal', {
      description:
        'A refusal of the key or the app before the Payments API answers: `401` for a missing or unknown key; `403` for a public key on a write, a disabled app, an app being deleted, or an IP address or origin the app does not allow.',
    });
  registry.register('KeyRefusal', KeyRefusal);

  const Buyer = z
    .object({
      name: z.string().optional(),
      email: z
        .string()
        .optional()
        .openapi({ description: 'Quasar Cloud sends the invoice, receipt and credit notes to it.' }),
      addressLine1: z.string().optional(),
      addressLine2: z.string().optional(),
      postalCode: z.string().optional(),
      city: z.string().optional(),
      region: z.string().optional(),
      country: z.string().optional().openapi({ description: 'ISO 3166-1 alpha-2, for example `DE`.' }),
      registrationNumber: z.string().optional(),
      taxId: z.string().optional().openapi({ description: 'Needed for a reverse-charge invoice.' }),
      externalId: z.string().optional().openapi({ description: 'Your ID of the buyer; filter invoices by it.' }),
    })
    .openapi('Buyer', {
      description:
        'The buyer (EN 16931 BT-44 to BT-55). An e-invoice is issued only when the fields it needs are there; otherwise the invoice is a plain PDF and `eInvoiceSkipped` names what was missing.',
    });

  const LineInput = z
    .object({
      name: z.string(),
      description: z.string().optional(),
      quantity: z.string().optional().openapi({ description: 'Defaults to `1`.' }),
      unitPrice: money('Price of one unit in the invoice currency.'),
      taxCategory: TaxCategory.optional(),
      taxRate: z.string().optional().openapi({ description: 'VAT rate in percent, for example `21`.' }),
      unitCode: z.string().optional().openapi({ description: 'UN/ECE Recommendation 20 unit code (`C62`, `HUR`).' }),
    })
    .openapi('InvoiceLineInput');

  const terms = {
    lineItems: z.array(LineInput).optional().openapi({ description: 'The lines, 1 to 100; or give `amount`.' }),
    amount: money('A total as one line; or give `lineItems`.').optional(),
    description: z.string().optional().openapi({ description: 'Name of the `amount` line.' }),
    currency: Currency.optional(),
    locale: Locale.optional(),
    buyer: Buyer.optional(),
    expectedPayer: z.string().optional().openapi({ description: 'CAIP-10 account you expect to pay.' }),
    buyerReference: z.string().optional().openapi({ description: 'BT-10.' }),
    orderReference: z.string().optional().openapi({ description: 'BT-13.' }),
    metadata: z
      .record(z.string(), z.unknown())
      .optional()
      .openapi({ description: 'Your data, at most 8 KiB as JSON.' }),
    successUrl: z.string().optional(),
    cancelUrl: z.string().optional(),
    notes: z.string().optional(),
    pricesIncludeTax: z.boolean().optional(),
    reverseCharge: z.boolean().optional(),
    taxExemptionReason: z.string().optional(),
  };

  // -------------------------------------------------------------------------
  // Invoices
  // -------------------------------------------------------------------------
  const InvoiceLine = z.object({
    name: z.string(),
    description: z.string().optional(),
    quantity: z.string(),
    unitPrice: z.string(),
    taxCategory: TaxCategory,
    taxRate: z.string(),
    net: z.string(),
    unitCode: z.string().optional(),
  });

  const text = z.string().nullable().optional();
  const InvoiceSeller = z
    .object({
      legalName: text,
      tradingName: text,
      address: text.openapi({ description: 'The postal address as one text, as the checkout shows it.' }),
      addressLine1: text,
      addressLine2: text,
      postalCode: text,
      city: text,
      country: text.openapi({ description: 'ISO 3166-1 alpha-2.' }),
      registrationNumber: text,
      taxId: text,
      supportEmail: text,
      website: text,
    })
    .openapi('InvoiceSeller', {
      description:
        "The seller as printed, from the app's payment settings when the invoice was issued. Invoices issued before the address had its parts carry only `address`.",
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkSeller: z.ZodType<InvoiceSeller> = InvoiceSeller;

  const Invoice = z
    .object({
      id: z.string(),
      object: z.literal('invoice'),
      number: z.string().nullable().openapi({ description: 'Series number; `TEST-` for test invoices.' }),
      status: InvoiceStatus,
      environment: Environment.nullable(),
      currency: Currency,
      locale: Locale.nullable(),
      issuedAt: dateTime('When it was issued.').nullable(),
      supplyDate: dateTime('Date of supply (BT-72).').nullable(),
      dueAt: dateTime(
        'When it stops being payable. A payment Quasar learned of before it (handed over to `/submit` or `/relay`, or a Solana Pay transfer in a block before it: an invoice quoted in a Solana method stays open until Quasar has read its Solana Pay reference at least 30 seconds past `dueAt`) may still confirm for up to 30 minutes after it: the invoice stays payable meanwhile, so `expired` and the `invoice.expired` webhook can come up to 30 minutes after `dueAt`. Confirmed in time, it pays the invoice as usual, except in an asset not pegged to the invoice currency when its block is more than 60 seconds past the end of the locked quote (`held`, `quote_expired`). A payment handed over after `dueAt`, or one that confirms after the invoice expired (Quasar reads a payment whose tracker lost sight of it again for 24 hours), is held as late, with its AML screening.',
      ).nullable(),
      seller: InvoiceSeller.nullable(),
      buyer: Buyer.extend({ companyInvoice: z.boolean().optional() }).nullable(),
      expectedPayer: z.string().nullable(),
      buyerReference: z.string().nullable(),
      orderReference: z.string().nullable(),
      lineItems: z.array(InvoiceLine),
      pricesIncludeTax: z.boolean().nullable(),
      subtotal: money('Total without VAT.'),
      taxTotal: money('VAT.'),
      rounding: money('Rounding.'),
      total: money('Total to pay.'),
      taxBreakdown: z.array(
        z.object({ taxCategory: TaxCategory, taxRate: z.string(), taxable: z.string(), tax: z.string() }),
      ),
      notes: z.string().nullable(),
      reverseCharge: z.boolean().nullable(),
      taxExemptionReason: z.string().nullable(),
      metadata: z.record(z.string(), z.unknown()).nullable(),
      successUrl: z.string().nullable(),
      cancelUrl: z.string().nullable(),
      checkoutToken: z.string().nullable().openapi({
        description: 'The checkout token while the invoice can be paid (`open`, `processing`, `underpaid`).',
      }),
      payUrl: z
        .string()
        .nullable()
        .openapi({ description: 'The payment page while it can be paid: the link its emails carry.' }),
      quote: z
        .object({
          methodId: z.string().nullable(),
          payer: z.string(),
          cryptoAmountExpected: z.string().nullable(),
          amountToSend: z.string().nullable(),
          lockedAt: z.string().nullable(),
          expiresAt: z.string().nullable(),
          rate: z.unknown(),
          reference: z.string().nullable(),
        })
        .nullable()
        .openapi({ description: 'The locked quote, once a buyer chose how to pay. Token amounts in base units.' }),
      settlement: z
        .object({
          methodId: z.string().nullable().openapi({
            description: 'The payment method paid with (`GET /methods`): its token and network read `amountPaid`.',
          }),
          chainId: z.string().nullable(),
          txHash: z.string(),
          blockRef: z.string().nullable(),
          amountPaid: z.string().nullable(),
          originWallet: z.string().nullable(),
          paidAt: z.string().nullable(),
          overpaid: z.string(),
        })
        .nullable()
        .openapi({ description: 'The payment, once there is one.' }),
      reviewReason: z.string().nullable().openapi({
        description:
          'Why the payment waits for you: `overpaid` when the app flags overpayments, `quote_expired` when it arrived after its locked quote expired (in an asset not pegged to the invoice currency, a block more than 60 seconds past the end of the quote), `payer_mismatch` when Quasar could tie it to no invoice (it came from another wallet than the quoted one, or from that wallet, which never confirmed the invoice with a payer proof): it can only be refunded to the wallet that sent it, never released. A payment held because it came late (handed over after `dueAt`, or arrived after the invoice expired or was cancelled) has no reason here: the ledger marks it `late` (screened like any payment: a sender the screening blocks waits as an AML hold).',
      }),
      aml: z.object({ status: z.string(), reasons: z.array(z.string()), coverage: z.string().nullable() }).nullable(),
      receiptNumber: z.string().nullable(),
      eInvoiceSkipped: z.array(z.string()).nullable().openapi({
        description:
          'What the e-invoice lacked when the invoice was issued as a plain PDF, for example `buyer.country`.',
      }),
      refundedTotal: money('Refunded so far.'),
      replaces: z.string().nullable(),
      replacedBy: z.string().nullable(),
      subscriptionId: z.string().nullable(),
      period: z.number().nullable(),
      createdAt: dateTime('When it was created.'),
      updatedAt: dateTime('When it last changed.'),
    })
    .openapi('Invoice', {
      description:
        'An invoice. Fiat amounts are decimal strings in the invoice currency; token amounts are in base units.',
    });
  // PHANTOM TYPE CHECK: Enforces alignment with the Invoice type of @tuwaio/quasar-sdk
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkInvoice: z.ZodType<Invoice> = Invoice;
  registry.register('Invoice', Invoice);

  const Refund = z
    .object({
      id: z.string(),
      object: z.literal('refund'),
      invoiceId: z.string(),
      status: z.enum(['requested', 'submitted', 'confirmed', 'failed']),
      amount: z.string(),
      currency: z.string(),
      mode: z.enum(['fiat_value', 'exact_received']),
      cryptoAmount: z.string(),
      assetId: z.string(),
      chainId: z.string(),
      to: z.string().openapi({ description: 'The payer: refunds go back to the address that paid.' }),
      txHash: z.string().nullable(),
      from: z.string().nullable(),
      reason: z.string().nullable(),
      failureReason: z.string().nullable(),
      creditNoteNumber: z.string().nullable(),
      createdAt: z.string(),
      confirmedAt: z.string().nullable(),
    })
    .openapi('Refund');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkRefund: z.ZodType<Refund> = Refund;
  registry.register('Refund', Refund);

  const InvoiceDetails = Invoice.extend({
    refunds: z.array(Refund),
    creditNotes: z.array(z.object({ number: z.string(), refundId: z.string().nullable(), issuedAt: z.string() })),
  }).openapi('InvoiceDetails');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkInvoiceDetails: z.ZodType<InvoiceDetails> = InvoiceDetails;

  const InvoiceWithCheckout = z
    .object({ invoice: Invoice, checkoutToken: z.string().nullable(), payUrl: z.string().nullable() })
    .openapi('InvoiceWithCheckout');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkWithCheckout: z.ZodType<InvoiceWithCheckout> = InvoiceWithCheckout;

  const InvoiceCorrection = InvoiceWithCheckout.extend({ replaced: Invoice }).openapi('InvoiceCorrection');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkCorrection: z.ZodType<InvoiceCorrection> = InvoiceCorrection;

  const listOf = <T extends z.ZodType>(item: T, name: string) =>
    z
      .object({ object: z.literal('list'), data: z.array(item), nextCursor: z.string().nullable() })
      .openapi(name, { description: 'A page, newest first; pass `nextCursor` as `cursor` for the next.' });
  const InvoiceList = listOf(Invoice, 'InvoiceList');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkInvoiceList: z.ZodType<PaymentsList<Invoice>> = InvoiceList;

  const InvoiceLedger = z
    .object({
      object: z.literal('list'),
      data: z.array(
        z.object({
          id: z.string(),
          seq: z.number(),
          type: z.string(),
          data: z.unknown(),
          actor: z.string(),
          chainId: z.string().nullable(),
          txHash: z.string().nullable(),
          createdAt: z.string(),
          prevHash: z.string().nullable(),
          hash: z.string(),
        }),
      ),
      total: z.number().int().openapi({ description: 'How many steps the whole ledger has.' }),
      nextCursor: z.string().nullable().openapi({ description: 'Pass it as `cursor` for the next page.' }),
      summary: z
        .object({
          createdBy: z.string().nullable(),
          stepTimes: z.object({ quoted: z.string().nullable(), receipt: z.string().nullable() }),
        })
        .openapi({
          description:
            'Who created the invoice (the actor of `invoice.issued`) and when its first quote was locked and its receipt issued.',
        }),
      verification: z
        .union([
          z.object({ valid: z.literal(true), events: z.number() }),
          z.object({ valid: z.literal(false), seq: z.number(), reason: z.enum(['sequence', 'link', 'hash', 'head']) }),
        ])
        .optional(),
    })
    .openapi('InvoiceLedger', {
      description:
        'A page of the ledger, oldest first: each step hashes itself with `prevHash`. `verification` (the whole chain) with `?verify=true`.',
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkLedger: z.ZodType<InvoiceLedger> = InvoiceLedger;

  const RefundStart = z
    .object({
      refund: Refund,
      instructions: z.object({
        chainId: z.string(),
        assetId: z.string(),
        to: z.string().nullable(),
        amount: z.string(),
        decimals: z.number(),
        symbol: z.string(),
      }),
    })
    .openapi('RefundStart', { description: 'The refund and the transfer to make from your wallet.' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkRefundStart: z.ZodType<RefundStart> = RefundStart;

  const PaymentQuote = z
    .object({
      object: z.literal('quote'),
      methodId: z.string(),
      symbol: z.string(),
      chainId: z.string(),
      amount: z.string(),
      currency: Currency,
      cryptoAmount: z.string(),
      amountToSend: z.string(),
      transferFee: z
        .object({ bps: z.number(), maxFee: z.string().nullable(), source: z.enum(['contract', 'method']) })
        .nullable(),
      decimals: z.number(),
      markupBps: z.number(),
      discountBps: z.number(),
      rates: z.unknown(),
      quotedAt: z.string(),
    })
    .openapi('PaymentQuote');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkQuote: z.ZodType<PaymentQuote> = PaymentQuote;

  const PaymentMethod = z
    .object({
      id: z.string(),
      object: z.literal('payment_method'),
      name: z.string(),
      symbol: z.string(),
      chainId: z.string().openapi({ description: 'CAIP-2 chain ID.' }),
      assetId: z.string().nullable().openapi({ description: 'CAIP-19 asset ID.' }),
      decimals: z.number(),
      recipient: z.string(),
      minAmount: z.union([z.string(), z.number()]).nullable(),
      maxAmount: z.union([z.string(), z.number()]).nullable(),
      markup: z.union([z.string(), z.number()]).nullable(),
      discount: z.union([z.string(), z.number()]).nullable(),
      finality: z.string().nullable(),
      gasless: z.string().nullable(),
      featured: z.boolean().openapi({ description: 'Marked "Popular" in the checkout.' }),
    })
    .openapi('PaymentMethod');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkMethod: z.ZodType<PaymentMethod> = PaymentMethod;

  // -------------------------------------------------------------------------
  // Subscriptions
  // -------------------------------------------------------------------------
  const SubscriptionStatus = z
    .enum(['trialing', 'incomplete', 'active', 'past_due', 'paused', 'canceled', 'ended'])
    .openapi('SubscriptionStatus');
  const Interval = z.enum(['day', 'week', 'month', 'year']);
  const Subscription = z
    .object({
      id: z.string(),
      object: z.literal('subscription'),
      status: SubscriptionStatus,
      environment: Environment,
      buyer: Buyer.nullable(),
      expectedPayer: z.string().nullable(),
      lineItems: z.array(LineInput),
      currency: Currency,
      interval: Interval,
      intervalCount: z.number(),
      trialDays: z.number(),
      collection: z.enum(['send_invoice', 'auto_charge']),
      preferredMethodId: z.string().nullable(),
      permission: z
        .object({
          status: z.enum(['active', 'revoked', 'expired']),
          chainId: z.string().nullable(),
          methodId: z.string().nullable(),
          payer: z.string().nullable(),
          tokenAddress: z.string().nullable(),
          periodAmount: z.string().nullable(),
          periodSeconds: z.number(),
          startsAt: z.string().nullable(),
          expiresAt: z.string().nullable(),
          grantedAt: z.string().nullable(),
          revokedAt: z.string().nullable(),
        })
        .nullable()
        .openapi({ description: 'The ERC-7715 permission of `auto_charge`, without its context.' }),
      graceDays: z.number(),
      currentPeriod: z.number(),
      currentPeriodStart: z.string().nullable(),
      currentPeriodEnd: z.string().nullable(),
      cycles: z.number().nullable(),
      endsAt: z.string().nullable(),
      cancelAtPeriodEnd: z.boolean(),
      canceledAt: z.string().nullable(),
      cancellationReason: z.string().nullable(),
      pausedAt: z.string().nullable(),
      endedAt: z.string().nullable(),
      metadata: z.record(z.string(), z.unknown()).nullable(),
      createdAt: z.string(),
    })
    .openapi('Subscription', { description: 'A subscription: each period is one invoice.' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkSubscription: z.ZodType<Subscription> = Subscription;
  registry.register('Subscription', Subscription);

  const SubscriptionCharge = z
    .object({
      id: z.string(),
      object: z.literal('subscription_charge'),
      invoiceId: z.string(),
      period: z.number().nullable(),
      status: z.enum(['pending', 'sending', 'submitted', 'failed', 'canceled']),
      reason: z.string().nullable(),
      attempts: z.number(),
      amount: z.string().nullable(),
      chainId: z.string().nullable(),
      userOpHash: z.string().nullable(),
      txHash: z.string().nullable(),
      notBefore: z.string().nullable(),
      finishedAt: z.string().nullable(),
      createdAt: z.string(),
    })
    .openapi('SubscriptionCharge', { description: 'An automatic charge of a subscription period.' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkSubscriptionCharge: z.ZodType<SubscriptionCharge> = SubscriptionCharge;

  const SubscriptionStart = z
    .object({
      subscription: Subscription,
      invoice: Invoice.nullable(),
      checkoutToken: z.string().nullable(),
      payUrl: z.string().nullable(),
    })
    .openapi('SubscriptionStart', {
      description: 'The subscription and the invoice of its first (or resumed) period; `null` during a trial.',
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkSubscriptionStart: z.ZodType<SubscriptionStart> = SubscriptionStart;
  const SubscriptionList = listOf(Subscription, 'SubscriptionList');
  const SubscriptionChargeList = listOf(SubscriptionCharge, 'SubscriptionChargeList');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkSubscriptionChargeList: z.ZodType<PaymentsList<SubscriptionCharge>> = SubscriptionChargeList;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkSubscriptionList: z.ZodType<PaymentsList<Subscription>> = SubscriptionList;

  // -------------------------------------------------------------------------
  // Merchant routes
  // -------------------------------------------------------------------------
  const security = [{ [secretKey]: [] }];
  const idParam = (name: string, description: string) => z.object({ [name]: z.string().openapi({ description }) });
  const idempotencyHeader = z.object({
    'Idempotency-Key': z.string().optional().openapi({
      description:
        '1–255 characters: a retry with the same key returns what the first call created, with the same link.',
    }),
  });
  const json = <T extends z.ZodType>(schema: T) => ({ content: { 'application/json': { schema } } });
  const forbidden = (codes: string) => ({
    description: `${codes}; or a \`KeyRefusal\` of the key or the app.`,
    content: { 'application/json': { schema: z.union([PaymentsError, KeyRefusal]) } },
  });
  const common = {
    401: { description: 'Missing or invalid key.', ...json(KeyRefusal) },
    403: forbidden(
      '`secret_key_required` (a public key), `not_a_payments_app`, `payments_disabled` (the node does not run Payments for the organization)',
    ),
    429: { description: 'The rate limit of the organization.' },
  };
  const invalid = (codes = '') => refused(`\`invalid_request\` with \`issues\`${codes ? `, ${codes}` : ''}.`);
  const route = (
    method: 'get' | 'post',
    path: string,
    tag: string,
    summary: string,
    description: string,
    extra: Pick<RouteConfig, 'request' | 'responses'>,
  ) => registry.registerPath({ method, path: `${P}${path}`, tags: [tag], summary, description, security, ...extra });

  const CreateInvoiceRequest = z
    .object({
      ...terms,
      dueAt: dateTime(
        'When it stops being payable; or give `expiresInMinutes`. A payment sent before it may still confirm for up to 30 minutes after it.',
      ).optional(),
      expiresInMinutes: z.number().int().optional().openapi({ description: 'From 5 minutes to 90 days.' }),
      supplyDate: dateTime('Date of supply. Defaults to the issue date.').optional(),
    })
    .openapi('CreateInvoiceRequest');

  route(
    'post',
    '/invoices',
    'Invoices',
    'Issue an invoice',
    'Issues a numbered invoice with its PDF (and e-invoice, when on and the buyer details allow) and sends `invoice.issued`. Used by `quasar.payments.createInvoice`.',
    {
      request: { headers: idempotencyHeader, body: { ...json(CreateInvoiceRequest), required: true } },
      responses: {
        201: { description: 'The invoice, its checkout token and payment page.', ...json(InvoiceWithCheckout) },
        400: refused(
          '`invalid_request` with `issues`, `seller_details_missing`, `buyer_reference_required`, `invalid_idempotency_key`…',
        ),
        ...common,
      },
    },
  );
  route('get', '/invoices', 'Invoices', 'List invoices', 'Newest first. Used by `quasar.payments.listInvoices`.', {
    request: {
      query: z.object({
        status: z.string().optional().openapi({ description: 'One status or several, comma-separated.' }),
        environment: Environment.optional(),
        externalId: z.string().optional(),
        createdAfter: z.string().optional(),
        createdBefore: z.string().optional(),
        limit: z.number().int().optional().openapi({ description: '1 to 100. Defaults to 20.' }),
        cursor: z.string().optional(),
      }),
    },
    responses: {
      200: { description: 'A page.', ...json(InvoiceList) },
      400: refused('`invalid_request`, `invalid_cursor`.'),
      ...common,
    },
  });
  route(
    'get',
    '/invoices/{id}',
    'Invoices',
    'Read an invoice',
    'With its refunds and credit notes. Used by `quasar.payments.getInvoice`.',
    {
      request: { params: idParam('id', 'Invoice ID.') },
      responses: {
        200: { description: 'The invoice.', ...json(InvoiceDetails) },
        404: refused('`invoice_not_found`.'),
        ...common,
      },
    },
  );
  for (const [action, summary, description, body, conflict] of [
    [
      'cancel',
      'Cancel an invoice',
      'An open invoice stops being payable; its number stays taken.',
      z.object({ reason: z.string().optional() }),
      '`invoice_not_cancellable`, `invoice_processing`: a payment is being confirmed.',
    ],
    [
      'release',
      'Release a held payment',
      'The invoice becomes paid and the buyer gets a receipt. A payment Quasar could tie to no invoice (`reviewReason` `payer_mismatch`: from another wallet than the quoted payer, or from one that never confirmed the invoice) is never released: anyone may hand over for their own invoice a transaction hash they saw on the network, so refund it to the wallet that sent it (`originWallet`).',
      z.object({ reason: z.string() }),
      '`invoice_not_held`, `invoice_partly_refunded` (refund the rest), `payer_mismatch_refund_only` (a payment tied to no invoice: refund it).',
    ],
  ] as const) {
    route('post', `/invoices/{id}/${action}`, 'Invoices', summary, description, {
      request: { params: idParam('id', 'Invoice ID.'), body: json(body) },
      responses: {
        200: { description: 'The invoice.', ...json(Invoice) },
        400: invalid(),
        404: refused('`invoice_not_found`.'),
        409: refused(conflict),
        ...common,
      },
    });
  }
  route(
    'post',
    '/invoices/{id}/correct',
    'Invoices',
    'Correct the buyer details',
    "A credit note for the invoice and a new invoice with the corrected buyer; a paid invoice's payment carries over.",
    {
      request: {
        params: idParam('id', 'Invoice ID.'),
        body: json(z.object({ buyer: Buyer.optional(), reason: z.string().optional() })),
      },
      responses: {
        201: {
          description: 'The new invoice (with its checkout while open) and the replaced one.',
          ...json(InvoiceCorrection),
        },
        400: invalid(),
        404: refused('`invoice_not_found`.'),
        409: refused(
          '`invoice_not_correctable`, `invoice_replaced` (correct its replacement), `document_not_issued`, `invoice_processing`.',
        ),
        ...common,
      },
    },
  );
  route(
    'post',
    '/invoices/{id}/checkout',
    'Invoices',
    'Replace the payment link',
    'A new checkout token and payment page; the earlier link stops working, also in emails already sent. The current link is in the invoice (`payUrl`).',
    {
      request: { params: idParam('id', 'Invoice ID.') },
      responses: {
        200: { description: 'The invoice with its new token and page.', ...json(InvoiceWithCheckout) },
        404: refused('`invoice_not_found`.'),
        409: refused('`invoice_not_open`.'),
        ...common,
      },
    },
  );
  route(
    'get',
    '/invoices/{id}/events',
    'Invoices',
    'Read the ledger',
    'Every step of the invoice, chained by hashes, oldest first, up to 100 a page.',
    {
      request: {
        params: idParam('id', 'Invoice ID.'),
        query: z.object({
          verify: z
            .enum(['true', 'false'])
            .optional()
            .openapi({ description: '`true` checks the whole hash chain, whatever the page.' }),
          limit: z
            .number()
            .int()
            .min(1)
            .max(100)
            .optional()
            .openapi({ description: 'Page size, 1 to 100 (default 100).' }),
          cursor: z.string().optional().openapi({ description: '`nextCursor` of the previous page.' }),
        }),
      },
      responses: {
        200: { description: 'The ledger.', ...json(InvoiceLedger) },
        404: refused('`invoice_not_found`.'),
        ...common,
      },
    },
  );
  const file = (description: string) => ({
    description,
    content: {
      'application/pdf': { schema: z.string().openapi({ format: 'binary' }) },
      'application/xml': { schema: z.string().openapi({ format: 'binary' }) },
    },
  });
  route(
    'get',
    '/invoices/{id}/documents/{kind}',
    'Invoices',
    'Download a document',
    'The stored invoice or receipt, byte for byte as issued.',
    {
      request: {
        params: z.object({
          id: z.string(),
          kind: z
            .enum(['invoice', 'receipt', 'invoice.xml'])
            .openapi({ description: '`invoice.xml` is the UBL e-invoice.' }),
        }),
      },
      responses: { 200: file('The file.'), 404: refused('`invoice_not_found`, `document_not_found`.'), ...common },
    },
  );
  route(
    'get',
    '/invoices/{id}/documents/credit-note/{ref}',
    'Refunds',
    'Download a credit note',
    'By the refund it credits or its number; add `.xml` for the UBL.',
    {
      request: { params: z.object({ id: z.string(), ref: z.string() }) },
      responses: { 200: file('The file.'), 404: refused('`document_not_found`.'), ...common },
    },
  );
  route(
    'post',
    '/invoices/{id}/refunds',
    'Refunds',
    'Ask for a refund',
    'Prices the refund; send the amount from your wallet to the payer, then submit the transaction.',
    {
      request: {
        params: idParam('id', 'Invoice ID.'),
        body: json(
          z.object({
            amount: z
              .string()
              .optional()
              .openapi({ description: 'In the invoice currency; everything left when omitted.' }),
            mode: z.enum(['fiat_value', 'exact_received']).optional(),
            reason: z.string().optional(),
          }),
        ),
      },
      responses: {
        201: { description: 'The refund and what to send where.', ...json(RefundStart) },
        400: invalid('`amount_exceeds_refundable`, `held_refund_must_be_whole`'),
        404: refused('`invoice_not_found`.'),
        409: refused(
          '`invoice_not_refundable`, `exact_refund_needs_whole_invoice`, `payment_unknown`: the payment to refund is not known; `payment_credited_elsewhere`: a refund-only hold whose transfer paid another invoice since (`invoice.hold_voided`), nothing to refund.',
        ),
        ...common,
      },
    },
  );
  route('get', '/refunds/{id}', 'Refunds', 'Read a refund', 'Used by `quasar.payments.getRefund`.', {
    request: { params: idParam('id', 'Refund ID.') },
    responses: { 200: { description: 'The refund.', ...json(Refund) }, 404: refused('`refund_not_found`.'), ...common },
  });
  route(
    'post',
    '/refunds/{id}/submit',
    'Refunds',
    'Submit the refund transaction',
    'Once final, the refund is confirmed, its credit note issued and `refund.confirmed` sent.',
    {
      request: { params: idParam('id', 'Refund ID.'), body: json(z.object({ txHash: z.string(), from: z.string() })) },
      responses: {
        202: { description: 'The refund, `submitted`.', ...json(Refund) },
        400: invalid('`invalid_transaction`, `invalid_sender`: the transaction must come from the app wallet'),
        404: refused('`refund_not_found`.'),
        409: refused(
          "`refund_not_submittable`; `transaction_already_used`: an invoice credited the transaction as a payment (one handed over as a payment through a checkout that paid nothing becomes the refund's).",
        ),
        ...common,
      },
    },
  );
  route(
    'post',
    '/quotes',
    'Invoices',
    'Price an amount',
    'The price of an amount in a payment method now; nothing is locked.',
    {
      request: {
        body: json(z.object({ amount: z.string(), currency: Currency.optional(), methodId: z.string() })),
      },
      responses: {
        200: { description: 'The price.', ...json(PaymentQuote) },
        400: invalid(),
        404: refused('`method_not_found`.'),
        409: refused('`method_not_priced`: the method has no price source.'),
        503: refused('`price_unavailable`: no fresh price now.'),
        ...common,
      },
    },
  );
  route('get', '/methods', 'Invoices', 'List payment methods', 'The active methods of the app, in their order.', {
    responses: {
      200: {
        description: 'The methods.',
        ...json(z.object({ object: z.literal('list'), data: z.array(PaymentMethod) })),
      },
      ...common,
    },
  });

  const CreateSubscriptionRequest = z
    .object({
      ...terms,
      interval: Interval,
      intervalCount: z.number().int().optional().openapi({ description: 'A period is at most one year.' }),
      trialDays: z.number().int().optional(),
      cycles: z.number().int().optional(),
      endsAt: z.string().optional(),
      collection: z.enum(['send_invoice', 'auto_charge']).optional(),
      preferredMethodId: z.string().optional(),
      graceDays: z.number().int().optional(),
    })
    .openapi('CreateSubscriptionRequest');
  route(
    'post',
    '/subscriptions',
    'Subscriptions',
    'Start a subscription',
    "Each period is one invoice, paid like any invoice (`send_invoice`) or charged with the buyer's ERC-7715 permission (`auto_charge`).",
    {
      request: { headers: idempotencyHeader, body: { ...json(CreateSubscriptionRequest), required: true } },
      responses: {
        201: { description: 'The subscription and its first invoice.', ...json(SubscriptionStart) },
        400: invalid('`invalid_lines`, `method_not_found`, `auto_charge_unavailable` (with `reason`)'),
        ...common,
        403: forbidden(
          '`subscriptions_disabled` (the app turned subscriptions off), `secret_key_required`, `not_a_payments_app`, `payments_disabled`',
        ),
      },
    },
  );
  route('get', '/subscriptions', 'Subscriptions', 'List subscriptions', 'Newest first.', {
    request: {
      query: z.object({
        status: z.string().optional().openapi({ description: 'One status or several, comma-separated.' }),
        limit: z.number().int().optional(),
        cursor: z.string().optional(),
      }),
    },
    responses: { 200: { description: 'A page.', ...json(SubscriptionList) }, ...common },
  });
  route(
    'get',
    '/subscriptions/{id}',
    'Subscriptions',
    'Read a subscription',
    'Its invoices and charges are lists of their own.',
    {
      request: { params: idParam('id', 'Subscription ID.') },
      responses: {
        200: { description: 'The subscription.', ...json(Subscription) },
        404: refused('`subscription_not_found`.'),
        ...common,
      },
    },
  );
  for (const [path, summary, description, list] of [
    ['invoices', 'List the invoices of a subscription', 'The invoices of its periods, newest first.', InvoiceList],
    [
      'charges',
      'List the automatic charges of a subscription',
      'Its automatic charges, newest first.',
      SubscriptionChargeList,
    ],
  ] as const) {
    route('get', `/subscriptions/{id}/${path}`, 'Subscriptions', summary, description, {
      request: {
        params: idParam('id', 'Subscription ID.'),
        query: z.object({
          limit: z
            .number()
            .int()
            .min(1)
            .max(100)
            .optional()
            .openapi({ description: 'Page size, 1 to 100 (default 20).' }),
          cursor: z.string().optional().openapi({ description: '`nextCursor` of the previous page.' }),
        }),
      },
      responses: {
        200: { description: 'A page.', ...json(list) },
        404: refused('`subscription_not_found`.'),
        ...common,
      },
    });
  }
  for (const [action, summary, description, response, conflict] of [
    [
      'cancel',
      'Cancel a subscription',
      'Now (its open invoices are cancelled) or, with `atPeriodEnd`, when the running period ends.',
      Subscription,
      '`subscription_not_active`.',
    ],
    [
      'cancel/undo',
      'Take back a scheduled cancellation',
      'The subscription renews again (`subscription.cancel_unscheduled`); a next-period invoice the cancellation cancelled is issued anew.',
      Subscription,
      '`subscription_not_active`: no cancellation is scheduled.',
    ],
    [
      'pause',
      'Pause a subscription',
      'Its open invoices are cancelled and no period is billed until it resumes.',
      Subscription,
      '`subscription_not_active`.',
    ],
    [
      'resume',
      'Resume a subscription',
      'A new period starts now and is invoiced at once.',
      SubscriptionStart,
      '`subscription_not_paused`, `subscription_over`: its cycles or end date are past.',
    ],
  ] as const) {
    route('post', `/subscriptions/{id}/${action}`, 'Subscriptions', summary, description, {
      request: {
        params: idParam('id', 'Subscription ID.'),
        ...(action === 'cancel'
          ? { body: json(z.object({ atPeriodEnd: z.boolean().optional(), reason: z.string().optional() })) }
          : {}),
      },
      responses: {
        200: { description: 'The subscription.', ...json(response) },
        ...(action === 'cancel' && { 400: invalid() }),
        404: refused('`subscription_not_found`.'),
        409: refused(conflict),
        ...common,
      },
    });
  }

  // -------------------------------------------------------------------------
  // Checkout (the buyer's browser, with the checkout token)
  // -------------------------------------------------------------------------
  const Instructions = z
    .discriminatedUnion('family', [
      z.object({
        family: z.literal('eip155'),
        chainId: z.number(),
        to: z.string(),
        token: z.string(),
        amount: z.string(),
        decimals: z.number(),
        symbol: z.string(),
      }),
      z.object({
        family: z.literal('solana'),
        chainId: z.string(),
        to: z.string(),
        token: z.string(),
        amount: z.string(),
        decimals: z.number(),
        symbol: z.string(),
        reference: z.string(),
        solanaPayUrl: z.string(),
      }),
    ])
    .openapi('PaymentInstructions', {
      description: 'What the wallet sends: the exact amount in base units to `to`; Solana transfers carry `reference`.',
    });
  const PayerProofKind = z.enum(['eoa', 'eip1271', 'eip6492', 'authorization']).openapi('PayerProofKind', {
    description:
      'How a wallet confirmed the invoice: `eoa` (an EIP-191 signature, valid on every EVM network), `eip1271` or `eip6492` (a smart wallet whose contract, deployed or not yet, accepted the signature on its network: valid there only), `authorization` (the EIP-3009 authorization of the gasless relay, on every EVM network).',
  });
  const RejectedPayment = z
    .object({
      txKey: z.string().openapi({
        description:
          "The transaction's `txKey`, or the `userOpHash` of a gasless relay that failed before it had a transaction.",
      }),
      reason: z.string().openapi({
        description:
          'Why: `reverted`, `cancelled`, `expired`, `no_matching_transfer`, `reference_missing`, `too_early`, `tx_already_used` (the transaction pays another invoice of the merchant: the one the wallet that sent it confirmed, or whose mark it carries, also when this invoice handed it over first or claimed it), `not_found`, `timeout`, `replaced`, `payer_mismatch` (a transfer from another wallet to an invoice paid or held already: one to a payable invoice is held for a refund only, `review.refundOnly`), `payer_unconfirmed` (the same from the quoted wallet, which never confirmed the invoice; final, `movedMoney`: it pays no invoice and the merchant returns it to the wallet that sent it), `native_from_contract_unverifiable`, `invoice_not_payable` (a transfer to an invoice paid, held or refunded already), `settlement_failed` (the network confirmed the transaction but Quasar has not recorded it yet: not final, `movedMoney`; Quasar settles it again daily for 30 days after it learned of it, while `rechecked`), `unresolved_after_24h` (final: no result seen on chain within 24 hours, only for a transaction Quasar read again after that day and the network does not have), a relay reason (`user_operation_lost`…), or `transaction_failed`.',
      }),
      final: z.boolean().openapi({
        description:
          'Whether the transaction can never pay the invoice: the buyer may pay again. A final one may still have moved money: read `movedMoney`.',
      }),
      userOpHash: z.string().optional().openapi({ description: 'The relay operation the transaction came from.' }),
      original: z
        .string()
        .optional()
        .openapi({ description: 'The transaction the checkout handed over, when this one replaced it (sped up).' }),
      movedMoney: z.literal(true).optional().openapi({
        description:
          'Set when the transaction succeeded on chain without paying the invoice (`no_matching_transfer`, `reference_missing`, `too_early`, `tx_already_used`, `payer_mismatch`, `payer_unconfirmed`, `native_from_contract_unverifiable`, `invoice_not_payable`), or Quasar has not recorded it yet (`settlement_failed`): it may have moved money, final or not. Never tell the buyer that it did not go through or that nothing was charged, and offer no plain second payment: say that this transaction does not pay the invoice (for `payer_mismatch` and `payer_unconfirmed`: that the merchant returns it to the wallet that sent it; for `settlement_failed`: that Quasar has not recorded it yet, and that it tries again daily only while `rechecked`; never offer a second payment for it), and to contact the merchant if money left the wallet.',
      }),
      rechecked: z.literal(true).optional().openapi({
        description:
          'Set while Quasar still reads the transaction again: a rejection for `not_found`, `timeout` or `replaced` of a payment Quasar learned of within the last 24 hours that nothing has resolved since (still unresolved after the 24 hours, it is closed with the final reason `unresolved_after_24h`), or a `settlement_failed` one Quasar still settles again daily (for 30 days after it learned of the payment). Only then may the page promise that Quasar checks the payment again. Any other rejection that is not `final` (a relay operation lost, `transaction_failed`, a transfer from another wallet…) is never read again: ask the buyer to contact the merchant with the transaction hash if money left the wallet.',
      }),
    })
    .openapi('CheckoutRejectedPayment');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkRejectedPayment: z.ZodType<CheckoutRejectedPayment> = RejectedPayment;
  const CheckoutQuote = z
    .object({
      object: z.literal('checkout_quote'),
      methodId: z.string(),
      payer: z.string().nullable(),
      cryptoAmountExpected: z.string(),
      amountToSend: z.string(),
      transferFee: z
        .object({ bps: z.number(), maxFee: z.string().nullable(), source: z.enum(['contract', 'method']) })
        .nullable(),
      decimals: z.number(),
      symbol: z.string(),
      lockedAt: z.string().nullable(),
      expiresAt: z.string().nullable(),
      reference: z.string().nullable(),
      rates: z.unknown(),
      markupBps: z.number(),
      discountBps: z.number(),
      instructions: Instructions,
      gasless: z
        .object({
          relay: z
            .object({
              typedData: z.object({
                domain: z.record(z.string(), z.unknown()),
                types: z.record(z.string(), z.array(z.object({ name: z.string(), type: z.string() }))),
                primaryType: z.string(),
                message: z.record(z.string(), z.string()),
              }),
            })
            .optional(),
          paymaster: z
            .object({ calls: z.array(z.object({ to: z.string(), value: z.string(), data: z.string() })) })
            .optional(),
        })
        .nullable()
        .openapi({
          description:
            'What the merchant sponsors: sign `relay.typedData` (EIP-3009) and post it to `relay`, or send `paymaster.calls` with the `paymaster` route as the ERC-7677 paymaster service.',
        }),
      payerProof: z
        .object({ required: z.boolean(), proven: z.boolean(), kind: PayerProofKind.nullable() })
        .optional()
        .openapi({
          description:
            'Whether the quoted wallet confirmed the invoice (`payer-proof`): `required` on an EVM method, `proven` once it did. An unconfirmed EVM quote exists only for a method the gasless relay may pay: the relay confirms the wallet itself, while a transfer or a paymaster payment from it needs `payer-proof` first, or Quasar credits it to no invoice and the merchant returns it.',
        }),
    })
    .openapi('CheckoutQuote', { description: 'A quote locked to the payer until `expiresAt`.' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkCheckoutQuote: z.ZodType<CheckoutQuote> = CheckoutQuote;

  const CheckoutView = z
    .object({
      object: z.literal('checkout'),
      merchant: z
        .object({
          name: z.string(),
          website: z.string().nullable().openapi({ description: 'http(s) link.' }),
          supportEmail: z.string().nullable(),
          logo: z.boolean().openapi({ description: 'Whether `GET /v1/payments/checkout/{token}/logo` serves a logo.' }),
          seller: z
            .object({
              legalName: z.string().nullable(),
              tradingName: z.string().nullable(),
              address: z.string().nullable(),
              country: z.string().nullable(),
              registrationNumber: z.string().nullable(),
              taxId: z.string().nullable(),
            })
            .nullable()
            .openapi({ description: 'The seller as the invoice document names them.' }),
          links: z
            .object({
              terms: z.string().nullable(),
              refundPolicy: z.string().nullable(),
              privacy: z.string().nullable(),
            })
            .openapi({ description: "The merchant's policies; http(s) links only." }),
          fundingUrl: z
            .string()
            .nullable()
            .openapi({ description: 'A page where buyers get the token, for a wallet with too little.' }),
        })
        .openapi({ description: 'Who is paid and on what terms.' }),
      theme: z
        .object({
          mode: z.enum(['system', 'light', 'dark']),
          accentColor: z.string().nullable().openapi({ description: '`#rrggbb`; `null` for the default.' }),
        })
        .openapi({ description: 'The look the merchant chose; `system` follows the buyer device.' }),
      invoice: z.object({
        id: z.string(),
        number: z.string().nullable(),
        status: InvoiceStatus,
        environment: Environment.nullable(),
        currency: Currency,
        total: z.union([z.string(), z.number()]),
        totalMinor: z.string().nullable(),
        lineItems: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            quantity: z.string(),
            unitPrice: z.string(),
            taxCategory: TaxCategory,
            taxRate: z.string(),
            netMinor: z.string(),
          }),
        ),
        locale: Locale.nullable(),
        dueAt: z.string().nullable().openapi({
          description:
            'When it stops being payable. A payment Quasar learned of before it (handed over to `/submit` or `/relay`, or a Solana Pay transfer in a block before it: an invoice quoted in a Solana method stays open until Quasar has read its Solana Pay reference at least 30 seconds past `dueAt`) may still confirm for up to 30 minutes after it: the invoice stays payable meanwhile, so `expired` and the `invoice.expired` webhook can come up to 30 minutes after `dueAt`. Confirmed in time, it pays the invoice as usual, except in an asset not pegged to the invoice currency when its block is more than 60 seconds past the end of the locked quote (`held`, `quote_expired`). A payment handed over after `dueAt`, or one that confirms after the invoice expired (Quasar reads a payment whose tracker lost sight of it again for 24 hours), is held as late, with its AML screening.',
        }),
        successUrl: z.string().nullable(),
        cancelUrl: z.string().nullable(),
        amountPaid: z.string().nullable().openapi({ description: 'Base units of the quoted asset received so far.' }),
        review: z
          .union([
            z.object({ reason: z.enum(['screening', 'late', 'overpaid', 'quote_expired']) }),
            z.object({ reason: z.enum(['payer_mismatch', 'payer_unconfirmed']), refundOnly: z.literal(true) }),
          ])
          .nullable()
          .openapi({
            description:
              'Why a payment waits for, or was flagged to, the seller. `screening`: the sender did not pass the AML check (also a late one). `payer_mismatch` and `payer_unconfirmed` with `refundOnly`: Quasar could tie the transfer to no invoice (another wallet than the quoted one, or that wallet without confirming the invoice): the seller only returns it to the wallet that sent it, never accepts it; tell the buyer so ("The payment came from another wallet than the one that confirmed this invoice; {merchant} returns it to the wallet that sent it. Pay from the confirmed wallet."), never that the seller checks it. A held invoice takes no other payment. Quasar versions before October 29, 2026 showed such a transfer as `screening`.',
          }),
        refundedTotalMinor: z.string().nullable().openapi({ description: 'Refunded, in minor units (cents).' }),
        pendingPayments: z.number().optional().openapi({
          description:
            'Payments of the invoice handed over and still on their way, whoever handed them over: tracked transactions not yet verified or rejected (recorded within the last 25 minutes), gasless relays still sending (within 35 minutes), and claims of this invoice on a transaction another invoice handed over first that Quasar has not decided yet (made within 25 minutes). A page that finds one on its way should not offer to pay.',
        }),
        rejectedTxKeys: z.array(z.string()).optional().openapi({
          description:
            'Every key a failed payment may be known by, latest first: the `txKey` of a rejected transaction, the hash the checkout handed over when a sped-up transaction replaced it, the `userOpHash` of a gasless relay. Read `rejectedPayments` for why.',
        }),
        rejectedPayments: z.array(RejectedPayment).optional().openapi({
          description:
            'The payments that failed, latest first (at most 10). `final`: the transaction can never pay the invoice (`reverted`, `cancelled`, `expired` Solana blockhash, `no_matching_transfer`, `reference_missing`, `too_early`, `tx_already_used`, `payer_unconfirmed`, `chain_mismatch`, `no_quote`, `no_payment_method`, a relay the bundler refused or never sent, `unresolved_after_24h`), so the buyer may pay again; otherwise (`not_found`, `timeout`, `replaced`, `payer_mismatch`, `settlement_failed`…) the money may still be on its way or with the merchant: ask the buyer to check the wallet before paying again (for `settlement_failed`, confirmed on chain, to contact the merchant and not pay again). `movedMoney`: the transaction went through without paying the invoice, or Quasar has not recorded it yet, and may have moved money. `rechecked`: Quasar still reads the transaction again (a `not_found`, `timeout` or `replaced` rejection, for 24 hours after Quasar learned of the payment, while `unresolvedPayments` counts it: if it arrives, it is recorded, paid within the grace, else held as late; once Quasar reports `unresolvedPayments` 0, such a rejection was resolved; a `settlement_failed` one for 30 days). A transaction sped up in the wallet is followed under its new hash and not rejected; `original` is the hash the checkout handed over.',
        }),
        paymentCountsUntil: z.string().nullable().optional().openapi({
          description:
            'While the invoice is payable and a payment Quasar learned of before `dueAt` is on its way: until when the invoice waits for it (`dueAt` plus 30 minutes); `null` otherwise. Say from it, not from the browser clock, that the payment was sent in time.',
        }),
        unresolvedPayments: z.number().optional().openapi({
          description:
            'Payments of the invoice that may still arrive: tracked transactions neither verified nor rejected for good (also one stuck past the 25 minutes `pendingPayments` counts, and one rejected with `not_found`, `timeout` or `replaced`), which Quasar reads again for 24 hours after it learned of them and then closes (`unresolved_after_24h`), gasless relays still sending, and claims of this invoice on a transaction another invoice handed over first that Quasar has not decided yet. While it is above 0, do not offer a plain second payment and never tell the buyer that nothing was charged.',
        }),
        onTimeTxKeys: z.array(z.string()).optional().openapi({
          description:
            "Every key (`txKey`, hash, the hash a sped-up transaction replaced, the relay `userOpHash`) of the payments that count as sent in time: Quasar learned of them before `dueAt` (all of them without a `dueAt`); at most the latest 20 transactions and 10 relays. Match the page's own keys against it, not the browser clock.",
        }),
        replacedBy: z
          .object({ number: z.string().nullable(), checkoutToken: z.string().nullable() })
          .nullable()
          .openapi({
            description: 'The invoice that replaced this one after a correction; its checkout token while payable.',
          }),
        subscription: z
          .object({
            status: SubscriptionStatus,
            interval: Interval,
            intervalCount: z.number(),
            period: z.number(),
            periodStart: z.string(),
            periodEnd: z.string(),
            cycles: z.number().nullable(),
            endsAt: z.string().nullable(),
            cancelAtPeriodEnd: z.boolean(),
          })
          .nullable()
          .openapi({ description: 'The subscription period this invoice bills.' }),
      }),
      buyer: z.object({
        collect: z.enum(['off', 'email', 'full']),
        required: z.boolean(),
        companyInvoice: z.boolean(),
      }),
      consent: z
        .object({
          text: z.string().openapi({ description: "The merchant's words, up to 500 characters." }),
          required: z.boolean().openapi({ description: 'The buyer cannot pay without ticking it.' }),
        })
        .nullable()
        .openapi({
          description:
            'A line the buyer ticks before paying, such as a request to start a service at once; `null` when the merchant asks none. The quote records the tick in the ledger (`consent.given`) and the receipt email repeats the text.',
        }),
      amlScreening: z.boolean().openapi({
        description:
          '`true` when the merchant checks paying wallets before payment (its AML mode is `block` or `flag`); the checkout says so to the buyer only then.',
      }),
      methods: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          symbol: z.string(),
          chainId: z.string(),
          assetId: z.string().nullable(),
          decimals: z.number(),
          gasless: z.string().nullable(),
          featured: z.boolean(),
          markupBps: z.number().openapi({ description: 'Costs this much more than the total, in basis points.' }),
          discountBps: z.number().openapi({ description: 'Costs this much less than the total, in basis points.' }),
          payerProof: z.enum(['before_quote', 'unless_relayed', 'none']).optional().openapi({
            description:
              'When the paying wallet confirms the invoice (`payer-proof`): `before_quote` (EVM: before the price, else the quote answers `409 payer_proof_required`), `unless_relayed` (an EVM method the gasless relay may pay: the price first; the relay confirms the wallet itself, a transfer or a paymaster payment needs the proof first), `none` (Solana: the quote reference ties the transfer).',
          }),
        }),
      ),
      payerProofs: z
        .array(
          z.object({
            payer: z.string().openapi({ description: 'CAIP-10 account on the network it confirmed on.' }),
            kind: PayerProofKind,
            chainId: z.string().openapi({ description: 'CAIP-2 network it confirmed on.' }),
            confirmedAt: z.string(),
          }),
        )
        .optional()
        .openapi({
          description:
            'The wallets that confirmed this invoice, oldest first: one confirmation per invoice and wallet, so a reopened page asks none of them to sign again.',
        }),
      quoteTtlSeconds: z.number().openapi({ description: 'How long a locked quote holds, in seconds.' }),
      quote: CheckoutQuote.nullable(),
      autoCharge: z
        .discriminatedUnion('status', [
          z.object({
            status: z.literal('available'),
            methodId: z.string(),
            request: z.object({
              chainId: z.string(),
              to: z.string(),
              permission: z.object({
                type: z.literal('erc20-token-periodic'),
                isAdjustmentAllowed: z.boolean(),
                data: z.object({
                  tokenAddress: z.string(),
                  periodAmount: z.string(),
                  periodDuration: z.number(),
                  startTime: z.number(),
                  justification: z.string(),
                }),
              }),
              rules: z.array(z.object({ type: z.string(), data: z.unknown() })),
            }),
          }),
          z.object({ status: z.literal('active'), permission: Subscription.shape.permission }),
          z.object({ status: z.literal('unavailable'), reason: z.string() }),
        ])
        .nullable()
        .openapi({
          description: 'For a subscription with automatic charges: the ERC-7715 request to show the wallet.',
        }),
    })
    .openapi('CheckoutView', { description: 'What a checkout token opens.' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkCheckoutView: z.ZodType<CheckoutView> = CheckoutView;

  const tokenParam = z.object({ token: z.string().openapi({ description: 'The checkout token of the invoice.' }) });
  const checkout = (
    method: 'get' | 'post',
    path: string,
    summary: string,
    description: string,
    extra: Pick<RouteConfig, 'request' | 'responses'>,
  ) =>
    registry.registerPath({
      method,
      path: `${P}/checkout/{token}${path}`,
      tags: ['Checkout'],
      summary,
      description: `${description} No key: the token opens this invoice only; a browser may call from the app's domains (any, when it lists none).`,
      responses: extra.responses,
      request: { params: tokenParam, ...extra.request },
    });
  const checkoutErrors = {
    404: refused('`checkout_not_found`: a wrong or replaced token.'),
    403: refused('`origin_not_allowed`, `payments_disabled`.'),
    429: refused('`rate_limited`: 120 calls a minute per token.'),
  };

  checkout(
    'get',
    '',
    'Open a checkout',
    'The invoice, its methods, the locked quote and, for a subscription, the automatic-charge offer. Used by `createCheckoutStore`.',
    {
      responses: { 200: { description: 'The checkout.', ...json(CheckoutView) }, ...checkoutErrors },
    },
  );
  checkout(
    'post',
    '/quote',
    'Lock a quote',
    'Screens the payer (AML) and locks the price for the method; a new quote replaces the open one. A Solana Pay QR quote has no payer. An EVM payer must have confirmed the invoice first (`payer-proof`), checked before screening and pricing, unless the gasless relay may pay the method (`methods[].payerProof` `unless_relayed`).',
    {
      request: {
        body: json(
          z.object({
            methodId: z.string(),
            payer: z.string().optional().openapi({ description: 'CAIP-10 account.' }),
            consentGiven: z
              .boolean()
              .optional()
              .openapi({ description: 'The buyer ticked the checkout `consent`; a required one must be `true`.' }),
          }),
        ),
      },
      responses: {
        200: { description: 'The quote and its payment instructions.', ...json(CheckoutQuote) },
        400: invalid('`payer_required`, `payer_chain_mismatch`'),
        409: refused(
          '`buyer_required`, `consent_required` (a required consent without `consentGiven: true`), `payer_proof_required` (the EVM wallet has not confirmed the invoice: `payer-proof` first; `payer` names it), `invoice_expired`, `invoice_processing`, `invoice_not_payable`, `amount_out_of_range`, `method_not_priced`.',
        ),
        503: refused('`screening_unavailable` (AML in `block` mode while a source is down), `price_unavailable`.'),
        ...checkoutErrors,
        404: refused('`checkout_not_found`, `method_not_found`.'),
        403: refused('`payer_blocked` (AML), `payer_not_expected`, `origin_not_allowed`.'),
      },
    },
  );
  const PayerProofMessageSchema = z
    .object({
      object: z.literal('payer_proof_message'),
      payer: z.string().openapi({ description: 'The wallet, CAIP-10, the EVM address checksummed.' }),
      proven: z
        .boolean()
        .openapi({ description: 'The wallet confirmed this invoice already (on this network, for a smart wallet).' }),
      message: z.string().openapi({ description: 'The EIP-4361 message to sign as it is, with `personal_sign`.' }),
      domain: z.string().openapi({ description: 'The site the message names: the host of the request `Origin`.' }),
      chainId: z.string().openapi({ description: 'CAIP-2 network of the wallet.' }),
      nonce: z.string(),
      issuedAt: z.string().openapi({ description: 'When the invoice was created.' }),
      expiresAt: z.string().nullable().openapi({ description: 'The invoice due date.' }),
    })
    .openapi('PayerProofMessage');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkPayerProofMessage: z.ZodType<PayerProofMessage> = PayerProofMessageSchema;
  const PayerProofSchema = z
    .object({
      object: z.literal('payer_proof'),
      payer: z.string(),
      proven: z.literal(true),
      kind: PayerProofKind,
      chainId: z.string().openapi({ description: 'CAIP-2 network it confirmed on.' }),
      confirmedAt: z.string(),
    })
    .openapi('PayerProof');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkPayerProof: z.ZodType<PayerProofConfirmation> = PayerProofSchema;
  const payerProofErrors = {
    400: invalid(
      '`payer_chain_mismatch` (not an account on an EVM network the invoice is offered on), `origin_required` (no `Origin` and no dashboard URL to name the site)',
    ),
    409: refused('`invoice_not_payable` (not `open`, `underpaid` or `processing`), `invoice_expired`.'),
    ...checkoutErrors,
    403: refused(
      '`payer_not_expected` (the merchant expects another wallet), `data_processing_required`, `origin_not_allowed`, `payments_disabled`.',
    ),
  };
  checkout(
    'post',
    '/payer-proof/message',
    'Get the payer proof message',
    "The exact EIP-4361 (Sign-In with Ethereum) message an EVM wallet signs, for free and without moving funds, to confirm that it pays this invoice: the site of the request `Origin` (else the dashboard URL), the checksummed address, the statement `Pay invoice <number> of <seller> (<total> <currency>) from this wallet. Quasar credits this invoice with transfers from this wallet once it has signed this message. Signing moves no funds.`, the wallet's chain ID, a nonce derived from the invoice and the wallet, `Issued At` the invoice's creation, `Expiration Time` its due date and the resource `urn:quasar:invoice:<id>`. Deterministic: nothing is stored. Quasar credits a transfer only to an invoice it is tied to by proof: the quote's Solana Pay reference, the gasless relay's authorization or an automatic charge, or a sender whose wallet confirmed the invoice this way. Used by `confirmPayer` of `createCheckoutStore`.",
    {
      request: { body: json(z.object({ payer: z.string().openapi({ description: 'CAIP-10 EVM account.' }) })) },
      responses: { 200: { description: 'The message.', ...json(PayerProofMessageSchema) }, ...payerProofErrors },
    },
  );
  checkout(
    'post',
    '/payer-proof',
    'Confirm the paying wallet',
    "Checks the signed message byte for byte against the one `payer-proof/message` gives and the signature (an ordinary wallet's by EIP-191 recovery, for every EVM network; a smart wallet's through its contract on its network, ERC-1271 or ERC-6492, over the app's RPC) and records the confirmation in the invoice's ledger (`payer.confirmed`), once per wallet: asked again, it answers the recorded one without a new check. From then on a transfer from the wallet is credited to this invoice, and the wallet may get a quote of any method. Counts as a quote of the wallet against the limits. Used by `confirmPayer` of `createCheckoutStore`.",
    {
      request: {
        body: json(
          z.object({
            payer: z.string().openapi({ description: 'CAIP-10 EVM account.' }),
            message: z.string().openapi({ description: 'The message as `payer-proof/message` gave it (up to 2,000).' }),
            signature: z.string().openapi({ description: 'Hex signature, up to 8 KB (a smart wallet signs longer).' }),
          }),
        ),
      },
      responses: {
        200: { description: 'The confirmation.', ...json(PayerProofSchema) },
        ...payerProofErrors,
        400: invalid(
          '`payer_proof_invalid` with `reason` `message_mismatch` (ask for the message again) or `signature_invalid`, `payer_chain_mismatch`, `origin_required`',
        ),
        429: refused(
          '`rate_limited` (30 smart-wallet checks a minute per app; 10 quotes and confirmations a minute per invoice), `too_many_payers` (more than 5 wallets on the invoice).',
        ),
        503: refused(
          '`payer_proof_unavailable` with `reason` `rpc_failed`: the network of a smart wallet cannot be asked now.',
        ),
      },
    },
  );
  checkout(
    'post',
    '/buyer',
    'Send the buyer details',
    'Issues the invoice document that waited for them; `company: true` asks for an invoice for a company.',
    {
      request: { body: json(z.object({ buyer: Buyer, company: z.boolean().optional() })) },
      responses: {
        200: { description: 'The checkout.', ...json(CheckoutView) },
        400: invalid('`buyer_incomplete`'),
        409: refused('`buyer_not_requested`, `invoice_not_payable`.'),
        ...checkoutErrors,
      },
    },
  );
  checkout(
    'post',
    '/submit',
    'Submit the payment transaction',
    "Quasar tracks it; the invoice is settled when it is final. For an EIP-5792 batch, send the hash of its transaction. An invoice in any state takes it, since the money reaches the merchant whatever the invoice says: an `expired` or `cancelled` invoice holds the payment for the merchant as late (`review.reason` `late`), who credits or returns it; an invoice `paid`, `held` or `refunded` already records it with its amount as a payment that pays nothing (`rejectedPayments`, `invoice_not_payable` or `payer_mismatch`, `movedMoney`). One handed over before `dueAt` keeps the invoice payable for up to 30 minutes past it while it confirms; one handed over after `dueAt` is held as late, even while another payment keeps the invoice payable. The same `txKey` is taken once, and a `txKey` Quasar tracks for this invoice already is answered as taken before anything else is checked: a page that got no answer (network, 5xx) hands it over again, also after a reload (`@tuwaio/quasar-sdk` keeps the hand-over in the tab until it is taken), since the wallet has sent it already. A `txKey` Quasar tracks for another invoice of the app is `409 tx_already_used`, never taken: EVM invoices share the merchant's address and carry no reference, so whoever saw the hash may have handed it over for their own invoice first. For a payment, with a locked quote, Quasar records this invoice's claim on it (once; at most 3 undecided claims) and credits the transaction to the invoice of the organization it is tied to by proof (its mark: a Solana Pay reference, a relay or an automatic charge; or a sender whose wallet confirmed that invoice with `payer-proof`), exact amount first, then the later quote: when that is this invoice it moves here; otherwise this invoice lists it in `rejectedPayments` with `tx_already_used`. A transfer tied to no invoice that reached the merchant is held on the invoice for a refund only (`review.refundOnly`). A transaction is found by its `txKey` and by its executed hash. Until then the claim counts in `pendingPayments` and `unresolvedPayments` (and in `onTimeTxKeys` when made before `dueAt`): the page tells the buyer that the transaction was handed over for another invoice and offers no second payment.",
    {
      request: {
        body: json(
          z.object({
            txKey: z.string().openapi({ description: 'Transaction hash or Solana signature.' }),
            from: z.string().optional().openapi({ description: 'The sender, for a Solana Pay quote without a payer.' }),
            connectorType: z.string().optional(),
          }),
        ),
      },
      responses: {
        202: {
          description:
            'Taken, also when Quasar tracks the `txKey` (or a transaction with that hash) for this invoice already. `status` is the state of the invoice.',
          ...json(z.object({ txKey: z.string(), status: z.string() })),
        },
        400: invalid('`invalid_transaction`, `sender_required`'),
        409: refused(
          "`quote_required`; `too_many_pending`: the invoice already has 3 unconfirmed transactions, wait until one is confirmed or fails; `tx_already_used`: Quasar tracks the transaction for another invoice of the app (this invoice's claim is recorded, see above): not a refusal of the payment, so never offer a second one for it.",
        ),
        ...checkoutErrors,
      },
    },
  );
  checkout(
    'post',
    '/relay',
    'Pay without gas (EIP-3009)',
    "The signature of `quote.gasless.relay.typedData`: the app relayer sends the transfer and the merchant pays the gas. The signed authorization confirms the wallet for the invoice (`payerProofs`, kind `authorization`). When someone else sent a copy of the authorization first, the relay reverts while the copy moves the money: Quasar finds the copy and tracks it as this invoice's payment.",
    {
      request: {
        body: json(z.object({ signature: z.string().openapi({ description: '65-byte EIP-712 signature.' }) })),
      },
      responses: {
        200: {
          description:
            '`submitted` with the transaction (`txHash` may be that of a copy of the authorization someone else sent first), or `sending` while the receipt is slow or the chain cannot tell yet.',
          ...json(
            z.object({
              status: z.enum(['submitted', 'sending']),
              userOpHash: z.string().optional(),
              txHash: z.string().optional(),
            }),
          ),
        },
        400: invalid('`invalid_signature`'),
        409: refused('`gasless_unavailable`, `already_relayed`, `quote_required`.'),
        502: refused('`relay_failed`: pay with a normal transfer or ask for a new quote.'),
        ...checkoutErrors,
        429: refused(
          '`sponsorship_limit` (the gas the merchant sponsors per invoice or day is used up: pay with a normal transfer), `rate_limited`.',
        ),
      },
    },
  );
  checkout(
    'post',
    '/paymaster',
    'ERC-7677 paymaster',
    "JSON-RPC `pm_getPaymasterStubData` and `pm_getPaymasterData` for the buyer's smart wallet, sponsored when the user operation is exactly the quoted transfer from the quoted wallet, which confirmed the invoice (`payer-proof`; otherwise a JSON-RPC error `-32000` with `data.reason` `payer_proof_required`). Any origin may call it (the wallet calls from its own site).",
    {
      request: {
        body: json(
          z.object({ jsonrpc: z.literal('2.0'), id: z.unknown(), method: z.string(), params: z.array(z.unknown()) }),
        ),
      },
      responses: {
        200: { description: 'The JSON-RPC answer.', ...json(z.record(z.string(), z.unknown())) },
        400: invalid(),
        ...checkoutErrors,
      },
    },
  );
  checkout(
    'post',
    '/permission',
    'Grant automatic charges',
    "The wallet's answer to `wallet_grantPermissions` for a subscription with `auto_charge`, checked by its context and screened like a payer.",
    {
      request: {
        body: json(
          z.object({
            payer: z.string(),
            context: z.string(),
            delegationManager: z.string(),
            dependencies: z.array(z.object({ factory: z.string(), factoryData: z.string() })).optional(),
          }),
        ),
      },
      responses: {
        200: { description: 'The permission.', ...json(z.object({ permission: Subscription.shape.permission })) },
        400: invalid('`payer_chain_mismatch`, `permission_invalid`: the context does not grant the requested terms'),
        409: refused('`subscription_not_active`, `auto_charge_unavailable`.'),
        ...checkoutErrors,
      },
    },
  );
  checkout('get', '/receipt', 'Download the receipt', 'The receipt PDF of a paid invoice.', {
    responses: {
      200: file('The PDF.'),
      ...checkoutErrors,
      404: refused('`receipt_not_issued`, `checkout_not_found`.'),
    },
  });
  checkout(
    'get',
    '/logo',
    "Get the merchant's logo",
    "The app's PNG or JPEG logo from its Business & documents settings, else the WebP logo of its organization; any site may show it.",
    {
      responses: {
        200: {
          description: 'The image, cacheable for five minutes.',
          content: {
            'image/png': { schema: z.string().openapi({ format: 'binary' }) },
            'image/jpeg': { schema: z.string().openapi({ format: 'binary' }) },
            'image/webp': { schema: z.string().openapi({ format: 'binary' }) },
          },
        },
        ...checkoutErrors,
        404: refused('`logo_not_set`, `checkout_not_found`.'),
      },
    },
  );
  const StatusEvent = z
    .object({
      status: InvoiceStatus,
      ledgerSeq: z.number(),
      txHash: z.string().nullable(),
      amountPaid: z.string().nullable(),
      quoteExpiresAt: z.string().nullable(),
      pendingPayments: z.number().optional().openapi({ description: 'Payments handed over and still on their way.' }),
      rejectedTxKeys: z
        .array(z.string())
        .optional()
        .openapi({ description: 'Every key of the payments that failed, latest first.' }),
      rejectedPayments: z
        .array(RejectedPayment)
        .optional()
        .openapi({ description: 'The payments that failed and why, latest first (at most 10).' }),
      paymentCountsUntil: z
        .string()
        .nullable()
        .optional()
        .openapi({ description: 'Until when a payment sent before `dueAt` counts; `null` without one on its way.' }),
      unresolvedPayments: z
        .number()
        .optional()
        .openapi({ description: 'Payments that may still arrive, with no time limit (see `CheckoutInvoice`).' }),
      onTimeTxKeys: z
        .array(z.string())
        .optional()
        .openapi({ description: 'The keys of the payments that count as sent in time (see `CheckoutInvoice`).' }),
    })
    .openapi('CheckoutStatusEvent');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkStatusEvent: z.ZodType<CheckoutStatusEvent> = StatusEvent;
  checkout(
    'get',
    '/events',
    'Follow the invoice',
    'Server-sent events: one `status` event at once and on every change (data: `CheckoutStatusEvent`), a `ping` every 15 seconds; the stream ends on a final state, once no payment of the invoice is on its way (a payment sent before the expiry or the cancellation, or a second payment of a paid invoice, is followed to its record), or after 10 minutes.',
    {
      responses: {
        200: { description: 'The event stream.', content: { 'text/event-stream': { schema: StatusEvent } } },
        ...checkoutErrors,
      },
    },
  );
  checkout('post', '/locale', 'Change the language', 'Of the page and the documents still to be issued.', {
    request: { body: json(z.object({ locale: Locale })) },
    responses: {
      200: { description: 'The language.', ...json(z.object({ locale: Locale })) },
      400: invalid(),
      ...checkoutErrors,
    },
  });

  // -------------------------------------------------------------------------
  // Webhook
  // -------------------------------------------------------------------------
  const PaymentWebhookEvent = z
    .object({
      id: z.string().openapi({ description: 'The ledger event: the same for every delivery; deduplicate by it.' }),
      object: z.literal('event'),
      apiVersion: z.literal('payments.v1'),
      type: z.enum([
        'invoice.issued',
        'invoice.processing',
        'invoice.paid',
        'invoice.underpaid',
        'invoice.held',
        'invoice.hold_voided',
        'invoice.released',
        'invoice.expired',
        'invoice.cancelled',
        'invoice.refunded',
        'invoice.partially_refunded',
        'invoice.replaced',
        'refund.confirmed',
        'refund.failed',
        'payment.reverted',
        'subscription.created',
        'subscription.renewed',
        'subscription.past_due',
        'subscription.paused',
        'subscription.resumed',
        'subscription.cancel_scheduled',
        'subscription.cancel_unscheduled',
        'subscription.canceled',
        'subscription.ended',
        'subscription.permission_granted',
        'subscription.charge_failed',
        'subscription.permission_revoked',
      ]),
      createdAt: z.string(),
      sentAt: z.string().openapi({ description: 'When this delivery was sent; signed with the body.' }),
      environment: Environment,
      data: z.object({
        invoice: Invoice.optional(),
        settlement: Invoice.shape.settlement.unwrap().optional(),
        refund: Refund.optional(),
        aml: z.object({ decision: z.literal('block'), reasons: z.array(z.unknown()) }).optional(),
        subscription: Subscription.optional(),
        hold: z
          .union([
            z.object({
              reason: z.enum(['late', 'aml', 'quote_expired', 'payer_mismatch']).nullable(),
              refundOnly: z.boolean(),
              txHash: z.string().nullable(),
              senders: z.array(z.string()).optional(),
              unconfirmed: z.literal(true).optional(),
              late: z.literal(true).optional(),
            }),
            z.object({
              voided: z.literal(true),
              txHash: z.string().nullable(),
              paidInvoice: z.string().nullable(),
              status: z.string().nullable(),
            }),
          ])
          .optional()
          .openapi({
            description:
              '`invoice.held`: why (`reason`), whether it can only be refunded to the wallet that sent it (`refundOnly`: a transfer tied to no invoice, from another wallet or an unconfirmed one, `unconfirmed`; a refund-only hold has no `settlement`, its transaction is `txHash`), the senders, `late`. `invoice.hold_voided`: a refund-only hold Quasar undid because its transfer paid another invoice of yours (`paidInvoice`); the invoice went back to `status`, nothing to refund.',
          }),
      }),
    })
    .openapi('PaymentWebhookEvent');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkWebhook: z.ZodType<PaymentWebhookEvent> = PaymentWebhookEvent;
  registry.registerWebhook({
    method: 'post',
    path: 'payment-event',
    summary: 'Payment event (payments.v1)',
    description:
      "Sent to the webhook endpoints subscribed to `invoice:*`, `refund:*`, `subscription:*` or the event itself (`invoice.hold_voided`, a notice, is in the default subscriptions of a shop endpoint). `x-quasar-signature` is the hex HMAC-SHA256 of the raw body keyed with the endpoint's signing secret; check it, and `sentAt`, with `verifyWebhook` of `@tuwaio/quasar-sdk`. `data.invoice` is the invoice when the delivery was sent.",
    tags: ['Webhooks'],
    request: {
      headers: z.object({
        'x-quasar-signature': z.string(),
        'x-quasar-event': z.string().openapi({ description: 'The event type.' }),
      }),
      body: json(PaymentWebhookEvent),
    },
    responses: { 200: { description: 'Answer with a `2xx` within 10 seconds; do slow work afterwards.' } },
  });
}

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
  InvoiceWithCheckout,
  PaymentMethod,
  PaymentQuote,
  PaymentsList,
  PaymentWebhookEvent,
  Refund,
  RefundStart,
  Subscription,
  SubscriptionDetails,
  SubscriptionStart,
} from '../../packages/quasar-sdk/src';
import type { CheckoutQuote, CheckoutStatusEvent, CheckoutView } from '../../packages/quasar-sdk/src/checkout';

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
        '`open` until paid; `processing` while a payment is confirmed; `paid`, `underpaid` (the buyer may top it up), `held` (released or refunded by the merchant), `partially_refunded`, `refunded`; `expired` or `cancelled` without a payment.',
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
      dueAt: dateTime('When it stops being payable.').nullable(),
      seller: z.record(z.string(), z.unknown()).nullable().openapi({ description: 'The seller as printed.' }),
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
      reviewReason: z.string().nullable(),
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
      verification: z
        .union([
          z.object({ valid: z.literal(true), events: z.number() }),
          z.object({ valid: z.literal(false), seq: z.number(), reason: z.enum(['sequence', 'link', 'hash', 'head']) }),
        ])
        .optional(),
    })
    .openapi('InvoiceLedger', {
      description:
        'The ledger, oldest first: each step hashes itself with `prevHash`. `verification` with `?verify=true`.',
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

  const SubscriptionDetails = Subscription.extend({
    invoices: z.array(Invoice),
    charges: z.array(
      z.object({
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
      }),
    ),
  }).openapi('SubscriptionDetails');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkSubscriptionDetails: z.ZodType<SubscriptionDetails> = SubscriptionDetails;

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
  const common = {
    401: { description: 'Missing or invalid key.' },
    403: refused('`payments_disabled`: the app is not a Payments app or the node does not run Payments.'),
    429: { description: 'The rate limit of the organization.' },
  };
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
      dueAt: dateTime('When it stops being payable; or give `expiresInMinutes`.').optional(),
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
  for (const [action, summary, description, body] of [
    [
      'cancel',
      'Cancel an invoice',
      'An open invoice stops being payable; its number stays taken.',
      z.object({ reason: z.string().optional() }),
    ],
    [
      'release',
      'Release a held payment',
      'The invoice becomes paid and the buyer gets a receipt.',
      z.object({ reason: z.string() }),
    ],
  ] as const) {
    route('post', `/invoices/{id}/${action}`, 'Invoices', summary, description, {
      request: { params: idParam('id', 'Invoice ID.'), body: json(body) },
      responses: {
        200: { description: 'The invoice.', ...json(Invoice) },
        404: refused('`invoice_not_found`.'),
        409: refused('The invoice is not in a state for it.'),
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
        404: refused('`invoice_not_found`.'),
        409: refused('The invoice cannot be corrected.'),
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
    'Every step of the invoice, chained by hashes.',
    {
      request: {
        params: idParam('id', 'Invoice ID.'),
        query: z.object({
          verify: z.enum(['true', 'false']).optional().openapi({ description: '`true` checks the hash chain.' }),
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
        404: refused('`invoice_not_found`.'),
        409: refused('Nothing to refund, or more than is left.'),
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
        404: refused('`refund_not_found`.'),
        409: refused('`refund_not_submittable`, `transaction_already_used`.'),
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
        404: refused('`method_not_found`.'),
        503: refused('No fresh price now.'),
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
        400: refused('`invalid_request`, `auto_charge_unavailable` (with `reason`).'),
        ...common,
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
    'With the invoices of its periods and its automatic charges.',
    {
      request: { params: idParam('id', 'Subscription ID.') },
      responses: {
        200: { description: 'The subscription.', ...json(SubscriptionDetails) },
        404: refused('`subscription_not_found`.'),
        ...common,
      },
    },
  );
  for (const [action, summary, description, response] of [
    [
      'cancel',
      'Cancel a subscription',
      'Now (its open invoices are cancelled) or, with `atPeriodEnd`, when the running period ends.',
      Subscription,
    ],
    [
      'cancel/undo',
      'Take back a scheduled cancellation',
      'The subscription renews again (`subscription.cancel_unscheduled`); a next-period invoice the cancellation cancelled is issued anew.',
      Subscription,
    ],
    [
      'pause',
      'Pause a subscription',
      'Its open invoices are cancelled and no period is billed until it resumes.',
      Subscription,
    ],
    ['resume', 'Resume a subscription', 'A new period starts now and is invoiced at once.', SubscriptionStart],
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
        404: refused('`subscription_not_found`.'),
        409: refused('Not possible in its state.'),
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
    })
    .openapi('CheckoutQuote', { description: 'A quote locked to the payer until `expiresAt`.' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkCheckoutQuote: z.ZodType<CheckoutQuote> = CheckoutQuote;

  const CheckoutView = z
    .object({
      object: z.literal('checkout'),
      merchant: z.object({ name: z.string(), website: z.string().nullable(), supportEmail: z.string().nullable() }),
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
        dueAt: z.string().nullable(),
        successUrl: z.string().nullable(),
        cancelUrl: z.string().nullable(),
      }),
      buyer: z.object({
        collect: z.enum(['off', 'email', 'full']),
        required: z.boolean(),
        companyInvoice: z.boolean(),
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
        }),
      ),
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
    'Screens the payer (AML) and locks the price for the method; a new quote replaces the open one. A Solana Pay QR quote has no payer.',
    {
      request: {
        body: json(
          z.object({ methodId: z.string(), payer: z.string().optional().openapi({ description: 'CAIP-10 account.' }) }),
        ),
      },
      responses: {
        200: { description: 'The quote and its payment instructions.', ...json(CheckoutQuote) },
        400: refused('`payer_required`, `payer_chain_mismatch`.'),
        409: refused('`buyer_required`, `invoice_expired`, `invoice_processing`, `amount_out_of_range`…'),
        503: refused('`screening_unavailable`.'),
        ...checkoutErrors,
        403: refused('`payer_blocked` (AML), `payer_not_expected`, `origin_not_allowed`.'),
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
        400: refused('`buyer_incomplete`.'),
        409: refused('`buyer_not_requested`, `invoice_not_payable`.'),
        ...checkoutErrors,
      },
    },
  );
  checkout(
    'post',
    '/submit',
    'Submit the payment transaction',
    'Quasar tracks it; the invoice is settled when it is final. For an EIP-5792 batch, send the hash of its transaction.',
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
        202: { description: 'Taken.', ...json(z.object({ txKey: z.string(), status: z.string() })) },
        400: refused('`invalid_transaction`, `sender_required`.'),
        409: refused('`quote_required`, `invoice_not_payable`.'),
        ...checkoutErrors,
      },
    },
  );
  checkout(
    'post',
    '/relay',
    'Pay without gas (EIP-3009)',
    'The signature of `quote.gasless.relay.typedData`: the app relayer sends the transfer and the merchant pays the gas.',
    {
      request: {
        body: json(z.object({ signature: z.string().openapi({ description: '65-byte EIP-712 signature.' }) })),
      },
      responses: {
        200: {
          description: '`submitted` with the transaction, or `sending` while the receipt is slow.',
          ...json(
            z.object({
              status: z.enum(['submitted', 'sending']),
              userOpHash: z.string().optional(),
              txHash: z.string().optional(),
            }),
          ),
        },
        409: refused('`gasless_unavailable`, `already_relayed`.'),
        502: refused('`relay_failed`: pay with a normal transfer or ask for a new quote.'),
        ...checkoutErrors,
      },
    },
  );
  checkout(
    'post',
    '/paymaster',
    'ERC-7677 paymaster',
    "JSON-RPC `pm_getPaymasterStubData` and `pm_getPaymasterData` for the buyer's smart wallet, sponsored when the user operation is exactly the quoted transfer. Any origin may call it (the wallet calls from its own site).",
    {
      request: {
        body: json(
          z.object({ jsonrpc: z.literal('2.0'), id: z.unknown(), method: z.string(), params: z.array(z.unknown()) }),
        ),
      },
      responses: {
        200: { description: 'The JSON-RPC answer.', ...json(z.record(z.string(), z.unknown())) },
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
        400: refused('`payer_chain_mismatch`, a context that does not grant the requested terms.'),
        409: refused('`subscription_not_active`.'),
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
  const StatusEvent = z
    .object({
      status: InvoiceStatus,
      ledgerSeq: z.number(),
      txHash: z.string().nullable(),
      amountPaid: z.string().nullable(),
      quoteExpiresAt: z.string().nullable(),
    })
    .openapi('CheckoutStatusEvent');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _checkStatusEvent: z.ZodType<CheckoutStatusEvent> = StatusEvent;
  checkout(
    'get',
    '/events',
    'Follow the invoice',
    'Server-sent events: one `status` event at once and on every change (data: `CheckoutStatusEvent`), a `ping` every 15 seconds; the stream ends on a final state or after 10 minutes.',
    {
      responses: {
        200: { description: 'The event stream.', content: { 'text/event-stream': { schema: StatusEvent } } },
        ...checkoutErrors,
      },
    },
  );
  checkout('post', '/locale', 'Change the language', 'Of the page and the documents still to be issued.', {
    request: { body: json(z.object({ locale: Locale })) },
    responses: { 200: { description: 'The language.', ...json(z.object({ locale: Locale })) }, ...checkoutErrors },
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
      "Sent to the webhook endpoints subscribed to `invoice:*`, `refund:*`, `subscription:*` or the event itself. `x-quasar-signature` is the hex HMAC-SHA256 of the raw body keyed with the endpoint's signing secret; check it, and `sentAt`, with `verifyWebhook` of `@tuwaio/quasar-sdk`. `data.invoice` is the invoice when the delivery was sent.",
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

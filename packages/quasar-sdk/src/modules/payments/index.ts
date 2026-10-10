/**
 * @file Payments module of the Quasar client: invoices, refunds, documents, quotes, payment methods and
 * subscriptions of a Payments app.
 */

import { PAYMENTS_ENDPOINT } from '../../constants';
import type { QuasarClient } from '../../core/client';
import type {
  CancelSubscriptionParams,
  CorrectInvoiceParams,
  CreateInvoiceParams,
  CreateOptions,
  CreateSubscriptionParams,
  Invoice,
  InvoiceCorrection,
  InvoiceDetails,
  InvoiceLedger,
  InvoiceWithCheckout,
  ListInvoicesParams,
  ListSubscriptionsParams,
  PaymentDocument,
  PaymentDocumentKind,
  PaymentMethod,
  PaymentQuote,
  PaymentsList,
  QuoteParams,
  Refund,
  RefundParams,
  RefundStart,
  SubmitRefundParams,
  Subscription,
  SubscriptionDetails,
  SubscriptionStart,
} from './types';

/** A path segment: IDs are encoded, so one never names another path. */
const segment = (id: string) => encodeURIComponent(id);

/** A date as the API takes it: ISO 8601. */
const iso = (value: Date | string | undefined) => (value instanceof Date ? value.toISOString() : value);

/** The `Idempotency-Key` header of a create call, when given. */
const idempotency = (options: CreateOptions | undefined): Record<string, string> =>
  options?.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : {};

/** A list filter of one value or several, as the API takes it: comma-separated. */
const several = <T extends string>(value: T | T[] | undefined) => (Array.isArray(value) ? value.join(',') : value);

/** A query without the parameters left out. */
const query = (values: Record<string, string | number | undefined>) =>
  Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined));

/**
 * The Payments API (`/v1/payments`) of a Payments app, available as `quasar.payments` on a {@link Quasar} client.
 * Quasar issues numbered invoices with PDF (and, when on, e-invoice) documents, checks the on-chain payment, records
 * every step in a hash-chained ledger and sends `payments.v1` webhooks; money goes straight to your wallets. The app
 * must be a Payments app, and the Quasar node must run Payments.
 *
 * Every method sends one request with the secret key in the `x-tuwa-secret-key` header.
 *
 * @example
 * ```ts
 * import { Quasar } from '@tuwaio/quasar-sdk';
 *
 * const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });
 * const { invoice, payUrl } = await quasar.payments.createInvoice(
 *   {
 *     currency: 'EUR',
 *     lineItems: [{ name: 'Pro plan, October', quantity: '1', unitPrice: '49.00', taxRate: '21' }],
 *     buyer: { email: 'buyer@example.com', externalId: 'user_42' },
 *   },
 *   { idempotencyKey: 'order_42' },
 * );
 * ```
 */
export class PaymentsModule {
  /**
   * Creates the module. The {@link Quasar} client creates it for you.
   *
   * @param client - The HTTP client of the Quasar client.
   * @internal
   */
  constructor(private readonly client: QuasarClient) {}

  /**
   * Issues an invoice (`POST /v1/payments/invoices`): numbered, with its PDF and, when the app has e-invoices on and
   * the buyer details allow, its UBL; the `invoice.issued` webhook follows.
   *
   * @param params - The lines (or a bare `amount`), the buyer and the terms. Dates go as ISO 8601.
   * @param options - `idempotencyKey`: a retry with the same key returns the invoice issued first, with the same link.
   * @returns The invoice, its checkout token and its payment page (also in the invoice view while it can be paid).
   * @throws {QuasarSDKError} `invalid_request` with `issues` (400), `seller_details_missing` and other issuer
   *   refusals (400), an app that is not a Payments app or a node without Payments (403), a timeout or a network
   *   error.
   */
  async createInvoice(params: CreateInvoiceParams, options?: CreateOptions): Promise<InvoiceWithCheckout> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices`, {
      method: 'POST',
      body: { ...params, dueAt: iso(params.dueAt), supplyDate: iso(params.supplyDate) },
      headers: idempotency(options),
    });
  }

  /**
   * Reads an invoice with its refunds and credit notes (`GET /v1/payments/invoices/:id`).
   *
   * @param invoiceId - The invoice.
   * @returns The invoice.
   * @throws {QuasarSDKError} `invoice_not_found` (404), a timeout or a network error.
   */
  async getInvoice(invoiceId: string): Promise<InvoiceDetails> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}`, { method: 'GET' });
  }

  /**
   * Lists invoices, newest first (`GET /v1/payments/invoices`).
   *
   * @param params - Filters and paging.
   * @returns One page; pass `nextCursor` as `cursor` for the next.
   * @throws {QuasarSDKError} `invalid_request` or `invalid_cursor` (400), a timeout or a network error.
   */
  async listInvoices(params: ListInvoicesParams = {}): Promise<PaymentsList<Invoice>> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices`, {
      method: 'GET',
      query: query({
        status: several(params.status),
        environment: params.environment,
        externalId: params.externalId,
        createdAfter: iso(params.createdAfter),
        createdBefore: iso(params.createdBefore),
        limit: params.limit,
        cursor: params.cursor,
      }),
    });
  }

  /**
   * Cancels an open invoice (`POST /v1/payments/invoices/:id/cancel`): it stops being payable; its number stays
   * taken. A payment that arrives later is held for you.
   *
   * @param invoiceId - The invoice.
   * @param params - `reason`, recorded in the ledger.
   * @returns The invoice.
   * @throws {QuasarSDKError} `invoice_not_found` (404), an invoice that is not open (409), a timeout or a network
   *   error.
   */
  async cancelInvoice(invoiceId: string, params: { reason?: string } = {}): Promise<Invoice> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/cancel`, {
      method: 'POST',
      body: params,
    });
  }

  /**
   * Accepts a held payment (`POST /v1/payments/invoices/:id/release`): the invoice becomes paid and the buyer gets a
   * receipt.
   *
   * @param invoiceId - The invoice.
   * @param params - `reason`, required, recorded in the ledger.
   * @returns The invoice.
   * @throws {QuasarSDKError} `invoice_not_found` (404), an invoice that is not held (409), a timeout or a network
   *   error.
   */
  async releaseInvoice(invoiceId: string, params: { reason: string }): Promise<Invoice> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/release`, {
      method: 'POST',
      body: params,
    });
  }

  /**
   * Corrects the buyer details of an open or paid invoice (`POST /v1/payments/invoices/:id/correct`): a credit note
   * for it and a new invoice with the corrected details. A paid invoice's payment carries over to the new one.
   *
   * @param invoiceId - The invoice.
   * @param params - The corrected buyer and the reason the credit note gives.
   * @returns The new invoice (with its checkout while it is open) and the one it replaces.
   * @throws {QuasarSDKError} `invalid_request` (400), `invoice_not_found` (404), an invoice that cannot be corrected
   *   (409), a timeout or a network error.
   */
  async correctInvoice(invoiceId: string, params: CorrectInvoiceParams): Promise<InvoiceCorrection> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/correct`, {
      method: 'POST',
      body: params,
    });
  }

  /**
   * Gives an open invoice a new checkout token and payment page (`POST /v1/payments/invoices/:id/checkout`), for
   * example when its link leaked. The earlier link stops working, also in the emails already sent; the current link
   * needs no call: the invoice shows it (`payUrl`).
   *
   * @param invoiceId - The invoice.
   * @returns The invoice with its new token and page.
   * @throws {QuasarSDKError} `invoice_not_found` (404), `invoice_not_open` (409), a timeout or a network error.
   */
  async replacePayLink(invoiceId: string): Promise<InvoiceWithCheckout> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/checkout`, {
      method: 'POST',
      body: {},
    });
  }

  /**
   * Reads an invoice ledger, oldest first (`GET /v1/payments/invoices/:id/events`).
   *
   * @param invoiceId - The invoice.
   * @param options - `verify: true` adds the check of its hash chain.
   * @returns The ledger.
   * @throws {QuasarSDKError} `invoice_not_found` (404), a timeout or a network error.
   */
  async getEvents(invoiceId: string, options: { verify?: boolean } = {}): Promise<InvoiceLedger> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/events`, {
      method: 'GET',
      query: options.verify ? { verify: 'true' } : {},
    });
  }

  /**
   * Asks for a refund of a paid or held invoice (`POST /v1/payments/invoices/:id/refunds`). Send the returned amount
   * from your wallet to the payer, then pass the transaction to {@link PaymentsModule.submitRefund}.
   *
   * @param invoiceId - The invoice.
   * @param params - Amount (everything left when omitted), mode and reason.
   * @returns The refund and what to send where.
   * @throws {QuasarSDKError} `invalid_request` (400), `invoice_not_found` (404), an invoice that cannot be refunded
   *   or an amount above what is left (409), a timeout or a network error.
   */
  async refund(invoiceId: string, params: RefundParams = {}): Promise<RefundStart> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/refunds`, {
      method: 'POST',
      body: params,
    });
  }

  /**
   * Reads a refund (`GET /v1/payments/refunds/:id`).
   *
   * @param refundId - The refund.
   * @returns The refund.
   * @throws {QuasarSDKError} `refund_not_found` (404), a timeout or a network error.
   */
  async getRefund(refundId: string): Promise<Refund> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/refunds/${segment(refundId)}`, { method: 'GET' });
  }

  /**
   * Hands Quasar the refund transaction (`POST /v1/payments/refunds/:id/submit`); once it is final, the refund is
   * confirmed, a credit note issued and `refund.confirmed` sent.
   *
   * @param refundId - The refund.
   * @param params - The transaction and your wallet it was sent from.
   * @returns The refund, `submitted`.
   * @throws {QuasarSDKError} `invalid_request` (400), `refund_not_found` (404), `refund_not_submittable` or
   *   `transaction_already_used` (409), a timeout or a network error.
   */
  async submitRefund(refundId: string, params: SubmitRefundParams): Promise<Refund> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/refunds/${segment(refundId)}/submit`, {
      method: 'POST',
      body: params,
    });
  }

  /**
   * Downloads a stored document of an invoice byte for byte as issued
   * (`GET /v1/payments/invoices/:id/documents/:kind`).
   *
   * @param invoiceId - The invoice.
   * @param kind - `invoice` or `receipt` (PDF), or `invoice.xml` (UBL).
   * @returns The bytes, media type and file name.
   * @throws {QuasarSDKError} `invoice_not_found` or `document_not_found` (404), a timeout or a network error.
   */
  async getDocument(invoiceId: string, kind: PaymentDocumentKind): Promise<PaymentDocument> {
    return this.client.requestFile(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/documents/${kind}`);
  }

  /**
   * Downloads a credit note of an invoice (`GET /v1/payments/invoices/:id/documents/credit-note/:ref`).
   *
   * @param invoiceId - The invoice.
   * @param ref - The refund it credits, or its number.
   * @param format - `pdf` (default) or `ubl`.
   * @returns The bytes, media type and file name.
   * @throws {QuasarSDKError} `invoice_not_found` or `document_not_found` (404), a timeout or a network error.
   */
  async getCreditNote(invoiceId: string, ref: string, format: 'pdf' | 'ubl' = 'pdf'): Promise<PaymentDocument> {
    const name = `${segment(ref)}${format === 'ubl' ? '.xml' : ''}`;
    return this.client.requestFile(`${PAYMENTS_ENDPOINT}/invoices/${segment(invoiceId)}/documents/credit-note/${name}`);
  }

  /**
   * Prices an amount in a payment method now (`POST /v1/payments/quotes`); nothing is locked.
   *
   * @param params - Amount, currency and method.
   * @returns The price.
   * @throws {QuasarSDKError} `invalid_request` (400), `method_not_found` (404), no fresh price (503), a timeout or a
   *   network error.
   */
  async quote(params: QuoteParams): Promise<PaymentQuote> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/quotes`, { method: 'POST', body: params });
  }

  /**
   * Lists the app's active payment methods, in their order (`GET /v1/payments/methods`).
   *
   * @returns The methods.
   * @throws {QuasarSDKError} A timeout or a network error.
   */
  async listMethods(): Promise<{ object: 'list'; data: PaymentMethod[] }> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/methods`, { method: 'GET' });
  }

  /**
   * Starts a subscription (`POST /v1/payments/subscriptions`): each period is one invoice, issued ahead of the period
   * and paid like any invoice (`send_invoice`) or charged with the buyer's ERC-7715 permission (`auto_charge`).
   *
   * @param params - The plan, its interval and terms.
   * @param options - `idempotencyKey`: a retry with the same key returns the subscription started first.
   * @returns The subscription and, without a trial, its first invoice with the payment page.
   * @throws {QuasarSDKError} `invalid_request` (400), `subscriptions_disabled` (403), `auto_charge_unavailable` with
   *   `details.reason` (400), a timeout or a network error.
   */
  async createSubscription(params: CreateSubscriptionParams, options?: CreateOptions): Promise<SubscriptionStart> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/subscriptions`, {
      method: 'POST',
      body: { ...params, endsAt: iso(params.endsAt) },
      headers: idempotency(options),
    });
  }

  /**
   * Lists subscriptions, newest first (`GET /v1/payments/subscriptions`).
   *
   * @param params - Filters and paging.
   * @returns One page.
   * @throws {QuasarSDKError} `invalid_request` or `invalid_cursor` (400), a timeout or a network error.
   */
  async listSubscriptions(params: ListSubscriptionsParams = {}): Promise<PaymentsList<Subscription>> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/subscriptions`, {
      method: 'GET',
      query: query({ status: several(params.status), limit: params.limit, cursor: params.cursor }),
    });
  }

  /**
   * Reads a subscription with the invoices of its periods and its automatic charges
   * (`GET /v1/payments/subscriptions/:id`).
   *
   * @param subscriptionId - The subscription.
   * @returns The subscription.
   * @throws {QuasarSDKError} `subscription_not_found` (404), a timeout or a network error.
   */
  async getSubscription(subscriptionId: string): Promise<SubscriptionDetails> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/subscriptions/${segment(subscriptionId)}`, { method: 'GET' });
  }

  /**
   * Cancels a subscription now (its open invoices are cancelled) or when the running period ends
   * (`POST /v1/payments/subscriptions/:id/cancel`).
   *
   * @param subscriptionId - The subscription.
   * @param params - `atPeriodEnd` and `reason`.
   * @returns The subscription.
   * @throws {QuasarSDKError} `subscription_not_found` (404), `subscription_not_active` (409), a timeout or a network
   *   error.
   */
  async cancelSubscription(subscriptionId: string, params: CancelSubscriptionParams = {}): Promise<Subscription> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/subscriptions/${segment(subscriptionId)}/cancel`, {
      method: 'POST',
      body: params,
    });
  }

  /**
   * Takes back a cancellation scheduled for the period end (`POST /v1/payments/subscriptions/:id/cancel/undo`): the
   * subscription renews again (`subscription.cancel_unscheduled`). Nothing scheduled: nothing changes.
   *
   * @param subscriptionId - The subscription.
   * @returns The subscription.
   * @throws {QuasarSDKError} `subscription_not_found` (404), a canceled or ended subscription (409), a timeout or a
   *   network error.
   */
  async undoSubscriptionCancel(subscriptionId: string): Promise<Subscription> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/subscriptions/${segment(subscriptionId)}/cancel/undo`, {
      method: 'POST',
      body: {},
    });
  }

  /**
   * Pauses a subscription (`POST /v1/payments/subscriptions/:id/pause`): its open invoices are cancelled and no period
   * is billed until it resumes.
   *
   * @param subscriptionId - The subscription.
   * @returns The subscription.
   * @throws {QuasarSDKError} `subscription_not_found` (404), `subscription_not_active` (409), a timeout or a network
   *   error.
   */
  async pauseSubscription(subscriptionId: string): Promise<Subscription> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/subscriptions/${segment(subscriptionId)}/pause`, {
      method: 'POST',
      body: {},
    });
  }

  /**
   * Resumes a paused subscription (`POST /v1/payments/subscriptions/:id/resume`) with a new period that starts now
   * and is invoiced at once.
   *
   * @param subscriptionId - The subscription.
   * @returns The subscription and the new period's invoice with its payment page.
   * @throws {QuasarSDKError} `subscription_not_found` (404), `subscription_not_paused` or `subscription_over` (409),
   *   a timeout or a network error.
   */
  async resumeSubscription(subscriptionId: string): Promise<SubscriptionStart> {
    return this.client.request(`${PAYMENTS_ENDPOINT}/subscriptions/${segment(subscriptionId)}/resume`, {
      method: 'POST',
      body: {},
    });
  }
}

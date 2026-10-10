import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Quasar, QuasarSDKError } from '../index';

const fetchMock = vi.fn();
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/** The request `fetch` received for call `n`: method, URL, headers and parsed body. */
const sent = (n = 0) => {
  const [input, init] = fetchMock.mock.calls[n] as [string | Request, RequestInit | undefined];
  const request = input instanceof Request ? input : new Request(input, init);
  return {
    method: request.method,
    url: request.url,
    header: (name: string) => request.headers.get(name),
    body: async () => {
      const text = await request.clone().text();
      return text ? JSON.parse(text) : undefined;
    },
  };
};

const INVOICE = { id: 'inv_1', object: 'invoice', status: 'open', payUrl: 'https://app.example/pay/tok_1' };

describe('quasar.payments', () => {
  let quasar: Quasar;

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    quasar = new Quasar({ secretKey: 'sk_test_1', baseUrl: 'https://quasar.example' });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('issues an invoice with the secret key, and an idempotency key when given', async () => {
    fetchMock.mockResolvedValueOnce(
      json({ invoice: INVOICE, checkoutToken: 'tok_1', payUrl: 'https://app.example/pay/tok_1' }, 201),
    );
    const created = await quasar.payments.createInvoice(
      {
        currency: 'EUR',
        lineItems: [{ name: 'Pro plan, October', quantity: '1', unitPrice: '49.00', taxRate: '21' }],
        buyer: { email: 'buyer@example.com', externalId: 'user_42' },
        dueAt: new Date('2026-11-01T00:00:00.000Z'),
      },
      { idempotencyKey: 'order_42' },
    );

    expect(created.payUrl).toBe('https://app.example/pay/tok_1');
    const request = sent();
    expect(request.method).toBe('POST');
    expect(request.url).toBe('https://quasar.example/v1/payments/invoices');
    expect(request.header('x-tuwa-secret-key')).toBe('sk_test_1');
    expect(request.header('idempotency-key')).toBe('order_42');
    expect(await request.body()).toEqual({
      currency: 'EUR',
      lineItems: [{ name: 'Pro plan, October', quantity: '1', unitPrice: '49.00', taxRate: '21' }],
      buyer: { email: 'buyer@example.com', externalId: 'user_42' },
      // Dates go as ISO 8601
      dueAt: '2026-11-01T00:00:00.000Z',
    });
  });

  it('lists invoices by status and in pages, and reads one with its refunds and credit notes', async () => {
    fetchMock
      .mockResolvedValueOnce(json({ object: 'list', data: [INVOICE], nextCursor: 'c_2' }))
      .mockResolvedValueOnce(json({ ...INVOICE, refunds: [], creditNotes: [] }));

    const page = await quasar.payments.listInvoices({
      status: ['paid', 'held'],
      createdAfter: new Date('2026-10-01T00:00:00.000Z'),
      limit: 50,
    });
    expect(page.nextCursor).toBe('c_2');
    const url = new URL(sent(0).url);
    expect(url.pathname).toBe('/v1/payments/invoices');
    expect(Object.fromEntries(url.searchParams)).toEqual({
      status: 'paid,held',
      createdAfter: '2026-10-01T00:00:00.000Z',
      limit: '50',
    });

    const invoice = await quasar.payments.getInvoice('inv/1');
    expect(invoice.creditNotes).toEqual([]);
    // IDs are path segments: encoded, never a path of their own
    expect(sent(1).url).toBe('https://quasar.example/v1/payments/invoices/inv%2F1');
  });

  it('acts on an invoice: cancel, release, correct, a new payment link and its ledger with the chain check', async () => {
    fetchMock.mockImplementation(async () => json(INVOICE));
    await quasar.payments.cancelInvoice('inv_1', { reason: 'Duplicate order' });
    await quasar.payments.releaseInvoice('inv_1', { reason: 'Checked the sender' });
    await quasar.payments.correctInvoice('inv_1', { buyer: { name: 'Acme Labs GmbH', country: 'DE' } });
    await quasar.payments.replacePayLink('inv_1');
    await quasar.payments.getEvents('inv_1', { verify: true });

    const calls = await Promise.all(
      [0, 1, 2, 3, 4].map(async (n) => {
        const request = sent(n);
        return [request.method, new URL(request.url).pathname + new URL(request.url).search, await request.body()];
      }),
    );
    expect(calls).toEqual([
      ['POST', '/v1/payments/invoices/inv_1/cancel', { reason: 'Duplicate order' }],
      ['POST', '/v1/payments/invoices/inv_1/release', { reason: 'Checked the sender' }],
      ['POST', '/v1/payments/invoices/inv_1/correct', { buyer: { name: 'Acme Labs GmbH', country: 'DE' } }],
      ['POST', '/v1/payments/invoices/inv_1/checkout', {}],
      ['GET', '/v1/payments/invoices/inv_1/events?verify=true', undefined],
    ]);
  });

  it('refunds: asks for one, reads it and submits its transaction', async () => {
    fetchMock
      .mockResolvedValueOnce(json({ refund: { id: 'ref_1', status: 'requested' }, instructions: { to: '0x1' } }, 201))
      .mockResolvedValueOnce(json({ id: 'ref_1', status: 'requested' }))
      .mockResolvedValueOnce(json({ id: 'ref_1', status: 'submitted' }, 202));

    const { refund } = await quasar.payments.refund('inv_1', { amount: '10.00', reason: 'Partial refund' });
    await quasar.payments.getRefund(refund.id);
    await quasar.payments.submitRefund(refund.id, { txHash: '0xfeed', from: '0x2' });

    expect([sent(0).url, sent(1).url, sent(2).url].map((u) => new URL(u).pathname)).toEqual([
      '/v1/payments/invoices/inv_1/refunds',
      '/v1/payments/refunds/ref_1',
      '/v1/payments/refunds/ref_1/submit',
    ]);
    expect(await sent(0).body()).toEqual({ amount: '10.00', reason: 'Partial refund' });
    expect(await sent(2).body()).toEqual({ txHash: '0xfeed', from: '0x2' });
  });

  it('downloads documents byte for byte, with their type and file name', async () => {
    const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46]);
    fetchMock
      .mockResolvedValueOnce(
        new Response(pdf, {
          headers: {
            'content-type': 'application/pdf',
            'content-disposition': 'attachment; filename="RCPT-2026-3.pdf"',
          },
        }),
      )
      .mockResolvedValueOnce(new Response('<Invoice/>', { headers: { 'content-type': 'application/xml' } }))
      .mockResolvedValueOnce(new Response(pdf, { headers: { 'content-type': 'application/pdf' } }));

    const receipt = await quasar.payments.getDocument('inv_1', 'receipt');
    expect(receipt).toEqual({ bytes: pdf, contentType: 'application/pdf', filename: 'RCPT-2026-3.pdf' });
    const ubl = await quasar.payments.getDocument('inv_1', 'invoice.xml');
    expect(new TextDecoder().decode(ubl.bytes)).toBe('<Invoice/>');
    expect(ubl.filename).toBeNull();
    await quasar.payments.getCreditNote('inv_1', 'ref_1', 'ubl');

    expect([sent(0).url, sent(1).url, sent(2).url].map((u) => new URL(u).pathname)).toEqual([
      '/v1/payments/invoices/inv_1/documents/receipt',
      '/v1/payments/invoices/inv_1/documents/invoice.xml',
      '/v1/payments/invoices/inv_1/documents/credit-note/ref_1.xml',
    ]);
  });

  it('prices an amount in a method and lists the active methods', async () => {
    fetchMock
      .mockResolvedValueOnce(json({ object: 'quote', cryptoAmount: '49000000' }))
      .mockResolvedValueOnce(json({ object: 'list', data: [{ id: 'ap_1', object: 'payment_method' }] }));
    const quote = await quasar.payments.quote({ amount: '49.00', currency: 'USD', methodId: 'ap_1' });
    expect(quote.cryptoAmount).toBe('49000000');
    const methods = await quasar.payments.listMethods();
    expect(methods.data[0].id).toBe('ap_1');
    expect(await sent(0).body()).toEqual({ amount: '49.00', currency: 'USD', methodId: 'ap_1' });
    expect(new URL(sent(1).url).pathname).toBe('/v1/payments/methods');
  });

  it('starts subscriptions and changes them: cancel (and take it back), pause and resume', async () => {
    const SUBSCRIPTION = { id: 'sub_1', object: 'subscription', status: 'active' };
    fetchMock.mockImplementation(async () =>
      json({ subscription: SUBSCRIPTION, invoice: INVOICE, checkoutToken: 'tok_1', payUrl: INVOICE.payUrl }),
    );
    const { subscription, payUrl } = await quasar.payments.createSubscription(
      {
        buyer: { email: 'buyer@example.com' },
        currency: 'USD',
        lineItems: [{ name: 'Pro plan', quantity: '1', unitPrice: '49.00' }],
        interval: 'month',
        collection: 'send_invoice',
      },
      { idempotencyKey: 'sub_42' },
    );
    expect(payUrl).toBe(INVOICE.payUrl);
    expect(sent(0).header('idempotency-key')).toBe('sub_42');

    await quasar.payments.listSubscriptions({ status: 'active', limit: 10 });
    await quasar.payments.getSubscription(subscription.id);
    await quasar.payments.cancelSubscription(subscription.id, { atPeriodEnd: true });
    await quasar.payments.undoSubscriptionCancel(subscription.id);
    await quasar.payments.pauseSubscription(subscription.id);
    await quasar.payments.resumeSubscription(subscription.id);

    const paths = [1, 2, 3, 4, 5, 6].map((n) => {
      const url = new URL(sent(n).url);
      return `${sent(n).method} ${url.pathname}${url.search}`;
    });
    expect(paths).toEqual([
      'GET /v1/payments/subscriptions?status=active&limit=10',
      'GET /v1/payments/subscriptions/sub_1',
      'POST /v1/payments/subscriptions/sub_1/cancel',
      'POST /v1/payments/subscriptions/sub_1/cancel/undo',
      'POST /v1/payments/subscriptions/sub_1/pause',
      'POST /v1/payments/subscriptions/sub_1/resume',
    ]);
    expect(await sent(3).body()).toEqual({ atPeriodEnd: true });
  });

  it('turns a refusal of the payments API into an error with its code and the fields at fault', async () => {
    fetchMock.mockResolvedValueOnce(
      json(
        {
          error: {
            code: 'invalid_request',
            message: 'The request is invalid',
            issues: [{ path: 'buyer.country', message: 'Must be an ISO 3166-1 alpha-2 country code' }],
          },
        },
        400,
      ),
    );
    const error = await quasar.payments
      .createInvoice({ amount: '10.00', buyer: { country: 'Germany' } })
      .catch((e: unknown) => e);
    expect(error).toBeInstanceOf(QuasarSDKError);
    expect(error).toMatchObject({
      status: 400,
      code: 'invalid_request',
      message: '[Quasar SDK] Request Failed (400): The request is invalid',
      issues: [{ path: 'buyer.country', message: 'Must be an ISO 3166-1 alpha-2 country code' }],
    });
  });

  it("reads the engine's own refusals, such as the rate limit, by their message", async () => {
    fetchMock.mockImplementation(async () => json({ statusCode: 429, message: 'Too Many Requests' }, 429));
    const error = await quasar.payments.listMethods().catch((e: unknown) => e);
    expect(error).toMatchObject({ status: 429, message: '[Quasar SDK] Request Failed (429): Too Many Requests' });
  });

  it('reads the refusal of a document download too, and the details a refusal adds', async () => {
    fetchMock.mockResolvedValueOnce(
      json({ error: { code: 'document_not_found', message: 'There is no receipt document', retryAfter: 5 } }, 404),
    );
    const error = await quasar.payments.getDocument('inv_1', 'receipt').catch((e: unknown) => e);
    expect(error).toMatchObject({ status: 404, code: 'document_not_found', details: { retryAfter: 5 } });
  });
});

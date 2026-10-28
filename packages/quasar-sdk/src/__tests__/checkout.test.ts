import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { type CheckoutApi, createCheckoutStore } from '../checkout';
import type { CheckoutInvoice, CheckoutRejectedPayment, CheckoutStatusEvent, CheckoutView } from '../checkout/types';

const BASE = 'https://quasar.example';
const fetchMock = vi.fn();
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/** Method, path and parsed body of fetch call `n`. */
const sent = async (n: number) => {
  const [input, init] = fetchMock.mock.calls[n] as [string | Request, RequestInit | undefined];
  const request = input instanceof Request ? input : new Request(input, init);
  const text = await request.clone().text();
  return { method: request.method, path: new URL(request.url).pathname, body: text ? JSON.parse(text) : undefined };
};

/** An EventSource the test drives: `emit` a named event, `close` the stream from the server side. */
class FakeEventSource {
  static instances: FakeEventSource[] = [];
  readyState = 0;
  closed = false;
  onerror: ((event: unknown) => void) | null = null;
  private listeners = new Map<string, ((event: { data: string }) => void)[]>();
  constructor(readonly url: string) {
    FakeEventSource.instances.push(this);
  }
  addEventListener(type: string, listener: (event: { data: string }) => void) {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }
  emit(type: string, data: unknown) {
    for (const listener of this.listeners.get(type) ?? []) listener({ data: JSON.stringify(data) });
  }
  fail() {
    this.readyState = 2;
    this.onerror?.({});
  }
  /** The server ends the stream: the browser fires `error` and reconnects (`readyState` 0, CONNECTING). */
  end() {
    this.readyState = 0;
    this.onerror?.({});
  }
  close() {
    this.closed = true;
    this.readyState = 2;
  }
}

const view = (overrides: Partial<CheckoutView> = {}): CheckoutView => ({
  object: 'checkout',
  merchant: {
    name: 'Acme',
    website: null,
    supportEmail: null,
    logo: false,
    seller: null,
    links: { terms: null, refundPolicy: null, privacy: null },
    fundingUrl: null,
  },
  theme: { mode: 'system', accentColor: null },
  invoice: {
    id: 'inv_1',
    number: 'INV-2026-7',
    status: 'open',
    environment: 'test',
    currency: 'USD',
    total: '49.00',
    totalMinor: '4900',
    lineItems: [],
    locale: 'en',
    dueAt: null,
    successUrl: null,
    cancelUrl: null,
    amountPaid: null,
    review: null,
    refundedTotalMinor: null,
    replacedBy: null,
    subscription: null,
  },
  buyer: { collect: 'off', required: false, companyInvoice: false },
  consent: null,
  amlScreening: true,
  methods: [
    {
      id: 'ap_1',
      name: 'USDC on Base',
      symbol: 'USDC',
      chainId: 'eip155:8453',
      assetId: null,
      decimals: 6,
      gasless: 'auto',
      featured: true,
      markupBps: 0,
      discountBps: 0,
    },
  ],
  quoteTtlSeconds: 900,
  quote: null,
  autoCharge: null,
  ...overrides,
});

const QUOTE = {
  object: 'checkout_quote',
  methodId: 'ap_1',
  payer: 'eip155:8453:0x1111111111111111111111111111111111111111',
  cryptoAmountExpected: '49000000',
  amountToSend: '49000000',
  transferFee: null,
  decimals: 6,
  symbol: 'USDC',
  lockedAt: '2026-10-10T12:00:00.000Z',
  expiresAt: '2099-10-10T12:15:00.000Z',
  reference: null,
  rates: [],
  markupBps: 0,
  discountBps: 0,
  instructions: {
    family: 'eip155',
    chainId: 8453,
    to: '0x2',
    token: '0x3',
    amount: '49000000',
    decimals: 6,
    symbol: 'USDC',
  },
  gasless: { paymaster: { calls: [{ to: '0x3', value: '0x0', data: '0xa9059cbb' }] } },
};

const store = (options: { EventSource?: unknown } = { EventSource: FakeEventSource }) =>
  createCheckoutStore({
    token: 'tok_1',
    baseUrl: BASE,
    pollMs: 1_000,
    EventSource: options.EventSource as never,
  });

/** A `status` event of the stream; `signals` are what Quasar adds about the payments on their way. */
const signal = (
  status: string,
  ledgerSeq: number,
  signals: Pick<
    CheckoutStatusEvent,
    'pendingPayments' | 'rejectedTxKeys' | 'rejectedPayments' | 'paymentCountsUntil'
  > = {},
) => ({ status, ledgerSeq, txHash: null, amountPaid: null, quoteExpiresAt: null, ...signals });

/** A payment Quasar rejected, with its reason and whether the buyer may pay again. */
const rejection = (txKey: string, reason: string, final: boolean, extra: Partial<CheckoutRejectedPayment> = {}) => ({
  txKey,
  reason,
  final,
  ...extra,
});

describe('createCheckoutStore', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    FakeEventSource.instances = [];
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('opens the checkout and starts where the invoice stands', async () => {
    fetchMock.mockResolvedValueOnce(json(view()));
    const checkout = store();
    expect(checkout.getState().phase).toBe('loading');
    await checkout.getState().load();
    expect(await sent(0)).toMatchObject({ method: 'GET', path: '/v1/payments/checkout/tok_1' });
    expect(checkout.getState()).toMatchObject({ phase: 'selectMethod', invoiceStatus: 'open', locale: 'en' });
    // It watches the invoice from the start: a Solana Pay QR payment arrives without the page
    expect(FakeEventSource.instances[0].url).toBe(`${BASE}/v1/payments/checkout/tok_1/events`);
    checkout.getState().destroy();
    expect(FakeEventSource.instances[0].closed).toBe(true);

    for (const [overrides, phase] of [
      [{ buyer: { collect: 'full', required: true, companyInvoice: true } }, 'buyer'],
      [{ quote: QUOTE }, 'awaitingPayment'],
      [{ invoice: { ...view().invoice, status: 'processing' } }, 'confirming'],
      [{ invoice: { ...view().invoice, status: 'paid' } }, 'paid'],
      [{ invoice: { ...view().invoice, status: 'partially_refunded' } }, 'paid'],
      [{ invoice: { ...view().invoice, status: 'expired' } }, 'expired'],
    ] as const) {
      fetchMock.mockResolvedValueOnce(json(view(overrides as Partial<CheckoutView>)));
      const other = store();
      await other.getState().load();
      expect(other.getState().phase).toBe(phase);
      other.getState().destroy();
    }
  });

  it('keeps whether the merchant screens paying wallets, and why a held payment waits', async () => {
    const held = { ...view().invoice, status: 'held', amountPaid: '49000000', review: { reason: 'quote_expired' } };
    fetchMock.mockResolvedValueOnce(json(view({ amlScreening: false, invoice: held as CheckoutView['invoice'] })));
    const checkout = store({ EventSource: null });
    await checkout.getState().load();

    expect(checkout.getState()).toMatchObject({
      phase: 'held',
      checkout: { amlScreening: false, invoice: { review: { reason: 'quote_expired' } } },
    });
    expectTypeOf<CheckoutView['amlScreening']>().toEqualTypeOf<boolean>();
    expectTypeOf<NonNullable<CheckoutInvoice['review']>['reason']>().toEqualTypeOf<
      'screening' | 'late' | 'overpaid' | 'quote_expired'
    >();
    checkout.getState().destroy();
  });

  it('locks a quote for the chosen method and the connected wallet', async () => {
    fetchMock.mockResolvedValueOnce(json(view())).mockResolvedValueOnce(json(QUOTE));
    const checkout = store();
    await checkout.getState().load();
    const phases: string[] = [];
    checkout.subscribe((state) => phases.push(state.phase));

    checkout.getState().selectMethod('ap_1');
    checkout.getState().setPayer(QUOTE.payer);
    const quote = await checkout.getState().requestQuote();

    expect(await sent(1)).toEqual({
      method: 'POST',
      path: '/v1/payments/checkout/tok_1/quote',
      body: { methodId: 'ap_1', payer: QUOTE.payer },
    });
    expect(quote?.amountToSend).toBe('49000000');
    expect(phases).toContain('quoting');
    expect(checkout.getState()).toMatchObject({ phase: 'awaitingPayment', quote: { methodId: 'ap_1' }, error: null });
    expect(checkout.getState().paymasterUrl).toBe(`${BASE}/v1/payments/checkout/tok_1/paymaster`);
    checkout.getState().destroy();
  });

  // The line the merchant asks the buyer to tick before paying (Quasar plan 12 §9.8)
  it('asks for a required consent before the quote, and sends the consent with it', async () => {
    const consent = { text: 'I ask Acme to start at once.', required: true };
    fetchMock.mockResolvedValueOnce(json(view({ consent }))).mockResolvedValueOnce(json(QUOTE));
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().consentGiven).toBe(false);
    checkout.getState().selectMethod('ap_1');
    checkout.getState().setPayer(QUOTE.payer);

    expect(await checkout.getState().requestQuote()).toBeNull();
    expect(checkout.getState()).toMatchObject({ phase: 'selectMethod', error: { code: 'consent_required' } });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    checkout.getState().setConsentGiven(true);
    expect(checkout.getState()).toMatchObject({ consentGiven: true, error: null });
    await checkout.getState().requestQuote();
    expect(await sent(1)).toMatchObject({ body: { methodId: 'ap_1', payer: QUOTE.payer, consentGiven: true } });
    expect(checkout.getState().phase).toBe('awaitingPayment');
    checkout.getState().destroy();
  });

  it('quotes without an optional consent, and sends no consent the merchant did not ask', async () => {
    fetchMock
      .mockResolvedValueOnce(json(view({ consent: { text: 'Send me news.', required: false } })))
      .mockResolvedValueOnce(json(QUOTE))
      .mockResolvedValueOnce(json(view()))
      .mockResolvedValueOnce(json(QUOTE));
    const optional = store();
    await optional.getState().load();
    optional.getState().selectMethod('ap_1');
    await optional.getState().requestQuote();
    expect((await sent(1)).body).toEqual({ methodId: 'ap_1' });
    optional.getState().destroy();

    const none = store();
    await none.getState().load();
    none.getState().selectMethod('ap_1');
    none.getState().setConsentGiven(true);
    await none.getState().requestQuote();
    expect((await sent(3)).body).toEqual({ methodId: 'ap_1' });
    none.getState().destroy();
  });

  it('goes back to the methods from a locked price, but not once the payment is on its way', async () => {
    const qrQuote = { ...QUOTE, payer: null } as CheckoutView['quote'];
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: qrQuote })))
      .mockResolvedValueOnce(json(view({ quote: qrQuote, invoice: { ...view().invoice, status: 'processing' } })));
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({ phase: 'awaitingPayment', quote: { methodId: 'ap_1' } });

    checkout.getState().releaseQuote();
    expect(checkout.getState()).toMatchObject({ phase: 'selectMethod', quote: null, methodId: 'ap_1' });
    checkout.getState().destroy();

    const paying = store();
    await paying.getState().load();
    paying.getState().releaseQuote();
    expect(paying.getState()).toMatchObject({ phase: 'confirming', quote: { methodId: 'ap_1' } });
    paying.getState().destroy();
  });

  it('stops a payer that AML blocks, and asks for the buyer details when they come first', async () => {
    fetchMock
      .mockResolvedValueOnce(json(view()))
      .mockResolvedValueOnce(
        json({ error: { code: 'payer_blocked', message: 'This wallet cannot pay this invoice' } }, 403),
      )
      .mockResolvedValueOnce(json({ error: { code: 'buyer_required', message: 'The buyer details come first' } }, 409));
    const checkout = store();
    await checkout.getState().load();
    checkout.getState().selectMethod('ap_1');
    checkout.getState().setPayer(QUOTE.payer);

    expect(await checkout.getState().requestQuote()).toBeNull();
    expect(checkout.getState()).toMatchObject({ phase: 'blocked', error: { code: 'payer_blocked', status: 403 } });

    await checkout.getState().requestQuote();
    expect(checkout.getState()).toMatchObject({ phase: 'buyer', error: { code: 'buyer_required' } });
    checkout.getState().destroy();
  });

  it('refuses a quote without a method, and sends the buyer details, a company invoice and the language', async () => {
    const withBuyer = view({ buyer: { collect: 'full', required: true, companyInvoice: true } });
    fetchMock
      .mockResolvedValueOnce(json(withBuyer))
      .mockResolvedValueOnce(json(view({ buyer: { collect: 'full', required: false, companyInvoice: true } })))
      .mockResolvedValueOnce(json({ locale: 'es' }));
    const checkout = store();
    await checkout.getState().load();

    expect(await checkout.getState().requestQuote()).toBeNull();
    expect(checkout.getState().error).toMatchObject({ code: 'method_required' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const buyer = { name: 'Acme Labs GmbH', addressLine1: 'Main 1', country: 'DE', taxId: 'DE123456789' };
    expect(await checkout.getState().setBuyer(buyer, { company: true })).toBe(true);
    expect(await sent(1)).toEqual({
      method: 'POST',
      path: '/v1/payments/checkout/tok_1/buyer',
      body: { buyer, company: true },
    });
    expect(checkout.getState()).toMatchObject({ phase: 'selectMethod', error: null });

    await checkout.getState().setLocale('es');
    expect(await sent(2)).toMatchObject({ path: '/v1/payments/checkout/tok_1/locale', body: { locale: 'es' } });
    expect(checkout.getState().locale).toBe('es');
    checkout.getState().destroy();
  });

  it('hands over the sent transaction and follows the invoice until it is paid', async () => {
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json({ txKey: '0xfeed', status: 'open' }, 202));
    const checkout = store();
    await checkout.getState().load();
    expect(await checkout.getState().submit({ txKey: '0xfeed', connectorType: 'evm:metamask' })).toBe(true);
    expect(await sent(1)).toEqual({
      method: 'POST',
      path: '/v1/payments/checkout/tok_1/submit',
      body: { txKey: '0xfeed', connectorType: 'evm:metamask' },
    });
    expect(checkout.getState()).toMatchObject({ phase: 'confirming', txKey: '0xfeed' });

    const events = FakeEventSource.instances[0];
    events.emit('status', { status: 'open', ledgerSeq: 3, txHash: null, amountPaid: null, quoteExpiresAt: null });
    expect(checkout.getState().phase).toBe('confirming');
    events.emit('status', { status: 'processing', ledgerSeq: 4, txHash: null, amountPaid: null, quoteExpiresAt: null });
    events.emit('status', {
      status: 'paid',
      ledgerSeq: 6,
      txHash: '0xfeed',
      amountPaid: '49000000',
      quoteExpiresAt: null,
    });
    expect(checkout.getState()).toMatchObject({ phase: 'paid', invoiceStatus: 'paid', txHash: '0xfeed' });
    expect(checkout.getState().receiptUrl).toBe(`${BASE}/v1/payments/checkout/tok_1/receipt`);
    // A final state ends the stream
    expect(events.closed).toBe(true);
  });

  it('brings the details of an outcome the event stream announces: what arrived and why a payment waits', async () => {
    const invoice = view().invoice;
    const underpaid = { ...invoice, status: 'underpaid' as const, amountPaid: '40000000' };
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never, invoice: underpaid })))
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never, invoice: { ...underpaid, status: 'expired' } })));
    const checkout = store();
    await checkout.getState().load();
    const events = FakeEventSource.instances[0];

    // The event carries what arrived: the underpaid and expired outcomes show it at once
    events.emit('status', {
      status: 'underpaid',
      ledgerSeq: 5,
      txHash: '0xfeed',
      amountPaid: '40000000',
      quoteExpiresAt: null,
    });
    expect(checkout.getState()).toMatchObject({
      phase: 'underpaid',
      checkout: { invoice: { amountPaid: '40000000' } },
    });
    await vi.waitFor(() => expect(checkout.getState().checkout?.invoice.status).toBe('underpaid'));
    events.emit('status', {
      status: 'expired',
      ledgerSeq: 6,
      txHash: '0xfeed',
      amountPaid: '40000000',
      quoteExpiresAt: null,
    });
    expect(checkout.getState()).toMatchObject({ phase: 'expired', checkout: { invoice: { amountPaid: '40000000' } } });
    expect(events.closed).toBe(true);
    // The rest of an outcome (why it waits, the refund, the new invoice, the automatic payments offer) is read again
    await vi.waitFor(() => expect(checkout.getState().checkout?.invoice.status).toBe('expired'));
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(checkout.getState().quote).toMatchObject({ methodId: 'ap_1' });

    // A payment held after its price lock ran out says why
    fetchMock.mockResolvedValueOnce(json(view({ quote: QUOTE as never }))).mockResolvedValueOnce(
      json(
        view({
          quote: QUOTE as never,
          invoice: { ...invoice, status: 'held', amountPaid: '49000000', review: { reason: 'quote_expired' } },
        }),
      ),
    );
    const held = store();
    await held.getState().load();
    FakeEventSource.instances[1].emit('status', {
      status: 'held',
      ledgerSeq: 5,
      txHash: '0xfeed',
      amountPaid: '49000000',
      quoteExpiresAt: null,
    });
    expect(held.getState().phase).toBe('held');
    await vi.waitFor(() => expect(held.getState().checkout?.invoice.review).toEqual({ reason: 'quote_expired' }));
    held.getState().destroy();
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it('keeps what arrived when it reads the invoice instead of following events', async () => {
    vi.useFakeTimers();
    const underpaid = { ...view().invoice, status: 'underpaid' as const, amountPaid: '40000000' };
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never, invoice: underpaid })));
    const checkout = store({ EventSource: null });
    await checkout.getState().load();
    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState()).toMatchObject({
      phase: 'underpaid',
      checkout: { invoice: { amountPaid: '40000000' } },
    });
    // The read brought the details: no second read for them
    expect(fetchMock).toHaveBeenCalledTimes(2);
    checkout.getState().destroy();
  });

  it('returns to the payment when the transaction fails, so the buyer may pay again', async () => {
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json({ txKey: '0xfeed', status: 'open' }, 202));
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    events.emit('status', { status: 'processing', ledgerSeq: 4, txHash: null, amountPaid: null, quoteExpiresAt: null });
    events.emit('status', { status: 'open', ledgerSeq: 5, txHash: null, amountPaid: null, quoteExpiresAt: null });
    expect(checkout.getState()).toMatchObject({ phase: 'awaitingPayment', error: { code: 'payment_failed' } });
    checkout.getState().destroy();
  });

  it('keeps following an invoice that expired while its payment was on the way, until the payment ends it', async () => {
    const status = (value: string, ledgerSeq: number) => ({
      status: value,
      ledgerSeq,
      txHash: '0xfeed',
      amountPaid: null,
      quoteExpiresAt: null,
    });
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      return path.endsWith('/submit') ? json({ txKey: '0xfeed', status: 'processing' }, 202) : json(view());
    });

    // The engine held the payment that arrived after the invoice closed
    const late = store();
    await late.getState().load();
    late.getState().selectMethod('ap_1');
    await late.getState().submit({ txKey: '0xfeed' });
    const lateEvents = FakeEventSource.instances[0];
    lateEvents.emit('status', status('processing', 4));
    lateEvents.emit('status', status('expired', 5));
    expect(late.getState()).toMatchObject({ phase: 'expired', invoiceStatus: 'expired', txKey: '0xfeed' });
    expect(lateEvents.closed).toBe(false);
    lateEvents.emit('status', status('held', 6));
    expect(late.getState()).toMatchObject({ phase: 'held', invoiceStatus: 'held' });
    expect(lateEvents.closed).toBe(true);

    // The engine took the payment it learned of before the deadline
    const grace = store();
    await grace.getState().load();
    await grace.getState().submit({ txKey: '0xfeed' });
    const graceEvents = FakeEventSource.instances[1];
    graceEvents.emit('status', status('expired', 5));
    expect(graceEvents.closed).toBe(false);
    graceEvents.emit('status', status('paid', 6));
    expect(grace.getState()).toMatchObject({ phase: 'paid', invoiceStatus: 'paid' });
    expect(graceEvents.closed).toBe(true);

    // Leaving the page still ends it
    const left = store();
    await left.getState().load();
    await left.getState().submit({ txKey: '0xfeed' });
    const leftEvents = FakeEventSource.instances[2];
    leftEvents.emit('status', status('expired', 5));
    left.getState().destroy();
    expect(leftEvents.closed).toBe(true);
  });

  it('stops at an expired invoice when no payment of this page is on the way', async () => {
    const status = (value: string, ledgerSeq: number) => ({
      status: value,
      ledgerSeq,
      txHash: null,
      amountPaid: null,
      quoteExpiresAt: null,
    });
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      return path.endsWith('/submit') ? json({ txKey: '0xfeed', status: 'processing' }, 202) : json(view());
    });

    // The payment failed and the buyer let the invoice run out
    const failed = store();
    await failed.getState().load();
    await failed.getState().submit({ txKey: '0xfeed' });
    const failedEvents = FakeEventSource.instances[0];
    failedEvents.emit('status', status('processing', 4));
    failedEvents.emit('status', status('open', 5));
    failedEvents.emit('status', status('expired', 6));
    expect(failed.getState().phase).toBe('expired');
    expect(failedEvents.closed).toBe(true);

    // Nothing was sent from this page
    const idle = store();
    await idle.getState().load();
    const idleEvents = FakeEventSource.instances[1];
    idleEvents.emit('status', status('expired', 3));
    expect(idleEvents.closed).toBe(true);
  });

  it('keeps reading an invoice that expired while its payment was on the way, without an event stream', async () => {
    vi.useFakeTimers();
    const invoice = view().invoice;
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json({ txKey: '0xfeed', status: 'processing' }, 202))
      .mockResolvedValueOnce(json(view({ invoice: { ...invoice, status: 'processing' } })))
      .mockResolvedValueOnce(json(view({ invoice: { ...invoice, status: 'expired' } })))
      .mockResolvedValueOnce(json(view({ invoice: { ...invoice, status: 'held', amountPaid: '49000000' } })));
    const checkout = store({ EventSource: null });
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState().phase).toBe('confirming');
    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState().phase).toBe('expired');
    // Expired: the reads slow down to one every 20 seconds
    await vi.advanceTimersByTimeAsync(19_000);
    expect(fetchMock).toHaveBeenCalledTimes(4);
    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState().phase).toBe('held');
    // Held: no more reads
    await vi.advanceTimersByTimeAsync(60_000);
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("never expires a confirming payment by the clock: the deadline is the engine's", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T12:00:00.000Z'));
    const invoice = { ...view().invoice, dueAt: '2026-10-28T12:00:30.000Z' };
    fetchMock
      .mockResolvedValueOnce(json(view({ invoice, quote: QUOTE as never })))
      .mockResolvedValueOnce(json({ txKey: '0xfeed', status: 'processing' }, 202));
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    expect(checkout.getState()).toMatchObject({ phase: 'confirming', error: null });
    expect(FakeEventSource.instances[0].closed).toBe(false);
    checkout.getState().destroy();
  });

  it('tells the page that its payment is on the way until it settles, also a relayed one without a hash', async () => {
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json({ status: 'sending', userOpHash: '0xop' }));
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().paymentOnTheWay).toBe(false);
    expect(await checkout.getState().relay(`0x${'1'.repeat(130)}`)).toBe(true);
    // The relay is still sending: no hash yet, but the payment is on its way
    expect(checkout.getState()).toMatchObject({ phase: 'confirming', txKey: null, paymentOnTheWay: true });
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('open', 4, { pendingPayments: 1, rejectedTxKeys: [] }));
    expect(checkout.getState().paymentOnTheWay).toBe(true);
    events.emit('status', signal('paid', 6, { pendingPayments: 0, rejectedTxKeys: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'paid', paymentOnTheWay: false });
  });

  it("ends the confirm step when Quasar rejects this page's payment, while the invoice stays open", async () => {
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit')) return json({ txKey: '0xFEED', status: 'open' }, 202);
      if (path.endsWith('/relay')) return json({ status: 'sending', userOpHash: '0xop' });
      return json(view({ quote: QUOTE as never, invoice: { ...view().invoice, rejectedTxKeys: ['0xold'] } }));
    });

    // A transaction it handed over, rejected by its hash
    const submitted = store();
    await submitted.getState().load();
    await submitted.getState().submit({ txKey: '0xFEED' });
    const submittedEvents = FakeEventSource.instances[0];
    submittedEvents.emit('status', signal('open', 4, { pendingPayments: 1, rejectedTxKeys: ['0xother', '0xold'] }));
    // Another payment failed: this one is still on its way
    expect(submitted.getState()).toMatchObject({ phase: 'confirming', paymentOnTheWay: true, error: null });
    submittedEvents.emit('status', signal('open', 5, { pendingPayments: 0, rejectedTxKeys: ['0xfeed', '0xold'] }));
    expect(submitted.getState()).toMatchObject({
      phase: 'awaitingPayment',
      paymentOnTheWay: false,
      error: { code: 'payment_failed' },
    });
    // The invoice is still open: the store keeps following it
    expect(submittedEvents.closed).toBe(false);
    submitted.getState().destroy();

    // A relay that failed after answering `sending`, by its user operation hash
    const relayed = store();
    await relayed.getState().load();
    await relayed.getState().relay(`0x${'1'.repeat(130)}`);
    FakeEventSource.instances[1].emit('status', signal('open', 5, { pendingPayments: 0, rejectedTxKeys: ['0xop'] }));
    expect(relayed.getState()).toMatchObject({ paymentOnTheWay: false, error: { code: 'payment_failed' } });
    relayed.getState().destroy();

    // A relayed transfer rejected by the hash the store never learned: nothing else is on its way
    const unseen = store();
    await unseen.getState().load();
    await unseen.getState().relay(`0x${'1'.repeat(130)}`);
    const unseenEvents = FakeEventSource.instances[2];
    unseenEvents.emit('status', signal('open', 5, { pendingPayments: 1, rejectedTxKeys: ['0xold'] }));
    expect(unseen.getState().paymentOnTheWay).toBe(true);
    unseenEvents.emit('status', signal('open', 6, { pendingPayments: 0, rejectedTxKeys: ['0xbeef', '0xold'] }));
    expect(unseen.getState()).toMatchObject({ paymentOnTheWay: false, error: { code: 'payment_failed' } });
    unseen.getState().destroy();
  });

  it('ends an expired invoice whose payment Quasar rejected', async () => {
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      return path.endsWith('/submit') ? json({ txKey: '0xfeed', status: 'open' }, 202) : json(view());
    });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('expired', 5, { pendingPayments: 1, rejectedTxKeys: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: true });
    expect(events.closed).toBe(false);
    events.emit('status', signal('expired', 6, { pendingPayments: 0, rejectedTxKeys: ['0xfeed'] }));
    expect(checkout.getState()).toMatchObject({
      phase: 'expired',
      paymentOnTheWay: false,
      error: { code: 'payment_failed' },
    });
    expect(events.closed).toBe(true);
  });

  it('keeps the stream Quasar keeps open for an expired invoice with a payment on the way', async () => {
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      return path.endsWith('/submit') ? json({ txKey: '0xfeed', status: 'open' }, 202) : json(view());
    });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('expired', 5, { pendingPayments: 1, rejectedTxKeys: [] }));
    // The stream reached its time limit: the browser reconnects to a stream that follows the payment
    events.end();
    expect(events.closed).toBe(false);
    events.emit('status', signal('held', 6, { pendingPayments: 0, rejectedTxKeys: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'held', paymentOnTheWay: false });
    expect(events.closed).toBe(true);
  });

  it('reads an expired invoice slowly and briefly when the stream ends on it, instead of reconnecting', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T12:00:00.000Z'));
    const invoice = { ...view().invoice, dueAt: '2026-10-28T12:01:00.000Z' };
    let reads = 0;
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit')) return json({ txKey: '0xfeed', status: 'open' }, 202);
      reads += 1;
      return json(view({ invoice: { ...invoice, status: reads === 1 ? 'open' : 'expired' } }));
    });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    await vi.advanceTimersByTimeAsync(2 * 60_000);
    const events = FakeEventSource.instances[0];
    // A Quasar that ends the stream on `expired` (it says nothing of the payments on their way)
    events.emit('status', signal('expired', 5));
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: true });
    events.end();
    expect(events.closed).toBe(true);
    expect(FakeEventSource.instances).toHaveLength(1);
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3)); // the outcome's details
    const calls = fetchMock.mock.calls.length;

    // One read every 20 seconds, not the page's 1-second reads
    await vi.advanceTimersByTimeAsync(19_000);
    expect(fetchMock).toHaveBeenCalledTimes(calls);
    await vi.advanceTimersByTimeAsync(1_000);
    expect(fetchMock).toHaveBeenCalledTimes(calls + 1);
    expect(checkout.getState().paymentOnTheWay).toBe(true);

    // Until 35 minutes past the deadline (Quasar waits 30 at most), then it stops
    await vi.advanceTimersByTimeAsync(40 * 60_000);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: false });
    const atCap = fetchMock.mock.calls.length;
    expect(atCap).toBeLessThanOrEqual(calls + 1 + (34 * 60) / 20);
    await vi.advanceTimersByTimeAsync(60 * 60_000);
    expect(fetchMock).toHaveBeenCalledTimes(atCap);
  });

  it('stops reading an expired invoice once Quasar has no payment of it on the way', async () => {
    vi.useFakeTimers();
    const invoice = view().invoice;
    const expired = (pendingPayments: number) =>
      json(view({ invoice: { ...invoice, status: 'expired', pendingPayments, rejectedTxKeys: [] } }));
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json({ txKey: '0xfeed', status: 'open' }, 202))
      .mockResolvedValueOnce(expired(1))
      .mockResolvedValueOnce(expired(0));
    const checkout = store({ EventSource: null });
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: true });
    await vi.advanceTimersByTimeAsync(20_000);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: false });
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it('follows a payment handed over after the invoice expired', async () => {
    let answer: (response: Response) => void = () => undefined;
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit')) return new Promise<Response>((resolve) => (answer = resolve));
      return json(view({ quote: QUOTE as never }));
    });
    const checkout = store();
    await checkout.getState().load();
    const submitting = checkout.getState().submit({ txKey: '0xfeed' });
    // The invoice expired while the page handed the transaction over
    FakeEventSource.instances[0].emit('status', signal('expired', 5, { pendingPayments: 0, rejectedTxKeys: [] }));
    expect(FakeEventSource.instances[0].closed).toBe(true);
    answer(json({ txKey: '0xfeed', status: 'expired' }, 202));
    expect(await submitting).toBe(true);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: true, txKey: '0xfeed' });
    const events = FakeEventSource.instances[1];
    expect(events.closed).toBe(false);
    events.emit('status', signal('held', 6, { pendingPayments: 0, rejectedTxKeys: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'held', paymentOnTheWay: false });
  });

  it('reads the invoice every few seconds where there is no event stream', async () => {
    vi.useFakeTimers();
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never })))
      .mockResolvedValueOnce(json(view({ invoice: { ...view().invoice, status: 'processing' } })))
      .mockResolvedValueOnce(json(view({ invoice: { ...view().invoice, status: 'paid' } })));
    const checkout = store({ EventSource: null });
    await checkout.getState().load();
    expect(checkout.getState().phase).toBe('awaitingPayment');

    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState().phase).toBe('confirming');
    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState().phase).toBe('paid');
    // Paid: no more reads
    await vi.advanceTimersByTimeAsync(5_000);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('falls back to reading the invoice when the event stream fails for good', async () => {
    vi.useFakeTimers();
    fetchMock
      .mockResolvedValueOnce(json(view()))
      .mockResolvedValueOnce(json(view({ invoice: { ...view().invoice, status: 'expired' } })));
    const checkout = store();
    await checkout.getState().load();
    FakeEventSource.instances[0].fail();
    await vi.advanceTimersByTimeAsync(1_000);
    expect(checkout.getState().phase).toBe('expired');
  });

  it('pays without gas through the relay, and grants the automatic charges of a subscription', async () => {
    const autoCharge = {
      status: 'available',
      methodId: 'ap_1',
      request: { chainId: '0x2105', to: '0x4', permission: {}, rules: [] },
    };
    fetchMock
      .mockResolvedValueOnce(json(view({ quote: QUOTE as never, autoCharge: autoCharge as never })))
      .mockResolvedValueOnce(json({ status: 'submitted', userOpHash: '0xop', txHash: '0xbeef' }))
      .mockResolvedValueOnce(json({ permission: { status: 'active', payer: QUOTE.payer } }));
    const checkout = store();
    await checkout.getState().load();

    const signature = `0x${'1'.repeat(130)}`;
    expect(await checkout.getState().relay(signature)).toBe(true);
    expect(await sent(1)).toEqual({ method: 'POST', path: '/v1/payments/checkout/tok_1/relay', body: { signature } });
    expect(checkout.getState()).toMatchObject({ phase: 'confirming', txKey: '0xbeef' });

    const granted = { payer: QUOTE.payer, context: '0xabcd', delegationManager: '0x5' };
    expect(await checkout.getState().grantPermission(granted)).toBe(true);
    expect(await sent(2)).toEqual({ method: 'POST', path: '/v1/payments/checkout/tok_1/permission', body: granted });
    expect(checkout.getState().checkout?.autoCharge).toMatchObject({ status: 'active' });
    checkout.getState().destroy();
  });

  it("points to the merchant's logo only when the merchant has one", async () => {
    fetchMock.mockResolvedValueOnce(json(view()));
    const without = store();
    expect(without.getState().logoUrl).toBeNull();
    await without.getState().load();
    expect(without.getState().logoUrl).toBeNull();
    without.getState().destroy();

    fetchMock.mockResolvedValueOnce(json(view({ merchant: { ...view().merchant, logo: true } })));
    const withLogo = store();
    await withLogo.getState().load();
    expect(withLogo.getState().logoUrl).toBe(`${BASE}/v1/payments/checkout/tok_1/logo`);
    withLogo.getState().destroy();
  });

  it('talks to an API the app supplies instead of the network, as a simulation does', async () => {
    const api: CheckoutApi = {
      view: vi.fn().mockResolvedValue(view({ merchant: { ...view().merchant, logo: true } })),
      quote: vi.fn().mockResolvedValue(QUOTE),
      buyer: vi.fn(),
      locale: vi.fn().mockResolvedValue({ locale: 'uk' }),
      submit: vi.fn().mockResolvedValue({ txKey: '0xbeef', status: 'processing' }),
      relay: vi.fn(),
      permission: vi.fn(),
      url: (route: string) => `sim://checkout/${route}`,
    };
    const checkout = createCheckoutStore({ token: 'tok_1', api, EventSource: null, pollMs: 1_000 });
    await checkout.getState().load();
    checkout.getState().selectMethod('ap_1');
    checkout.getState().setPayer(QUOTE.payer);
    await checkout.getState().requestQuote();
    await checkout.getState().setLocale('uk');
    expect(api.quote).toHaveBeenCalledWith({ methodId: 'ap_1', payer: QUOTE.payer });
    expect(api.locale).toHaveBeenCalledWith('uk');
    expect(checkout.getState()).toMatchObject({
      phase: 'awaitingPayment',
      locale: 'uk',
      logoUrl: 'sim://checkout/logo',
    });
    expect(checkout.getState().paymasterUrl).toBe('sim://checkout/paymaster');
    expect(fetchMock).not.toHaveBeenCalled();
    checkout.getState().destroy();
  });
});

describe('createCheckoutStore: payments on their way and why they failed', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    FakeEventSource.instances = [];
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  /** Answers the submit and relay calls, and reads of the checkout with `invoice` (and the quote). */
  const answer = (invoice: Partial<CheckoutInvoice> = {}, quote: unknown = QUOTE) =>
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit')) return json({ txKey: '0xfeed', status: 'open' }, 202);
      if (path.endsWith('/relay')) return json({ status: 'sending', userOpHash: '0xop' });
      return json(view({ quote: quote as never, invoice: { ...view().invoice, ...invoice } }));
    });

  it('asks the buyer to check the wallet, without offering to pay, when the payment may still have gone through', async () => {
    answer({ rejectedTxKeys: [], rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xFEED' });
    const events = FakeEventSource.instances[0];
    // The node never returned the transaction: it may still be mined, or have been sent again from the wallet
    events.emit(
      'status',
      signal('open', 5, {
        pendingPayments: 0,
        rejectedTxKeys: ['0xfeed'],
        rejectedPayments: [rejection('0xfeed', 'not_found', false)],
      }),
    );
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      paymentOnTheWay: false,
      error: { code: 'payment_unconfirmed', reason: 'not_found' },
    });
    // The invoice is still open: the store keeps following it, and a payment that arrives still ends it
    expect(events.closed).toBe(false);
    events.emit('status', signal('paid', 6, { pendingPayments: 0, rejectedTxKeys: ['0xfeed'] }));
    expect(checkout.getState()).toMatchObject({ phase: 'paid' });
  });

  it('goes back to the payment once the buyer checked the wallet', async () => {
    answer({ rejectedTxKeys: [], rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    // Nothing to do outside the check
    checkout.getState().payAgain();
    expect(checkout.getState().phase).toBe('awaitingPayment');
    await checkout.getState().submit({ txKey: '0xfeed' });
    checkout.getState().payAgain();
    expect(checkout.getState().phase).toBe('confirming');
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'timeout', false)] }),
    );
    expect(checkout.getState().phase).toBe('unconfirmed');
    checkout.getState().payAgain();
    expect(checkout.getState()).toMatchObject({ phase: 'awaitingPayment', error: null, quote: { methodId: 'ap_1' } });
    checkout.getState().destroy();
  });

  it('offers to pay again only after a final rejection, and says why', async () => {
    answer({ rejectedTxKeys: [], rejectedPayments: [] });

    // Reverted on-chain
    const reverted = store();
    await reverted.getState().load();
    await reverted.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'reverted', true)] }),
    );
    expect(reverted.getState()).toMatchObject({
      phase: 'awaitingPayment',
      error: { code: 'payment_failed', reason: 'reverted' },
    });
    reverted.getState().destroy();

    // The sped-up transaction that replaced this page's one carried a wrong amount: rejected by the original hash
    const spedUp = store();
    await spedUp.getState().load();
    await spedUp.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[1].emit(
      'status',
      signal('open', 5, {
        pendingPayments: 1,
        rejectedPayments: [rejection('0xfaster', 'no_matching_transfer', true, { original: '0xfeed' })],
      }),
    );
    expect(spedUp.getState()).toMatchObject({ paymentOnTheWay: false, error: { code: 'payment_failed' } });
    spedUp.getState().destroy();
  });

  it('asks to check the wallet when the invoice goes back to open without a final rejection', async () => {
    answer({ rejectedTxKeys: [], rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('processing', 4, { pendingPayments: 1, rejectedPayments: [] }));
    events.emit(
      'status',
      signal('open', 5, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'timeout', false)] }),
    );
    expect(checkout.getState()).toMatchObject({ phase: 'unconfirmed', error: { code: 'payment_unconfirmed' } });
    checkout.getState().destroy();
  });

  it('never says that nothing arrived on an expired invoice whose payment may still have gone through', async () => {
    answer({ rejectedTxKeys: [], rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('expired', 5, { pendingPayments: 1, rejectedPayments: [] }));
    events.emit(
      'status',
      signal('expired', 6, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'not_found', false)] }),
    );
    expect(checkout.getState()).toMatchObject({
      phase: 'expired',
      paymentOnTheWay: false,
      error: { code: 'payment_unconfirmed', reason: 'not_found' },
    });
    expect(events.closed).toBe(true);
  });

  it('recognises a relay answered `sending` and rejected later by its user operation hash', async () => {
    answer({ rejectedTxKeys: [], rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().relay(`0x${'1'.repeat(130)}`);
    // Another payment of the invoice is still on its way: only the user operation hash tells this one failed
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, {
        pendingPayments: 1,
        rejectedTxKeys: ['0xtransfer', '0xop'],
        rejectedPayments: [rejection('0xtransfer', 'reverted', true, { userOpHash: '0xop' })],
      }),
    );
    expect(checkout.getState()).toMatchObject({ paymentOnTheWay: false, error: { code: 'payment_failed' } });
    checkout.getState().destroy();
  });

  it('chooses the method again when the locked price expired before the payment failed', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T12:00:00.000Z'));
    answer({ rejectedTxKeys: [], rejectedPayments: [] }, { ...QUOTE, expiresAt: '2026-10-28T12:05:00.000Z' });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().phase).toBe('awaitingPayment');
    await checkout.getState().submit({ txKey: '0xfeed' });
    vi.setSystemTime(new Date('2026-10-28T12:10:00.000Z'));
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'reverted', true)] }),
    );
    expect(checkout.getState()).toMatchObject({
      phase: 'selectMethod',
      quote: null,
      error: { code: 'payment_failed' },
    });
    checkout.getState().destroy();
  });

  it('tells the page until when a payment sent before the deadline counts, as Quasar reports it', async () => {
    answer({ pendingPayments: 0, rejectedPayments: [], paymentCountsUntil: null });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().paymentCountsUntil).toBeNull();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('open', 5, { pendingPayments: 1, paymentCountsUntil: '2026-10-28T12:30:00.000Z' }));
    expect(checkout.getState().paymentCountsUntil).toBe('2026-10-28T12:30:00.000Z');
    events.emit('status', signal('paid', 6, { pendingPayments: 0, paymentCountsUntil: null }));
    expect(checkout.getState().paymentCountsUntil).toBeNull();
  });

  it('shows a payment of the invoice on its way on a reopened page instead of the payment', async () => {
    answer({
      pendingPayments: 1,
      rejectedTxKeys: ['0xold'],
      rejectedPayments: [rejection('0xold', 'reverted', true)],
      paymentCountsUntil: '2026-10-28T12:30:00.000Z',
    });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({
      phase: 'confirming',
      invoicePaymentOnTheWay: true,
      paymentOnTheWay: false,
      paymentCountsUntil: '2026-10-28T12:30:00.000Z',
    });
    const events = FakeEventSource.instances[0];
    events.emit(
      'status',
      signal('paid', 6, { pendingPayments: 0, rejectedPayments: [rejection('0xold', 'reverted', true)] }),
    );
    expect(checkout.getState()).toMatchObject({ phase: 'paid', invoicePaymentOnTheWay: false });
    expect(events.closed).toBe(true);
  });

  it('goes back to the payment of a reopened page once that payment failed for good, or asks to check the wallet', async () => {
    const rejected = [rejection('0xold', 'reverted', true)];
    answer({ pendingPayments: 1, rejectedTxKeys: ['0xold'], rejectedPayments: rejected });

    const failed = store();
    await failed.getState().load();
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, { pendingPayments: 0, rejectedPayments: [rejection('0xnew', 'reverted', true), ...rejected] }),
    );
    expect(failed.getState()).toMatchObject({
      phase: 'awaitingPayment',
      invoicePaymentOnTheWay: false,
      error: { code: 'payment_failed' },
    });
    failed.getState().destroy();

    // No longer on its way and not rejected either (Quasar stopped counting a stuck one): the buyer checks the wallet
    const stuck = store();
    await stuck.getState().load();
    FakeEventSource.instances[1].emit('status', signal('open', 5, { pendingPayments: 0, rejectedPayments: rejected }));
    expect(stuck.getState()).toMatchObject({ phase: 'unconfirmed', error: { code: 'payment_unconfirmed' } });
    stuck.getState().destroy();
  });

  it('stops offering to pay when Quasar finds a payment of the invoice, such as a scanned QR code', async () => {
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().phase).toBe('awaitingPayment');
    FakeEventSource.instances[0].emit('status', signal('open', 5, { pendingPayments: 1, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'confirming', invoicePaymentOnTheWay: true });
    checkout.getState().destroy();
  });

  it('follows an expired invoice whose payment is on its way on a reopened page, also when the stream ends', async () => {
    vi.useFakeTimers();
    let pending = 1;
    fetchMock.mockImplementation(async () =>
      json(view({ invoice: { ...view().invoice, status: 'expired', pendingPayments: pending, rejectedPayments: [] } })),
    );
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({ phase: 'expired', invoicePaymentOnTheWay: true });
    const events = FakeEventSource.instances[0];
    expect(events.closed).toBe(false);
    events.emit('status', signal('expired', 5, { pendingPayments: 1, rejectedPayments: [] }));
    // Quasar keeps this stream open while the payment is on its way: the browser reconnects when it ends
    events.end();
    expect(events.closed).toBe(false);
    // No payment on its way any longer: Quasar ends the stream, the store reads the invoice instead
    pending = 0;
    events.emit('status', signal('expired', 6, { pendingPayments: 0, rejectedPayments: [] }));
    expect(events.closed).toBe(true);
    await vi.advanceTimersByTimeAsync(20_000);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', invoicePaymentOnTheWay: false });
    const reads = fetchMock.mock.calls.length;
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    expect(fetchMock).toHaveBeenCalledTimes(reads);
  });
});

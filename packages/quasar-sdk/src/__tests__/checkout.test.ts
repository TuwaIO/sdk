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
    | 'pendingPayments'
    | 'unresolvedPayments'
    | 'rejectedTxKeys'
    | 'rejectedPayments'
    | 'paymentCountsUntil'
    | 'onTimeTxKeys'
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
    // The reasons of a refund-only hold came with the payer proof (Quasar, October 29, 2026)
    expectTypeOf<NonNullable<CheckoutInvoice['review']>['reason']>().toExtend<
      'screening' | 'late' | 'overpaid' | 'quote_expired' | 'payer_mismatch' | 'payer_unconfirmed'
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
    // It succeeded on chain without paying the invoice: it may have moved money (F9)
    expect(spedUp.getState()).toMatchObject({
      paymentOnTheWay: false,
      error: { code: 'payment_mismatch', reason: 'no_matching_transfer' },
    });
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

describe('createCheckoutStore: reloads, late hand-overs and transfers that do not pay the invoice', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    FakeEventSource.instances = [];
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  /** Answers reads of the checkout with `invoice` (and the quote), and `/submit` with `submit` when given. */
  const answer = (
    invoice: Partial<CheckoutInvoice> = {},
    options: { quote?: unknown; submit?: () => Promise<Response> } = {},
  ) =>
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit'))
        return options.submit ? options.submit() : json({ txKey: '0xfeed', status: 'open' }, 202);
      if (path.endsWith('/relay')) return json({ status: 'sending', userOpHash: '0xop' });
      return json(view({ quote: (options.quote ?? QUOTE) as never, invoice: { ...view().invoice, ...invoice } }));
    });

  /** The paths of the requests made so far. */
  const paths = () =>
    fetchMock.mock.calls.map(([input]) => new URL(input instanceof Request ? input.url : (input as string)).pathname);

  // F3: a reload must never offer a second payment, nor say that nothing was charged, while the first may still arrive
  it('reopens on the wallet check when the latest payment may still arrive, not on the payment', async () => {
    answer({
      pendingPayments: 0,
      unresolvedPayments: 1,
      rejectedPayments: [rejection('0xfeed', 'timeout', false), rejection('0xold', 'reverted', true)],
    });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      invoicePaymentOnTheWay: false,
      invoicePaymentUnresolved: true,
      error: { code: 'payment_unconfirmed', reason: 'timeout' },
    });
    // The invoice is still open: the store follows it, and a payment that arrives ends it
    const events = FakeEventSource.instances[0];
    expect(events.closed).toBe(false);
    events.emit('status', signal('paid', 6, { pendingPayments: 0, unresolvedPayments: 0 }));
    expect(checkout.getState()).toMatchObject({ phase: 'paid', invoicePaymentUnresolved: false });
  });

  it('reopens on the wallet check when a stuck payment stopped counting without a rejection', async () => {
    answer({ pendingPayments: 0, unresolvedPayments: 1, rejectedPayments: [rejection('0xold', 'reverted', true)] });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      invoicePaymentUnresolved: true,
      error: { code: 'payment_unconfirmed' },
    });
    // The buyer checked the wallet: back to the payment
    checkout.getState().payAgain();
    expect(checkout.getState()).toMatchObject({ phase: 'awaitingPayment', error: null });
    checkout.getState().destroy();
  });

  it('keeps an expired invoice whose latest payment may still arrive from saying that nothing was charged', async () => {
    for (const invoice of [
      { status: 'expired' as const, pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'not_found', false)] },
      { status: 'expired' as const, pendingPayments: 0, unresolvedPayments: 2, rejectedPayments: [] },
    ]) {
      answer(invoice);
      const checkout = store();
      await checkout.getState().load();
      expect(checkout.getState()).toMatchObject({ phase: 'expired', error: { code: 'payment_unconfirmed' } });
      checkout.getState().destroy();
    }
  });

  it('opens on the payment as before when the latest rejection is final and nothing may still arrive', async () => {
    answer({ pendingPayments: 0, unresolvedPayments: 0, rejectedPayments: [rejection('0xfeed', 'reverted', true)] });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({
      phase: 'awaitingPayment',
      error: null,
      invoicePaymentUnresolved: false,
    });
    checkout.getState().destroy();

    // A payment on its way still comes first
    answer({ pendingPayments: 1, unresolvedPayments: 1, rejectedPayments: [rejection('0xold', 'timeout', false)] });
    const confirming = store();
    await confirming.getState().load();
    expect(confirming.getState()).toMatchObject({ phase: 'confirming', error: null });
    confirming.getState().destroy();
  });

  it('says that a followed payment may still arrive when the expired invoice it waited for stops following it', async () => {
    vi.useFakeTimers();
    // Reads after the hand-over: on its way, then expired while on its way, then stuck past Quasar's tracking ceiling
    const reads = [
      { status: 'open' as const, pendingPayments: 0, unresolvedPayments: 0 },
      { status: 'open' as const, pendingPayments: 1, unresolvedPayments: 1 },
      { status: 'expired' as const, pendingPayments: 1, unresolvedPayments: 1, onTimeTxKeys: ['0xfeed'] },
      { status: 'expired' as const, pendingPayments: 0, unresolvedPayments: 1, onTimeTxKeys: ['0xfeed'] },
    ];
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit')) return json({ txKey: '0xfeed', status: 'open' }, 202);
      const invoice = reads.length > 1 ? reads.shift() : reads[0];
      return json(view({ quote: QUOTE as never, invoice: { ...view().invoice, ...invoice, rejectedPayments: [] } }));
    });
    const checkout = store({ EventSource: null });
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    await vi.advanceTimersByTimeAsync(2_000);
    expect(checkout.getState()).toMatchObject({
      phase: 'expired',
      paymentOnTheWay: true,
      invoicePaymentUnresolved: true,
      paymentSentInTime: true,
      error: null,
    });
    await vi.advanceTimersByTimeAsync(20_000);
    // No longer counted as on its way, but it may still arrive: never "nothing was charged"
    expect(checkout.getState()).toMatchObject({
      phase: 'expired',
      paymentOnTheWay: false,
      invoicePaymentUnresolved: true,
      paymentSentInTime: true,
      error: { code: 'payment_unconfirmed' },
    });
    const calls = fetchMock.mock.calls.length;
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    expect(fetchMock).toHaveBeenCalledTimes(calls);
  });

  // F7: whether this page's payment counts as sent in time comes from Quasar, never from the page clock
  it("tells whether this page's payment counts as sent in time from Quasar's list", async () => {
    answer({ pendingPayments: 0, rejectedPayments: [], onTimeTxKeys: [] });
    const inTime = store();
    await inTime.getState().load();
    expect(inTime.getState().paymentSentInTime).toBeNull();
    await inTime.getState().submit({ txKey: '0xFEED' });
    expect(inTime.getState().paymentSentInTime).toBeNull();
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('open', 5, { pendingPayments: 1, onTimeTxKeys: ['0xother', '0xfeed'] }));
    expect(inTime.getState().paymentSentInTime).toBe(true);
    inTime.getState().destroy();

    // Handed over after the deadline: Quasar does not list it
    const late = store();
    await late.getState().load();
    await late.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[1].emit(
      'status',
      signal('expired', 5, { pendingPayments: 1, onTimeTxKeys: ['0xother'] }),
    );
    expect(late.getState().paymentSentInTime).toBe(false);
    late.getState().destroy();

    // A relay still sending, by its user operation hash
    const relayed = store();
    await relayed.getState().load();
    await relayed.getState().relay(`0x${'1'.repeat(130)}`);
    FakeEventSource.instances[2].emit('status', signal('open', 5, { pendingPayments: 1, onTimeTxKeys: ['0xop'] }));
    expect(relayed.getState().paymentSentInTime).toBe(true);
    relayed.getState().destroy();

    // A Quasar that does not report it: unknown
    const older = store();
    await older.getState().load();
    await older.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[3].emit('status', signal('open', 5, { pendingPayments: 1 }));
    expect(older.getState().paymentSentInTime).toBeNull();
    older.getState().destroy();
  });

  // F8: the wallet already broadcast the transaction: a failed hand-over must not invite a second payment
  it('keeps handing over a broadcast transaction when /submit fails, and shows the wallet check meanwhile', async () => {
    vi.useFakeTimers();
    const failures = [
      () => Promise.reject(new TypeError('Failed to fetch')),
      async () => json({ error: { code: 'internal_error', message: 'Try again' } }, 503),
    ];
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      { submit: () => (failures.shift() ?? (async () => json({ txKey: '0xfeed', status: 'open' }, 202)))() },
    );
    const checkout = store();
    await checkout.getState().load();
    expect(await checkout.getState().submit({ txKey: '0xfeed', connectorType: 'evm:metamask' })).toBe(false);
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      txKey: '0xfeed',
      paymentOnTheWay: false,
      error: { code: 'payment_unconfirmed', reason: 'submit_retrying' },
    });
    // Retried with a growing pause: 2 s, then 4 s
    await vi.advanceTimersByTimeAsync(2_000);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(2);
    expect(checkout.getState().phase).toBe('unconfirmed');
    await vi.advanceTimersByTimeAsync(3_999);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(2);
    await vi.advanceTimersByTimeAsync(1);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(3);
    // The same transaction each time (Quasar takes it once per txKey)
    for (const n of [1, 2, 3]) {
      expect(await sent(n)).toMatchObject({
        path: '/v1/payments/checkout/tok_1/submit',
        body: { txKey: '0xfeed', connectorType: 'evm:metamask' },
      });
    }
    expect(checkout.getState()).toMatchObject({
      phase: 'confirming',
      paymentOnTheWay: true,
      error: null,
      txKey: '0xfeed',
    });
    // Taken: no more hand-overs
    await vi.advanceTimersByTimeAsync(60_000);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(3);
    FakeEventSource.instances[0].emit('status', signal('paid', 6, { pendingPayments: 0 }));
    expect(checkout.getState()).toMatchObject({ phase: 'paid', paymentOnTheWay: false });
  });

  it('follows a retried hand-over that Quasar takes after the invoice expired', async () => {
    vi.useFakeTimers();
    let fail = true;
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      {
        submit: async () =>
          fail
            ? json({ error: { code: 'internal_error', message: 'Try again' } }, 502)
            : json({ txKey: '0xfeed', status: 'expired' }, 202),
      },
    );
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    // The invoice expires while the page retries: the payment may still arrive
    FakeEventSource.instances[0].emit('status', signal('expired', 5, { pendingPayments: 0, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'expired', error: { code: 'payment_unconfirmed' } });
    fail = false;
    await vi.advanceTimersByTimeAsync(2_000);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: true, txKey: '0xfeed' });
    const events = FakeEventSource.instances[1];
    expect(events.closed).toBe(false);
    events.emit('status', signal('held', 6, { pendingPayments: 0 }));
    expect(checkout.getState()).toMatchObject({ phase: 'held', paymentOnTheWay: false });
  });

  it('keeps handing over a broadcast transaction while the buyer pays again, and says why a retry was refused', async () => {
    vi.useFakeTimers();
    let firstAnswers: (() => Promise<Response>)[] = [() => Promise.reject(new TypeError('Failed to fetch'))];
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      {
        submit: async () => (firstAnswers.shift() ?? (async () => json({ txKey: '0xfeed', status: 'open' }, 202)))(),
      },
    );
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    // The buyer said the payment did not leave the wallet and paid again: the first transaction is still handed over
    checkout.getState().payAgain();
    expect(checkout.getState().phase).toBe('awaitingPayment');
    expect(await checkout.getState().submit({ txKey: '0xbeef' })).toBe(true);
    await vi.advanceTimersByTimeAsync(2_000);
    const calls = await Promise.all(fetchMock.mock.calls.map((_, n) => sent(n)));
    expect(calls.filter((call) => call.path.endsWith('/submit')).map((call) => call.body.txKey)).toEqual([
      '0xfeed',
      '0xbeef',
      '0xfeed',
    ]);
    expect(checkout.getState()).toMatchObject({ phase: 'confirming', paymentOnTheWay: true });
    checkout.getState().destroy();

    // A retry Quasar refuses: the page says why and offers the payment again
    fetchMock.mockReset();
    firstAnswers = [
      () => Promise.reject(new TypeError('Failed to fetch')),
      async () => json({ error: { code: 'invalid_transaction', message: 'Not a transaction hash' } }, 400),
    ];
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      { submit: async () => (firstAnswers.shift() ?? (async () => json({}, 500)))() },
    );
    const refused = store();
    await refused.getState().load();
    await refused.getState().submit({ txKey: '0xfeed' });
    await vi.advanceTimersByTimeAsync(2_000);
    expect(refused.getState()).toMatchObject({ phase: 'awaitingPayment', error: { code: 'invalid_transaction' } });
    await vi.advanceTimersByTimeAsync(60_000);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(2);
    refused.getState().destroy();
  });

  it('does not retry a hand-over Quasar refuses, and stops retrying when the page goes away', async () => {
    vi.useFakeTimers();
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      { submit: async () => json({ error: { code: 'invalid_transaction', message: 'Not a transaction hash' } }, 400) },
    );
    const refused = store();
    await refused.getState().load();
    expect(await refused.getState().submit({ txKey: '0xfeed' })).toBe(false);
    expect(refused.getState()).toMatchObject({ phase: 'awaitingPayment', error: { code: 'invalid_transaction' } });
    await vi.advanceTimersByTimeAsync(60_000);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(1);
    refused.getState().destroy();

    fetchMock.mockReset();
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      { submit: () => Promise.reject(new TypeError('Failed to fetch')) },
    );
    const left = store();
    await left.getState().load();
    await left.getState().submit({ txKey: '0xfeed' });
    left.getState().destroy();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(1);
  });

  // F9: a transaction that succeeded on chain without paying the invoice may have moved money
  it('names a transaction that does not pay the invoice apart from one that did not go through', async () => {
    answer({ rejectedTxKeys: [], rejectedPayments: [] });
    const mismatch = store();
    await mismatch.getState().load();
    await mismatch.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, {
        pendingPayments: 0,
        rejectedPayments: [rejection('0xfeed', 'no_matching_transfer', true, { movedMoney: true })],
      }),
    );
    expect(mismatch.getState()).toMatchObject({
      phase: 'awaitingPayment',
      paymentOnTheWay: false,
      error: { code: 'payment_mismatch', reason: 'no_matching_transfer' },
    });
    expect(mismatch.getState().error?.message).not.toMatch(/did not go through/);
    mismatch.getState().destroy();

    // A Quasar that names the reason but not movedMoney: the reason tells
    const byReason = store();
    await byReason.getState().load();
    await byReason.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[1].emit(
      'status',
      signal('open', 5, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'too_early', true)] }),
    );
    expect(byReason.getState().error).toMatchObject({ code: 'payment_mismatch', reason: 'too_early' });
    byReason.getState().destroy();

    // Reverted: it did not go through
    const reverted = store();
    await reverted.getState().load();
    await reverted.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[2].emit(
      'status',
      signal('open', 5, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'reverted', true)] }),
    );
    expect(reverted.getState().error).toMatchObject({ code: 'payment_failed', reason: 'reverted' });
    reverted.getState().destroy();
  });

  it('reopens an expired invoice whose latest transaction did not pay it with that error, not as if nothing moved', async () => {
    answer({
      status: 'expired',
      pendingPayments: 0,
      rejectedPayments: [rejection('0xfeed', 'reference_missing', true, { movedMoney: true })],
    });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({
      phase: 'expired',
      error: { code: 'payment_mismatch', reason: 'reference_missing' },
    });
    checkout.getState().destroy();
  });
});

describe('createCheckoutStore: honest re-check states, moved money, hand-overs kept across a reload', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    FakeEventSource.instances = [];
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  /** The `sessionStorage` of a browser tab, in memory. */
  class MemoryStorage {
    items = new Map<string, string>();
    getItem(key: string) {
      return this.items.get(key) ?? null;
    }
    setItem(key: string, value: string) {
      this.items.set(key, value);
    }
    removeItem(key: string) {
      this.items.delete(key);
    }
  }

  const KEY = 'quasar-sdk:checkoutHandOvers:tok_1';

  /** Answers reads of the checkout with `invoice` (and the quote), and `/submit` with `submit` when given. */
  const answer = (
    invoice: Partial<CheckoutInvoice> = {},
    options: { quote?: unknown; submit?: () => Promise<Response> } = {},
  ) =>
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit'))
        return options.submit ? options.submit() : json({ txKey: '0xfeed', status: 'open' }, 202);
      return json(view({ quote: (options.quote ?? QUOTE) as never, invoice: { ...view().invoice, ...invoice } }));
    });

  /** The paths of the requests made so far. */
  const paths = () =>
    fetchMock.mock.calls.map(([input]) => new URL(input instanceof Request ? input.url : (input as string)).pathname);

  const storeWith = (handOverStorage: MemoryStorage | null, EventSource: unknown = FakeEventSource) =>
    createCheckoutStore({
      token: 'tok_1',
      baseUrl: BASE,
      pollMs: 1_000,
      EventSource: EventSource as never,
      handOverStorage,
    });

  // N1: the page may promise that Quasar checks the payment again only when Quasar does
  it('says that Quasar checks a payment again only for one Quasar still reads again', async () => {
    answer({
      pendingPayments: 0,
      unresolvedPayments: 1,
      rejectedPayments: [rejection('0xfeed', 'timeout', false, { rechecked: true })],
    });
    const rechecked = store();
    await rechecked.getState().load();
    expect(rechecked.getState()).toMatchObject({
      phase: 'unconfirmed',
      error: { code: 'payment_unconfirmed', reason: 'timeout', rechecked: true },
    });
    rechecked.getState().destroy();

    // Reasons Quasar never reads again: the wallet check, without the promise
    for (const reason of ['user_operation_lost', 'pimlico_key_required', 'transaction_failed']) {
      answer({ pendingPayments: 0, unresolvedPayments: 0, rejectedPayments: [rejection('0xfeed', reason, false)] });
      const lost = store();
      await lost.getState().load();
      expect(lost.getState()).toMatchObject({ phase: 'unconfirmed', error: { code: 'payment_unconfirmed', reason } });
      expect(lost.getState().error?.rechecked).toBeUndefined();
      expect(lost.getState().error?.message).toMatch(/contact the merchant/);
      lost.getState().destroy();
    }

    // No rejection, but a payment Quasar still counts as unresolved: it reads it again
    answer({ pendingPayments: 0, unresolvedPayments: 1, rejectedPayments: [] });
    const stuck = store();
    await stuck.getState().load();
    expect(stuck.getState()).toMatchObject({
      phase: 'unconfirmed',
      error: { code: 'payment_unconfirmed', rechecked: true },
    });
    stuck.getState().destroy();
  });

  it('says whether Quasar reads again a followed payment it could not confirm', async () => {
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, {
        pendingPayments: 0,
        unresolvedPayments: 1,
        rejectedPayments: [rejection('0xfeed', 'not_found', false, { rechecked: true })],
      }),
    );
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      error: { code: 'payment_unconfirmed', reason: 'not_found', rechecked: true },
    });
    checkout.getState().destroy();

    const relayLost = store();
    await relayLost.getState().load();
    await relayLost.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[1].emit(
      'status',
      signal('open', 5, {
        pendingPayments: 0,
        unresolvedPayments: 0,
        rejectedPayments: [rejection('0xfeed', 'user_operation_lost', false)],
      }),
    );
    expect(relayLost.getState()).toMatchObject({
      phase: 'unconfirmed',
      error: { code: 'payment_unconfirmed', reason: 'user_operation_lost' },
    });
    expect(relayLost.getState().error?.rechecked).toBeUndefined();
    relayLost.getState().destroy();
  });

  // N1: a transfer that moved money without paying the invoice is never a plain "pay again", final or not
  it('names a transfer that moved money as a mismatch whatever Quasar says of it, with no plain second payment', async () => {
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const followed = store();
    await followed.getState().load();
    await followed.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, {
        pendingPayments: 0,
        unresolvedPayments: 0,
        rejectedPayments: [rejection('0xfeed', 'native_from_contract_unverifiable', false, { movedMoney: true })],
      }),
    );
    expect(followed.getState()).toMatchObject({
      phase: 'unconfirmed',
      paymentOnTheWay: false,
      error: { code: 'payment_mismatch', reason: 'native_from_contract_unverifiable' },
    });
    expect(followed.getState().error?.rechecked).toBeUndefined();
    // Only once the buyer confirmed that nothing left the wallet
    followed.getState().payAgain();
    expect(followed.getState()).toMatchObject({ phase: 'awaitingPayment', error: null });
    followed.getState().destroy();

    // A reload finds it: the same, never the 24-hour promise
    answer({
      pendingPayments: 0,
      unresolvedPayments: 0,
      rejectedPayments: [rejection('0xfeed', 'payer_mismatch', false, { movedMoney: true })],
    });
    const reloaded = store();
    await reloaded.getState().load();
    expect(reloaded.getState()).toMatchObject({
      phase: 'unconfirmed',
      error: { code: 'payment_mismatch', reason: 'payer_mismatch' },
    });
    reloaded.getState().destroy();
  });

  // N6: a rejection Quasar reads again stops counting once Quasar reports nothing unresolved
  it('opens on the payment when Quasar resolved the payment it could not confirm', async () => {
    answer({
      pendingPayments: 0,
      unresolvedPayments: 0,
      rejectedPayments: [rejection('0xfeed', 'timeout', false)],
    });
    const resolved = store();
    await resolved.getState().load();
    expect(resolved.getState()).toMatchObject({ phase: 'awaitingPayment', error: null });
    resolved.getState().destroy();

    // Settled as an underpayment by the re-read: the rest is asked for, without a wallet check
    answer({
      status: 'underpaid',
      amountPaid: '20000000',
      pendingPayments: 0,
      unresolvedPayments: 0,
      rejectedPayments: [rejection('0xfeed', 'not_found', false)],
    });
    const underpaid = store();
    await underpaid.getState().load();
    expect(underpaid.getState()).toMatchObject({ phase: 'underpaid', error: null });
    underpaid.getState().destroy();
  });

  // N7a: an hour of hand-overs without an answer: the page stops promising that it keeps trying
  it('says that Quasar never received the payment once the hand-overs give up', async () => {
    vi.useFakeTimers();
    answer({ pendingPayments: 0, rejectedPayments: [] }, { submit: () => Promise.reject(new TypeError('Failed')) });
    const checkout = storeWith(null);
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    await vi.advanceTimersByTimeAsync(59 * 60_000);
    expect(checkout.getState().error).toMatchObject({ code: 'payment_unconfirmed', reason: 'submit_retrying' });
    await vi.advanceTimersByTimeAsync(60_000);
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      txKey: '0xfeed',
      error: { code: 'payment_unconfirmed', reason: 'submit_failed' },
    });
    expect(checkout.getState().error?.message).toMatch(/contact the merchant/);
    const calls = paths().length;
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    expect(paths()).toHaveLength(calls);
    checkout.getState().destroy();
  });

  // N8: the page may close between the broadcast and the hand-over: the next load hands it over
  it('keeps a hand-over Quasar has not taken in the tab and hands it over again on the next load', async () => {
    vi.useFakeTimers({ now: Date.parse('2026-10-28T12:00:00.000Z') });
    const storage = new MemoryStorage();
    let down = true;
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      {
        submit: () =>
          down ? Promise.reject(new TypeError('Failed')) : Promise.resolve(json({ txKey: '0xfeed', status: 'open' })),
      },
    );
    const first = storeWith(storage);
    await first.getState().load();
    const sending = first.getState().submit({ txKey: '0xfeed', from: '0x1111', connectorType: 'evm:metamask' });
    // Kept before the request leaves
    expect(JSON.parse(storage.getItem(KEY) ?? 'null')).toEqual([
      { txKey: '0xfeed', from: '0x1111', connectorType: 'evm:metamask', at: Date.parse('2026-10-28T12:00:00.000Z') },
    ]);
    expect(await sending).toBe(false);
    // The page closes while the hand-over is retried
    first.getState().destroy();
    expect(storage.getItem(KEY)).not.toBeNull();

    // Reopened in the same tab: handed over again before the page offers to pay
    down = false;
    fetchMock.mockClear();
    const second = storeWith(storage);
    await second.getState().load();
    expect(second.getState().phase).not.toBe('awaitingPayment');
    await vi.advanceTimersByTimeAsync(0);
    expect(await sent(1)).toMatchObject({
      path: '/v1/payments/checkout/tok_1/submit',
      body: { txKey: '0xfeed', from: '0x1111', connectorType: 'evm:metamask' },
    });
    expect(second.getState()).toMatchObject({ phase: 'confirming', paymentOnTheWay: true, txKey: '0xfeed' });
    // Taken: forgotten
    expect(storage.getItem(KEY)).toBeNull();
    second.getState().destroy();

    // Nothing kept: the next load hands nothing over
    fetchMock.mockClear();
    const third = storeWith(storage);
    await third.getState().load();
    await vi.advanceTimersByTimeAsync(0);
    expect(paths().filter((path) => path.endsWith('/submit'))).toHaveLength(0);
    third.getState().destroy();
  });

  it('forgets a hand-over Quasar refuses or already lists, and keeps the hand-overs of other checkouts', async () => {
    vi.useFakeTimers();
    const storage = new MemoryStorage();
    storage.setItem('quasar-sdk:checkoutHandOvers:tok_2', JSON.stringify([{ txKey: '0xother', at: 1 }]));
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      { submit: async () => json({ error: { code: 'invalid_transaction', message: 'Not a transaction hash' } }, 400) },
    );
    const refused = storeWith(storage);
    await refused.getState().load();
    expect(await refused.getState().submit({ txKey: '0xfeed' })).toBe(false);
    expect(storage.getItem(KEY)).toBeNull();
    expect(storage.getItem('quasar-sdk:checkoutHandOvers:tok_2')).not.toBeNull();
    refused.getState().destroy();

    // Quasar lists the transaction already (it got the first hand-over, the answer was lost): not sent again
    storage.setItem(KEY, JSON.stringify([{ txKey: '0xFEED', at: 1 }]));
    fetchMock.mockReset();
    answer({
      pendingPayments: 0,
      rejectedTxKeys: ['0xfeed'],
      rejectedPayments: [rejection('0xfeed', 'reverted', true)],
    });
    const listed = storeWith(storage);
    await listed.getState().load();
    await vi.advanceTimersByTimeAsync(0);
    expect(paths().filter((path) => path.endsWith('/submit'))).toHaveLength(0);
    expect(storage.getItem(KEY)).toBeNull();
    listed.getState().destroy();

    // Malformed or unreadable storage never breaks the checkout
    storage.setItem(KEY, '{not json');
    const malformed = storeWith(storage);
    await malformed.getState().load();
    expect(malformed.getState().phase).toBe('awaitingPayment');
    malformed.getState().destroy();
    const broken = {
      getItem: () => {
        throw new Error('SecurityError');
      },
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
      removeItem: () => {
        throw new Error('SecurityError');
      },
    };
    fetchMock.mockReset();
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const blocked = storeWith(broken as unknown as MemoryStorage);
    await blocked.getState().load();
    expect(await blocked.getState().submit({ txKey: '0xfeed' })).toBe(true);
    blocked.getState().destroy();
  });

  it("uses the tab's sessionStorage by default, and none with the app's own calls", async () => {
    const storage = new MemoryStorage();
    vi.stubGlobal('sessionStorage', storage);
    answer({ pendingPayments: 0, rejectedPayments: [] }, { submit: () => Promise.reject(new TypeError('Failed')) });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    expect(storage.getItem(KEY)).not.toBeNull();
    checkout.getState().destroy();

    const simulated = new MemoryStorage();
    vi.stubGlobal('sessionStorage', simulated);
    const api: CheckoutApi = {
      view: async () => view({ quote: QUOTE as never }),
      quote: async () => QUOTE as never,
      buyer: async () => view(),
      locale: async (locale) => ({ locale }),
      submit: () => Promise.reject(new TypeError('Failed')),
      relay: async () => ({ status: 'submitted', txHash: '0xfeed' }),
      permission: async () => ({ permission: null }),
      url: (route) => `sim://${route}`,
    };
    const playground = createCheckoutStore({ token: 'tok_1', api, EventSource: null });
    await playground.getState().load();
    await playground.getState().submit({ txKey: '0xfeed' });
    expect(simulated.items.size).toBe(0);
    playground.getState().destroy();
  });

  it('never turns a settled invoice back into a confirming payment when a late hand-over is taken', async () => {
    vi.useFakeTimers();
    let fail = true;
    answer(
      { pendingPayments: 0, rejectedPayments: [] },
      {
        submit: async () =>
          fail
            ? json({ error: { code: 'internal_error', message: 'Try again' } }, 502)
            : json({ txKey: '0xfeed', status: 'paid' }, 200),
      },
    );
    const checkout = storeWith(new MemoryStorage());
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    // Paid meanwhile (by this transaction, which Quasar found, or another one)
    FakeEventSource.instances[0].emit('status', signal('paid', 6, { pendingPayments: 0 }));
    fail = false;
    await vi.advanceTimersByTimeAsync(2_000);
    expect(checkout.getState()).toMatchObject({ phase: 'paid', paymentOnTheWay: false, error: null });
    checkout.getState().destroy();
  });
});

describe('createCheckoutStore: a hash taken by another invoice, settlement failures, cancelled invoices', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    FakeEventSource.instances = [];
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  /** The `sessionStorage` of a browser tab, in memory. */
  class MemoryStorage {
    items = new Map<string, string>();
    getItem(key: string) {
      return this.items.get(key) ?? null;
    }
    setItem(key: string, value: string) {
      this.items.set(key, value);
    }
    removeItem(key: string) {
      this.items.delete(key);
    }
  }

  /** Answers reads of the checkout with `invoice` (and the quote), and `/submit` with `submit` when given. */
  const answer = (
    invoice: Partial<CheckoutInvoice> = {},
    options: { submit?: () => Promise<Response>; reads?: () => Partial<CheckoutInvoice> } = {},
  ) =>
    fetchMock.mockImplementation(async (input: string | Request) => {
      const path = new URL(input instanceof Request ? input.url : input).pathname;
      if (path.endsWith('/submit'))
        return options.submit ? options.submit() : json({ txKey: '0xfeed', status: 'open' }, 202);
      const now = { ...invoice, ...options.reads?.() };
      return json(view({ quote: QUOTE as never, invoice: { ...view().invoice, ...now } }));
    });

  const paths = () =>
    fetchMock.mock.calls.map(([input]) => new URL(input instanceof Request ? input.url : (input as string)).pathname);

  const takenElsewhere = async () =>
    json(
      {
        error: {
          code: 'tx_already_used',
          message:
            'The transaction was handed over for another invoice; it counts for the invoice whose quoted wallet sent it',
        },
      },
      409,
    );

  // M3: whoever handed the hash over first, the transaction counts for the invoice whose quoted wallet sent it
  it('never invites a second payment when another invoice handed the transaction over first', async () => {
    vi.useFakeTimers();
    const storage = new MemoryStorage();
    answer({ pendingPayments: 0, rejectedPayments: [] }, { submit: takenElsewhere });
    const checkout = createCheckoutStore({
      token: 'tok_1',
      baseUrl: BASE,
      pollMs: 1_000,
      EventSource: FakeEventSource as never,
      handOverStorage: storage,
    });
    await checkout.getState().load();
    expect(await checkout.getState().submit({ txKey: '0xFEED' })).toBe(false);
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      txKey: '0xFEED',
      paymentOnTheWay: true,
      error: { code: 'payment_unconfirmed', reason: 'tx_already_used', status: 409 },
    });
    expect(checkout.getState().error?.message).toMatch(/another invoice/);
    expect(checkout.getState().error?.message).toMatch(/Do not pay again/);
    // Refused, not lost: neither handed over again nor kept for the next load
    await vi.advanceTimersByTimeAsync(60_000);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(1);
    expect(storage.items.size).toBe(0);
    // No second payment while Quasar decides: not even after the wallet check
    checkout.getState().payAgain();
    expect(checkout.getState().phase).toBe('unconfirmed');
    // Quasar counts this invoice's claim as a payment on its way: the page keeps saying why it waits
    const events = FakeEventSource.instances[0];
    events.emit('status', signal('open', 5, { pendingPayments: 1, unresolvedPayments: 1, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'unconfirmed', error: { reason: 'tx_already_used' } });
    // The quoted wallet of this invoice sent it: the transaction pays this invoice
    events.emit('status', signal('processing', 6, { pendingPayments: 1, unresolvedPayments: 1, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'confirming', error: null, paymentOnTheWay: true });
    events.emit('status', signal('paid', 7, { pendingPayments: 0, unresolvedPayments: 0, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'paid', error: null, paymentOnTheWay: false });
    checkout.getState().destroy();
  });

  it('says that a transaction taken by another invoice does not pay this one once Quasar decides so', async () => {
    answer({ pendingPayments: 0, rejectedPayments: [] }, { submit: takenElsewhere });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[0].emit(
      'status',
      signal('open', 5, {
        pendingPayments: 0,
        unresolvedPayments: 0,
        rejectedPayments: [rejection('0xfeed', 'tx_already_used', true, { movedMoney: true })],
      }),
    );
    expect(checkout.getState()).toMatchObject({
      phase: 'awaitingPayment',
      paymentOnTheWay: false,
      error: { code: 'payment_mismatch', reason: 'tx_already_used' },
    });
    expect(checkout.getState().error?.message).toMatch(/contact the merchant/);
    checkout.getState().destroy();
  });

  it('follows a retried hand-over that another invoice took meanwhile, without offering to pay', async () => {
    vi.useFakeTimers();
    const answers = [
      async () => json({ error: { code: 'internal_error', message: 'Try again' } }, 503),
      takenElsewhere,
    ];
    answer({ pendingPayments: 0, rejectedPayments: [] }, { submit: () => (answers.shift() ?? takenElsewhere)() });
    const checkout = store();
    await checkout.getState().load();
    expect(await checkout.getState().submit({ txKey: '0xfeed' })).toBe(false);
    expect(checkout.getState().error?.reason).toBe('submit_retrying');
    await vi.advanceTimersByTimeAsync(2_000);
    expect(checkout.getState()).toMatchObject({
      phase: 'unconfirmed',
      paymentOnTheWay: true,
      error: { code: 'payment_unconfirmed', reason: 'tx_already_used' },
    });
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    expect(paths().filter((p) => p.endsWith('/submit'))).toHaveLength(2);
    checkout.getState().destroy();
  });

  it('keeps a settled outcome when another invoice has a late hand-over of this page', async () => {
    answer({ status: 'paid', pendingPayments: 0, rejectedPayments: [] }, { submit: takenElsewhere });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().phase).toBe('paid');
    await checkout.getState().submit({ txKey: '0xfeed' });
    expect(checkout.getState()).toMatchObject({ phase: 'paid', error: null, paymentOnTheWay: false });
  });

  // M1: a payment confirmed on chain whose settlement keeps failing is not "does not pay the invoice"
  it('asks to contact the merchant, with no second payment, while Quasar retries settling a confirmed payment', async () => {
    const failed = rejection('0xfeed', 'settlement_failed', false, { movedMoney: true });
    answer({ pendingPayments: 0, unresolvedPayments: 0, rejectedPayments: [failed] });
    const reopened = store();
    await reopened.getState().load();
    expect(reopened.getState()).toMatchObject({
      phase: 'unconfirmed',
      error: { code: 'payment_unconfirmed', reason: 'settlement_failed' },
    });
    expect(reopened.getState().error?.rechecked).toBeUndefined();
    expect(reopened.getState().error?.message).toMatch(/contact the merchant/);
    expect(reopened.getState().error?.message).not.toMatch(/does not pay/);
    // The money reached the merchant's address: the page never goes back to the payment
    reopened.getState().payAgain();
    expect(reopened.getState().phase).toBe('unconfirmed');
    // Quasar's daily retry settles it
    FakeEventSource.instances[0].emit('status', signal('paid', 9, { pendingPayments: 0, rejectedPayments: [] }));
    expect(reopened.getState().phase).toBe('paid');
    reopened.getState().destroy();

    // The same for a payment this page follows
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const followed = store();
    await followed.getState().load();
    await followed.getState().submit({ txKey: '0xfeed' });
    FakeEventSource.instances[1].emit(
      'status',
      signal('open', 6, { pendingPayments: 0, unresolvedPayments: 0, rejectedPayments: [failed] }),
    );
    expect(followed.getState()).toMatchObject({
      phase: 'unconfirmed',
      paymentOnTheWay: false,
      error: { code: 'payment_unconfirmed', reason: 'settlement_failed' },
    });
    followed.getState().destroy();
  });

  // Owner rule: a payment that may still arrive on a cancelled invoice is followed until it is held
  it('follows a cancelled invoice while its payment is on the way, until Quasar holds the payment', async () => {
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    // The merchant cancelled while the payment confirmed: Quasar keeps the stream open for it
    events.emit('status', signal('cancelled', 5, { pendingPayments: 1, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'cancelled', paymentOnTheWay: true });
    expect(events.closed).toBe(false);
    events.end();
    expect(events.closed).toBe(false);
    events.emit('status', signal('held', 6, { pendingPayments: 0, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'held', paymentOnTheWay: false });
    expect(events.closed).toBe(true);
  });

  it('ends the follow of a cancelled invoice whose payment failed, and stops with nothing on the way', async () => {
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const failed = store();
    await failed.getState().load();
    await failed.getState().submit({ txKey: '0xfeed' });
    const failedEvents = FakeEventSource.instances[0];
    failedEvents.emit('status', signal('cancelled', 5, { pendingPayments: 1, rejectedPayments: [] }));
    failedEvents.emit(
      'status',
      signal('cancelled', 6, { pendingPayments: 0, rejectedPayments: [rejection('0xfeed', 'reverted', true)] }),
    );
    expect(failed.getState()).toMatchObject({
      phase: 'cancelled',
      paymentOnTheWay: false,
      error: { code: 'payment_failed', reason: 'reverted' },
    });
    expect(failedEvents.closed).toBe(true);

    // Cancelled with nothing of this page on the way: nothing to follow
    answer({ pendingPayments: 0, rejectedPayments: [] });
    const idle = store();
    await idle.getState().load();
    const idleEvents = FakeEventSource.instances[1];
    idleEvents.emit('status', signal('cancelled', 3, { pendingPayments: 0, rejectedPayments: [] }));
    expect(idle.getState()).toMatchObject({ phase: 'cancelled', paymentOnTheWay: false, error: null });
    expect(idleEvents.closed).toBe(true);
  });

  it('reads a cancelled invoice slowly and stops 35 minutes after it saw the cancellation', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T12:00:00.000Z'));
    let status: CheckoutInvoice['status'] = 'open';
    answer({ rejectedPayments: [] }, { reads: () => ({ status, pendingPayments: status === 'open' ? 0 : 1 }) });
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    const events = FakeEventSource.instances[0];
    status = 'cancelled';
    // A Quasar that ends the stream on `cancelled` (it says nothing of the payments on their way)
    events.emit('status', signal('cancelled', 5));
    events.end();
    expect(events.closed).toBe(true);
    expect(FakeEventSource.instances).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(20_000);
    expect(checkout.getState()).toMatchObject({ phase: 'cancelled', paymentOnTheWay: true });
    const calls = fetchMock.mock.calls.length;
    await vi.advanceTimersByTimeAsync(40 * 60_000);
    expect(checkout.getState()).toMatchObject({ phase: 'cancelled', paymentOnTheWay: false });
    const atCap = fetchMock.mock.calls.length;
    expect(atCap).toBeLessThanOrEqual(calls + (35 * 60) / 20);
    // Still unresolved when it stopped following: never "nothing was charged"
    expect(checkout.getState().error).toMatchObject({ code: 'payment_unconfirmed' });
    await vi.advanceTimersByTimeAsync(60 * 60_000);
    expect(fetchMock).toHaveBeenCalledTimes(atCap);
  });

  it('follows a payment handed over to an invoice the merchant cancelled, and a reopened cancelled one', async () => {
    answer(
      { status: 'cancelled', pendingPayments: 0, rejectedPayments: [] },
      {
        submit: async () => json({ txKey: '0xfeed', status: 'cancelled' }, 202),
      },
    );
    const handed = store();
    await handed.getState().load();
    expect(handed.getState().phase).toBe('cancelled');
    expect(await handed.getState().submit({ txKey: '0xfeed' })).toBe(true);
    expect(handed.getState()).toMatchObject({ phase: 'cancelled', paymentOnTheWay: true, txKey: '0xfeed' });
    const events = FakeEventSource.instances.at(-1)!;
    expect(events.closed).toBe(false);
    events.emit('status', signal('held', 6, { pendingPayments: 0, rejectedPayments: [] }));
    expect(handed.getState()).toMatchObject({ phase: 'held', paymentOnTheWay: false });

    // Reopened while the payment is on its way
    answer({ status: 'cancelled', pendingPayments: 1, unresolvedPayments: 1, rejectedPayments: [] });
    const reopened = store();
    await reopened.getState().load();
    expect(reopened.getState()).toMatchObject({ phase: 'cancelled', invoicePaymentOnTheWay: true, error: null });
    const reopenedEvents = FakeEventSource.instances.at(-1)!;
    expect(reopenedEvents.closed).toBe(false);
    reopenedEvents.emit('status', signal('held', 7, { pendingPayments: 0, rejectedPayments: [] }));
    expect(reopened.getState().phase).toBe('held');

    // Reopened with a payment that may still arrive but none on its way: never "nothing was charged"
    answer({ status: 'cancelled', pendingPayments: 0, unresolvedPayments: 1, rejectedPayments: [] });
    const unresolved = store();
    await unresolved.getState().load();
    expect(unresolved.getState()).toMatchObject({
      phase: 'cancelled',
      invoicePaymentUnresolved: true,
      error: { code: 'payment_unconfirmed', rechecked: true },
    });
    unresolved.getState().destroy();
  });
});

describe('createCheckoutStore: the paying wallet confirms the invoice, refund-only holds, honest follow windows', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    FakeEventSource.instances = [];
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  const PAYER = QUOTE.payer;
  const OTHER = 'eip155:8453:0x2222222222222222222222222222222222222222';
  const MESSAGE =
    'shop.example wants you to sign in with your Ethereum account:\n0x1111111111111111111111111111111111111111\n\nPay invoice INV-2026-7 of Acme (49.00 USD) from this wallet.';
  const base = view().methods[0];
  const METHODS = [
    { ...base, id: 'ap_evm', gasless: 'off', payerProof: 'before_quote' as const },
    { ...base, id: 'ap_eth', chainId: 'eip155:1', gasless: 'off', payerProof: 'before_quote' as const },
    { ...base, id: 'ap_gasless', payerProof: 'unless_relayed' as const },
    {
      ...base,
      id: 'ap_sol',
      chainId: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
      gasless: 'off',
      payerProof: 'none' as const,
    },
  ];
  const messageOf = (payer: string, proven = false) => ({
    object: 'payer_proof_message',
    payer,
    proven,
    message: MESSAGE,
    domain: 'shop.example',
    chainId: payer.split(':').slice(0, 2).join(':'),
    nonce: '0123456789abcdef0123456789abcdef',
    issuedAt: '2026-10-29T10:00:00.000Z',
    expiresAt: null,
  });
  const proofOf = (payer: string, kind = 'eoa') => ({
    object: 'payer_proof',
    payer,
    proven: true,
    kind,
    chainId: payer.split(':').slice(0, 2).join(':'),
    confirmedAt: '2026-10-29T10:01:00.000Z',
  });

  /** Answers every checkout route; `routes` replaces the answer of one (by the end of its path). */
  const answer = (
    overrides: Partial<CheckoutView> = {},
    routes: Record<string, (body: Record<string, unknown>) => Response | Promise<Response>> = {},
  ) =>
    fetchMock.mockImplementation(async (input: string | Request, init?: RequestInit) => {
      const request = input instanceof Request ? input : new Request(input, init);
      const path = new URL(request.url).pathname;
      const text = await request.clone().text();
      const body = (text ? JSON.parse(text) : {}) as Record<string, unknown>;
      for (const [route, reply] of Object.entries(routes)) if (path.endsWith(`/${route}`)) return reply(body);
      if (path.endsWith('/payer-proof/message')) return json(messageOf(body.payer as string));
      if (path.endsWith('/payer-proof')) return json(proofOf(body.payer as string));
      if (path.endsWith('/quote')) return json({ ...QUOTE, methodId: body.methodId, payer: body.payer });
      if (path.endsWith('/submit')) return json({ txKey: '0xfeed', status: 'open' }, 202);
      return json(view({ methods: METHODS, payerProofs: [], ...overrides }));
    });

  const paths = () =>
    fetchMock.mock.calls.map(([input]) => new URL(input instanceof Request ? input.url : (input as string)).pathname);

  // Owner, 2026-10-29: one free signature before an EVM payment the buyer's wallet sends, after the wallet and the
  // method are chosen and before the price; one per invoice and wallet
  it('asks the wallet to confirm the invoice before the price of an EVM payment, once per invoice and wallet', async () => {
    answer();
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().payerProof).toBe('not_needed');
    checkout.getState().selectMethod('ap_evm');
    checkout.getState().setPayer(PAYER);
    expect(checkout.getState().payerProof).toBe('required');

    // No price before the confirmation, and no request for one
    expect(await checkout.getState().requestQuote()).toBeNull();
    expect(checkout.getState()).toMatchObject({ phase: 'selectMethod', error: { code: 'payer_proof_required' } });
    expect(paths()).toEqual(['/v1/payments/checkout/tok_1']);

    const states: string[] = [];
    checkout.subscribe((state) => states.push(state.payerProof));
    const sign = vi.fn().mockResolvedValue('0xsig');
    expect(await checkout.getState().confirmPayer(sign)).toBe(true);
    expect(await sent(1)).toEqual({
      method: 'POST',
      path: '/v1/payments/checkout/tok_1/payer-proof/message',
      body: { payer: PAYER },
    });
    // The wallet signs exactly the message Quasar built
    expect(sign).toHaveBeenCalledWith(MESSAGE, expect.objectContaining({ domain: 'shop.example', proven: false }));
    expect(await sent(2)).toEqual({
      method: 'POST',
      path: '/v1/payments/checkout/tok_1/payer-proof',
      body: { payer: PAYER, message: MESSAGE, signature: '0xsig' },
    });
    expect(states).toContain('confirming');
    expect(checkout.getState()).toMatchObject({ payerProof: 'confirmed', error: null, phase: 'selectMethod' });

    await checkout.getState().requestQuote();
    expect(checkout.getState()).toMatchObject({ phase: 'awaitingPayment', quote: { methodId: 'ap_evm' } });

    // A new quote, another token or network of the same wallet needs no new signature (an EOA signs for every network)
    checkout.getState().releaseQuote();
    checkout.getState().selectMethod('ap_eth');
    checkout.getState().setPayer('eip155:1:0x1111111111111111111111111111111111111111');
    expect(checkout.getState().payerProof).toBe('confirmed');
    expect(await checkout.getState().confirmPayer(sign)).toBe(true);
    expect(sign).toHaveBeenCalledTimes(1);
    expect(paths().filter((path) => path.includes('payer-proof'))).toHaveLength(2);

    // Another wallet confirms on its own
    checkout.getState().setPayer('eip155:1:0x2222222222222222222222222222222222222222');
    expect(checkout.getState().payerProof).toBe('required');
    checkout.getState().destroy();
  });

  it('remembers the wallets that confirmed the invoice from the checkout, a smart wallet only on its network', async () => {
    const smart = 'eip155:8453:0xAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa';
    answer({
      payerProofs: [
        { payer: smart, kind: 'eip1271', chainId: 'eip155:8453', confirmedAt: '2026-10-29T10:01:00.000Z' },
        { payer: OTHER, kind: 'eoa', chainId: 'eip155:8453', confirmedAt: '2026-10-29T10:02:00.000Z' },
      ],
    });
    const checkout = store();
    await checkout.getState().load();
    checkout.getState().selectMethod('ap_evm');
    checkout.getState().setPayer(smart.toLowerCase());
    expect(checkout.getState().payerProof).toBe('confirmed');
    // Its contract accepted the signature on Base only
    checkout.getState().selectMethod('ap_eth');
    checkout.getState().setPayer('eip155:1:0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    expect(checkout.getState().payerProof).toBe('required');
    checkout.getState().setPayer('eip155:1:0x2222222222222222222222222222222222222222');
    expect(checkout.getState().payerProof).toBe('confirmed');
    await checkout.getState().requestQuote();
    expect(await sent(1)).toMatchObject({ path: '/v1/payments/checkout/tok_1/quote' });
    checkout.getState().destroy();
  });

  it('needs no confirmation on Solana, nor before a quote the gasless relay may pay, nor with an older Quasar', async () => {
    answer();
    const checkout = store();
    await checkout.getState().load();
    checkout.getState().selectMethod('ap_sol');
    checkout
      .getState()
      .setPayer('solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM');
    expect(checkout.getState().payerProof).toBe('not_needed');
    await checkout.getState().requestQuote();
    expect(checkout.getState().phase).toBe('awaitingPayment');

    // The relay's authorization confirms the wallet: the price comes first, a transfer or a paymaster payment waits
    checkout.getState().releaseQuote();
    checkout.getState().selectMethod('ap_gasless');
    checkout.getState().setPayer(PAYER);
    expect(checkout.getState().payerProof).toBe('unless_relayed');
    await checkout.getState().requestQuote();
    expect(checkout.getState().phase).toBe('awaitingPayment');
    expect(await checkout.getState().confirmPayer(async () => '0xsig')).toBe(true);
    expect(checkout.getState()).toMatchObject({ payerProof: 'confirmed', phase: 'awaitingPayment' });
    checkout.getState().destroy();

    // A Quasar before payer proofs announces none
    answer({ methods: [view().methods[0]] });
    const older = store();
    await older.getState().load();
    older.getState().selectMethod('ap_1');
    older.getState().setPayer(PAYER);
    expect(older.getState().payerProof).toBe('not_needed');
    older.getState().destroy();
  });

  it('asks for the confirmation when Quasar refuses a price for an unconfirmed wallet the checkout did not announce', async () => {
    answer(
      { methods: [view().methods[0]] },
      {
        quote: () =>
          json(
            {
              error: {
                code: 'payer_proof_required',
                message: 'Confirm the paying wallet with a free signature first (POST payer-proof)',
                payer: PAYER,
              },
            },
            409,
          ),
      },
    );
    const checkout = store();
    await checkout.getState().load();
    checkout.getState().selectMethod('ap_1');
    checkout.getState().setPayer(PAYER);
    expect(await checkout.getState().requestQuote()).toBeNull();
    expect(checkout.getState()).toMatchObject({
      phase: 'selectMethod',
      payerProof: 'required',
      error: { code: 'payer_proof_required', status: 409 },
    });
    expect(await checkout.getState().confirmPayer(async () => '0xsig')).toBe(true);
    expect(checkout.getState().payerProof).toBe('confirmed');
    checkout.getState().destroy();
  });

  it('says why a confirmation failed and lets the buyer try again', async () => {
    let proofAnswer: () => Response = () => json(proofOf(PAYER));
    answer({}, { 'payer-proof': () => proofAnswer() });
    const checkout = store();
    await checkout.getState().load();

    // No wallet yet
    expect(await checkout.getState().confirmPayer(async () => '0xsig')).toBe(false);
    expect(checkout.getState().error).toMatchObject({ code: 'payer_required' });
    checkout.getState().selectMethod('ap_evm');
    checkout.getState().setPayer(PAYER);

    // The buyer refuses to sign in the wallet: nothing is sent
    const calls = fetchMock.mock.calls.length;
    expect(await checkout.getState().confirmPayer(async () => Promise.reject(new Error('User rejected')))).toBe(false);
    expect(checkout.getState()).toMatchObject({
      payerProof: 'required',
      phase: 'selectMethod',
      error: { code: 'payer_proof_declined' },
    });
    expect(paths().slice(calls)).toEqual(['/v1/payments/checkout/tok_1/payer-proof/message']);

    // Quasar refuses the signature, with why
    proofAnswer = () =>
      json(
        {
          error: {
            code: 'payer_proof_invalid',
            message: 'The signature is not the wallet’s',
            reason: 'signature_invalid',
          },
        },
        400,
      );
    expect(await checkout.getState().confirmPayer(async () => '0xbad')).toBe(false);
    expect(checkout.getState()).toMatchObject({
      payerProof: 'required',
      error: { code: 'payer_proof_invalid', reason: 'signature_invalid', status: 400 },
    });

    // The network of a smart wallet cannot be asked now
    proofAnswer = () =>
      json(
        {
          error: {
            code: 'payer_proof_unavailable',
            message: 'The network of the wallet cannot be asked now; try again in a moment',
            reason: 'rpc_failed',
          },
        },
        503,
      );
    expect(await checkout.getState().confirmPayer(async () => '0xsig')).toBe(false);
    expect(checkout.getState().error).toMatchObject({ code: 'payer_proof_unavailable', reason: 'rpc_failed' });

    // A wallet the merchant does not expect
    proofAnswer = () =>
      json({ error: { code: 'payer_not_expected', message: 'This invoice is to be paid from another wallet' } }, 403);
    expect(await checkout.getState().confirmPayer(async () => '0xsig')).toBe(false);
    expect(checkout.getState()).toMatchObject({ phase: 'blocked', error: { code: 'payer_not_expected' } });
    checkout.getState().destroy();

    // A wallet that confirmed the invoice before (another tab): no signature
    answer({}, { 'payer-proof/message': (body) => json(messageOf(body.payer as string, true)) });
    const before = fetchMock.mock.calls.length;
    const again = store();
    await again.getState().load();
    again.getState().selectMethod('ap_evm');
    again.getState().setPayer(PAYER);
    const sign = vi.fn();
    expect(await again.getState().confirmPayer(sign)).toBe(true);
    expect(sign).not.toHaveBeenCalled();
    expect(again.getState().payerProof).toBe('confirmed');
    expect(
      paths()
        .slice(before)
        .filter((path) => path.endsWith('/payer-proof')),
    ).toHaveLength(0);
    again.getState().destroy();
  });

  it('confirms the wallet through calls the app supplies, and refuses when they lack the confirmation', async () => {
    const api: CheckoutApi = {
      view: vi.fn().mockResolvedValue(view({ methods: METHODS, payerProofs: [] })),
      quote: vi.fn().mockResolvedValue(QUOTE),
      buyer: vi.fn(),
      locale: vi.fn(),
      submit: vi.fn(),
      relay: vi.fn(),
      permission: vi.fn(),
      payerProofMessage: vi.fn().mockResolvedValue(messageOf(PAYER)),
      payerProof: vi.fn().mockResolvedValue(proofOf(PAYER)),
      url: (route: string) => `sim://checkout/${route}`,
    };
    const checkout = createCheckoutStore({ token: 'tok_1', api, EventSource: null });
    await checkout.getState().load();
    checkout.getState().selectMethod('ap_evm');
    checkout.getState().setPayer(PAYER);
    expect(await checkout.getState().confirmPayer(async () => '0xsig')).toBe(true);
    expect(api.payerProof).toHaveBeenCalledWith({ payer: PAYER, message: MESSAGE, signature: '0xsig' });
    checkout.getState().destroy();

    // A simulation written before payer proofs
    const { payerProofMessage, payerProof, ...older } = api;
    void payerProofMessage;
    void payerProof;
    const simulated = createCheckoutStore({ token: 'tok_1', api: older, EventSource: null });
    await simulated.getState().load();
    simulated.getState().selectMethod('ap_evm');
    simulated.getState().setPayer(OTHER);
    expect(await simulated.getState().confirmPayer(async () => '0xsig')).toBe(false);
    expect(simulated.getState().error).toMatchObject({ code: 'request_failed' });
    simulated.getState().destroy();
  });

  // N2: a transfer credited to no invoice is held only to be refunded to the wallet that sent it
  it('tells a refund-only hold apart from a payment the merchant may release', async () => {
    const held = {
      ...view().invoice,
      status: 'held',
      amountPaid: '49000000',
      review: { reason: 'payer_mismatch', refundOnly: true },
    };
    answer({ invoice: held as CheckoutView['invoice'] });
    const checkout = store({ EventSource: null });
    await checkout.getState().load();
    expect(checkout.getState()).toMatchObject({
      phase: 'held',
      checkout: { invoice: { review: { reason: 'payer_mismatch', refundOnly: true } } },
    });
    expectTypeOf<NonNullable<CheckoutInvoice['review']>['reason']>().toEqualTypeOf<
      'screening' | 'late' | 'overpaid' | 'quote_expired' | 'payer_mismatch' | 'payer_unconfirmed'
    >();
    checkout.getState().destroy();
  });

  it('names a transfer from a wallet that never confirmed the invoice: it pays no invoice and goes back to its wallet', async () => {
    const unconfirmed = rejection('0xfeed', 'payer_unconfirmed', true);
    answer({ invoice: { ...view().invoice, pendingPayments: 0, rejectedPayments: [unconfirmed] } });
    const reopened = store({ EventSource: null });
    await reopened.getState().load();
    expect(reopened.getState()).toMatchObject({
      phase: 'selectMethod',
      error: { code: 'payment_mismatch', reason: 'payer_unconfirmed' },
    });
    expect(reopened.getState().error?.message).toMatch(/wallet that sent it/);
    expect(reopened.getState().error?.message).not.toMatch(/did not go through|nothing/i);
    reopened.getState().destroy();
  });

  it('promises the daily retry of a payment Quasar has not recorded only while Quasar retries it', async () => {
    const retried = rejection('0xfeed', 'settlement_failed', false, { movedMoney: true, rechecked: true });
    answer({ invoice: { ...view().invoice, pendingPayments: 0, unresolvedPayments: 0, rejectedPayments: [retried] } });
    const retrying = store({ EventSource: null });
    await retrying.getState().load();
    expect(retrying.getState()).toMatchObject({
      phase: 'unconfirmed',
      error: { code: 'payment_unconfirmed', reason: 'settlement_failed', rechecked: true },
    });
    expect(retrying.getState().error?.message).toMatch(/30 days/);
    retrying.getState().destroy();

    // Past the 30 days Quasar no longer retries: no promise, the merchant has the money
    const given = rejection('0xfeed', 'settlement_failed', false, { movedMoney: true });
    answer({ invoice: { ...view().invoice, pendingPayments: 0, unresolvedPayments: 0, rejectedPayments: [given] } });
    const over = store({ EventSource: null });
    await over.getState().load();
    expect(over.getState().error).toMatchObject({ code: 'payment_unconfirmed', reason: 'settlement_failed' });
    expect(over.getState().error?.rechecked).toBeUndefined();
    expect(over.getState().error?.message).not.toMatch(/tries again|daily/);
    expect(over.getState().error?.message).toMatch(/contact the merchant/);
    over.getState().destroy();
  });

  it('says that a transaction handed over for another invoice counts for the invoice its wallet confirmed', async () => {
    answer(
      {},
      {
        submit: () =>
          json(
            {
              error: {
                code: 'tx_already_used',
                message:
                  'The transaction was handed over for another invoice; it counts for the invoice the wallet that sent it confirmed',
              },
            },
            409,
          ),
      },
    );
    const checkout = store();
    await checkout.getState().load();
    await checkout.getState().submit({ txKey: '0xfeed' });
    expect(checkout.getState().error).toMatchObject({ code: 'payment_unconfirmed', reason: 'tx_already_used' });
    expect(checkout.getState().error?.message).toMatch(/confirmed/);
    expect(checkout.getState().error?.message).not.toMatch(/quoted wallet/);
    checkout.getState().destroy();
  });

  // The store's follow of an expired invoice counts from the latest hand-over, and says until when it follows
  it('follows an expired invoice 35 minutes past the latest hand-over, and tells the page until when', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-29T12:00:00.000Z'));
    const invoice = { ...view().invoice, dueAt: '2026-10-29T12:01:00.000Z', pendingPayments: 1, rejectedPayments: [] };
    answer({ invoice }, { submit: () => json({ txKey: '0xbeef', status: 'expired' }, 202) });
    const checkout = store();
    await checkout.getState().load();
    expect(checkout.getState().followingUntil).toBeNull();
    // A payment of the invoice found on its way
    const events = FakeEventSource.instances[0];
    await vi.advanceTimersByTimeAsync(2 * 60_000);
    events.emit('status', signal('expired', 5, { pendingPayments: 1, rejectedPayments: [] }));
    expect(checkout.getState()).toMatchObject({ phase: 'expired', invoicePaymentOnTheWay: true });
    expect(checkout.getState().followingUntil).toBe('2026-10-29T12:36:00.000Z');

    // Twenty minutes later the page hands over another transaction the wallet sent: it is followed for 35 minutes too
    await vi.advanceTimersByTimeAsync(20 * 60_000);
    expect(await checkout.getState().submit({ txKey: '0xbeef' })).toBe(true);
    expect(checkout.getState().followingUntil).toBe('2026-10-29T12:57:00.000Z');
    await vi.advanceTimersByTimeAsync(20 * 60_000);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: true });
    await vi.advanceTimersByTimeAsync(16 * 60_000);
    expect(checkout.getState()).toMatchObject({ phase: 'expired', paymentOnTheWay: false, followingUntil: null });
    checkout.getState().destroy();
  });
});

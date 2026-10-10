import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCheckoutStore } from '../checkout';
import type { CheckoutView } from '../checkout/types';

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
  close() {
    this.closed = true;
    this.readyState = 2;
  }
}

const view = (overrides: Partial<CheckoutView> = {}): CheckoutView => ({
  object: 'checkout',
  merchant: { name: 'Acme', website: null, supportEmail: null },
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
  },
  buyer: { collect: 'off', required: false, companyInvoice: false },
  methods: [
    {
      id: 'ap_1',
      name: 'USDC on Base',
      symbol: 'USDC',
      chainId: 'eip155:8453',
      assetId: null,
      decimals: 6,
      gasless: 'auto',
    },
  ],
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
});

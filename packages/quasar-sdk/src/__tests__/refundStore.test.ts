import { afterEach, describe, expect, it, vi } from 'vitest';

import { createRefundStore } from '../checkout';
import { QuasarSDKError } from '../core/errors';
import type { Refund, RefundStart } from '../modules/payments/types';

const refund = (status: Refund['status'], extra: Partial<Refund> = {}): Refund =>
  ({ id: 'ref_1', object: 'refund', invoiceId: 'inv_1', status, amount: '10.00', ...extra }) as Refund;

const START: RefundStart = {
  refund: refund('requested'),
  instructions: {
    chainId: 'eip155:8453',
    assetId: 'eip155:8453/erc20:0x3',
    to: '0x1',
    amount: '10000000',
    decimals: 6,
    symbol: 'USDC',
  },
};

describe('createRefundStore', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('asks for a refund, takes its transaction and follows it until confirmed', async () => {
    vi.useFakeTimers();
    const request = vi.fn().mockResolvedValue(START);
    const submit = vi.fn().mockResolvedValue(refund('submitted', { txHash: '0xfeed' }));
    const get = vi
      .fn()
      .mockResolvedValueOnce(refund('submitted'))
      .mockResolvedValueOnce(refund('confirmed', { creditNoteNumber: 'CN-2026-1' }));
    const store = createRefundStore({ request, submit, get, pollMs: 1_000 });
    expect(store.getState().phase).toBe('idle');

    expect(await store.getState().start('inv_1', { amount: '10.00', reason: 'Partial refund' })).toBe(true);
    expect(request).toHaveBeenCalledWith('inv_1', { amount: '10.00', reason: 'Partial refund' });
    expect(store.getState()).toMatchObject({ phase: 'awaitingTransfer', instructions: START.instructions });

    // The merchant's wallet sends instructions.amount of the token to instructions.to, then:
    expect(await store.getState().submit({ txHash: '0xfeed', from: '0x9' })).toBe(true);
    expect(submit).toHaveBeenCalledWith('ref_1', { txHash: '0xfeed', from: '0x9' });
    expect(store.getState().phase).toBe('confirming');

    await vi.advanceTimersByTimeAsync(1_000);
    expect(store.getState().phase).toBe('confirming');
    await vi.advanceTimersByTimeAsync(1_000);
    expect(store.getState()).toMatchObject({ phase: 'confirmed', refund: { creditNoteNumber: 'CN-2026-1' } });
    await vi.advanceTimersByTimeAsync(5_000);
    expect(get).toHaveBeenCalledTimes(2);
  });

  it('picks up a refund still waiting for its transaction, and reports a failed one', async () => {
    vi.useFakeTimers();
    const get = vi.fn().mockResolvedValue(refund('failed', { failureReason: 'wrong_amount' }));
    const store = createRefundStore({
      request: vi.fn(),
      submit: vi.fn().mockResolvedValue(refund('submitted')),
      get,
      pollMs: 1_000,
    });
    store.getState().resume(refund('requested'), START.instructions);
    expect(store.getState().phase).toBe('awaitingTransfer');
    await store.getState().submit({ txHash: '0xfeed', from: '0x9' });
    await vi.advanceTimersByTimeAsync(1_000);
    expect(store.getState()).toMatchObject({ phase: 'failed', refund: { failureReason: 'wrong_amount' } });
  });

  it('names the invoice a transfer is held on too, for one refund only', async () => {
    const refusal = new QuasarSDKError('[Quasar SDK] Request Failed (409): Held elsewhere', 409, new Error('x'), {
      code: 'payment_held_elsewhere',
      details: { invoice: 'inv_2' },
    });
    const store = createRefundStore({
      request: vi.fn().mockRejectedValue(refusal),
      submit: vi.fn(),
      get: vi.fn(),
    });
    expect(await store.getState().start('inv_1')).toBe(false);
    expect(store.getState()).toMatchObject({
      phase: 'idle',
      error: { code: 'payment_held_elsewhere', status: 409, otherInvoice: 'inv_2' },
    });
  });

  it('shows what a refund would send without asking for it', async () => {
    const shown = {
      amount: '10.00',
      currency: 'EUR',
      cryptoAmount: '12000000',
      symbol: 'USDC',
      decimals: 6,
      received: '50000000',
      atPaymentRate: '10000000',
      exactPossible: true,
    };
    const preview = vi.fn().mockResolvedValue(shown);
    const request = vi.fn();
    const store = createRefundStore({ request, preview, submit: vi.fn(), get: vi.fn() });
    expect(await store.getState().preview('inv_1', { amount: '10.00', mode: 'fiat_value' })).toEqual(shown);
    expect(preview).toHaveBeenCalledWith('inv_1', { amount: '10.00', mode: 'fiat_value' });
    expect(request).not.toHaveBeenCalled();
    expect(store.getState()).toMatchObject({ phase: 'idle', refund: null });

    preview.mockRejectedValueOnce(
      new QuasarSDKError('The amount exceeds what is left', 400, new Error('x'), { code: 'amount_exceeds_refundable' }),
    );
    expect(await store.getState().preview('inv_1', { amount: '999.00' })).toBeNull();
    expect(store.getState().error?.code).toBe('amount_exceeds_refundable');

    const without = createRefundStore({ request, submit: vi.fn(), get: vi.fn() });
    expect(await without.getState().preview('inv_1')).toBeNull();
    expect(without.getState().error).toBeNull();
  });

  it('forgets an earlier refusal when asked to look again, even with no way to look first', async () => {
    const refused = new QuasarSDKError('Too much', 400, new Error('x'), { code: 'amount_exceeds_refundable' });
    const store = createRefundStore({ request: vi.fn().mockRejectedValue(refused), submit: vi.fn(), get: vi.fn() });
    expect(await store.getState().start('inv_1', { amount: '999.00' })).toBe(false);
    expect(store.getState().error?.code).toBe('amount_exceeds_refundable');
    expect(await store.getState().preview('inv_1', { amount: '9.00' })).toBeNull();
    expect(store.getState().error).toBeNull();
  });

  it('keeps the refusal of the server and lets the merchant try again', async () => {
    const refusal = new QuasarSDKError('[Quasar SDK] Request Failed (409): Already used', 409, new Error('x'), {
      code: 'transaction_already_used',
    });
    const store = createRefundStore({
      request: vi.fn().mockResolvedValue(START),
      submit: vi.fn().mockRejectedValueOnce(refusal).mockResolvedValue(refund('submitted')),
      get: vi.fn().mockResolvedValue(refund('confirmed')),
    });
    await store.getState().start('inv_1');
    expect(await store.getState().submit({ txHash: '0xfeed', from: '0x9' })).toBe(false);
    expect(store.getState()).toMatchObject({
      phase: 'awaitingTransfer',
      error: { code: 'transaction_already_used', status: 409 },
    });
    store.getState().reset();
    expect(store.getState()).toMatchObject({ phase: 'idle', refund: null, error: null });
  });
});

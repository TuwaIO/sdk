import { createHmac } from 'node:crypto';

import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  isPaymentWebhookEvent,
  type PaymentWebhookEvent,
  type PaymentWebhookEventType,
  QuasarWebhookError,
  verifyWebhook,
  WEBHOOK_SIGNATURE_HEADER,
} from '../index';

const SECRET = 'whsec_test_1';
const sign = (body: string, secret = SECRET) => createHmac('sha256', secret).update(body).digest('hex');
const NOW = new Date('2026-10-10T12:00:00.000Z');

const paymentEvent = (sentAt: string) =>
  JSON.stringify({
    id: 'evt_1',
    object: 'event',
    apiVersion: 'payments.v1',
    type: 'invoice.paid',
    createdAt: '2026-10-10T11:59:58.000Z',
    sentAt,
    environment: 'test',
    data: { invoice: { id: 'inv_1', object: 'invoice', status: 'paid' } },
  });

describe('verifyWebhook', () => {
  it('reads a payment event whose signature matches the raw body', async () => {
    const body = paymentEvent('2026-10-10T11:59:59.000Z');
    const event = await verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW });

    expect(WEBHOOK_SIGNATURE_HEADER).toBe('x-quasar-signature');
    expect(isPaymentWebhookEvent(event)).toBe(true);
    if (!isPaymentWebhookEvent(event)) return;
    expect(event.type).toBe('invoice.paid');
    expect(event.data.invoice?.id).toBe('inv_1');
    // The body as bytes, as an edge runtime or a raw-body parser gives it
    await expect(
      verifyWebhook({ body: new TextEncoder().encode(body), signature: sign(body), secret: SECRET, now: NOW }),
    ).resolves.toMatchObject({ id: 'evt_1' });
  });

  it('refuses a body changed after signing, another secret, or no signature', async () => {
    const body = paymentEvent('2026-10-10T11:59:59.000Z');
    const changed = body.replace('invoice.paid', 'invoice.refunded');
    await expect(
      verifyWebhook({ body: changed, signature: sign(body), secret: SECRET, now: NOW }),
    ).rejects.toMatchObject({ name: 'QuasarWebhookError', code: 'invalid_signature' });
    await expect(
      verifyWebhook({ body, signature: sign(body, 'whsec_other'), secret: SECRET, now: NOW }),
    ).rejects.toMatchObject({ code: 'invalid_signature' });
    await expect(verifyWebhook({ body, signature: 'zz', secret: SECRET, now: NOW })).rejects.toMatchObject({
      code: 'invalid_signature',
    });
    await expect(verifyWebhook({ body, signature: null, secret: SECRET, now: NOW })).rejects.toBeInstanceOf(
      QuasarWebhookError,
    );
    await expect(verifyWebhook({ body, signature: undefined, secret: SECRET, now: NOW })).rejects.toMatchObject({
      code: 'missing_signature',
    });
    await expect(verifyWebhook({ body, signature: sign(body), secret: '', now: NOW })).rejects.toMatchObject({
      code: 'missing_secret',
    });
  });

  it('refuses a payment event sent longer ago than the tolerance, a replay of an old delivery', async () => {
    const old = paymentEvent('2026-10-10T11:54:00.000Z');
    await expect(verifyWebhook({ body: old, signature: sign(old), secret: SECRET, now: NOW })).rejects.toMatchObject({
      code: 'stale',
    });
    // A wider window, or none
    await expect(
      verifyWebhook({ body: old, signature: sign(old), secret: SECRET, now: NOW, toleranceSeconds: 600 }),
    ).resolves.toMatchObject({ id: 'evt_1' });
    await expect(
      verifyWebhook({ body: old, signature: sign(old), secret: SECRET, now: NOW, toleranceSeconds: false }),
    ).resolves.toMatchObject({ id: 'evt_1' });
    // From the future: a clock far ahead is refused the same way
    const ahead = paymentEvent('2026-10-10T12:10:00.000Z');
    await expect(
      verifyWebhook({ body: ahead, signature: sign(ahead), secret: SECRET, now: NOW }),
    ).rejects.toMatchObject({ code: 'stale' });
  });

  it('reads a transaction webhook whose timestamp is within tolerance', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      hash: '0x3a5f',
      status: 'Success',
      action: 'Success',
      txType: 'SWAP',
      chainId: '1',
      timestamp: Math.floor(NOW.getTime() / 1000),
      metadata: { amount: 100 },
    });
    const event = await verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW });
    expect(isPaymentWebhookEvent(event)).toBe(false);
    expect(event).toMatchObject({ txKey: '0x3a5f', status: 'Success' });
  });

  it('refuses an old transaction webhook captured by a researcher (8.77 h old, no sentAt)', async () => {
    const capturedBody =
      '{"hash": "0x6a6d07862acf7b72066686004db37279de16b283081e3dbd712ed8bf8c6643e4", "txKey": "0x6a6d07862acf7b72066686004db37279de16b283081e3dbd712ed8bf8c6643e4", "action": "Failed", "status": "Failed", "txType": "contract-call", "chainId": "11155111", "timestamp": 1793353943}';
    const capturedNow = new Date((1793353943 + Math.round(8.77 * 3600)) * 1000);

    // Default tolerance (300 s)
    await expect(
      verifyWebhook({ body: capturedBody, signature: sign(capturedBody), secret: SECRET, now: capturedNow }),
    ).rejects.toMatchObject({
      code: 'stale',
      message: 'The event was sent outside the 300 s tolerance (timestamp)',
    });

    // toleranceSeconds: 1
    await expect(
      verifyWebhook({
        body: capturedBody,
        signature: sign(capturedBody),
        secret: SECRET,
        now: capturedNow,
        toleranceSeconds: 1,
      }),
    ).rejects.toMatchObject({
      code: 'stale',
      message: 'The event was sent outside the 1 s tolerance (timestamp)',
    });

    // toleranceSeconds: false accepts it regardless of age
    await expect(
      verifyWebhook({
        body: capturedBody,
        signature: sign(capturedBody),
        secret: SECRET,
        now: capturedNow,
        toleranceSeconds: false,
      }),
    ).resolves.toMatchObject({
      txKey: '0x6a6d07862acf7b72066686004db37279de16b283081e3dbd712ed8bf8c6643e4',
    });
  });

  it('accepts a transaction webhook retry with a fresh sentAt and an old timestamp', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      status: 'Success',
      action: 'Success',
      chainId: '1',
      timestamp: 1_700_000_000,
      sentAt: '2026-10-10T11:59:59.000Z',
    });
    const event = await verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW });
    expect(isPaymentWebhookEvent(event)).toBe(false);
    expect(event).toMatchObject({ txKey: '0x3a5f', status: 'Success' });
  });

  it('refuses a transaction webhook with sentAt older than the tolerance, naming sentAt in the message', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      status: 'Success',
      action: 'Success',
      chainId: '1',
      timestamp: Math.floor(NOW.getTime() / 1000),
      sentAt: '2026-10-10T11:50:00.000Z',
    });
    await expect(verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW })).rejects.toMatchObject({
      code: 'stale',
      message: 'The event was sent outside the 300 s tolerance (sentAt)',
    });
  });

  it('refuses a transaction webhook whose sentAt is not a date, without falling back to timestamp', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      status: 'Success',
      action: 'Success',
      chainId: '1',
      timestamp: Math.floor(NOW.getTime() / 1000),
      sentAt: 'yesterday',
    });
    await expect(verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW })).rejects.toMatchObject({
      code: 'stale',
      message: 'The event carries no valid send time (sentAt)',
    });
  });

  it('refuses a transaction webhook with neither sentAt nor timestamp', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      status: 'Success',
      action: 'Success',
      chainId: '1',
    });
    await expect(verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW })).rejects.toMatchObject({
      code: 'stale',
    });
  });

  it('validates toleranceSeconds and rejects 0, negative numbers, NaN or Infinity with invalid_options', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      status: 'Success',
      action: 'Success',
      chainId: '1',
      timestamp: Math.floor(NOW.getTime() / 1000),
    });
    for (const toleranceSeconds of [0, -1, Number.NaN, Number.POSITIVE_INFINITY] as (number | false)[]) {
      await expect(
        verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW, toleranceSeconds }),
      ).rejects.toMatchObject({ code: 'invalid_options' });
    }
  });

  it('refuses a transaction webhook with a tampered body or wrong secret with invalid_signature', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      status: 'Success',
      action: 'Success',
      chainId: '1',
      timestamp: Math.floor(NOW.getTime() / 1000),
    });
    await expect(
      verifyWebhook({ body: `${body} `, signature: sign(body), secret: SECRET, now: NOW }),
    ).rejects.toMatchObject({ code: 'invalid_signature' });
    await expect(
      verifyWebhook({ body, signature: sign(body, 'whsec_wrong'), secret: SECRET, now: NOW }),
    ).rejects.toMatchObject({ code: 'invalid_signature' });
  });

  it('refuses a signed body that is not a webhook', async () => {
    for (const body of ['not json', '[]', '"text"']) {
      await expect(verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW })).rejects.toMatchObject({
        code: 'invalid_body',
      });
    }
  });

  // A refund-only hold undone because its transfer paid another invoice (Quasar, 2026-10-29)
  it('reads what a hold is about, and the hold Quasar undid when its transfer paid another invoice', async () => {
    const body = JSON.stringify({
      ...JSON.parse(paymentEvent('2026-10-10T11:59:59.000Z')),
      type: 'invoice.hold_voided',
      data: {
        invoice: { id: 'inv_1', object: 'invoice', status: 'open' },
        hold: { voided: true, txHash: '0xfeed', paidInvoice: 'inv_2', status: 'open' },
      },
    });
    const event = await verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW });
    if (!isPaymentWebhookEvent(event)) throw new Error('A payment event');
    expect(event.type).toBe('invoice.hold_voided');
    expect(event.data.hold).toEqual({ voided: true, txHash: '0xfeed', paidInvoice: 'inv_2', status: 'open' });
    expectTypeOf<'invoice.hold_voided'>().toExtend<PaymentWebhookEventType>();
    expectTypeOf<NonNullable<PaymentWebhookEvent['data']['hold']>>().toEqualTypeOf<
      | {
          voided?: undefined;
          reason: 'late' | 'aml' | 'quote_expired' | 'payer_mismatch' | null;
          refundOnly: boolean;
          txHash: string | null;
          senders?: string[];
          unconfirmed?: true;
          late?: true;
        }
      | { voided: true; txHash: string | null; paidInvoice: string | null; status: string | null }
    >();
  });
});

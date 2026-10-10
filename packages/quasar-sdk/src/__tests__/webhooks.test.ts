import { createHmac } from 'node:crypto';

import { describe, expect, it } from 'vitest';

import { isPaymentWebhookEvent, QuasarWebhookError, verifyWebhook, WEBHOOK_SIGNATURE_HEADER } from '../index';

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

  it('reads a transaction webhook, which has no send time to check', async () => {
    const body = JSON.stringify({
      txKey: '0x3a5f',
      hash: '0x3a5f',
      status: 'Success',
      action: 'Success',
      txType: 'SWAP',
      chainId: '1',
      timestamp: 1_700_000_000,
      metadata: { amount: 100 },
    });
    const event = await verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW });
    expect(isPaymentWebhookEvent(event)).toBe(false);
    expect(event).toMatchObject({ txKey: '0x3a5f', status: 'Success' });
  });

  it('refuses a signed body that is not a webhook', async () => {
    for (const body of ['not json', '[]', '"text"']) {
      await expect(verifyWebhook({ body, signature: sign(body), secret: SECRET, now: NOW })).rejects.toMatchObject({
        code: 'invalid_body',
      });
    }
  });
});

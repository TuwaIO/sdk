# verifyWebhook()

> **verifyWebhook**(`params`): `Promise`\<[`QuasarWebhook`](/packages/quasar-sdk/server/type-aliases/QuasarWebhook.md)\>

Defined in: [webhooks.ts:307](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L307)

Verifies a Quasar webhook and returns its body. Checks the signature (`x-quasar-signature`, the hex HMAC-SHA256 of
the raw body keyed with the endpoint's signing secret) in constant time, parses the body and refuses a delivery
whose send time (`sentAt`, falling back to `timestamp` for older transaction webhooks) is further from now than
`toleranceSeconds` (a replay of an old delivery). Uses Web Crypto, so it runs in Node.js 20+, edge runtimes and
Workers. Payment events are delivered at least once: deduplicate them by `id`.

## Parameters

### params

[`VerifyWebhookParams`](/packages/quasar-sdk/server/interfaces/VerifyWebhookParams.md)

The raw body, the signature header, the secret and the tolerance.

## Returns

`Promise`\<[`QuasarWebhook`](/packages/quasar-sdk/server/type-aliases/QuasarWebhook.md)\>

The body: a [PaymentWebhookEvent](/packages/quasar-sdk/server/interfaces/PaymentWebhookEvent.md) or a [TransactionWebhookEvent](/packages/quasar-sdk/server/interfaces/TransactionWebhookEvent.md).

## Throws

`missing_secret`, `missing_signature`, `invalid_signature`, `invalid_body` (not a
  JSON object), `invalid_options` (an invalid `toleranceSeconds`) or `stale` (an event outside the tolerance or
  missing its send time).

## Example

```ts
import { isPaymentWebhookEvent, verifyWebhook } from '@tuwaio/quasar-sdk';

export async function POST(request: Request) {
  try {
    const event = await verifyWebhook({
      body: await request.text(),
      signature: request.headers.get('x-quasar-signature'),
      secret: process.env.QUASAR_WEBHOOK_SECRET ?? '',
    });
    if (isPaymentWebhookEvent(event) && event.type === 'invoice.paid') {
      await fulfil(event.data.invoice?.metadata?.orderId);
    }
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
```

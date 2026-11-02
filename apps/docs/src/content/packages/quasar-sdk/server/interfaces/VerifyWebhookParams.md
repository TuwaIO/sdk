# VerifyWebhookParams

Defined in: webhooks.ts:128

What [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md) takes.

## Properties

### body

> **body**: `string` \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: webhooks.ts:130

The request body exactly as received, before any parsing: a string or its bytes.

***

### now?

> `optional` **now?**: `Date`

Defined in: webhooks.ts:143

The current time, for tests. Defaults to now.

***

### secret

> **secret**: `string`

Defined in: webhooks.ts:134

The signing secret of the webhook endpoint.

***

### signature

> **signature**: `string` \| `null` \| `undefined`

Defined in: webhooks.ts:132

The value of the `x-quasar-signature` header.

***

### toleranceSeconds?

> `optional` **toleranceSeconds?**: `number` \| `false`

Defined in: webhooks.ts:141

How far the send time may be from now, in seconds: a finite number above 0, or `false` to turn the check off
(`0`, a negative number, `NaN` or `Infinity` throw `invalid_options`). Defaults to `300`. The send time is
`sentAt`; a transaction webhook of an engine that sends no `sentAt` is checked by its `timestamp`, the time it was
created, which its retries reuse, so a retry later than the tolerance is refused.

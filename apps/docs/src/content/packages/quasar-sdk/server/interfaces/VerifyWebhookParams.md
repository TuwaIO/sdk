# VerifyWebhookParams

Defined in: [webhooks.ts:169](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L169)

What [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md) takes.

## Properties

### body

> **body**: `string` \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [webhooks.ts:171](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L171)

The request body exactly as received, before any parsing: a string or its bytes.

***

### now?

> `optional` **now?**: `Date`

Defined in: [webhooks.ts:182](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L182)

The current time, for tests. Defaults to now.

***

### secret

> **secret**: `string`

Defined in: [webhooks.ts:175](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L175)

The signing secret of the webhook endpoint.

***

### signature

> **signature**: `string` \| `null` \| `undefined`

Defined in: [webhooks.ts:173](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L173)

The value of the `x-quasar-signature` header.

***

### toleranceSeconds?

> `optional` **toleranceSeconds?**: `number` \| `false`

Defined in: [webhooks.ts:180](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L180)

How far `sentAt` of a payment event may be from now, in seconds; `false` turns the check off. Defaults to `300`.
Transaction webhooks carry no send time and are not checked.

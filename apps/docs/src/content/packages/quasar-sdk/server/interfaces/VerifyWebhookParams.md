# VerifyWebhookParams

Defined in: [webhooks.ts:123](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L123)

What [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md) takes.

## Properties

### body

> **body**: `string` \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [webhooks.ts:125](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L125)

The request body exactly as received, before any parsing: a string or its bytes.

***

### now?

> `optional` **now?**: `Date`

Defined in: [webhooks.ts:136](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L136)

The current time, for tests. Defaults to now.

***

### secret

> **secret**: `string`

Defined in: [webhooks.ts:129](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L129)

The signing secret of the webhook endpoint.

***

### signature

> **signature**: `string` \| `null` \| `undefined`

Defined in: [webhooks.ts:127](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L127)

The value of the `x-quasar-signature` header.

***

### toleranceSeconds?

> `optional` **toleranceSeconds?**: `number` \| `false`

Defined in: [webhooks.ts:134](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L134)

How far `sentAt` of a payment event may be from now, in seconds; `false` turns the check off. Defaults to `300`.
Transaction webhooks carry no send time and are not checked.

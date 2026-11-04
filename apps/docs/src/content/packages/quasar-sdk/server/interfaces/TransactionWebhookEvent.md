# TransactionWebhookEvent

Defined in: [webhooks.ts:156](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L156)

The body of a transaction webhook: a synced Pulsar transaction reached a final status.

## Properties

### action

> **action**: `string`

Defined in: [webhooks.ts:164](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L164)

The same as `status`; also sent in the `x-quasar-event` header.

***

### chainId

> **chainId**: `string`

Defined in: [webhooks.ts:168](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L168)

Its chain: the EVM chain ID (`"1"`) or the Solana CAIP-2 chain ID.

***

### hash?

> `optional` **hash?**: `string`

Defined in: [webhooks.ts:160](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L160)

Its on-chain hash, when it has one.

***

### metadata?

> `optional` **metadata?**: `unknown`

Defined in: [webhooks.ts:177](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L177)

The `payload` of the Pulsar transaction.

***

### sentAt?

> `optional` **sentAt?**: `string`

Defined in: [webhooks.ts:175](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L175)

When this delivery attempt was sent (ISO 8601), signed with the body. Quasar engines released before Payments omit
it; [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md) then checks `timestamp`.

***

### status

> **status**: `string`

Defined in: [webhooks.ts:162](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L162)

Final status: `Success`, `Failed` or `Replaced`.

***

### timestamp

> **timestamp**: `number`

Defined in: [webhooks.ts:170](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L170)

Unix time in seconds when the webhook was created.

***

### txKey

> **txKey**: `string`

Defined in: [webhooks.ts:158](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L158)

Key of the Pulsar transaction.

***

### txType?

> `optional` **txType?**: `string`

Defined in: [webhooks.ts:166](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L166)

The `type` of the Pulsar transaction.

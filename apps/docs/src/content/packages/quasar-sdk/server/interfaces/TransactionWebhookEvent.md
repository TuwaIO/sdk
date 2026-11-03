# TransactionWebhookEvent

Defined in: [webhooks.ts:124](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L124)

The body of a transaction webhook: a synced Pulsar transaction reached a final status.

## Properties

### action

> **action**: `string`

Defined in: [webhooks.ts:132](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L132)

The same as `status`; also sent in the `x-quasar-event` header.

***

### chainId

> **chainId**: `string`

Defined in: [webhooks.ts:136](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L136)

Its chain: the EVM chain ID (`"1"`) or the Solana CAIP-2 chain ID.

***

### hash?

> `optional` **hash?**: `string`

Defined in: [webhooks.ts:128](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L128)

Its on-chain hash, when it has one.

***

### metadata?

> `optional` **metadata?**: `unknown`

Defined in: [webhooks.ts:145](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L145)

The `payload` of the Pulsar transaction.

***

### sentAt?

> `optional` **sentAt?**: `string`

Defined in: [webhooks.ts:143](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L143)

When this delivery attempt was sent (ISO 8601), signed with the body. Quasar engines released before Payments omit
it; [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md) then checks `timestamp`.

***

### status

> **status**: `string`

Defined in: [webhooks.ts:130](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L130)

Final status: `Success`, `Failed` or `Replaced`.

***

### timestamp

> **timestamp**: `number`

Defined in: [webhooks.ts:138](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L138)

Unix time in seconds when the webhook was created.

***

### txKey

> **txKey**: `string`

Defined in: [webhooks.ts:126](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L126)

Key of the Pulsar transaction.

***

### txType?

> `optional` **txType?**: `string`

Defined in: [webhooks.ts:134](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L134)

The `type` of the Pulsar transaction.

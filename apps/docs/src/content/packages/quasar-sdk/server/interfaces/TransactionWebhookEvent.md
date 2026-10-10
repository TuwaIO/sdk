# TransactionWebhookEvent

Defined in: [webhooks.ts:78](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L78)

The body of a transaction webhook: a synced Pulsar transaction reached a final status.

## Properties

### action

> **action**: `string`

Defined in: [webhooks.ts:86](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L86)

The same as `status`; also sent in the `x-quasar-event` header.

***

### chainId

> **chainId**: `string`

Defined in: [webhooks.ts:90](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L90)

Its chain: the EVM chain ID (`"1"`) or the Solana CAIP-2 chain ID.

***

### hash?

> `optional` **hash?**: `string`

Defined in: [webhooks.ts:82](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L82)

Its on-chain hash, when it has one.

***

### metadata?

> `optional` **metadata?**: `unknown`

Defined in: [webhooks.ts:94](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L94)

The `payload` of the Pulsar transaction.

***

### status

> **status**: `string`

Defined in: [webhooks.ts:84](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L84)

Final status: `Success`, `Failed` or `Replaced`.

***

### timestamp

> **timestamp**: `number`

Defined in: [webhooks.ts:92](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L92)

Unix time in seconds when the webhook was created.

***

### txKey

> **txKey**: `string`

Defined in: [webhooks.ts:80](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L80)

Key of the Pulsar transaction.

***

### txType?

> `optional` **txType?**: `string`

Defined in: [webhooks.ts:88](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L88)

The `type` of the Pulsar transaction.

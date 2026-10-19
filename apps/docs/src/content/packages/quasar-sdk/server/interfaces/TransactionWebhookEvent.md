# TransactionWebhookEvent

Defined in: webhooks.ts:78

The body of a transaction webhook: a synced Pulsar transaction reached a final status.

## Properties

### action

> **action**: `string`

Defined in: webhooks.ts:86

The same as `status`; also sent in the `x-quasar-event` header.

***

### chainId

> **chainId**: `string`

Defined in: webhooks.ts:90

Its chain: the EVM chain ID (`"1"`) or the Solana CAIP-2 chain ID.

***

### hash?

> `optional` **hash?**: `string`

Defined in: webhooks.ts:82

Its on-chain hash, when it has one.

***

### metadata?

> `optional` **metadata?**: `unknown`

Defined in: webhooks.ts:94

The `payload` of the Pulsar transaction.

***

### status

> **status**: `string`

Defined in: webhooks.ts:84

Final status: `Success`, `Failed` or `Replaced`.

***

### timestamp

> **timestamp**: `number`

Defined in: webhooks.ts:92

Unix time in seconds when the webhook was created.

***

### txKey

> **txKey**: `string`

Defined in: webhooks.ts:80

Key of the Pulsar transaction.

***

### txType?

> `optional` **txType?**: `string`

Defined in: webhooks.ts:88

The `type` of the Pulsar transaction.

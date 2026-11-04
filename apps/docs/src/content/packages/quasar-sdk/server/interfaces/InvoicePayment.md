# InvoicePayment

Defined in: [modules/payments/types.ts:372](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L372)

A transfer credited to an invoice. An invoice paid in parts has several.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:378](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L378)

What it credited, in base units of the token of the quote.

***

### at

> **at**: `string`

Defined in: [modules/payments/types.ts:384](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L384)

When it was verified.

***

### blockRef

> **blockRef**: `string` \| `null`

Defined in: [modules/payments/types.ts:382](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L382)

Block (EVM) or slot (Solana).

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:376](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L376)

CAIP-2 chain ID of the transfer.

***

### senders

> **senders**: `string`[]

Defined in: [modules/payments/types.ts:380](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L380)

The addresses that sent it.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:374](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L374)

Transaction hash or Solana signature.

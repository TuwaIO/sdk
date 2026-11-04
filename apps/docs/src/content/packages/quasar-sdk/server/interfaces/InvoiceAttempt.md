# InvoiceAttempt

Defined in: [modules/payments/types.ts:388](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L388)

A transaction that was tied to an invoice and did not pay it.

## Properties

### at

> **at**: `string`

Defined in: [modules/payments/types.ts:398](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L398)

When it was recorded.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:392](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L392)

CAIP-2 chain ID of the transaction.

***

### held

> **held**: `boolean`

Defined in: [modules/payments/types.ts:396](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L396)

Whether it reached you and waits as a held transfer for a refund to its sender.

***

### reason

> **reason**: `string`

Defined in: [modules/payments/types.ts:394](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L394)

Why it did not pay the invoice, such as `payer_mismatch`, `quote_expired` or `aml`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:390](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L390)

Transaction hash or Solana signature.

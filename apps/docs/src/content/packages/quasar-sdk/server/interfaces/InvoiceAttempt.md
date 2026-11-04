# InvoiceAttempt

Defined in: [modules/payments/types.ts:390](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L390)

A transaction that was tied to an invoice and did not pay it.

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [modules/payments/types.ts:398](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L398)

What it carried to you without paying anything, when it did: base units of the invoice's token.

***

### at

> **at**: `string`

Defined in: [modules/payments/types.ts:404](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L404)

When it was recorded.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:394](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L394)

CAIP-2 chain ID of the transaction.

***

### heldTransfer

> **heldTransfer**: `string` \| `null`

Defined in: [modules/payments/types.ts:402](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L402)

The held transfer it became, for a refund to its sender (see `listHeldTransfers`, which keeps its state).

***

### reason

> **reason**: `string`

Defined in: [modules/payments/types.ts:396](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L396)

Why it did not pay the invoice, such as `reverted`, `no_matching_transfer` or `payer_mismatch`.

***

### senders

> **senders**: `string`[]

Defined in: [modules/payments/types.ts:400](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L400)

The addresses that sent what it carried.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:392](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L392)

Transaction hash or Solana signature.

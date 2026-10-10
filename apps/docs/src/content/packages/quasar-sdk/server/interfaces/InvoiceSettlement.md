# InvoiceSettlement

Defined in: [modules/payments/types.ts:184](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L184)

The payment that settled an invoice.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [modules/payments/types.ts:192](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L192)

Amount received, in base units.

***

### blockRef

> **blockRef**: `string` \| `null`

Defined in: [modules/payments/types.ts:190](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L190)

Block (EVM) or slot (Solana) of the transaction.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:186](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L186)

CAIP-2 chain ID of the payment.

***

### originWallet

> **originWallet**: `string` \| `null`

Defined in: [modules/payments/types.ts:194](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L194)

The address that paid.

***

### overpaid

> **overpaid**: `string`

Defined in: [modules/payments/types.ts:198](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L198)

Base units received beyond what was due; a refund can return them.

***

### paidAt

> **paidAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:196](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L196)

When it was paid.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:188](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L188)

Transaction hash or Solana signature.

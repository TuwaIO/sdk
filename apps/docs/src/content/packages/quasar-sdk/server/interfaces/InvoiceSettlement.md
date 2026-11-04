# InvoiceSettlement

Defined in: [modules/payments/types.ts:192](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L192)

The payment that settled an invoice.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [modules/payments/types.ts:202](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L202)

Amount received, in base units.

***

### blockRef

> **blockRef**: `string` \| `null`

Defined in: [modules/payments/types.ts:200](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L200)

Block (EVM) or slot (Solana) of the transaction.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:196](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L196)

CAIP-2 chain ID of the payment.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:194](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L194)

ID of the payment method paid with (see `listMethods`): its token and network read [InvoiceSettlement.amountPaid](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md#amountpaid).

***

### originWallet

> **originWallet**: `string` \| `null`

Defined in: [modules/payments/types.ts:204](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L204)

The address that paid.

***

### overpaid

> **overpaid**: `string`

Defined in: [modules/payments/types.ts:208](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L208)

Base units received beyond what was due; a refund can return them.

***

### paidAt

> **paidAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:206](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L206)

When it was paid.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:198](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L198)

Transaction hash or Solana signature.

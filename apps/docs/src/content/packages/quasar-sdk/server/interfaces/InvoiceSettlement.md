# InvoiceSettlement

Defined in: [modules/payments/types.ts:189](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L189)

The payment that settled an invoice.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [modules/payments/types.ts:199](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L199)

Amount received, in base units.

***

### blockRef

> **blockRef**: `string` \| `null`

Defined in: [modules/payments/types.ts:197](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L197)

Block (EVM) or slot (Solana) of the transaction.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:193](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L193)

CAIP-2 chain ID of the payment.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:191](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L191)

ID of the payment method paid with (see `listMethods`): its token and network read [InvoiceSettlement.amountPaid](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md#amountpaid).

***

### originWallet

> **originWallet**: `string` \| `null`

Defined in: [modules/payments/types.ts:201](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L201)

The address that paid.

***

### overpaid

> **overpaid**: `string`

Defined in: [modules/payments/types.ts:205](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L205)

Base units received beyond what was due; a refund can return them.

***

### paidAt

> **paidAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:203](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L203)

When it was paid.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:195](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L195)

Transaction hash or Solana signature.

# InvoiceSettlement

Defined in: [modules/payments/types.ts:195](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L195)

The payment that settled an invoice. An invoice paid in parts has several transfers: this names the last one, and
[InvoiceDetails.payments](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md#payments) names them all.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [modules/payments/types.ts:205](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L205)

Amount received in all, in base units.

***

### blockRef

> **blockRef**: `string` \| `null`

Defined in: [modules/payments/types.ts:203](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L203)

Block (EVM) or slot (Solana) of the last transfer.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:199](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L199)

CAIP-2 chain ID of the payment.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:197](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L197)

ID of the payment method paid with (see `listMethods`): its token and network read [InvoiceSettlement.amountPaid](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md#amountpaid).

***

### originWallet

> **originWallet**: `string` \| `null`

Defined in: [modules/payments/types.ts:207](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L207)

The address that paid.

***

### overpaid

> **overpaid**: `string`

Defined in: [modules/payments/types.ts:211](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L211)

Base units received beyond what was due; a refund can return them.

***

### paidAt

> **paidAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:209](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L209)

When it was paid.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:201](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L201)

Transaction hash or Solana signature of the last transfer.

# InvoiceSettlement

Defined in: modules/payments/types.ts:184

The payment that settled an invoice.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: modules/payments/types.ts:194

Amount received, in base units.

***

### blockRef

> **blockRef**: `string` \| `null`

Defined in: modules/payments/types.ts:192

Block (EVM) or slot (Solana) of the transaction.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: modules/payments/types.ts:188

CAIP-2 chain ID of the payment.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: modules/payments/types.ts:186

ID of the payment method paid with (see `listMethods`): its token and network read [InvoiceSettlement.amountPaid](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md#amountpaid).

***

### originWallet

> **originWallet**: `string` \| `null`

Defined in: modules/payments/types.ts:196

The address that paid.

***

### overpaid

> **overpaid**: `string`

Defined in: modules/payments/types.ts:200

Base units received beyond what was due; a refund can return them.

***

### paidAt

> **paidAt**: `string` \| `null`

Defined in: modules/payments/types.ts:198

When it was paid.

***

### txHash

> **txHash**: `string`

Defined in: modules/payments/types.ts:190

Transaction hash or Solana signature.

# InvoiceSettlement

Defined in: modules/payments/types.ts:184

The payment that settled an invoice.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: modules/payments/types.ts:192

Amount received, in base units.

***

### blockRef

> **blockRef**: `string` \| `null`

Defined in: modules/payments/types.ts:190

Block (EVM) or slot (Solana) of the transaction.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: modules/payments/types.ts:186

CAIP-2 chain ID of the payment.

***

### originWallet

> **originWallet**: `string` \| `null`

Defined in: modules/payments/types.ts:194

The address that paid.

***

### overpaid

> **overpaid**: `string`

Defined in: modules/payments/types.ts:198

Base units received beyond what was due; a refund can return them.

***

### paidAt

> **paidAt**: `string` \| `null`

Defined in: modules/payments/types.ts:196

When it was paid.

***

### txHash

> **txHash**: `string`

Defined in: modules/payments/types.ts:188

Transaction hash or Solana signature.

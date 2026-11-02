# CheckoutStatusEvent

Defined in: checkout/types.ts:387

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: checkout/types.ts:395

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: checkout/types.ts:391

Number of ledger steps so far.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: checkout/types.ts:397

When the locked quote expires.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: checkout/types.ts:389

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: checkout/types.ts:393

The payment transaction, once there is one.

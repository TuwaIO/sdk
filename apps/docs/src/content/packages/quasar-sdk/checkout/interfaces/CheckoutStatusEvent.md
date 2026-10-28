# CheckoutStatusEvent

Defined in: [checkout/types.ts:398](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L398)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:406](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L406)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:402](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L402)

Number of ledger steps so far.

***

### pendingPayments?

> `optional` **pendingPayments?**: `number`

Defined in: [checkout/types.ts:413](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L413)

Payments handed over and still on their way, as [CheckoutInvoice.pendingPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#pendingpayments). Quasar keeps the stream of an
`expired` invoice open while it is above `0`.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:408](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L408)

When the locked quote expires.

***

### rejectedTxKeys?

> `optional` **rejectedTxKeys?**: `string`[]

Defined in: [checkout/types.ts:415](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L415)

The payments that failed, latest first, as [CheckoutInvoice.rejectedTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedtxkeys).

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:400](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L400)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:404](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L404)

The payment transaction, once there is one.

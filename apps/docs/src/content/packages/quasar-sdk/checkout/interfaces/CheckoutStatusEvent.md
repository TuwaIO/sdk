# CheckoutStatusEvent

Defined in: [checkout/types.ts:608](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L608)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:616](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L616)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:612](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L612)

Number of ledger steps so far.

***

### onTimeTxKeys?

> `optional` **onTimeTxKeys?**: `string`[]

Defined in: [checkout/types.ts:633](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L633)

The keys of the payments that count as sent in time, as [CheckoutInvoice.onTimeTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#ontimetxkeys).

***

### paymentCountsUntil?

> `optional` **paymentCountsUntil?**: `string` \| `null`

Defined in: [checkout/types.ts:629](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L629)

Until when a payment sent before the due date counts, as [CheckoutInvoice.paymentCountsUntil](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#paymentcountsuntil).

***

### pendingPayments?

> `optional` **pendingPayments?**: `number`

Defined in: [checkout/types.ts:623](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L623)

Payments handed over and still on their way, as [CheckoutInvoice.pendingPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#pendingpayments). Quasar keeps the stream of an
`expired` or `cancelled` invoice open while it is above `0`.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:618](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L618)

When the locked quote expires.

***

### rejectedPayments?

> `optional` **rejectedPayments?**: [`CheckoutRejectedPayment`](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md)[]

Defined in: [checkout/types.ts:627](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L627)

The payments that failed and why, latest first, as [CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments).

***

### rejectedTxKeys?

> `optional` **rejectedTxKeys?**: `string`[]

Defined in: [checkout/types.ts:625](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L625)

The keys of the payments that failed, latest first, as [CheckoutInvoice.rejectedTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedtxkeys).

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:610](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L610)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:614](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L614)

The payment transaction, once there is one.

***

### unresolvedPayments?

> `optional` **unresolvedPayments?**: `number`

Defined in: [checkout/types.ts:631](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L631)

Payments that may still arrive, with no time limit, as [CheckoutInvoice.unresolvedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#unresolvedpayments).

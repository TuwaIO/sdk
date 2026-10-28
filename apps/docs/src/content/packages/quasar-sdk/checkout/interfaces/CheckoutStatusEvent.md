# CheckoutStatusEvent

Defined in: [checkout/types.ts:469](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L469)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:477](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L477)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:473](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L473)

Number of ledger steps so far.

***

### onTimeTxKeys?

> `optional` **onTimeTxKeys?**: `string`[]

Defined in: [checkout/types.ts:494](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L494)

The keys of the payments that count as sent in time, as [CheckoutInvoice.onTimeTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#ontimetxkeys).

***

### paymentCountsUntil?

> `optional` **paymentCountsUntil?**: `string` \| `null`

Defined in: [checkout/types.ts:490](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L490)

Until when a payment sent before the due date counts, as [CheckoutInvoice.paymentCountsUntil](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#paymentcountsuntil).

***

### pendingPayments?

> `optional` **pendingPayments?**: `number`

Defined in: [checkout/types.ts:484](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L484)

Payments handed over and still on their way, as [CheckoutInvoice.pendingPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#pendingpayments). Quasar keeps the stream of an
`expired` invoice open while it is above `0`.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:479](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L479)

When the locked quote expires.

***

### rejectedPayments?

> `optional` **rejectedPayments?**: [`CheckoutRejectedPayment`](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md)[]

Defined in: [checkout/types.ts:488](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L488)

The payments that failed and why, latest first, as [CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments).

***

### rejectedTxKeys?

> `optional` **rejectedTxKeys?**: `string`[]

Defined in: [checkout/types.ts:486](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L486)

The keys of the payments that failed, latest first, as [CheckoutInvoice.rejectedTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedtxkeys).

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:471](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L471)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:475](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L475)

The payment transaction, once there is one.

***

### unresolvedPayments?

> `optional` **unresolvedPayments?**: `number`

Defined in: [checkout/types.ts:492](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L492)

Payments that may still arrive, with no time limit, as [CheckoutInvoice.unresolvedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#unresolvedpayments).

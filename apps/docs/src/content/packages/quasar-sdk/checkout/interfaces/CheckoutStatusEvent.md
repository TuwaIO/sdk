# CheckoutStatusEvent

Defined in: [checkout/types.ts:607](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L607)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:615](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L615)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:611](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L611)

Number of ledger steps so far.

***

### onTimeTxKeys?

> `optional` **onTimeTxKeys?**: `string`[]

Defined in: [checkout/types.ts:632](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L632)

The keys of the payments that count as sent in time, as [CheckoutInvoice.onTimeTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#ontimetxkeys).

***

### paymentCountsUntil?

> `optional` **paymentCountsUntil?**: `string` \| `null`

Defined in: [checkout/types.ts:628](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L628)

Until when a payment sent before the due date counts, as [CheckoutInvoice.paymentCountsUntil](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#paymentcountsuntil).

***

### pendingPayments?

> `optional` **pendingPayments?**: `number`

Defined in: [checkout/types.ts:622](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L622)

Payments handed over and still on their way, as [CheckoutInvoice.pendingPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#pendingpayments). Quasar keeps the stream of an
`expired` or `cancelled` invoice open while it is above `0`.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:617](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L617)

When the locked quote expires.

***

### rejectedPayments?

> `optional` **rejectedPayments?**: [`CheckoutRejectedPayment`](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md)[]

Defined in: [checkout/types.ts:626](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L626)

The payments that failed and why, latest first, as [CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments).

***

### rejectedTxKeys?

> `optional` **rejectedTxKeys?**: `string`[]

Defined in: [checkout/types.ts:624](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L624)

The keys of the payments that failed, latest first, as [CheckoutInvoice.rejectedTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedtxkeys).

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:609](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L609)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:613](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L613)

The payment transaction, once there is one.

***

### unresolvedPayments?

> `optional` **unresolvedPayments?**: `number`

Defined in: [checkout/types.ts:630](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L630)

Payments that may still arrive, with no time limit, as [CheckoutInvoice.unresolvedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#unresolvedpayments).

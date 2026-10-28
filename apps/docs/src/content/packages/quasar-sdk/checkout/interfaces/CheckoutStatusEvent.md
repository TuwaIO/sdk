# CheckoutStatusEvent

Defined in: [checkout/types.ts:457](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L457)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:465](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L465)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:461](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L461)

Number of ledger steps so far.

***

### onTimeTxKeys?

> `optional` **onTimeTxKeys?**: `string`[]

Defined in: [checkout/types.ts:482](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L482)

The keys of the payments that count as sent in time, as [CheckoutInvoice.onTimeTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#ontimetxkeys).

***

### paymentCountsUntil?

> `optional` **paymentCountsUntil?**: `string` \| `null`

Defined in: [checkout/types.ts:478](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L478)

Until when a payment sent before the due date counts, as [CheckoutInvoice.paymentCountsUntil](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#paymentcountsuntil).

***

### pendingPayments?

> `optional` **pendingPayments?**: `number`

Defined in: [checkout/types.ts:472](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L472)

Payments handed over and still on their way, as [CheckoutInvoice.pendingPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#pendingpayments). Quasar keeps the stream of an
`expired` invoice open while it is above `0`.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:467](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L467)

When the locked quote expires.

***

### rejectedPayments?

> `optional` **rejectedPayments?**: [`CheckoutRejectedPayment`](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md)[]

Defined in: [checkout/types.ts:476](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L476)

The payments that failed and why, latest first, as [CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments).

***

### rejectedTxKeys?

> `optional` **rejectedTxKeys?**: `string`[]

Defined in: [checkout/types.ts:474](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L474)

The keys of the payments that failed, latest first, as [CheckoutInvoice.rejectedTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedtxkeys).

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:459](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L459)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:463](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L463)

The payment transaction, once there is one.

***

### unresolvedPayments?

> `optional` **unresolvedPayments?**: `number`

Defined in: [checkout/types.ts:480](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L480)

Payments that may still arrive, with no time limit, as [CheckoutInvoice.unresolvedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#unresolvedpayments).

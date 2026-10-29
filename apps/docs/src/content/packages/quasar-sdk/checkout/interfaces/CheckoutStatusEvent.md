# CheckoutStatusEvent

Defined in: [checkout/types.ts:598](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L598)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:606](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L606)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:602](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L602)

Number of ledger steps so far.

***

### onTimeTxKeys?

> `optional` **onTimeTxKeys?**: `string`[]

Defined in: [checkout/types.ts:623](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L623)

The keys of the payments that count as sent in time, as [CheckoutInvoice.onTimeTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#ontimetxkeys).

***

### paymentCountsUntil?

> `optional` **paymentCountsUntil?**: `string` \| `null`

Defined in: [checkout/types.ts:619](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L619)

Until when a payment sent before the due date counts, as [CheckoutInvoice.paymentCountsUntil](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#paymentcountsuntil).

***

### pendingPayments?

> `optional` **pendingPayments?**: `number`

Defined in: [checkout/types.ts:613](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L613)

Payments handed over and still on their way, as [CheckoutInvoice.pendingPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#pendingpayments). Quasar keeps the stream of an
`expired` or `cancelled` invoice open while it is above `0`.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:608](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L608)

When the locked quote expires.

***

### rejectedPayments?

> `optional` **rejectedPayments?**: [`CheckoutRejectedPayment`](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md)[]

Defined in: [checkout/types.ts:617](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L617)

The payments that failed and why, latest first, as [CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments).

***

### rejectedTxKeys?

> `optional` **rejectedTxKeys?**: `string`[]

Defined in: [checkout/types.ts:615](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L615)

The keys of the payments that failed, latest first, as [CheckoutInvoice.rejectedTxKeys](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedtxkeys).

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:600](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L600)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:604](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L604)

The payment transaction, once there is one.

***

### unresolvedPayments?

> `optional` **unresolvedPayments?**: `number`

Defined in: [checkout/types.ts:621](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L621)

Payments that may still arrive, with no time limit, as [CheckoutInvoice.unresolvedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#unresolvedpayments).

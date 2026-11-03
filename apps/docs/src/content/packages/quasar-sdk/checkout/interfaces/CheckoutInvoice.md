# CheckoutInvoice

Defined in: [checkout/types.ts:36](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L36)

The invoice the checkout token opens.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:62](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L62)

Base units of the quoted asset received so far: an underpaid invoice asks for the rest.

***

### cancelUrl

> **cancelUrl**: `string` \| `null`

Defined in: [checkout/types.ts:60](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L60)

Where to send a buyer who gives up (http(s) only).

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [checkout/types.ts:46](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L46)

Currency.

***

### dueAt

> **dueAt**: `string` \| `null`

Defined in: [checkout/types.ts:56](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L56)

When it stops being payable.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md) \| `null`

Defined in: [checkout/types.ts:44](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L44)

Live or test: a test invoice is paid on test networks.

***

### id

> **id**: `string`

Defined in: [checkout/types.ts:38](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L38)

Invoice ID.

***

### lineItems

> **lineItems**: [`CheckoutLine`](/packages/quasar-sdk/checkout/interfaces/CheckoutLine.md)[]

Defined in: [checkout/types.ts:52](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L52)

The lines.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [checkout/types.ts:54](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L54)

Language of the page and of the documents still to be issued.

***

### number

> **number**: `string` \| `null`

Defined in: [checkout/types.ts:40](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L40)

Series number; `null` while its document waits for the buyer details.

***

### onTimeTxKeys?

> `optional` **onTimeTxKeys?**: `string`[]

Defined in: [checkout/types.ts:109](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L109)

Every key (`txKey`, hash, the hash a sped-up transaction replaced, a relay's `userOpHash`) of the payments that
count as sent in time: Quasar learned of them before `dueAt` (all of them when the invoice has none); at most the
latest 20 transactions and 10 relays. Match the page's own keys against it instead of the browser clock. Left out
like `unresolvedPayments`.

***

### paymentCountsUntil?

> `optional` **paymentCountsUntil?**: `string` \| `null`

Defined in: [checkout/types.ts:93](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L93)

While the invoice is payable and a payment Quasar learned of before `dueAt` is on its way: until when the invoice
waits for it (`dueAt` plus 30 minutes), so the page can say that the payment was sent in time. `null` otherwise;
left out like `rejectedPayments`.

***

### pendingPayments?

> `optional` **pendingPayments?**: `number`

Defined in: [checkout/types.ts:76](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L76)

Payments of the invoice handed over and still on their way, whoever handed them over: tracked transactions
settlement has not verified or rejected yet (recorded within the last 25 minutes: Quasar stops counting a stuck
one), gasless relays still sending (within 35 minutes), and claims of this invoice on a transaction another invoice
handed over first that Quasar has not decided yet (within 25 minutes). Quasar versions before the payment grace
(October 2026) leave it out.

***

### refundedTotalMinor

> **refundedTotalMinor**: `string` \| `null`

Defined in: [checkout/types.ts:68](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L68)

What was refunded, in minor units (cents) of the invoice currency.

***

### rejectedPayments?

> `optional` **rejectedPayments?**: [`CheckoutRejectedPayment`](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md)[]

Defined in: [checkout/types.ts:87](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L87)

The payments that failed, latest first (at most 10), with the reason and whether the buyer may pay again. Quasar
versions before October 28, 2026 leave it out.

***

### rejectedTxKeys?

> `optional` **rejectedTxKeys?**: `string`[]

Defined in: [checkout/types.ts:82](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L82)

Every key the page may know a failed payment by, latest first: the `txKey` of a rejected transaction, the hash the
checkout handed over when a sped-up transaction replaced it, and the `userOpHash` of a gasless relay. Left out like
`pendingPayments`; read [CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments) for why they failed.

***

### replacedBy

> **replacedBy**: \{ `checkoutToken`: `string` \| `null`; `number`: `string` \| `null`; \} \| `null`

Defined in: [checkout/types.ts:114](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L114)

The invoice that replaced this one after the seller corrected it: its number and, while it can be paid, its
checkout token.

***

### review

> **review**: [`CheckoutReview`](/packages/quasar-sdk/checkout/type-aliases/CheckoutReview.md) \| `null`

Defined in: [checkout/types.ts:66](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L66)

Why a payment waits for, or was flagged to, the seller ([CheckoutReview](/packages/quasar-sdk/checkout/type-aliases/CheckoutReview.md)); `null` when none does.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:42](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L42)

State of the invoice.

***

### subscription

> **subscription**: [`CheckoutSubscription`](/packages/quasar-sdk/checkout/interfaces/CheckoutSubscription.md) \| `null`

Defined in: [checkout/types.ts:116](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L116)

The subscription period this invoice bills; `null` for a one-off invoice.

***

### successUrl

> **successUrl**: `string` \| `null`

Defined in: [checkout/types.ts:58](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L58)

Where to send the buyer after paying (http(s) only).

***

### total

> **total**: `string` \| `number`

Defined in: [checkout/types.ts:48](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L48)

Total to pay, as a decimal.

***

### totalMinor

> **totalMinor**: `string` \| `null`

Defined in: [checkout/types.ts:50](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L50)

Total in minor units (cents).

***

### unresolvedPayments?

> `optional` **unresolvedPayments?**: `number`

Defined in: [checkout/types.ts:102](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L102)

Payments of the invoice that may still arrive, with no time limit: tracked transactions neither confirmed nor
rejected for good (also one stuck past the 25 minutes `pendingPayments` counts, and one whose tracker lost sight of
it, `not_found`, `timeout` or `replaced`, which Quasar reads again for 24 hours), gasless relays still sending, and
claims of this invoice on a transaction another invoice handed over first that Quasar has not decided yet. While it
is above `0` the page offers no plain second payment and never says that nothing was charged. Quasar versions
before October 29, 2026 leave it out.

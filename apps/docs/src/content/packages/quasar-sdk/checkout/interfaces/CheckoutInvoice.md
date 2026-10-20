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

### refundedTotalMinor

> **refundedTotalMinor**: `string` \| `null`

Defined in: [checkout/types.ts:69](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L69)

What was refunded, in minor units (cents) of the invoice currency.

***

### replacedBy

> **replacedBy**: \{ `checkoutToken`: `string` \| `null`; `number`: `string` \| `null`; \} \| `null`

Defined in: [checkout/types.ts:74](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L74)

The invoice that replaced this one after the seller corrected it: its number and, while it can be paid, its
checkout token.

***

### review

> **review**: \{ `reason`: `"screening"` \| `"late"` \| `"overpaid"`; \} \| `null`

Defined in: [checkout/types.ts:67](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L67)

Why a payment waits for, or was flagged to, the seller: `screening` (the sender did not pass the check after
paying; no details reach the buyer), `late` (it arrived after the invoice expired or was cancelled), `overpaid`.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:42](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L42)

State of the invoice.

***

### subscription

> **subscription**: [`CheckoutSubscription`](/packages/quasar-sdk/checkout/interfaces/CheckoutSubscription.md) \| `null`

Defined in: [checkout/types.ts:76](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L76)

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

# CheckoutInvoice

Defined in: [checkout/types.ts:33](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L33)

The invoice the checkout token opens.

## Properties

### cancelUrl

> **cancelUrl**: `string` \| `null`

Defined in: [checkout/types.ts:57](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L57)

Where to send a buyer who gives up.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [checkout/types.ts:43](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L43)

Currency.

***

### dueAt

> **dueAt**: `string` \| `null`

Defined in: [checkout/types.ts:53](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L53)

When it stops being payable.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md) \| `null`

Defined in: [checkout/types.ts:41](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L41)

Live or test: a test invoice is paid on test networks.

***

### id

> **id**: `string`

Defined in: [checkout/types.ts:35](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L35)

Invoice ID.

***

### lineItems

> **lineItems**: [`CheckoutLine`](/packages/quasar-sdk/checkout/interfaces/CheckoutLine.md)[]

Defined in: [checkout/types.ts:49](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L49)

The lines.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [checkout/types.ts:51](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L51)

Language of the page and of the documents still to be issued.

***

### number

> **number**: `string` \| `null`

Defined in: [checkout/types.ts:37](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L37)

Series number; `null` while its document waits for the buyer details.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:39](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L39)

State of the invoice.

***

### successUrl

> **successUrl**: `string` \| `null`

Defined in: [checkout/types.ts:55](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L55)

Where to send the buyer after paying.

***

### total

> **total**: `string` \| `number`

Defined in: [checkout/types.ts:45](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L45)

Total to pay, as a decimal.

***

### totalMinor

> **totalMinor**: `string` \| `null`

Defined in: [checkout/types.ts:47](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L47)

Total in minor units (cents).

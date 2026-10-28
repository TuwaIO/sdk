# Invoice

Defined in: [modules/payments/types.ts:245](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L245)

An invoice as the Payments API returns it. Amounts are decimal strings in the invoice currency.

## Extended by

- [`InvoiceDetails`](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md)

## Properties

### aml

> **aml**: [`InvoiceAml`](/packages/quasar-sdk/server/interfaces/InvoiceAml.md) \| `null`

Defined in: [modules/payments/types.ts:319](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L319)

The payer's AML screening, once there was one.

***

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) & `object` \| `null`

Defined in: [modules/payments/types.ts:269](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L269)

The buyer as printed.

***

### buyerReference

> **buyerReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:273](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L273)

BT-10.

***

### cancelUrl

> **cancelUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:301](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L301)

Where the checkout sends a buyer who gives up.

***

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:306](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L306)

The checkout token while the invoice can be paid (`open`, `processing`, `underpaid`), for a checkout embedded in
your page; `null` otherwise.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:335](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L335)

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:257](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L257)

Currency.

***

### dueAt

> **dueAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:265](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L265)

When it stops being payable.

***

### eInvoiceSkipped

> **eInvoiceSkipped**: `string`[] \| `null`

Defined in: [modules/payments/types.ts:323](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L323)

What the e-invoice lacked when the invoice was issued as a plain PDF, for example `buyer.country`.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md) \| `null`

Defined in: [modules/payments/types.ts:255](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L255)

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:271](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L271)

The CAIP-10 account you expected to pay.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:247](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L247)

Invoice ID.

***

### issuedAt

> **issuedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:261](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L261)

When it was issued (ISO 8601).

***

### lineItems

> **lineItems**: [`InvoiceLine`](/packages/quasar-sdk/server/interfaces/InvoiceLine.md)[]

Defined in: [modules/payments/types.ts:277](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L277)

The lines.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [modules/payments/types.ts:259](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L259)

Language of its documents and emails.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:297](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L297)

Your data.

***

### notes

> **notes**: `string` \| `null`

Defined in: [modules/payments/types.ts:291](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L291)

The note printed on the invoice.

***

### number

> **number**: `string` \| `null`

Defined in: [modules/payments/types.ts:251](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L251)

Series number, for example `INV-2026-42` (`TEST-` for test invoices).

***

### object

> **object**: `"invoice"`

Defined in: [modules/payments/types.ts:249](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L249)

Always `invoice`.

***

### orderReference

> **orderReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:275](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L275)

BT-13.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:308](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L308)

The payment page while the invoice can be paid: the link its emails carry.

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:333](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L333)

The subscription period it bills.

***

### pricesIncludeTax

> **pricesIncludeTax**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:279](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L279)

Whether unit prices include VAT.

***

### quote

> **quote**: [`InvoiceQuote`](/packages/quasar-sdk/server/interfaces/InvoiceQuote.md) \| `null`

Defined in: [modules/payments/types.ts:310](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L310)

The locked quote, once there is one.

***

### receiptNumber

> **receiptNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:321](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L321)

The receipt number, once paid.

***

### refundedTotal

> **refundedTotal**: `string`

Defined in: [modules/payments/types.ts:325](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L325)

Refunded so far, in the invoice currency.

***

### replacedBy

> **replacedBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:329](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L329)

The invoice that corrects this one.

***

### replaces

> **replaces**: `string` \| `null`

Defined in: [modules/payments/types.ts:327](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L327)

The invoice this one corrects.

***

### reverseCharge

> **reverseCharge**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:293](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L293)

Whether it is a reverse-charge invoice.

***

### reviewReason

> **reviewReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:317](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L317)

Why the payment waits for you: `overpaid` when the app flags overpayments, `quote_expired` when it arrived after
its locked quote expired.

***

### rounding

> **rounding**: `string`

Defined in: [modules/payments/types.ts:285](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L285)

Rounding.

***

### seller

> **seller**: [`InvoiceSeller`](/packages/quasar-sdk/server/interfaces/InvoiceSeller.md) \| `null`

Defined in: [modules/payments/types.ts:267](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L267)

The seller as printed, from the app's settings at issue.

***

### settlement

> **settlement**: [`InvoiceSettlement`](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md) \| `null`

Defined in: [modules/payments/types.ts:312](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L312)

The payment, once there is one.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [modules/payments/types.ts:253](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L253)

State of the invoice.

***

### subscriptionId

> **subscriptionId**: `string` \| `null`

Defined in: [modules/payments/types.ts:331](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L331)

The subscription it bills.

***

### subtotal

> **subtotal**: `string`

Defined in: [modules/payments/types.ts:281](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L281)

Total without VAT.

***

### successUrl

> **successUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:299](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L299)

Where the checkout sends the buyer after paying.

***

### supplyDate

> **supplyDate**: `string` \| `null`

Defined in: [modules/payments/types.ts:263](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L263)

Date of supply.

***

### taxBreakdown

> **taxBreakdown**: `object`[]

Defined in: [modules/payments/types.ts:289](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L289)

VAT per category and rate.

#### tax

> **tax**: `string`

#### taxable

> **taxable**: `string`

#### taxCategory

> **taxCategory**: [`TaxCategory`](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

#### taxRate

> **taxRate**: `string`

***

### taxExemptionReason

> **taxExemptionReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:295](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L295)

Why its lines are exempt.

***

### taxTotal

> **taxTotal**: `string`

Defined in: [modules/payments/types.ts:283](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L283)

VAT.

***

### total

> **total**: `string`

Defined in: [modules/payments/types.ts:287](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L287)

Total to pay.

***

### updatedAt

> **updatedAt**: `string`

Defined in: [modules/payments/types.ts:337](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L337)

When it last changed.

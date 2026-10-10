# Invoice

Defined in: [modules/payments/types.ts:212](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L212)

An invoice as the Payments API returns it. Amounts are decimal strings in the invoice currency.

## Extended by

- [`InvoiceDetails`](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md)

## Properties

### aml

> **aml**: [`InvoiceAml`](/packages/quasar-sdk/server/interfaces/InvoiceAml.md) \| `null`

Defined in: [modules/payments/types.ts:283](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L283)

The payer's AML screening, once there was one.

***

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) & `object` \| `null`

Defined in: [modules/payments/types.ts:236](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L236)

The buyer as printed.

***

### buyerReference

> **buyerReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:240](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L240)

BT-10.

***

### cancelUrl

> **cancelUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:268](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L268)

Where the checkout sends a buyer who gives up.

***

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:273](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L273)

The checkout token while the invoice can be paid (`open`, `processing`, `underpaid`), for a checkout embedded in
your page; `null` otherwise.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:299](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L299)

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:224](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L224)

Currency.

***

### dueAt

> **dueAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:232](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L232)

When it stops being payable.

***

### eInvoiceSkipped

> **eInvoiceSkipped**: `string`[] \| `null`

Defined in: [modules/payments/types.ts:287](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L287)

What the e-invoice lacked when the invoice was issued as a plain PDF, for example `buyer.country`.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md) \| `null`

Defined in: [modules/payments/types.ts:222](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L222)

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:238](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L238)

The CAIP-10 account you expected to pay.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:214](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L214)

Invoice ID.

***

### issuedAt

> **issuedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:228](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L228)

When it was issued (ISO 8601).

***

### lineItems

> **lineItems**: [`InvoiceLine`](/packages/quasar-sdk/server/interfaces/InvoiceLine.md)[]

Defined in: [modules/payments/types.ts:244](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L244)

The lines.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [modules/payments/types.ts:226](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L226)

Language of its documents and emails.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:264](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L264)

Your data.

***

### notes

> **notes**: `string` \| `null`

Defined in: [modules/payments/types.ts:258](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L258)

The note printed on the invoice.

***

### number

> **number**: `string` \| `null`

Defined in: [modules/payments/types.ts:218](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L218)

Series number, for example `INV-2026-42` (`TEST-` for test invoices).

***

### object

> **object**: `"invoice"`

Defined in: [modules/payments/types.ts:216](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L216)

Always `invoice`.

***

### orderReference

> **orderReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:242](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L242)

BT-13.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:275](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L275)

The payment page while the invoice can be paid: the link its emails carry.

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:297](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L297)

The subscription period it bills.

***

### pricesIncludeTax

> **pricesIncludeTax**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:246](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L246)

Whether unit prices include VAT.

***

### quote

> **quote**: [`InvoiceQuote`](/packages/quasar-sdk/server/interfaces/InvoiceQuote.md) \| `null`

Defined in: [modules/payments/types.ts:277](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L277)

The locked quote, once there is one.

***

### receiptNumber

> **receiptNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:285](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L285)

The receipt number, once paid.

***

### refundedTotal

> **refundedTotal**: `string`

Defined in: [modules/payments/types.ts:289](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L289)

Refunded so far, in the invoice currency.

***

### replacedBy

> **replacedBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:293](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L293)

The invoice that corrects this one.

***

### replaces

> **replaces**: `string` \| `null`

Defined in: [modules/payments/types.ts:291](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L291)

The invoice this one corrects.

***

### reverseCharge

> **reverseCharge**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:260](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L260)

Whether it is a reverse-charge invoice.

***

### reviewReason

> **reviewReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:281](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L281)

Why a paid invoice waits for you: `overpaid` when the app flags overpayments.

***

### rounding

> **rounding**: `string`

Defined in: [modules/payments/types.ts:252](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L252)

Rounding.

***

### seller

> **seller**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:234](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L234)

The seller as printed, from the app's settings at issue.

***

### settlement

> **settlement**: [`InvoiceSettlement`](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md) \| `null`

Defined in: [modules/payments/types.ts:279](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L279)

The payment, once there is one.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [modules/payments/types.ts:220](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L220)

State of the invoice.

***

### subscriptionId

> **subscriptionId**: `string` \| `null`

Defined in: [modules/payments/types.ts:295](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L295)

The subscription it bills.

***

### subtotal

> **subtotal**: `string`

Defined in: [modules/payments/types.ts:248](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L248)

Total without VAT.

***

### successUrl

> **successUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:266](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L266)

Where the checkout sends the buyer after paying.

***

### supplyDate

> **supplyDate**: `string` \| `null`

Defined in: [modules/payments/types.ts:230](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L230)

Date of supply.

***

### taxBreakdown

> **taxBreakdown**: `object`[]

Defined in: [modules/payments/types.ts:256](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L256)

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

Defined in: [modules/payments/types.ts:262](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L262)

Why its lines are exempt.

***

### taxTotal

> **taxTotal**: `string`

Defined in: [modules/payments/types.ts:250](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L250)

VAT.

***

### total

> **total**: `string`

Defined in: [modules/payments/types.ts:254](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L254)

Total to pay.

***

### updatedAt

> **updatedAt**: `string`

Defined in: [modules/payments/types.ts:301](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L301)

When it last changed.

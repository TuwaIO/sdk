# InvoiceDetails

Defined in: [modules/payments/types.ts:315](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L315)

An invoice with its refunds and credit notes, as [PaymentsModule.getInvoice](/packages/quasar-sdk/server/classes/PaymentsModule.md#getinvoice) returns it.

## Extends

- [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

## Properties

### aml

> **aml**: [`InvoiceAml`](/packages/quasar-sdk/server/interfaces/InvoiceAml.md) \| `null`

Defined in: [modules/payments/types.ts:283](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L283)

The payer's AML screening, once there was one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`aml`](/packages/quasar-sdk/server/interfaces/Invoice.md#aml)

***

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) & `object` \| `null`

Defined in: [modules/payments/types.ts:236](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L236)

The buyer as printed.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`buyer`](/packages/quasar-sdk/server/interfaces/Invoice.md#buyer)

***

### buyerReference

> **buyerReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:240](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L240)

BT-10.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`buyerReference`](/packages/quasar-sdk/server/interfaces/Invoice.md#buyerreference)

***

### cancelUrl

> **cancelUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:268](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L268)

Where the checkout sends a buyer who gives up.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`cancelUrl`](/packages/quasar-sdk/server/interfaces/Invoice.md#cancelurl)

***

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:273](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L273)

The checkout token while the invoice can be paid (`open`, `processing`, `underpaid`), for a checkout embedded in
your page; `null` otherwise.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`checkoutToken`](/packages/quasar-sdk/server/interfaces/Invoice.md#checkouttoken)

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:299](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L299)

When it was created.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`createdAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#createdat)

***

### creditNotes

> **creditNotes**: [`CreditNoteRef`](/packages/quasar-sdk/server/interfaces/CreditNoteRef.md)[]

Defined in: [modules/payments/types.ts:319](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L319)

Its credit notes, oldest first.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:224](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L224)

Currency.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`currency`](/packages/quasar-sdk/server/interfaces/Invoice.md#currency)

***

### dueAt

> **dueAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:232](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L232)

When it stops being payable.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`dueAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#dueat)

***

### eInvoiceSkipped

> **eInvoiceSkipped**: `string`[] \| `null`

Defined in: [modules/payments/types.ts:287](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L287)

What the e-invoice lacked when the invoice was issued as a plain PDF, for example `buyer.country`.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`eInvoiceSkipped`](/packages/quasar-sdk/server/interfaces/Invoice.md#einvoiceskipped)

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md) \| `null`

Defined in: [modules/payments/types.ts:222](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L222)

Live or test.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`environment`](/packages/quasar-sdk/server/interfaces/Invoice.md#environment)

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:238](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L238)

The CAIP-10 account you expected to pay.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`expectedPayer`](/packages/quasar-sdk/server/interfaces/Invoice.md#expectedpayer)

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:214](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L214)

Invoice ID.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`id`](/packages/quasar-sdk/server/interfaces/Invoice.md#id)

***

### issuedAt

> **issuedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:228](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L228)

When it was issued (ISO 8601).

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`issuedAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#issuedat)

***

### lineItems

> **lineItems**: [`InvoiceLine`](/packages/quasar-sdk/server/interfaces/InvoiceLine.md)[]

Defined in: [modules/payments/types.ts:244](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L244)

The lines.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`lineItems`](/packages/quasar-sdk/server/interfaces/Invoice.md#lineitems)

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [modules/payments/types.ts:226](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L226)

Language of its documents and emails.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`locale`](/packages/quasar-sdk/server/interfaces/Invoice.md#locale)

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:264](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L264)

Your data.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`metadata`](/packages/quasar-sdk/server/interfaces/Invoice.md#metadata)

***

### notes

> **notes**: `string` \| `null`

Defined in: [modules/payments/types.ts:258](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L258)

The note printed on the invoice.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`notes`](/packages/quasar-sdk/server/interfaces/Invoice.md#notes)

***

### number

> **number**: `string` \| `null`

Defined in: [modules/payments/types.ts:218](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L218)

Series number, for example `INV-2026-42` (`TEST-` for test invoices).

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`number`](/packages/quasar-sdk/server/interfaces/Invoice.md#number)

***

### object

> **object**: `"invoice"`

Defined in: [modules/payments/types.ts:216](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L216)

Always `invoice`.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`object`](/packages/quasar-sdk/server/interfaces/Invoice.md#object)

***

### orderReference

> **orderReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:242](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L242)

BT-13.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`orderReference`](/packages/quasar-sdk/server/interfaces/Invoice.md#orderreference)

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:275](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L275)

The payment page while the invoice can be paid: the link its emails carry.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`payUrl`](/packages/quasar-sdk/server/interfaces/Invoice.md#payurl)

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:297](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L297)

The subscription period it bills.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`period`](/packages/quasar-sdk/server/interfaces/Invoice.md#period)

***

### pricesIncludeTax

> **pricesIncludeTax**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:246](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L246)

Whether unit prices include VAT.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`pricesIncludeTax`](/packages/quasar-sdk/server/interfaces/Invoice.md#pricesincludetax)

***

### quote

> **quote**: [`InvoiceQuote`](/packages/quasar-sdk/server/interfaces/InvoiceQuote.md) \| `null`

Defined in: [modules/payments/types.ts:277](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L277)

The locked quote, once there is one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`quote`](/packages/quasar-sdk/server/interfaces/Invoice.md#quote)

***

### receiptNumber

> **receiptNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:285](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L285)

The receipt number, once paid.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`receiptNumber`](/packages/quasar-sdk/server/interfaces/Invoice.md#receiptnumber)

***

### refundedTotal

> **refundedTotal**: `string`

Defined in: [modules/payments/types.ts:289](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L289)

Refunded so far, in the invoice currency.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`refundedTotal`](/packages/quasar-sdk/server/interfaces/Invoice.md#refundedtotal)

***

### refunds

> **refunds**: [`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)[]

Defined in: [modules/payments/types.ts:317](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L317)

Its refunds, oldest first.

***

### replacedBy

> **replacedBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:293](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L293)

The invoice that corrects this one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`replacedBy`](/packages/quasar-sdk/server/interfaces/Invoice.md#replacedby)

***

### replaces

> **replaces**: `string` \| `null`

Defined in: [modules/payments/types.ts:291](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L291)

The invoice this one corrects.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`replaces`](/packages/quasar-sdk/server/interfaces/Invoice.md#replaces)

***

### reverseCharge

> **reverseCharge**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:260](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L260)

Whether it is a reverse-charge invoice.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`reverseCharge`](/packages/quasar-sdk/server/interfaces/Invoice.md#reversecharge)

***

### reviewReason

> **reviewReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:281](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L281)

Why a paid invoice waits for you: `overpaid` when the app flags overpayments.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`reviewReason`](/packages/quasar-sdk/server/interfaces/Invoice.md#reviewreason)

***

### rounding

> **rounding**: `string`

Defined in: [modules/payments/types.ts:252](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L252)

Rounding.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`rounding`](/packages/quasar-sdk/server/interfaces/Invoice.md#rounding)

***

### seller

> **seller**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:234](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L234)

The seller as printed, from the app's settings at issue.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`seller`](/packages/quasar-sdk/server/interfaces/Invoice.md#seller)

***

### settlement

> **settlement**: [`InvoiceSettlement`](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md) \| `null`

Defined in: [modules/payments/types.ts:279](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L279)

The payment, once there is one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`settlement`](/packages/quasar-sdk/server/interfaces/Invoice.md#settlement)

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [modules/payments/types.ts:220](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L220)

State of the invoice.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`status`](/packages/quasar-sdk/server/interfaces/Invoice.md#status)

***

### subscriptionId

> **subscriptionId**: `string` \| `null`

Defined in: [modules/payments/types.ts:295](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L295)

The subscription it bills.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`subscriptionId`](/packages/quasar-sdk/server/interfaces/Invoice.md#subscriptionid)

***

### subtotal

> **subtotal**: `string`

Defined in: [modules/payments/types.ts:248](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L248)

Total without VAT.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`subtotal`](/packages/quasar-sdk/server/interfaces/Invoice.md#subtotal)

***

### successUrl

> **successUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:266](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L266)

Where the checkout sends the buyer after paying.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`successUrl`](/packages/quasar-sdk/server/interfaces/Invoice.md#successurl)

***

### supplyDate

> **supplyDate**: `string` \| `null`

Defined in: [modules/payments/types.ts:230](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L230)

Date of supply.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`supplyDate`](/packages/quasar-sdk/server/interfaces/Invoice.md#supplydate)

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

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`taxBreakdown`](/packages/quasar-sdk/server/interfaces/Invoice.md#taxbreakdown)

***

### taxExemptionReason

> **taxExemptionReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:262](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L262)

Why its lines are exempt.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`taxExemptionReason`](/packages/quasar-sdk/server/interfaces/Invoice.md#taxexemptionreason)

***

### taxTotal

> **taxTotal**: `string`

Defined in: [modules/payments/types.ts:250](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L250)

VAT.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`taxTotal`](/packages/quasar-sdk/server/interfaces/Invoice.md#taxtotal)

***

### total

> **total**: `string`

Defined in: [modules/payments/types.ts:254](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L254)

Total to pay.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`total`](/packages/quasar-sdk/server/interfaces/Invoice.md#total)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [modules/payments/types.ts:301](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L301)

When it last changed.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`updatedAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#updatedat)

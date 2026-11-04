# InvoiceDetails

Defined in: [modules/payments/types.ts:373](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L373)

An invoice with its newest refunds and how many refunds and credit notes it has, as
[PaymentsModule.getInvoice](/packages/quasar-sdk/server/classes/PaymentsModule.md#getinvoice) returns it. Every refund and correction adds a credit note, so the full lists are
[PaymentsModule.listInvoiceRefunds](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicerefunds) and [PaymentsModule.listInvoiceDocuments](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicedocuments).

## Extends

- [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

## Properties

### aml

> **aml**: [`InvoiceAml`](/packages/quasar-sdk/server/interfaces/InvoiceAml.md) \| `null`

Defined in: [modules/payments/types.ts:329](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L329)

The payer's AML screening, once there was one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`aml`](/packages/quasar-sdk/server/interfaces/Invoice.md#aml)

***

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) & `object` \| `null`

Defined in: [modules/payments/types.ts:277](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L277)

The buyer as printed.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`buyer`](/packages/quasar-sdk/server/interfaces/Invoice.md#buyer)

***

### buyerReference

> **buyerReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:281](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L281)

BT-10.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`buyerReference`](/packages/quasar-sdk/server/interfaces/Invoice.md#buyerreference)

***

### cancelUrl

> **cancelUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:309](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L309)

Where the checkout sends a buyer who gives up.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`cancelUrl`](/packages/quasar-sdk/server/interfaces/Invoice.md#cancelurl)

***

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:314](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L314)

The checkout token while the invoice can be paid (`open`, `processing`, `underpaid`), for a checkout embedded in
your page; `null` otherwise.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`checkoutToken`](/packages/quasar-sdk/server/interfaces/Invoice.md#checkouttoken)

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:345](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L345)

When it was created.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`createdAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#createdat)

***

### creditNotesTotal

> **creditNotesTotal**: `number`

Defined in: [modules/payments/types.ts:379](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L379)

How many credit notes it has (one per refund and correction).

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:265](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L265)

Currency.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`currency`](/packages/quasar-sdk/server/interfaces/Invoice.md#currency)

***

### dueAt

> **dueAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:273](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L273)

When it stops being payable.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`dueAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#dueat)

***

### eInvoiceSkipped

> **eInvoiceSkipped**: `string`[] \| `null`

Defined in: [modules/payments/types.ts:333](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L333)

What the e-invoice lacked when the invoice was issued as a plain PDF, for example `buyer.country`.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`eInvoiceSkipped`](/packages/quasar-sdk/server/interfaces/Invoice.md#einvoiceskipped)

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md) \| `null`

Defined in: [modules/payments/types.ts:263](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L263)

Live or test.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`environment`](/packages/quasar-sdk/server/interfaces/Invoice.md#environment)

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:279](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L279)

The CAIP-10 account you expected to pay.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`expectedPayer`](/packages/quasar-sdk/server/interfaces/Invoice.md#expectedpayer)

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:255](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L255)

Invoice ID.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`id`](/packages/quasar-sdk/server/interfaces/Invoice.md#id)

***

### issuedAt

> **issuedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:269](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L269)

When it was issued (ISO 8601).

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`issuedAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#issuedat)

***

### lineItems

> **lineItems**: [`InvoiceLine`](/packages/quasar-sdk/server/interfaces/InvoiceLine.md)[]

Defined in: [modules/payments/types.ts:285](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L285)

The lines.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`lineItems`](/packages/quasar-sdk/server/interfaces/Invoice.md#lineitems)

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [modules/payments/types.ts:267](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L267)

Language of its documents and emails.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`locale`](/packages/quasar-sdk/server/interfaces/Invoice.md#locale)

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:305](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L305)

Your data.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`metadata`](/packages/quasar-sdk/server/interfaces/Invoice.md#metadata)

***

### notes

> **notes**: `string` \| `null`

Defined in: [modules/payments/types.ts:299](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L299)

The note printed on the invoice.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`notes`](/packages/quasar-sdk/server/interfaces/Invoice.md#notes)

***

### number

> **number**: `string` \| `null`

Defined in: [modules/payments/types.ts:259](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L259)

Series number, for example `INV-2026-42` (`TEST-` for test invoices).

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`number`](/packages/quasar-sdk/server/interfaces/Invoice.md#number)

***

### object

> **object**: `"invoice"`

Defined in: [modules/payments/types.ts:257](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L257)

Always `invoice`.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`object`](/packages/quasar-sdk/server/interfaces/Invoice.md#object)

***

### orderReference

> **orderReference**: `string` \| `null`

Defined in: [modules/payments/types.ts:283](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L283)

BT-13.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`orderReference`](/packages/quasar-sdk/server/interfaces/Invoice.md#orderreference)

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:316](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L316)

The payment page while the invoice can be paid: the link its emails carry.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`payUrl`](/packages/quasar-sdk/server/interfaces/Invoice.md#payurl)

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:343](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L343)

The subscription period it bills.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`period`](/packages/quasar-sdk/server/interfaces/Invoice.md#period)

***

### pricesIncludeTax

> **pricesIncludeTax**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:287](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L287)

Whether unit prices include VAT.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`pricesIncludeTax`](/packages/quasar-sdk/server/interfaces/Invoice.md#pricesincludetax)

***

### quote

> **quote**: [`InvoiceQuote`](/packages/quasar-sdk/server/interfaces/InvoiceQuote.md) \| `null`

Defined in: [modules/payments/types.ts:318](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L318)

The locked quote, once there is one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`quote`](/packages/quasar-sdk/server/interfaces/Invoice.md#quote)

***

### receiptNumber

> **receiptNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:331](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L331)

The receipt number, once paid.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`receiptNumber`](/packages/quasar-sdk/server/interfaces/Invoice.md#receiptnumber)

***

### refundedTotal

> **refundedTotal**: `string`

Defined in: [modules/payments/types.ts:335](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L335)

Refunded so far, in the invoice currency.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`refundedTotal`](/packages/quasar-sdk/server/interfaces/Invoice.md#refundedtotal)

***

### refunds

> **refunds**: [`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)[]

Defined in: [modules/payments/types.ts:375](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L375)

Its five newest refunds and every refund still under way (`requested`, `submitted`), newest first.

***

### refundsTotal

> **refundsTotal**: `number`

Defined in: [modules/payments/types.ts:377](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L377)

How many refunds it has.

***

### replacedBy

> **replacedBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:339](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L339)

The invoice that corrects this one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`replacedBy`](/packages/quasar-sdk/server/interfaces/Invoice.md#replacedby)

***

### replaces

> **replaces**: `string` \| `null`

Defined in: [modules/payments/types.ts:337](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L337)

The invoice this one corrects.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`replaces`](/packages/quasar-sdk/server/interfaces/Invoice.md#replaces)

***

### reverseCharge

> **reverseCharge**: `boolean` \| `null`

Defined in: [modules/payments/types.ts:301](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L301)

Whether it is a reverse-charge invoice.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`reverseCharge`](/packages/quasar-sdk/server/interfaces/Invoice.md#reversecharge)

***

### reviewReason

> **reviewReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:327](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L327)

Why the payment waits for you: `overpaid` when the app flags overpayments, `quote_expired` when it arrived after
its locked quote expired, `payer_mismatch` when Quasar could tie it to no invoice (from another wallet than the
quoted one, or from one that never confirmed the invoice): refund it to the wallet that sent it, it is never
released.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`reviewReason`](/packages/quasar-sdk/server/interfaces/Invoice.md#reviewreason)

***

### rounding

> **rounding**: `string`

Defined in: [modules/payments/types.ts:293](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L293)

Rounding.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`rounding`](/packages/quasar-sdk/server/interfaces/Invoice.md#rounding)

***

### seller

> **seller**: [`InvoiceSeller`](/packages/quasar-sdk/server/interfaces/InvoiceSeller.md) \| `null`

Defined in: [modules/payments/types.ts:275](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L275)

The seller as printed, from the app's settings at issue.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`seller`](/packages/quasar-sdk/server/interfaces/Invoice.md#seller)

***

### settlement

> **settlement**: [`InvoiceSettlement`](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md) \| `null`

Defined in: [modules/payments/types.ts:320](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L320)

The payment, once there is one.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`settlement`](/packages/quasar-sdk/server/interfaces/Invoice.md#settlement)

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [modules/payments/types.ts:261](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L261)

State of the invoice.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`status`](/packages/quasar-sdk/server/interfaces/Invoice.md#status)

***

### subscriptionId

> **subscriptionId**: `string` \| `null`

Defined in: [modules/payments/types.ts:341](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L341)

The subscription it bills.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`subscriptionId`](/packages/quasar-sdk/server/interfaces/Invoice.md#subscriptionid)

***

### subtotal

> **subtotal**: `string`

Defined in: [modules/payments/types.ts:289](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L289)

Total without VAT.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`subtotal`](/packages/quasar-sdk/server/interfaces/Invoice.md#subtotal)

***

### successUrl

> **successUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:307](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L307)

Where the checkout sends the buyer after paying.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`successUrl`](/packages/quasar-sdk/server/interfaces/Invoice.md#successurl)

***

### supplyDate

> **supplyDate**: `string` \| `null`

Defined in: [modules/payments/types.ts:271](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L271)

Date of supply.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`supplyDate`](/packages/quasar-sdk/server/interfaces/Invoice.md#supplydate)

***

### taxBreakdown

> **taxBreakdown**: `object`[]

Defined in: [modules/payments/types.ts:297](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L297)

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

Defined in: [modules/payments/types.ts:303](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L303)

Why its lines are exempt.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`taxExemptionReason`](/packages/quasar-sdk/server/interfaces/Invoice.md#taxexemptionreason)

***

### taxTotal

> **taxTotal**: `string`

Defined in: [modules/payments/types.ts:291](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L291)

VAT.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`taxTotal`](/packages/quasar-sdk/server/interfaces/Invoice.md#taxtotal)

***

### total

> **total**: `string`

Defined in: [modules/payments/types.ts:295](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L295)

Total to pay.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`total`](/packages/quasar-sdk/server/interfaces/Invoice.md#total)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [modules/payments/types.ts:347](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L347)

When it last changed.

#### Inherited from

[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md).[`updatedAt`](/packages/quasar-sdk/server/interfaces/Invoice.md#updatedat)

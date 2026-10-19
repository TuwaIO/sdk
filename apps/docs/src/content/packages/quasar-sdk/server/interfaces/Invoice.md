# Invoice

Defined in: modules/payments/types.ts:212

An invoice as the Payments API returns it. Amounts are decimal strings in the invoice currency.

## Extended by

- [`InvoiceDetails`](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md)

## Properties

### aml

> **aml**: [`InvoiceAml`](/packages/quasar-sdk/server/interfaces/InvoiceAml.md) \| `null`

Defined in: modules/payments/types.ts:283

The payer's AML screening, once there was one.

***

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) & `object` \| `null`

Defined in: modules/payments/types.ts:236

The buyer as printed.

***

### buyerReference

> **buyerReference**: `string` \| `null`

Defined in: modules/payments/types.ts:240

BT-10.

***

### cancelUrl

> **cancelUrl**: `string` \| `null`

Defined in: modules/payments/types.ts:268

Where the checkout sends a buyer who gives up.

***

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: modules/payments/types.ts:273

The checkout token while the invoice can be paid (`open`, `processing`, `underpaid`), for a checkout embedded in
your page; `null` otherwise.

***

### createdAt

> **createdAt**: `string`

Defined in: modules/payments/types.ts:299

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: modules/payments/types.ts:224

Currency.

***

### dueAt

> **dueAt**: `string` \| `null`

Defined in: modules/payments/types.ts:232

When it stops being payable.

***

### eInvoiceSkipped

> **eInvoiceSkipped**: `string`[] \| `null`

Defined in: modules/payments/types.ts:287

What the e-invoice lacked when the invoice was issued as a plain PDF, for example `buyer.country`.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md) \| `null`

Defined in: modules/payments/types.ts:222

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: modules/payments/types.ts:238

The CAIP-10 account you expected to pay.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:214

Invoice ID.

***

### issuedAt

> **issuedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:228

When it was issued (ISO 8601).

***

### lineItems

> **lineItems**: [`InvoiceLine`](/packages/quasar-sdk/server/interfaces/InvoiceLine.md)[]

Defined in: modules/payments/types.ts:244

The lines.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: modules/payments/types.ts:226

Language of its documents and emails.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: modules/payments/types.ts:264

Your data.

***

### notes

> **notes**: `string` \| `null`

Defined in: modules/payments/types.ts:258

The note printed on the invoice.

***

### number

> **number**: `string` \| `null`

Defined in: modules/payments/types.ts:218

Series number, for example `INV-2026-42` (`TEST-` for test invoices).

***

### object

> **object**: `"invoice"`

Defined in: modules/payments/types.ts:216

Always `invoice`.

***

### orderReference

> **orderReference**: `string` \| `null`

Defined in: modules/payments/types.ts:242

BT-13.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: modules/payments/types.ts:275

The payment page while the invoice can be paid: the link its emails carry.

***

### period

> **period**: `number` \| `null`

Defined in: modules/payments/types.ts:297

The subscription period it bills.

***

### pricesIncludeTax

> **pricesIncludeTax**: `boolean` \| `null`

Defined in: modules/payments/types.ts:246

Whether unit prices include VAT.

***

### quote

> **quote**: [`InvoiceQuote`](/packages/quasar-sdk/server/interfaces/InvoiceQuote.md) \| `null`

Defined in: modules/payments/types.ts:277

The locked quote, once there is one.

***

### receiptNumber

> **receiptNumber**: `string` \| `null`

Defined in: modules/payments/types.ts:285

The receipt number, once paid.

***

### refundedTotal

> **refundedTotal**: `string`

Defined in: modules/payments/types.ts:289

Refunded so far, in the invoice currency.

***

### replacedBy

> **replacedBy**: `string` \| `null`

Defined in: modules/payments/types.ts:293

The invoice that corrects this one.

***

### replaces

> **replaces**: `string` \| `null`

Defined in: modules/payments/types.ts:291

The invoice this one corrects.

***

### reverseCharge

> **reverseCharge**: `boolean` \| `null`

Defined in: modules/payments/types.ts:260

Whether it is a reverse-charge invoice.

***

### reviewReason

> **reviewReason**: `string` \| `null`

Defined in: modules/payments/types.ts:281

Why a paid invoice waits for you: `overpaid` when the app flags overpayments.

***

### rounding

> **rounding**: `string`

Defined in: modules/payments/types.ts:252

Rounding.

***

### seller

> **seller**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: modules/payments/types.ts:234

The seller as printed, from the app's settings at issue.

***

### settlement

> **settlement**: [`InvoiceSettlement`](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md) \| `null`

Defined in: modules/payments/types.ts:279

The payment, once there is one.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: modules/payments/types.ts:220

State of the invoice.

***

### subscriptionId

> **subscriptionId**: `string` \| `null`

Defined in: modules/payments/types.ts:295

The subscription it bills.

***

### subtotal

> **subtotal**: `string`

Defined in: modules/payments/types.ts:248

Total without VAT.

***

### successUrl

> **successUrl**: `string` \| `null`

Defined in: modules/payments/types.ts:266

Where the checkout sends the buyer after paying.

***

### supplyDate

> **supplyDate**: `string` \| `null`

Defined in: modules/payments/types.ts:230

Date of supply.

***

### taxBreakdown

> **taxBreakdown**: `object`[]

Defined in: modules/payments/types.ts:256

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

Defined in: modules/payments/types.ts:262

Why its lines are exempt.

***

### taxTotal

> **taxTotal**: `string`

Defined in: modules/payments/types.ts:250

VAT.

***

### total

> **total**: `string`

Defined in: modules/payments/types.ts:254

Total to pay.

***

### updatedAt

> **updatedAt**: `string`

Defined in: modules/payments/types.ts:301

When it last changed.

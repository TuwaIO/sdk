# CheckoutLine

Defined in: checkout/types.ts:18

A line of the invoice as the checkout shows it; amounts are decimal strings, `netMinor` in cents.

## Properties

### description?

> `optional` **description?**: `string`

Defined in: checkout/types.ts:22

Details under the name.

***

### name

> **name**: `string`

Defined in: checkout/types.ts:20

What is sold.

***

### netMinor

> **netMinor**: `string`

Defined in: checkout/types.ts:32

Net amount of the line in minor units (cents).

***

### quantity

> **quantity**: `string`

Defined in: checkout/types.ts:24

Quantity.

***

### taxCategory

> **taxCategory**: [`TaxCategory`](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

Defined in: checkout/types.ts:28

VAT category.

***

### taxRate

> **taxRate**: `string`

Defined in: checkout/types.ts:30

VAT rate in percent.

***

### unitPrice

> **unitPrice**: `string`

Defined in: checkout/types.ts:26

Price of one unit.

# InvoiceLine

Defined in: modules/payments/types.ts:144

A line of an issued invoice, with its net amount.

## Properties

### description?

> `optional` **description?**: `string`

Defined in: modules/payments/types.ts:148

Details under the name.

***

### name

> **name**: `string`

Defined in: modules/payments/types.ts:146

What is sold.

***

### net

> **net**: `string`

Defined in: modules/payments/types.ts:158

Net amount of the line.

***

### quantity

> **quantity**: `string`

Defined in: modules/payments/types.ts:150

Quantity as a decimal string.

***

### taxCategory

> **taxCategory**: [`TaxCategory`](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

Defined in: modules/payments/types.ts:154

VAT category.

***

### taxRate

> **taxRate**: `string`

Defined in: modules/payments/types.ts:156

VAT rate in percent.

***

### unitCode?

> `optional` **unitCode?**: `string`

Defined in: modules/payments/types.ts:160

Unit code, when given.

***

### unitPrice

> **unitPrice**: `string`

Defined in: modules/payments/types.ts:152

Price of one unit.

# InvoiceLine

Defined in: [modules/payments/types.ts:144](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L144)

A line of an issued invoice, with its net amount.

## Properties

### description?

> `optional` **description?**: `string`

Defined in: [modules/payments/types.ts:148](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L148)

Details under the name.

***

### name

> **name**: `string`

Defined in: [modules/payments/types.ts:146](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L146)

What is sold.

***

### net

> **net**: `string`

Defined in: [modules/payments/types.ts:158](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L158)

Net amount of the line.

***

### quantity

> **quantity**: `string`

Defined in: [modules/payments/types.ts:150](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L150)

Quantity as a decimal string.

***

### taxCategory

> **taxCategory**: [`TaxCategory`](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

Defined in: [modules/payments/types.ts:154](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L154)

VAT category.

***

### taxRate

> **taxRate**: `string`

Defined in: [modules/payments/types.ts:156](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L156)

VAT rate in percent.

***

### unitCode?

> `optional` **unitCode?**: `string`

Defined in: [modules/payments/types.ts:160](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L160)

Unit code, when given.

***

### unitPrice

> **unitPrice**: `string`

Defined in: [modules/payments/types.ts:152](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L152)

Price of one unit.

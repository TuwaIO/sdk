# CheckoutLine

Defined in: [checkout/types.ts:18](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L18)

A line of the invoice as the checkout shows it; amounts are decimal strings, `netMinor` in cents.

## Properties

### description?

> `optional` **description?**: `string`

Defined in: [checkout/types.ts:22](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L22)

Details under the name.

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:20](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L20)

What is sold.

***

### netMinor

> **netMinor**: `string`

Defined in: [checkout/types.ts:32](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L32)

Net amount of the line in minor units (cents).

***

### quantity

> **quantity**: `string`

Defined in: [checkout/types.ts:24](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L24)

Quantity.

***

### taxCategory

> **taxCategory**: [`TaxCategory`](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

Defined in: [checkout/types.ts:28](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L28)

VAT category.

***

### taxRate

> **taxRate**: `string`

Defined in: [checkout/types.ts:30](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L30)

VAT rate in percent.

***

### unitPrice

> **unitPrice**: `string`

Defined in: [checkout/types.ts:26](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L26)

Price of one unit.

# CheckoutLine

Defined in: [checkout/types.ts:15](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L15)

A line of the invoice as the checkout shows it; amounts are decimal strings, `netMinor` in cents.

## Properties

### description?

> `optional` **description?**: `string`

Defined in: [checkout/types.ts:19](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L19)

Details under the name.

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:17](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L17)

What is sold.

***

### netMinor

> **netMinor**: `string`

Defined in: [checkout/types.ts:29](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L29)

Net amount of the line in minor units (cents).

***

### quantity

> **quantity**: `string`

Defined in: [checkout/types.ts:21](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L21)

Quantity.

***

### taxCategory

> **taxCategory**: [`TaxCategory`](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

Defined in: [checkout/types.ts:25](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L25)

VAT category.

***

### taxRate

> **taxRate**: `string`

Defined in: [checkout/types.ts:27](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L27)

VAT rate in percent.

***

### unitPrice

> **unitPrice**: `string`

Defined in: [checkout/types.ts:23](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L23)

Price of one unit.

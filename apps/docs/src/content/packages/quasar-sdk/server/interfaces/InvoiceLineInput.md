# InvoiceLineInput

Defined in: [modules/payments/types.ts:60](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L60)

One line of an invoice or a subscription plan, as you send it.

## Properties

### description?

> `optional` **description?**: `string`

Defined in: [modules/payments/types.ts:64](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L64)

Optional details under the name.

***

### name

> **name**: `string`

Defined in: [modules/payments/types.ts:62](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L62)

What is sold.

***

### quantity?

> `optional` **quantity?**: `string`

Defined in: [modules/payments/types.ts:66](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L66)

Quantity as a decimal string. Defaults to `'1'`.

***

### taxCategory?

> `optional` **taxCategory?**: [`TaxCategory`](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

Defined in: [modules/payments/types.ts:70](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L70)

VAT category; defaults to the one in the app's document settings.

***

### taxRate?

> `optional` **taxRate?**: `string`

Defined in: [modules/payments/types.ts:72](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L72)

VAT rate in percent (`'21'`); defaults to the one in the app's document settings.

***

### unitCode?

> `optional` **unitCode?**: `string`

Defined in: [modules/payments/types.ts:74](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L74)

UN/ECE Recommendation 20 unit code for e-invoices (`C62` one, `HUR` hour, `MON` month).

***

### unitPrice

> **unitPrice**: `string`

Defined in: [modules/payments/types.ts:68](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L68)

Price of one unit in the invoice currency, as a decimal string (`'49.00'`).

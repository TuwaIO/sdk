# InvoiceSeller

Defined in: [modules/payments/types.ts:215](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L215)

The seller of an invoice as printed, copied from the app's payment settings when it was issued. Every field may be
missing or `null`: invoices issued before the address had its parts carry only `address`.

## Properties

### address?

> `optional` **address?**: `string` \| `null`

Defined in: [modules/payments/types.ts:221](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L221)

The postal address as one text, as the checkout shows it.

***

### addressLine1?

> `optional` **addressLine1?**: `string` \| `null`

Defined in: [modules/payments/types.ts:223](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L223)

First address line.

***

### addressLine2?

> `optional` **addressLine2?**: `string` \| `null`

Defined in: [modules/payments/types.ts:225](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L225)

Second address line.

***

### city?

> `optional` **city?**: `string` \| `null`

Defined in: [modules/payments/types.ts:229](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L229)

City.

***

### country?

> `optional` **country?**: `string` \| `null`

Defined in: [modules/payments/types.ts:231](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L231)

ISO 3166-1 alpha-2 country code.

***

### legalName?

> `optional` **legalName?**: `string` \| `null`

Defined in: [modules/payments/types.ts:217](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L217)

Legal name.

***

### postalCode?

> `optional` **postalCode?**: `string` \| `null`

Defined in: [modules/payments/types.ts:227](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L227)

Postal code.

***

### registrationNumber?

> `optional` **registrationNumber?**: `string` \| `null`

Defined in: [modules/payments/types.ts:233](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L233)

Company registration number.

***

### supportEmail?

> `optional` **supportEmail?**: `string` \| `null`

Defined in: [modules/payments/types.ts:237](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L237)

Support email address.

***

### taxId?

> `optional` **taxId?**: `string` \| `null`

Defined in: [modules/payments/types.ts:235](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L235)

VAT or other tax ID.

***

### tradingName?

> `optional` **tradingName?**: `string` \| `null`

Defined in: [modules/payments/types.ts:219](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L219)

The name buyers know.

***

### website?

> `optional` **website?**: `string` \| `null`

Defined in: [modules/payments/types.ts:239](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L239)

Website.

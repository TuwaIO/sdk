# InvoiceSeller

Defined in: [modules/payments/types.ts:210](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L210)

The seller of an invoice as printed, copied from the app's payment settings when it was issued. Every field may be
missing or `null`: invoices issued before the address had its parts carry only `address`.

## Properties

### address?

> `optional` **address?**: `string` \| `null`

Defined in: [modules/payments/types.ts:216](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L216)

The postal address as one text, as the checkout shows it.

***

### addressLine1?

> `optional` **addressLine1?**: `string` \| `null`

Defined in: [modules/payments/types.ts:218](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L218)

First address line.

***

### addressLine2?

> `optional` **addressLine2?**: `string` \| `null`

Defined in: [modules/payments/types.ts:220](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L220)

Second address line.

***

### city?

> `optional` **city?**: `string` \| `null`

Defined in: [modules/payments/types.ts:224](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L224)

City.

***

### country?

> `optional` **country?**: `string` \| `null`

Defined in: [modules/payments/types.ts:226](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L226)

ISO 3166-1 alpha-2 country code.

***

### legalName?

> `optional` **legalName?**: `string` \| `null`

Defined in: [modules/payments/types.ts:212](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L212)

Legal name.

***

### postalCode?

> `optional` **postalCode?**: `string` \| `null`

Defined in: [modules/payments/types.ts:222](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L222)

Postal code.

***

### registrationNumber?

> `optional` **registrationNumber?**: `string` \| `null`

Defined in: [modules/payments/types.ts:228](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L228)

Company registration number.

***

### supportEmail?

> `optional` **supportEmail?**: `string` \| `null`

Defined in: [modules/payments/types.ts:232](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L232)

Support email address.

***

### taxId?

> `optional` **taxId?**: `string` \| `null`

Defined in: [modules/payments/types.ts:230](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L230)

VAT or other tax ID.

***

### tradingName?

> `optional` **tradingName?**: `string` \| `null`

Defined in: [modules/payments/types.ts:214](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L214)

The name buyers know.

***

### website?

> `optional` **website?**: `string` \| `null`

Defined in: [modules/payments/types.ts:234](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L234)

Website.

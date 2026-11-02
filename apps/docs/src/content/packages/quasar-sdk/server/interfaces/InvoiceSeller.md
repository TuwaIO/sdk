# InvoiceSeller

Defined in: modules/payments/types.ts:207

The seller of an invoice as printed, copied from the app's payment settings when it was issued. Every field may be
missing or `null`: invoices issued before the address had its parts carry only `address`.

## Properties

### address?

> `optional` **address?**: `string` \| `null`

Defined in: modules/payments/types.ts:213

The postal address as one text, as the checkout shows it.

***

### addressLine1?

> `optional` **addressLine1?**: `string` \| `null`

Defined in: modules/payments/types.ts:215

First address line.

***

### addressLine2?

> `optional` **addressLine2?**: `string` \| `null`

Defined in: modules/payments/types.ts:217

Second address line.

***

### city?

> `optional` **city?**: `string` \| `null`

Defined in: modules/payments/types.ts:221

City.

***

### country?

> `optional` **country?**: `string` \| `null`

Defined in: modules/payments/types.ts:223

ISO 3166-1 alpha-2 country code.

***

### legalName?

> `optional` **legalName?**: `string` \| `null`

Defined in: modules/payments/types.ts:209

Legal name.

***

### postalCode?

> `optional` **postalCode?**: `string` \| `null`

Defined in: modules/payments/types.ts:219

Postal code.

***

### registrationNumber?

> `optional` **registrationNumber?**: `string` \| `null`

Defined in: modules/payments/types.ts:225

Company registration number.

***

### supportEmail?

> `optional` **supportEmail?**: `string` \| `null`

Defined in: modules/payments/types.ts:229

Support email address.

***

### taxId?

> `optional` **taxId?**: `string` \| `null`

Defined in: modules/payments/types.ts:227

VAT or other tax ID.

***

### tradingName?

> `optional` **tradingName?**: `string` \| `null`

Defined in: modules/payments/types.ts:211

The name buyers know.

***

### website?

> `optional` **website?**: `string` \| `null`

Defined in: modules/payments/types.ts:231

Website.

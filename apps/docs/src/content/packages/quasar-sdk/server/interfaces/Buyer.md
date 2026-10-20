# Buyer

Defined in: [modules/payments/types.ts:34](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L34)

The buyer of an invoice (EN 16931 BT-44 to BT-55). Every field is optional; an e-invoice is issued only when the
fields it needs are there (otherwise the invoice says what was missing in `eInvoiceSkipped`).

## Properties

### addressLine1?

> `optional` **addressLine1?**: `string`

Defined in: [modules/payments/types.ts:40](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L40)

First address line.

***

### addressLine2?

> `optional` **addressLine2?**: `string`

Defined in: [modules/payments/types.ts:42](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L42)

Second address line.

***

### city?

> `optional` **city?**: `string`

Defined in: [modules/payments/types.ts:46](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L46)

City.

***

### country?

> `optional` **country?**: `string`

Defined in: [modules/payments/types.ts:50](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L50)

ISO 3166-1 alpha-2 country code, for example `DE`.

***

### email?

> `optional` **email?**: `string`

Defined in: [modules/payments/types.ts:38](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L38)

Email address; Quasar Cloud sends the invoice, receipt and credit notes to it.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: [modules/payments/types.ts:56](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L56)

Your ID of the buyer; filter invoices by it with `externalId`.

***

### name?

> `optional` **name?**: `string`

Defined in: [modules/payments/types.ts:36](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L36)

Name of the person or the company.

***

### postalCode?

> `optional` **postalCode?**: `string`

Defined in: [modules/payments/types.ts:44](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L44)

Postal code.

***

### region?

> `optional` **region?**: `string`

Defined in: [modules/payments/types.ts:48](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L48)

Region or state.

***

### registrationNumber?

> `optional` **registrationNumber?**: `string`

Defined in: [modules/payments/types.ts:52](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L52)

Company registration number.

***

### taxId?

> `optional` **taxId?**: `string`

Defined in: [modules/payments/types.ts:54](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L54)

VAT or other tax ID; required for a reverse-charge invoice.

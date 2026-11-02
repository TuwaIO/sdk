# Buyer

Defined in: modules/payments/types.ts:34

The buyer of an invoice (EN 16931 BT-44 to BT-55). Every field is optional; an e-invoice is issued only when the
fields it needs are there (otherwise the invoice says what was missing in `eInvoiceSkipped`).

## Properties

### addressLine1?

> `optional` **addressLine1?**: `string`

Defined in: modules/payments/types.ts:40

First address line.

***

### addressLine2?

> `optional` **addressLine2?**: `string`

Defined in: modules/payments/types.ts:42

Second address line.

***

### city?

> `optional` **city?**: `string`

Defined in: modules/payments/types.ts:46

City.

***

### country?

> `optional` **country?**: `string`

Defined in: modules/payments/types.ts:50

ISO 3166-1 alpha-2 country code, for example `DE`.

***

### email?

> `optional` **email?**: `string`

Defined in: modules/payments/types.ts:38

Email address; Quasar Cloud sends the invoice, receipt and credit notes to it.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: modules/payments/types.ts:56

Your ID of the buyer; filter invoices by it with `externalId`.

***

### name?

> `optional` **name?**: `string`

Defined in: modules/payments/types.ts:36

Name of the person or the company.

***

### postalCode?

> `optional` **postalCode?**: `string`

Defined in: modules/payments/types.ts:44

Postal code.

***

### region?

> `optional` **region?**: `string`

Defined in: modules/payments/types.ts:48

Region or state.

***

### registrationNumber?

> `optional` **registrationNumber?**: `string`

Defined in: modules/payments/types.ts:52

Company registration number.

***

### taxId?

> `optional` **taxId?**: `string`

Defined in: modules/payments/types.ts:54

VAT or other tax ID; required for a reverse-charge invoice.

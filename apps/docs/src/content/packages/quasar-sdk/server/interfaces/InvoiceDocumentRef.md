# InvoiceDocumentRef

Defined in: [modules/payments/types.ts:355](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L355)

A document issued for an invoice, as [PaymentsModule.listInvoiceDocuments](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicedocuments) lists it: the invoice, its receipt
or a credit note, in one format. [PaymentsModule.getDocument](/packages/quasar-sdk/server/classes/PaymentsModule.md#getdocument) downloads the invoice and the receipt,
[PaymentsModule.getCreditNote](/packages/quasar-sdk/server/classes/PaymentsModule.md#getcreditnote) a credit note by its number or its refund.

## Properties

### format

> **format**: `"pdf"` \| `"ubl"`

Defined in: [modules/payments/types.ts:359](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L359)

`pdf`, or `ubl` for the e-invoice.

***

### issuedAt

> **issuedAt**: `string`

Defined in: [modules/payments/types.ts:365](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L365)

When it was issued.

***

### kind

> **kind**: `"invoice"` \| `"receipt"` \| `"credit_note"`

Defined in: [modules/payments/types.ts:357](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L357)

What it is.

***

### number

> **number**: `string`

Defined in: [modules/payments/types.ts:361](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L361)

Its number.

***

### refundId

> **refundId**: `string` \| `null`

Defined in: [modules/payments/types.ts:363](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L363)

The refund a credit note credits; `null` for the invoice, the receipt and the credit note of a correction.

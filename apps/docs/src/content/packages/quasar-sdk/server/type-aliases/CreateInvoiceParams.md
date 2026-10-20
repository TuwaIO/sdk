# CreateInvoiceParams

> **CreateInvoiceParams** = [`InvoiceLinesInput`](/packages/quasar-sdk/server/type-aliases/InvoiceLinesInput.md) & [`InvoiceTermsInput`](/packages/quasar-sdk/server/interfaces/InvoiceTermsInput.md) & `object`

Defined in: [modules/payments/types.ts:124](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L124)

What [PaymentsModule.createInvoice](/packages/quasar-sdk/server/classes/PaymentsModule.md#createinvoice) takes.

## Type Declaration

### dueAt?

> `optional` **dueAt?**: `Date` \| `string`

When the invoice stops being payable; give it or `expiresInMinutes`.

### expiresInMinutes?

> `optional` **expiresInMinutes?**: `number`

Minutes the invoice stays payable, from 5 to 90 days.

### supplyDate?

> `optional` **supplyDate?**: `Date` \| `string`

Date of supply (BT-72). Defaults to the issue date.

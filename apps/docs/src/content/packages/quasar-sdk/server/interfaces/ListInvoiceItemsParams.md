# ListInvoiceItemsParams

Defined in: [modules/payments/types.ts:984](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L984)

Paging of [PaymentsModule.listInvoiceRefunds](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicerefunds) and [PaymentsModule.listInvoiceDocuments](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicedocuments).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:988](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L988)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:986](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L986)

Page size, 1 to 100. Defaults to `20`.

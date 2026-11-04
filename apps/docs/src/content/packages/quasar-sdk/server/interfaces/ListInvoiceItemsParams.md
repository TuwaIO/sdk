# ListInvoiceItemsParams

Defined in: [modules/payments/types.ts:890](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L890)

Paging of [PaymentsModule.listInvoiceRefunds](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicerefunds) and [PaymentsModule.listInvoiceDocuments](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicedocuments).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:894](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L894)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:892](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L892)

Page size, 1 to 100. Defaults to `20`.

# ListInvoicesParams

Defined in: [modules/payments/types.ts:380](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L380)

Filters and paging of [PaymentsModule.listInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoices).

## Properties

### createdAfter?

> `optional` **createdAfter?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:388](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L388)

Created at or after.

***

### createdBefore?

> `optional` **createdBefore?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:390](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L390)

Created before.

***

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:394](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L394)

`nextCursor` of the previous page.

***

### environment?

> `optional` **environment?**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:384](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L384)

Live or test invoices.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: [modules/payments/types.ts:386](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L386)

`buyer.externalId`.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:392](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L392)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)[]

Defined in: [modules/payments/types.ts:382](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L382)

One status or several.

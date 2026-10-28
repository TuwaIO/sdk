# ListInvoicesParams

Defined in: [modules/payments/types.ts:383](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L383)

Filters and paging of [PaymentsModule.listInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoices).

## Properties

### createdAfter?

> `optional` **createdAfter?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:391](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L391)

Created at or after.

***

### createdBefore?

> `optional` **createdBefore?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:393](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L393)

Created before.

***

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:397](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L397)

`nextCursor` of the previous page.

***

### environment?

> `optional` **environment?**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:387](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L387)

Live or test invoices.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: [modules/payments/types.ts:389](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L389)

`buyer.externalId`.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:395](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L395)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)[]

Defined in: [modules/payments/types.ts:385](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L385)

One status or several.

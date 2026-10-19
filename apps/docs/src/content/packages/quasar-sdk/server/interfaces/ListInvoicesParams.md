# ListInvoicesParams

Defined in: modules/payments/types.ts:347

Filters and paging of [PaymentsModule.listInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoices).

## Properties

### createdAfter?

> `optional` **createdAfter?**: `string` \| `Date`

Defined in: modules/payments/types.ts:355

Created at or after.

***

### createdBefore?

> `optional` **createdBefore?**: `string` \| `Date`

Defined in: modules/payments/types.ts:357

Created before.

***

### cursor?

> `optional` **cursor?**: `string`

Defined in: modules/payments/types.ts:361

`nextCursor` of the previous page.

***

### environment?

> `optional` **environment?**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: modules/payments/types.ts:351

Live or test invoices.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: modules/payments/types.ts:353

`buyer.externalId`.

***

### limit?

> `optional` **limit?**: `number`

Defined in: modules/payments/types.ts:359

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)[]

Defined in: modules/payments/types.ts:349

One status or several.

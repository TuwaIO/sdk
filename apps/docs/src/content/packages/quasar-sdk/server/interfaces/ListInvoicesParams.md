# ListInvoicesParams

Defined in: modules/payments/types.ts:383

Filters and paging of [PaymentsModule.listInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoices).

## Properties

### createdAfter?

> `optional` **createdAfter?**: `string` \| `Date`

Defined in: modules/payments/types.ts:391

Created at or after.

***

### createdBefore?

> `optional` **createdBefore?**: `string` \| `Date`

Defined in: modules/payments/types.ts:393

Created before.

***

### cursor?

> `optional` **cursor?**: `string`

Defined in: modules/payments/types.ts:397

`nextCursor` of the previous page.

***

### environment?

> `optional` **environment?**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: modules/payments/types.ts:387

Live or test invoices.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: modules/payments/types.ts:389

`buyer.externalId`.

***

### limit?

> `optional` **limit?**: `number`

Defined in: modules/payments/types.ts:395

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)[]

Defined in: modules/payments/types.ts:385

One status or several.

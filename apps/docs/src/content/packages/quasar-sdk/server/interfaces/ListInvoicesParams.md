# ListInvoicesParams

Defined in: [modules/payments/types.ts:407](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L407)

Filters and paging of [PaymentsModule.listInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoices).

## Properties

### createdAfter?

> `optional` **createdAfter?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:415](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L415)

Created at or after.

***

### createdBefore?

> `optional` **createdBefore?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:417](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L417)

Created before.

***

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:421](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L421)

`nextCursor` of the previous page.

***

### environment?

> `optional` **environment?**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:411](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L411)

Live or test invoices.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: [modules/payments/types.ts:413](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L413)

`buyer.externalId`.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:419](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L419)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)[]

Defined in: [modules/payments/types.ts:409](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L409)

One status or several.

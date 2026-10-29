# ListInvoicesParams

Defined in: [modules/payments/types.ts:397](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L397)

Filters and paging of [PaymentsModule.listInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoices).

## Properties

### createdAfter?

> `optional` **createdAfter?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:405](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L405)

Created at or after.

***

### createdBefore?

> `optional` **createdBefore?**: `string` \| `Date`

Defined in: [modules/payments/types.ts:407](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L407)

Created before.

***

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:411](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L411)

`nextCursor` of the previous page.

***

### environment?

> `optional` **environment?**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:401](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L401)

Live or test invoices.

***

### externalId?

> `optional` **externalId?**: `string`

Defined in: [modules/payments/types.ts:403](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L403)

`buyer.externalId`.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:409](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L409)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)[]

Defined in: [modules/payments/types.ts:399](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L399)

One status or several.

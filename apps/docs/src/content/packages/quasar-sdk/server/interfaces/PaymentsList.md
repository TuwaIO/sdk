# PaymentsList\<T\>

Defined in: modules/payments/types.ts:405

A page of a list, newest first.

## Type Parameters

### T

`T`

Type of the items.

## Properties

### data

> **data**: `T`[]

Defined in: modules/payments/types.ts:409

The items of the page.

***

### nextCursor

> **nextCursor**: `string` \| `null`

Defined in: modules/payments/types.ts:411

Pass it as `cursor` for the next page; `null` on the last page.

***

### object

> **object**: `"list"`

Defined in: modules/payments/types.ts:407

Always `list`.

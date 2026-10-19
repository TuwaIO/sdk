# PaymentsList\<T\>

Defined in: modules/payments/types.ts:369

A page of a list, newest first.

## Type Parameters

### T

`T`

Type of the items.

## Properties

### data

> **data**: `T`[]

Defined in: modules/payments/types.ts:373

The items of the page.

***

### nextCursor

> **nextCursor**: `string` \| `null`

Defined in: modules/payments/types.ts:375

Pass it as `cursor` for the next page; `null` on the last page.

***

### object

> **object**: `"list"`

Defined in: modules/payments/types.ts:371

Always `list`.

# PaymentsList\<T\>

Defined in: [modules/payments/types.ts:429](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L429)

A page of a list, newest first.

## Type Parameters

### T

`T`

Type of the items.

## Properties

### data

> **data**: `T`[]

Defined in: [modules/payments/types.ts:433](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L433)

The items of the page.

***

### nextCursor

> **nextCursor**: `string` \| `null`

Defined in: [modules/payments/types.ts:435](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L435)

Pass it as `cursor` for the next page; `null` on the last page.

***

### object

> **object**: `"list"`

Defined in: [modules/payments/types.ts:431](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L431)

Always `list`.

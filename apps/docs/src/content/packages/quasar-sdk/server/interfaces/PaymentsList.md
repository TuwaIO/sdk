# PaymentsList\<T\>

Defined in: [modules/payments/types.ts:419](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L419)

A page of a list, newest first.

## Type Parameters

### T

`T`

Type of the items.

## Properties

### data

> **data**: `T`[]

Defined in: [modules/payments/types.ts:423](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L423)

The items of the page.

***

### nextCursor

> **nextCursor**: `string` \| `null`

Defined in: [modules/payments/types.ts:425](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L425)

Pass it as `cursor` for the next page; `null` on the last page.

***

### object

> **object**: `"list"`

Defined in: [modules/payments/types.ts:421](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L421)

Always `list`.

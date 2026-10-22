# CheckoutMethod

Defined in: [checkout/types.ts:146](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L146)

A payment method the invoice can be paid with.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [checkout/types.ts:156](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L156)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:154](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L154)

CAIP-2 chain (`eip155:8453`, `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`).

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:158](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L158)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:166](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L166)

How much less the method costs than the invoice total, in basis points.

***

### featured

> **featured**: `boolean`

Defined in: [checkout/types.ts:162](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L162)

Marked "Popular" by the merchant.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [checkout/types.ts:160](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L160)

`auto` when the merchant may sponsor the gas, `off` otherwise.

***

### id

> **id**: `string`

Defined in: [checkout/types.ts:148](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L148)

Method ID, for [CheckoutState.selectMethod](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#selectmethod).

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:164](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L164)

How much more the method costs than the invoice total, in basis points (`150` is 1.5 %).

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:150](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L150)

Its name.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:152](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L152)

Token symbol.

# CheckoutMethod

Defined in: [checkout/types.ts:229](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L229)

A payment method the invoice can be paid with.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [checkout/types.ts:239](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L239)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:237](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L237)

CAIP-2 chain (`eip155:8453`, `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`).

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:241](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L241)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:249](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L249)

How much less the method costs than the invoice total, in basis points.

***

### featured

> **featured**: `boolean`

Defined in: [checkout/types.ts:245](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L245)

Marked "Popular" by the merchant.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [checkout/types.ts:243](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L243)

`auto` when the merchant may sponsor the gas, `off` otherwise.

***

### id

> **id**: `string`

Defined in: [checkout/types.ts:231](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L231)

Method ID, for [CheckoutState.selectMethod](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#selectmethod).

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:247](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L247)

How much more the method costs than the invoice total, in basis points (`150` is 1.5 %).

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:233](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L233)

Its name.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:235](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L235)

Token symbol.

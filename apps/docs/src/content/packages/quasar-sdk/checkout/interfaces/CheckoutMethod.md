# CheckoutMethod

Defined in: checkout/types.ts:135

A payment method the invoice can be paid with.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: checkout/types.ts:145

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: checkout/types.ts:143

CAIP-2 chain (`eip155:8453`, `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`).

***

### decimals

> **decimals**: `number`

Defined in: checkout/types.ts:147

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: checkout/types.ts:155

How much less the method costs than the invoice total, in basis points.

***

### featured

> **featured**: `boolean`

Defined in: checkout/types.ts:151

Marked "Popular" by the merchant.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: checkout/types.ts:149

`auto` when the merchant may sponsor the gas, `off` otherwise.

***

### id

> **id**: `string`

Defined in: checkout/types.ts:137

Method ID, for [CheckoutState.selectMethod](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#selectmethod).

***

### markupBps

> **markupBps**: `number`

Defined in: checkout/types.ts:153

How much more the method costs than the invoice total, in basis points (`150` is 1.5 %).

***

### name

> **name**: `string`

Defined in: checkout/types.ts:139

Its name.

***

### symbol

> **symbol**: `string`

Defined in: checkout/types.ts:141

Token symbol.

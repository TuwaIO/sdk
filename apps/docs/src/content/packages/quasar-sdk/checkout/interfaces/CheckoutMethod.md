# CheckoutMethod

Defined in: checkout/types.ts:147

A payment method the invoice can be paid with.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: checkout/types.ts:157

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: checkout/types.ts:155

CAIP-2 chain (`eip155:8453`, `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`).

***

### decimals

> **decimals**: `number`

Defined in: checkout/types.ts:159

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: checkout/types.ts:167

How much less the method costs than the invoice total, in basis points.

***

### featured

> **featured**: `boolean`

Defined in: checkout/types.ts:163

Marked "Popular" by the merchant.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: checkout/types.ts:161

`auto` when the merchant may sponsor the gas, `off` otherwise.

***

### id

> **id**: `string`

Defined in: checkout/types.ts:149

Method ID, for [CheckoutState.selectMethod](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#selectmethod).

***

### markupBps

> **markupBps**: `number`

Defined in: checkout/types.ts:165

How much more the method costs than the invoice total, in basis points (`150` is 1.5 %).

***

### name

> **name**: `string`

Defined in: checkout/types.ts:151

Its name.

***

### symbol

> **symbol**: `string`

Defined in: checkout/types.ts:153

Token symbol.

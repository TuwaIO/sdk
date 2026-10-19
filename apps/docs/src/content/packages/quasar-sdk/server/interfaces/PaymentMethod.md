# PaymentMethod

Defined in: modules/payments/types.ts:554

An active payment method of the app.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: modules/payments/types.ts:566

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: modules/payments/types.ts:564

CAIP-2 chain.

***

### decimals

> **decimals**: `number`

Defined in: modules/payments/types.ts:568

Decimals of the token.

***

### discount

> **discount**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:578

Discount in percent.

***

### featured

> **featured**: `boolean`

Defined in: modules/payments/types.ts:584

Marked "Popular" in the checkout.

***

### finality

> **finality**: `string` \| `null`

Defined in: modules/payments/types.ts:580

`default` or `confirmed`.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: modules/payments/types.ts:582

`off` or `auto`.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:556

Method ID.

***

### markup

> **markup**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:576

Markup in percent.

***

### maxAmount

> **maxAmount**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:574

Largest invoice total it takes.

***

### minAmount

> **minAmount**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:572

Smallest invoice total it takes.

***

### name

> **name**: `string`

Defined in: modules/payments/types.ts:560

Its name.

***

### object

> **object**: `"payment_method"`

Defined in: modules/payments/types.ts:558

Always `payment_method`.

***

### recipient

> **recipient**: `string`

Defined in: modules/payments/types.ts:570

The wallet that receives payments.

***

### symbol

> **symbol**: `string`

Defined in: modules/payments/types.ts:562

Token symbol.

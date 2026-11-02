# PaymentMethod

Defined in: modules/payments/types.ts:590

An active payment method of the app.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: modules/payments/types.ts:602

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: modules/payments/types.ts:600

CAIP-2 chain.

***

### decimals

> **decimals**: `number`

Defined in: modules/payments/types.ts:604

Decimals of the token.

***

### discount

> **discount**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:614

Discount in percent.

***

### featured

> **featured**: `boolean`

Defined in: modules/payments/types.ts:620

Marked "Popular" in the checkout.

***

### finality

> **finality**: `string` \| `null`

Defined in: modules/payments/types.ts:616

`default` or `confirmed`.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: modules/payments/types.ts:618

`off` or `auto`.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:592

Method ID.

***

### markup

> **markup**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:612

Markup in percent.

***

### maxAmount

> **maxAmount**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:610

Largest invoice total it takes.

***

### minAmount

> **minAmount**: `string` \| `number` \| `null`

Defined in: modules/payments/types.ts:608

Smallest invoice total it takes.

***

### name

> **name**: `string`

Defined in: modules/payments/types.ts:596

Its name.

***

### object

> **object**: `"payment_method"`

Defined in: modules/payments/types.ts:594

Always `payment_method`.

***

### recipient

> **recipient**: `string`

Defined in: modules/payments/types.ts:606

The wallet that receives payments.

***

### symbol

> **symbol**: `string`

Defined in: modules/payments/types.ts:598

Token symbol.

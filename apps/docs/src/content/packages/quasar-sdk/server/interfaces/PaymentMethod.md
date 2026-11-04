# PaymentMethod

Defined in: [modules/payments/types.ts:791](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L791)

An active payment method of the app.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [modules/payments/types.ts:803](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L803)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:801](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L801)

CAIP-2 chain.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:805](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L805)

Decimals of the token.

***

### discount

> **discount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:815](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L815)

Discount in percent.

***

### featured

> **featured**: `boolean`

Defined in: [modules/payments/types.ts:821](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L821)

Marked "Popular" in the checkout.

***

### finality

> **finality**: `string` \| `null`

Defined in: [modules/payments/types.ts:817](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L817)

`default` or `confirmed`.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [modules/payments/types.ts:819](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L819)

`off` or `auto`.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:793](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L793)

Method ID.

***

### markup

> **markup**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:813](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L813)

Markup in percent.

***

### maxAmount

> **maxAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:811](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L811)

Largest invoice total it takes.

***

### minAmount

> **minAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:809](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L809)

Smallest invoice total it takes.

***

### name

> **name**: `string`

Defined in: [modules/payments/types.ts:797](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L797)

Its name.

***

### object

> **object**: `"payment_method"`

Defined in: [modules/payments/types.ts:795](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L795)

Always `payment_method`.

***

### recipient

> **recipient**: `string`

Defined in: [modules/payments/types.ts:807](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L807)

The wallet that receives payments.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:799](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L799)

Token symbol.

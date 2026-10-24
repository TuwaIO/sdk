# PaymentMethod

Defined in: [modules/payments/types.ts:587](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L587)

An active payment method of the app.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [modules/payments/types.ts:599](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L599)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:597](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L597)

CAIP-2 chain.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:601](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L601)

Decimals of the token.

***

### discount

> **discount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:611](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L611)

Discount in percent.

***

### featured

> **featured**: `boolean`

Defined in: [modules/payments/types.ts:617](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L617)

Marked "Popular" in the checkout.

***

### finality

> **finality**: `string` \| `null`

Defined in: [modules/payments/types.ts:613](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L613)

`default` or `confirmed`.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [modules/payments/types.ts:615](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L615)

`off` or `auto`.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:589](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L589)

Method ID.

***

### markup

> **markup**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:609](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L609)

Markup in percent.

***

### maxAmount

> **maxAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:607](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L607)

Largest invoice total it takes.

***

### minAmount

> **minAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:605](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L605)

Smallest invoice total it takes.

***

### name

> **name**: `string`

Defined in: [modules/payments/types.ts:593](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L593)

Its name.

***

### object

> **object**: `"payment_method"`

Defined in: [modules/payments/types.ts:591](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L591)

Always `payment_method`.

***

### recipient

> **recipient**: `string`

Defined in: [modules/payments/types.ts:603](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L603)

The wallet that receives payments.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:595](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L595)

Token symbol.

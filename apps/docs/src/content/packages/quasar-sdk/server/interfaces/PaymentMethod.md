# PaymentMethod

Defined in: [modules/payments/types.ts:628](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L628)

An active payment method of the app.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [modules/payments/types.ts:640](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L640)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:638](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L638)

CAIP-2 chain.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:642](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L642)

Decimals of the token.

***

### discount

> **discount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:652](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L652)

Discount in percent.

***

### featured

> **featured**: `boolean`

Defined in: [modules/payments/types.ts:658](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L658)

Marked "Popular" in the checkout.

***

### finality

> **finality**: `string` \| `null`

Defined in: [modules/payments/types.ts:654](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L654)

`default` or `confirmed`.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [modules/payments/types.ts:656](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L656)

`off` or `auto`.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:630](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L630)

Method ID.

***

### markup

> **markup**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:650](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L650)

Markup in percent.

***

### maxAmount

> **maxAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:648](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L648)

Largest invoice total it takes.

***

### minAmount

> **minAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:646](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L646)

Smallest invoice total it takes.

***

### name

> **name**: `string`

Defined in: [modules/payments/types.ts:634](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L634)

Its name.

***

### object

> **object**: `"payment_method"`

Defined in: [modules/payments/types.ts:632](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L632)

Always `payment_method`.

***

### recipient

> **recipient**: `string`

Defined in: [modules/payments/types.ts:644](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L644)

The wallet that receives payments.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:636](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L636)

Token symbol.

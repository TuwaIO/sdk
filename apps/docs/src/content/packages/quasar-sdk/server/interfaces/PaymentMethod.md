# PaymentMethod

Defined in: [modules/payments/types.ts:590](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L590)

An active payment method of the app.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [modules/payments/types.ts:602](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L602)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:600](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L600)

CAIP-2 chain.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:604](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L604)

Decimals of the token.

***

### discount

> **discount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:614](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L614)

Discount in percent.

***

### featured

> **featured**: `boolean`

Defined in: [modules/payments/types.ts:620](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L620)

Marked "Popular" in the checkout.

***

### finality

> **finality**: `string` \| `null`

Defined in: [modules/payments/types.ts:616](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L616)

`default` or `confirmed`.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [modules/payments/types.ts:618](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L618)

`off` or `auto`.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:592](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L592)

Method ID.

***

### markup

> **markup**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:612](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L612)

Markup in percent.

***

### maxAmount

> **maxAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:610](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L610)

Largest invoice total it takes.

***

### minAmount

> **minAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:608](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L608)

Smallest invoice total it takes.

***

### name

> **name**: `string`

Defined in: [modules/payments/types.ts:596](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L596)

Its name.

***

### object

> **object**: `"payment_method"`

Defined in: [modules/payments/types.ts:594](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L594)

Always `payment_method`.

***

### recipient

> **recipient**: `string`

Defined in: [modules/payments/types.ts:606](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L606)

The wallet that receives payments.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:598](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L598)

Token symbol.

# PaymentMethod

Defined in: [modules/payments/types.ts:699](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L699)

An active payment method of the app.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [modules/payments/types.ts:711](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L711)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:709](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L709)

CAIP-2 chain.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:713](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L713)

Decimals of the token.

***

### discount

> **discount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:723](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L723)

Discount in percent.

***

### featured

> **featured**: `boolean`

Defined in: [modules/payments/types.ts:729](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L729)

Marked "Popular" in the checkout.

***

### finality

> **finality**: `string` \| `null`

Defined in: [modules/payments/types.ts:725](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L725)

`default` or `confirmed`.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [modules/payments/types.ts:727](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L727)

`off` or `auto`.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:701](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L701)

Method ID.

***

### markup

> **markup**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:721](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L721)

Markup in percent.

***

### maxAmount

> **maxAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:719](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L719)

Largest invoice total it takes.

***

### minAmount

> **minAmount**: `string` \| `number` \| `null`

Defined in: [modules/payments/types.ts:717](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L717)

Smallest invoice total it takes.

***

### name

> **name**: `string`

Defined in: [modules/payments/types.ts:705](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L705)

Its name.

***

### object

> **object**: `"payment_method"`

Defined in: [modules/payments/types.ts:703](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L703)

Always `payment_method`.

***

### recipient

> **recipient**: `string`

Defined in: [modules/payments/types.ts:715](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L715)

The wallet that receives payments.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:707](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L707)

Token symbol.

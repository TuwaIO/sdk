# PaymentQuote

Defined in: [modules/payments/types.ts:558](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L558)

The price of an amount in a payment method now; nothing is locked.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:568](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L568)

The fiat amount.

***

### amountToSend

> **amountToSend**: `string`

Defined in: [modules/payments/types.ts:574](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L574)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:566](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L566)

CAIP-2 chain.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:572](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L572)

Token amount the merchant receives, in base units.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:570](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L570)

Its currency.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:578](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L578)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [modules/payments/types.ts:582](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L582)

Discount of the method in basis points.

***

### markupBps

> **markupBps**: `number`

Defined in: [modules/payments/types.ts:580](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L580)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:562](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L562)

The payment method.

***

### object

> **object**: `"quote"`

Defined in: [modules/payments/types.ts:560](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L560)

Always `quote`.

***

### quotedAt

> **quotedAt**: `string`

Defined in: [modules/payments/types.ts:586](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L586)

When it was priced.

***

### rates

> **rates**: `unknown`

Defined in: [modules/payments/types.ts:584](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L584)

Price rounds used, as evidence.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:564](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L564)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [modules/payments/types.ts:576](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L576)

The token's transfer fee, when it takes one.

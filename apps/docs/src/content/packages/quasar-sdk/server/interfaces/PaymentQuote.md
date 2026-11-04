# PaymentQuote

Defined in: [modules/payments/types.ts:761](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L761)

The price of an amount in a payment method now; nothing is locked.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:771](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L771)

The fiat amount.

***

### amountToSend

> **amountToSend**: `string`

Defined in: [modules/payments/types.ts:777](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L777)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:769](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L769)

CAIP-2 chain.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:775](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L775)

Token amount the merchant receives, in base units.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:773](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L773)

Its currency.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:781](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L781)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [modules/payments/types.ts:785](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L785)

Discount of the method in basis points.

***

### markupBps

> **markupBps**: `number`

Defined in: [modules/payments/types.ts:783](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L783)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:765](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L765)

The payment method.

***

### object

> **object**: `"quote"`

Defined in: [modules/payments/types.ts:763](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L763)

Always `quote`.

***

### quotedAt

> **quotedAt**: `string`

Defined in: [modules/payments/types.ts:789](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L789)

When it was priced.

***

### rates

> **rates**: `unknown`

Defined in: [modules/payments/types.ts:787](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L787)

Price rounds used, as evidence.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:767](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L767)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [modules/payments/types.ts:779](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L779)

The token's transfer fee, when it takes one.

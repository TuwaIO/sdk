# PaymentQuote

Defined in: [modules/payments/types.ts:662](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L662)

The price of an amount in a payment method now; nothing is locked.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:672](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L672)

The fiat amount.

***

### amountToSend

> **amountToSend**: `string`

Defined in: [modules/payments/types.ts:678](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L678)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:670](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L670)

CAIP-2 chain.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:676](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L676)

Token amount the merchant receives, in base units.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:674](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L674)

Its currency.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:682](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L682)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [modules/payments/types.ts:686](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L686)

Discount of the method in basis points.

***

### markupBps

> **markupBps**: `number`

Defined in: [modules/payments/types.ts:684](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L684)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:666](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L666)

The payment method.

***

### object

> **object**: `"quote"`

Defined in: [modules/payments/types.ts:664](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L664)

Always `quote`.

***

### quotedAt

> **quotedAt**: `string`

Defined in: [modules/payments/types.ts:690](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L690)

When it was priced.

***

### rates

> **rates**: `unknown`

Defined in: [modules/payments/types.ts:688](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L688)

Price rounds used, as evidence.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:668](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L668)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [modules/payments/types.ts:680](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L680)

The token's transfer fee, when it takes one.

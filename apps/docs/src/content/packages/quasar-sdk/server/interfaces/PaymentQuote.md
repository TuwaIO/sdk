# PaymentQuote

Defined in: [modules/payments/types.ts:596](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L596)

The price of an amount in a payment method now; nothing is locked.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:606](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L606)

The fiat amount.

***

### amountToSend

> **amountToSend**: `string`

Defined in: [modules/payments/types.ts:612](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L612)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:604](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L604)

CAIP-2 chain.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:610](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L610)

Token amount the merchant receives, in base units.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:608](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L608)

Its currency.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:616](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L616)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [modules/payments/types.ts:620](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L620)

Discount of the method in basis points.

***

### markupBps

> **markupBps**: `number`

Defined in: [modules/payments/types.ts:618](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L618)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:600](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L600)

The payment method.

***

### object

> **object**: `"quote"`

Defined in: [modules/payments/types.ts:598](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L598)

Always `quote`.

***

### quotedAt

> **quotedAt**: `string`

Defined in: [modules/payments/types.ts:624](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L624)

When it was priced.

***

### rates

> **rates**: `unknown`

Defined in: [modules/payments/types.ts:622](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L622)

Price rounds used, as evidence.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:602](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L602)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [modules/payments/types.ts:614](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L614)

The token's transfer fee, when it takes one.

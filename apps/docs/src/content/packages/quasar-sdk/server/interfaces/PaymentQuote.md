# PaymentQuote

Defined in: [modules/payments/types.ts:667](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L667)

The price of an amount in a payment method now; nothing is locked.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:677](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L677)

The fiat amount.

***

### amountToSend

> **amountToSend**: `string`

Defined in: [modules/payments/types.ts:683](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L683)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:675](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L675)

CAIP-2 chain.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:681](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L681)

Token amount the merchant receives, in base units.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:679](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L679)

Its currency.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:687](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L687)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [modules/payments/types.ts:691](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L691)

Discount of the method in basis points.

***

### markupBps

> **markupBps**: `number`

Defined in: [modules/payments/types.ts:689](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L689)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:671](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L671)

The payment method.

***

### object

> **object**: `"quote"`

Defined in: [modules/payments/types.ts:669](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L669)

Always `quote`.

***

### quotedAt

> **quotedAt**: `string`

Defined in: [modules/payments/types.ts:695](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L695)

When it was priced.

***

### rates

> **rates**: `unknown`

Defined in: [modules/payments/types.ts:693](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L693)

Price rounds used, as evidence.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:673](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L673)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [modules/payments/types.ts:685](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L685)

The token's transfer fee, when it takes one.

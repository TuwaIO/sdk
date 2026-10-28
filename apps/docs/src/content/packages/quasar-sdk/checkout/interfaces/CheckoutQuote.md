# CheckoutQuote

Defined in: [checkout/types.ts:316](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L316)

A locked quote: the price for this payer, valid until `expiresAt`.

## Properties

### amountToSend

> **amountToSend**: `string`

Defined in: [checkout/types.ts:326](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L326)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string`

Defined in: [checkout/types.ts:324](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L324)

Token amount the merchant receives, in base units.

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:330](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L330)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:344](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L344)

Discount of the method in basis points.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:336](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L336)

When it expires; ask for a new quote after that.

***

### gasless

> **gasless**: [`GaslessOffer`](/packages/quasar-sdk/checkout/interfaces/GaslessOffer.md) \| `null`

Defined in: [checkout/types.ts:348](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L348)

What the merchant sponsors, or `null`: the buyer pays the gas.

***

### instructions

> **instructions**: [`PaymentInstructions`](/packages/quasar-sdk/checkout/type-aliases/PaymentInstructions.md)

Defined in: [checkout/types.ts:346](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L346)

What the wallet sends.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: [checkout/types.ts:334](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L334)

When it was locked.

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:342](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L342)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [checkout/types.ts:320](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L320)

The payment method.

***

### object

> **object**: `"checkout_quote"`

Defined in: [checkout/types.ts:318](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L318)

Always `checkout_quote`.

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/types.ts:322](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L322)

CAIP-10 account the quote was locked to; `null` for a Solana Pay QR quote.

***

### rates

> **rates**: `unknown`

Defined in: [checkout/types.ts:340](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L340)

Price rounds used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: [checkout/types.ts:338](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L338)

The Solana Pay reference key.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:332](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L332)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [checkout/types.ts:328](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L328)

The token's transfer fee, when it takes one.

# CheckoutQuote

Defined in: [checkout/types.ts:218](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L218)

A locked quote: the price for this payer, valid until `expiresAt`.

## Properties

### amountToSend

> **amountToSend**: `string`

Defined in: [checkout/types.ts:228](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L228)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string`

Defined in: [checkout/types.ts:226](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L226)

Token amount the merchant receives, in base units.

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:232](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L232)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:246](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L246)

Discount of the method in basis points.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:238](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L238)

When it expires; ask for a new quote after that.

***

### gasless

> **gasless**: [`GaslessOffer`](/packages/quasar-sdk/checkout/interfaces/GaslessOffer.md) \| `null`

Defined in: [checkout/types.ts:250](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L250)

What the merchant sponsors, or `null`: the buyer pays the gas.

***

### instructions

> **instructions**: [`PaymentInstructions`](/packages/quasar-sdk/checkout/type-aliases/PaymentInstructions.md)

Defined in: [checkout/types.ts:248](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L248)

What the wallet sends.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: [checkout/types.ts:236](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L236)

When it was locked.

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:244](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L244)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [checkout/types.ts:222](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L222)

The payment method.

***

### object

> **object**: `"checkout_quote"`

Defined in: [checkout/types.ts:220](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L220)

Always `checkout_quote`.

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/types.ts:224](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L224)

CAIP-10 account the quote was locked to; `null` for a Solana Pay QR quote.

***

### rates

> **rates**: `unknown`

Defined in: [checkout/types.ts:242](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L242)

Price rounds used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: [checkout/types.ts:240](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L240)

The Solana Pay reference key.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:234](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L234)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [checkout/types.ts:230](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L230)

The token's transfer fee, when it takes one.

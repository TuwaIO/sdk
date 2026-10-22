# CheckoutQuote

Defined in: [checkout/types.ts:233](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L233)

A locked quote: the price for this payer, valid until `expiresAt`.

## Properties

### amountToSend

> **amountToSend**: `string`

Defined in: [checkout/types.ts:243](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L243)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string`

Defined in: [checkout/types.ts:241](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L241)

Token amount the merchant receives, in base units.

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:247](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L247)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:261](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L261)

Discount of the method in basis points.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:253](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L253)

When it expires; ask for a new quote after that.

***

### gasless

> **gasless**: [`GaslessOffer`](/packages/quasar-sdk/checkout/interfaces/GaslessOffer.md) \| `null`

Defined in: [checkout/types.ts:265](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L265)

What the merchant sponsors, or `null`: the buyer pays the gas.

***

### instructions

> **instructions**: [`PaymentInstructions`](/packages/quasar-sdk/checkout/type-aliases/PaymentInstructions.md)

Defined in: [checkout/types.ts:263](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L263)

What the wallet sends.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: [checkout/types.ts:251](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L251)

When it was locked.

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:259](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L259)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [checkout/types.ts:237](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L237)

The payment method.

***

### object

> **object**: `"checkout_quote"`

Defined in: [checkout/types.ts:235](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L235)

Always `checkout_quote`.

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/types.ts:239](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L239)

CAIP-10 account the quote was locked to; `null` for a Solana Pay QR quote.

***

### rates

> **rates**: `unknown`

Defined in: [checkout/types.ts:257](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L257)

Price rounds used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: [checkout/types.ts:255](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L255)

The Solana Pay reference key.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:249](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L249)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [checkout/types.ts:245](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L245)

The token's transfer fee, when it takes one.

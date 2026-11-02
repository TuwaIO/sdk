# CheckoutQuote

Defined in: checkout/types.ts:234

A locked quote: the price for this payer, valid until `expiresAt`.

## Properties

### amountToSend

> **amountToSend**: `string`

Defined in: checkout/types.ts:244

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string`

Defined in: checkout/types.ts:242

Token amount the merchant receives, in base units.

***

### decimals

> **decimals**: `number`

Defined in: checkout/types.ts:248

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: checkout/types.ts:262

Discount of the method in basis points.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: checkout/types.ts:254

When it expires; ask for a new quote after that.

***

### gasless

> **gasless**: [`GaslessOffer`](/packages/quasar-sdk/checkout/interfaces/GaslessOffer.md) \| `null`

Defined in: checkout/types.ts:266

What the merchant sponsors, or `null`: the buyer pays the gas.

***

### instructions

> **instructions**: [`PaymentInstructions`](/packages/quasar-sdk/checkout/type-aliases/PaymentInstructions.md)

Defined in: checkout/types.ts:264

What the wallet sends.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: checkout/types.ts:252

When it was locked.

***

### markupBps

> **markupBps**: `number`

Defined in: checkout/types.ts:260

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: checkout/types.ts:238

The payment method.

***

### object

> **object**: `"checkout_quote"`

Defined in: checkout/types.ts:236

Always `checkout_quote`.

***

### payer

> **payer**: `string` \| `null`

Defined in: checkout/types.ts:240

CAIP-10 account the quote was locked to; `null` for a Solana Pay QR quote.

***

### rates

> **rates**: `unknown`

Defined in: checkout/types.ts:258

Price rounds used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: checkout/types.ts:256

The Solana Pay reference key.

***

### symbol

> **symbol**: `string`

Defined in: checkout/types.ts:250

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: checkout/types.ts:246

The token's transfer fee, when it takes one.

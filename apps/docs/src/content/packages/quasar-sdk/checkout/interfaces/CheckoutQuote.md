# CheckoutQuote

Defined in: [checkout/types.ts:435](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L435)

A locked quote: the price for this payer, valid until `expiresAt`.

## Properties

### amountToSend

> **amountToSend**: `string`

Defined in: [checkout/types.ts:445](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L445)

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string`

Defined in: [checkout/types.ts:443](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L443)

Token amount the merchant receives, in base units.

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:449](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L449)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:463](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L463)

Discount of the method in basis points.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:455](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L455)

When it expires; ask for a new quote after that.

***

### gasless

> **gasless**: [`GaslessOffer`](/packages/quasar-sdk/checkout/interfaces/GaslessOffer.md) \| `null`

Defined in: [checkout/types.ts:467](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L467)

What the merchant sponsors, or `null`: the buyer pays the gas.

***

### instructions

> **instructions**: [`PaymentInstructions`](/packages/quasar-sdk/checkout/type-aliases/PaymentInstructions.md)

Defined in: [checkout/types.ts:465](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L465)

What the wallet sends.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: [checkout/types.ts:453](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L453)

When it was locked.

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:461](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L461)

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: [checkout/types.ts:439](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L439)

The payment method.

***

### object

> **object**: `"checkout_quote"`

Defined in: [checkout/types.ts:437](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L437)

Always `checkout_quote`.

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/types.ts:441](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L441)

CAIP-10 account the quote was locked to; `null` for a Solana Pay QR quote.

***

### payerProof?

> `optional` **payerProof?**: `object`

Defined in: [checkout/types.ts:474](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L474)

Whether the quoted wallet confirmed the invoice ([CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer)): `required` on an EVM method,
`proven` once it did (`kind` says how). An EVM quote without the confirmation exists only for a method the gasless
relay may pay: a transfer or a paymaster payment from that wallet needs the confirmation first, or Quasar credits it
to no invoice and the merchant returns it. Quasar versions before October 29, 2026 leave it out.

#### kind

> **kind**: [`PayerProofKind`](/packages/quasar-sdk/checkout/type-aliases/PayerProofKind.md) \| `null`

#### proven

> **proven**: `boolean`

#### required

> **required**: `boolean`

***

### rates

> **rates**: `unknown`

Defined in: [checkout/types.ts:459](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L459)

Price rounds used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: [checkout/types.ts:457](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L457)

The Solana Pay reference key.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:451](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L451)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [checkout/types.ts:447](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L447)

The token's transfer fee, when it takes one.

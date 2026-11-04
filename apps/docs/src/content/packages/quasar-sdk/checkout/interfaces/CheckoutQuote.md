# CheckoutQuote

Defined in: [checkout/types.ts:435](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L435)

A locked quote: the price for this payer, valid until `expiresAt`.

## Properties

### amountDue

> **amountDue**: `string`

Defined in: [checkout/types.ts:448](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L448)

Token amount that must still arrive, in base units: [CheckoutQuote.cryptoAmountExpected](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md#cryptoamountexpected), or on an underpaid
invoice what is left of it after what arrived, at the same rate.

***

### amountToSend

> **amountToSend**: `string`

Defined in: [checkout/types.ts:450](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L450)

Token amount the buyer sends: [CheckoutQuote.amountDue](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md#amountdue) grossed up for a transfer fee, in base units.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string`

Defined in: [checkout/types.ts:443](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L443)

Token amount the whole invoice costs at the quoted rate, in base units.

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:460](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L460)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:474](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L474)

Discount of the method in basis points.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:466](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L466)

When it expires; ask for a new quote after that.

***

### gasless

> **gasless**: [`GaslessOffer`](/packages/quasar-sdk/checkout/interfaces/GaslessOffer.md) \| `null`

Defined in: [checkout/types.ts:478](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L478)

What the merchant sponsors, or `null`: the buyer pays the gas.

***

### instructions

> **instructions**: [`PaymentInstructions`](/packages/quasar-sdk/checkout/type-aliases/PaymentInstructions.md)

Defined in: [checkout/types.ts:476](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L476)

What the wallet sends.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: [checkout/types.ts:464](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L464)

When it was locked.

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:472](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L472)

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

Defined in: [checkout/types.ts:485](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L485)

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

### rateHeldUntil

> **rateHeldUntil**: `string` \| `null`

Defined in: [checkout/types.ts:456](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L456)

On the quote of a rest in an asset that moves against the invoice currency: until when its rate holds. The quote may
run longer; a payment after this time waits for the merchant to accept or refund it (`review.reason`
`quote_expired`). `null` otherwise.

***

### rates

> **rates**: `unknown`

Defined in: [checkout/types.ts:470](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L470)

Price rounds used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: [checkout/types.ts:468](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L468)

The Solana Pay reference key.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:462](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L462)

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: [checkout/types.ts:458](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L458)

The token's transfer fee, when it takes one.

# PaymentQuote

Defined in: modules/payments/types.ts:558

The price of an amount in a payment method now; nothing is locked.

## Properties

### amount

> **amount**: `string`

Defined in: modules/payments/types.ts:568

The fiat amount.

***

### amountToSend

> **amountToSend**: `string`

Defined in: modules/payments/types.ts:574

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### chainId

> **chainId**: `string`

Defined in: modules/payments/types.ts:566

CAIP-2 chain.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: modules/payments/types.ts:572

Token amount the merchant receives, in base units.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: modules/payments/types.ts:570

Its currency.

***

### decimals

> **decimals**: `number`

Defined in: modules/payments/types.ts:578

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: modules/payments/types.ts:582

Discount of the method in basis points.

***

### markupBps

> **markupBps**: `number`

Defined in: modules/payments/types.ts:580

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: modules/payments/types.ts:562

The payment method.

***

### object

> **object**: `"quote"`

Defined in: modules/payments/types.ts:560

Always `quote`.

***

### quotedAt

> **quotedAt**: `string`

Defined in: modules/payments/types.ts:586

When it was priced.

***

### rates

> **rates**: `unknown`

Defined in: modules/payments/types.ts:584

Price rounds used, as evidence.

***

### symbol

> **symbol**: `string`

Defined in: modules/payments/types.ts:564

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: modules/payments/types.ts:576

The token's transfer fee, when it takes one.

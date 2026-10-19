# PaymentQuote

Defined in: modules/payments/types.ts:522

The price of an amount in a payment method now; nothing is locked.

## Properties

### amount

> **amount**: `string`

Defined in: modules/payments/types.ts:532

The fiat amount.

***

### amountToSend

> **amountToSend**: `string`

Defined in: modules/payments/types.ts:538

Token amount the buyer sends (grossed up for a transfer fee), in base units.

***

### chainId

> **chainId**: `string`

Defined in: modules/payments/types.ts:530

CAIP-2 chain.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: modules/payments/types.ts:536

Token amount the merchant receives, in base units.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: modules/payments/types.ts:534

Its currency.

***

### decimals

> **decimals**: `number`

Defined in: modules/payments/types.ts:542

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: modules/payments/types.ts:546

Discount of the method in basis points.

***

### markupBps

> **markupBps**: `number`

Defined in: modules/payments/types.ts:544

Markup of the method in basis points.

***

### methodId

> **methodId**: `string`

Defined in: modules/payments/types.ts:526

The payment method.

***

### object

> **object**: `"quote"`

Defined in: modules/payments/types.ts:524

Always `quote`.

***

### quotedAt

> **quotedAt**: `string`

Defined in: modules/payments/types.ts:550

When it was priced.

***

### rates

> **rates**: `unknown`

Defined in: modules/payments/types.ts:548

Price rounds used, as evidence.

***

### symbol

> **symbol**: `string`

Defined in: modules/payments/types.ts:528

Token symbol.

***

### transferFee

> **transferFee**: \{ `bps`: `number`; `maxFee`: `string` \| `null`; `source`: `"method"` \| `"contract"`; \} \| `null`

Defined in: modules/payments/types.ts:540

The token's transfer fee, when it takes one.

# InvoiceQuote

Defined in: modules/payments/types.ts:164

The price an invoice was quoted at, once a buyer chose how to pay.

## Properties

### amountToSend

> **amountToSend**: `string` \| `null`

Defined in: modules/payments/types.ts:172

What the buyer sends: the price grossed up for a token's transfer fee, in base units.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string` \| `null`

Defined in: modules/payments/types.ts:170

Token amount that settles the invoice, in base units.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: modules/payments/types.ts:176

When the quote expires.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:174

When the quote was locked.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: modules/payments/types.ts:166

The payment method.

***

### payer

> **payer**: `string`

Defined in: modules/payments/types.ts:168

CAIP-10 account the quote was issued to.

***

### rate

> **rate**: `unknown`

Defined in: modules/payments/types.ts:178

The price rounds the quote used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: modules/payments/types.ts:180

Solana Pay reference key of the quote.

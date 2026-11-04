# InvoiceQuote

Defined in: [modules/payments/types.ts:164](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L164)

The price an invoice was quoted at, once a buyer chose how to pay.

## Properties

### amountToSend

> **amountToSend**: `string` \| `null`

Defined in: [modules/payments/types.ts:175](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L175)

What the buyer sends, in base units: what must still arrive (the whole price, or the rest of an `underpaid` invoice)
grossed up for a token's transfer fee.

***

### cryptoAmountExpected

> **cryptoAmountExpected**: `string` \| `null`

Defined in: [modules/payments/types.ts:170](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L170)

Token amount that settles the invoice, in base units.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:179](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L179)

When the quote expires.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:177](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L177)

When the quote was locked.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:166](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L166)

The payment method.

***

### payer

> **payer**: `string`

Defined in: [modules/payments/types.ts:168](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L168)

CAIP-10 account the quote was issued to.

***

### rate

> **rate**: `unknown`

Defined in: [modules/payments/types.ts:181](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L181)

The price rounds the quote used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: [modules/payments/types.ts:183](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L183)

Solana Pay reference key of the quote.

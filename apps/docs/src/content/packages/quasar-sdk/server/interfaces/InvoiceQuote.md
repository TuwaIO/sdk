# InvoiceQuote

Defined in: [modules/payments/types.ts:164](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L164)

The price an invoice was quoted at, once a buyer chose how to pay.

## Properties

### amountDue

> **amountDue**: `string` \| `null`

Defined in: [modules/payments/types.ts:175](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L175)

What must still arrive, in base units, while the invoice takes a payment: the whole amount, or the rest of an
`underpaid` invoice. `null` otherwise.

***

### amountToSend

> **amountToSend**: `string` \| `null`

Defined in: [modules/payments/types.ts:180](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L180)

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

Defined in: [modules/payments/types.ts:184](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L184)

When the quote expires.

***

### lockedAt

> **lockedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:182](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L182)

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

Defined in: [modules/payments/types.ts:186](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L186)

The price rounds the quote used, as evidence.

***

### reference

> **reference**: `string` \| `null`

Defined in: [modules/payments/types.ts:188](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L188)

Solana Pay reference key of the quote.

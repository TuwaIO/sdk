# Refund

Defined in: [modules/payments/types.ts:466](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L466)

A refund. You send it from your wallet; Quasar verifies the transaction and issues the credit note.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:476](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L476)

Amount in the invoice currency.

***

### assetId

> **assetId**: `string`

Defined in: [modules/payments/types.ts:484](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L484)

CAIP-19 asset to send.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:486](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L486)

CAIP-2 chain to send on.

***

### confirmedAt

> **confirmedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:502](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L502)

When it was confirmed.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:500](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L500)

When it was asked for.

***

### creditNoteNumber

> **creditNoteNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:498](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L498)

Its credit note, once confirmed.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:482](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L482)

Token amount to send, in base units.

***

### currency

> **currency**: `string`

Defined in: [modules/payments/types.ts:478](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L478)

Invoice currency.

***

### failureReason

> **failureReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:496](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L496)

Why it failed.

***

### from

> **from**: `string` \| `null`

Defined in: [modules/payments/types.ts:492](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L492)

The address it was sent from.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:468](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L468)

Refund ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:472](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L472)

The invoice.

***

### mode

> **mode**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:480](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L480)

How it was priced.

***

### object

> **object**: `"refund"`

Defined in: [modules/payments/types.ts:470](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L470)

Always `refund`.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:494](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L494)

Why.

***

### status

> **status**: `"requested"` \| `"submitted"` \| `"confirmed"` \| `"failed"`

Defined in: [modules/payments/types.ts:474](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L474)

`requested` (waits for its transaction), `submitted`, `confirmed` or `failed`.

***

### to

> **to**: `string`

Defined in: [modules/payments/types.ts:488](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L488)

The payer's address: refunds go back to it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:490](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L490)

The refund transaction, once submitted.

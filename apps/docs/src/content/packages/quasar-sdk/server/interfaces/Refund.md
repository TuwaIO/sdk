# Refund

Defined in: modules/payments/types.ts:466

A refund. You send it from your wallet; Quasar verifies the transaction and issues the credit note.

## Properties

### amount

> **amount**: `string`

Defined in: modules/payments/types.ts:476

Amount in the invoice currency.

***

### assetId

> **assetId**: `string`

Defined in: modules/payments/types.ts:484

CAIP-19 asset to send.

***

### chainId

> **chainId**: `string`

Defined in: modules/payments/types.ts:486

CAIP-2 chain to send on.

***

### confirmedAt

> **confirmedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:502

When it was confirmed.

***

### createdAt

> **createdAt**: `string`

Defined in: modules/payments/types.ts:500

When it was asked for.

***

### creditNoteNumber

> **creditNoteNumber**: `string` \| `null`

Defined in: modules/payments/types.ts:498

Its credit note, once confirmed.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: modules/payments/types.ts:482

Token amount to send, in base units.

***

### currency

> **currency**: `string`

Defined in: modules/payments/types.ts:478

Invoice currency.

***

### failureReason

> **failureReason**: `string` \| `null`

Defined in: modules/payments/types.ts:496

Why it failed.

***

### from

> **from**: `string` \| `null`

Defined in: modules/payments/types.ts:492

The address it was sent from.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:468

Refund ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: modules/payments/types.ts:472

The invoice.

***

### mode

> **mode**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: modules/payments/types.ts:480

How it was priced.

***

### object

> **object**: `"refund"`

Defined in: modules/payments/types.ts:470

Always `refund`.

***

### reason

> **reason**: `string` \| `null`

Defined in: modules/payments/types.ts:494

Why.

***

### status

> **status**: `"requested"` \| `"submitted"` \| `"confirmed"` \| `"failed"`

Defined in: modules/payments/types.ts:474

`requested` (waits for its transaction), `submitted`, `confirmed` or `failed`.

***

### to

> **to**: `string`

Defined in: modules/payments/types.ts:488

The payer's address: refunds go back to it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: modules/payments/types.ts:490

The refund transaction, once submitted.

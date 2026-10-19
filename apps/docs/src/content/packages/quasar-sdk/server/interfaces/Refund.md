# Refund

Defined in: modules/payments/types.ts:430

A refund. You send it from your wallet; Quasar verifies the transaction and issues the credit note.

## Properties

### amount

> **amount**: `string`

Defined in: modules/payments/types.ts:440

Amount in the invoice currency.

***

### assetId

> **assetId**: `string`

Defined in: modules/payments/types.ts:448

CAIP-19 asset to send.

***

### chainId

> **chainId**: `string`

Defined in: modules/payments/types.ts:450

CAIP-2 chain to send on.

***

### confirmedAt

> **confirmedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:466

When it was confirmed.

***

### createdAt

> **createdAt**: `string`

Defined in: modules/payments/types.ts:464

When it was asked for.

***

### creditNoteNumber

> **creditNoteNumber**: `string` \| `null`

Defined in: modules/payments/types.ts:462

Its credit note, once confirmed.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: modules/payments/types.ts:446

Token amount to send, in base units.

***

### currency

> **currency**: `string`

Defined in: modules/payments/types.ts:442

Invoice currency.

***

### failureReason

> **failureReason**: `string` \| `null`

Defined in: modules/payments/types.ts:460

Why it failed.

***

### from

> **from**: `string` \| `null`

Defined in: modules/payments/types.ts:456

The address it was sent from.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:432

Refund ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: modules/payments/types.ts:436

The invoice.

***

### mode

> **mode**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: modules/payments/types.ts:444

How it was priced.

***

### object

> **object**: `"refund"`

Defined in: modules/payments/types.ts:434

Always `refund`.

***

### reason

> **reason**: `string` \| `null`

Defined in: modules/payments/types.ts:458

Why.

***

### status

> **status**: `"requested"` \| `"submitted"` \| `"confirmed"` \| `"failed"`

Defined in: modules/payments/types.ts:438

`requested` (waits for its transaction), `submitted`, `confirmed` or `failed`.

***

### to

> **to**: `string`

Defined in: modules/payments/types.ts:452

The payer's address: refunds go back to it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: modules/payments/types.ts:454

The refund transaction, once submitted.

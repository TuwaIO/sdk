# Refund

Defined in: [modules/payments/types.ts:463](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L463)

A refund. You send it from your wallet; Quasar verifies the transaction and issues the credit note.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:473](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L473)

Amount in the invoice currency.

***

### assetId

> **assetId**: `string`

Defined in: [modules/payments/types.ts:481](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L481)

CAIP-19 asset to send.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:483](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L483)

CAIP-2 chain to send on.

***

### confirmedAt

> **confirmedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:499](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L499)

When it was confirmed.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:497](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L497)

When it was asked for.

***

### creditNoteNumber

> **creditNoteNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:495](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L495)

Its credit note, once confirmed.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:479](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L479)

Token amount to send, in base units.

***

### currency

> **currency**: `string`

Defined in: [modules/payments/types.ts:475](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L475)

Invoice currency.

***

### failureReason

> **failureReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:493](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L493)

Why it failed.

***

### from

> **from**: `string` \| `null`

Defined in: [modules/payments/types.ts:489](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L489)

The address it was sent from.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:465](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L465)

Refund ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:469](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L469)

The invoice.

***

### mode

> **mode**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:477](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L477)

How it was priced.

***

### object

> **object**: `"refund"`

Defined in: [modules/payments/types.ts:467](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L467)

Always `refund`.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:491](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L491)

Why.

***

### status

> **status**: `"requested"` \| `"submitted"` \| `"confirmed"` \| `"failed"`

Defined in: [modules/payments/types.ts:471](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L471)

`requested` (waits for its transaction), `submitted`, `confirmed` or `failed`.

***

### to

> **to**: `string`

Defined in: [modules/payments/types.ts:485](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L485)

The payer's address: refunds go back to it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:487](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L487)

The refund transaction, once submitted.

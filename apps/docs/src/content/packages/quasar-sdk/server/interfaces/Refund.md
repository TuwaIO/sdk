# Refund

Defined in: [modules/payments/types.ts:514](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L514)

A refund. You send it from your wallet; Quasar verifies the transaction and issues the credit note.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:524](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L524)

Amount in the invoice currency.

***

### assetId

> **assetId**: `string`

Defined in: [modules/payments/types.ts:532](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L532)

CAIP-19 asset to send.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:534](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L534)

CAIP-2 chain to send on.

***

### confirmedAt

> **confirmedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:552](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L552)

When it was confirmed.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:550](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L550)

When it was asked for.

***

### creditNoteNumber

> **creditNoteNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:546](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L546)

Its credit note, once confirmed.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:530](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L530)

Token amount to send, in base units.

***

### currency

> **currency**: `string`

Defined in: [modules/payments/types.ts:526](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L526)

Invoice currency.

***

### failureReason

> **failureReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:544](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L544)

Why it failed.

***

### from

> **from**: `string` \| `null`

Defined in: [modules/payments/types.ts:540](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L540)

The address it was sent from.

***

### heldTransfer

> **heldTransfer**: `string` \| `null`

Defined in: [modules/payments/types.ts:548](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L548)

The held transfer it returns to its sender ([HeldTransfer](/packages/quasar-sdk/server/interfaces/HeldTransfer.md)), or `null` for a refund of the invoice.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:516](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L516)

Refund ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:520](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L520)

The invoice.

***

### mode

> **mode**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:528](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L528)

How it was priced.

***

### object

> **object**: `"refund"`

Defined in: [modules/payments/types.ts:518](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L518)

Always `refund`.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:542](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L542)

Why.

***

### status

> **status**: `"requested"` \| `"submitted"` \| `"confirmed"` \| `"failed"`

Defined in: [modules/payments/types.ts:522](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L522)

`requested` (waits for its transaction), `submitted`, `confirmed` or `failed`.

***

### to

> **to**: `string`

Defined in: [modules/payments/types.ts:536](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L536)

The payer's address: refunds go back to it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:538](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L538)

The refund transaction, once submitted.

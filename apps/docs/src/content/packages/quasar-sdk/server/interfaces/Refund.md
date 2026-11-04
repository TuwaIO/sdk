# Refund

Defined in: [modules/payments/types.ts:509](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L509)

A refund. You send it from your wallet; Quasar verifies the transaction and issues the credit note.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:519](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L519)

Amount in the invoice currency.

***

### assetId

> **assetId**: `string`

Defined in: [modules/payments/types.ts:527](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L527)

CAIP-19 asset to send.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:529](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L529)

CAIP-2 chain to send on.

***

### confirmedAt

> **confirmedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:547](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L547)

When it was confirmed.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:545](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L545)

When it was asked for.

***

### creditNoteNumber

> **creditNoteNumber**: `string` \| `null`

Defined in: [modules/payments/types.ts:541](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L541)

Its credit note, once confirmed.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:525](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L525)

Token amount to send, in base units.

***

### currency

> **currency**: `string`

Defined in: [modules/payments/types.ts:521](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L521)

Invoice currency.

***

### failureReason

> **failureReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:539](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L539)

Why it failed.

***

### from

> **from**: `string` \| `null`

Defined in: [modules/payments/types.ts:535](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L535)

The address it was sent from.

***

### heldTransfer

> **heldTransfer**: `string` \| `null`

Defined in: [modules/payments/types.ts:543](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L543)

The held transfer it returns to its sender ([HeldTransfer](/packages/quasar-sdk/server/interfaces/HeldTransfer.md)), or `null` for a refund of the invoice.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:511](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L511)

Refund ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:515](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L515)

The invoice.

***

### mode

> **mode**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:523](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L523)

How it was priced.

***

### object

> **object**: `"refund"`

Defined in: [modules/payments/types.ts:513](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L513)

Always `refund`.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:537](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L537)

Why.

***

### status

> **status**: `"requested"` \| `"submitted"` \| `"confirmed"` \| `"failed"`

Defined in: [modules/payments/types.ts:517](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L517)

`requested` (waits for its transaction), `submitted`, `confirmed` or `failed`.

***

### to

> **to**: `string`

Defined in: [modules/payments/types.ts:531](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L531)

The payer's address: refunds go back to it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:533](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L533)

The refund transaction, once submitted.

# InvoiceLedger

Defined in: [modules/payments/types.ts:470](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L470)

A page of an invoice ledger, oldest first, as [PaymentsModule.getEvents](/packages/quasar-sdk/server/classes/PaymentsModule.md#getevents) returns it.

## Properties

### data

> **data**: [`LedgerEvent`](/packages/quasar-sdk/server/interfaces/LedgerEvent.md)[]

Defined in: [modules/payments/types.ts:474](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L474)

The steps of the page.

***

### nextCursor

> **nextCursor**: `string` \| `null`

Defined in: [modules/payments/types.ts:478](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L478)

Pass it as `cursor` for the next page; `null` on the last page.

***

### object

> **object**: `"list"`

Defined in: [modules/payments/types.ts:472](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L472)

Always `list`.

***

### summary

> **summary**: [`LedgerSummary`](/packages/quasar-sdk/server/interfaces/LedgerSummary.md)

Defined in: [modules/payments/types.ts:480](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L480)

Who created the invoice and when its quote was locked and its receipt issued.

***

### total

> **total**: `number`

Defined in: [modules/payments/types.ts:476](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L476)

How many steps the whole ledger has.

***

### verification?

> `optional` **verification?**: [`LedgerVerification`](/packages/quasar-sdk/server/type-aliases/LedgerVerification.md)

Defined in: [modules/payments/types.ts:482](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L482)

The check of the whole chain, when asked for with `verify: true`.

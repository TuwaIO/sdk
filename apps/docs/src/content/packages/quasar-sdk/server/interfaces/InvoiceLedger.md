# InvoiceLedger

Defined in: [modules/payments/types.ts:475](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L475)

A page of an invoice ledger, oldest first, as [PaymentsModule.getEvents](/packages/quasar-sdk/server/classes/PaymentsModule.md#getevents) returns it.

## Properties

### data

> **data**: [`LedgerEvent`](/packages/quasar-sdk/server/interfaces/LedgerEvent.md)[]

Defined in: [modules/payments/types.ts:479](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L479)

The steps of the page.

***

### nextCursor

> **nextCursor**: `string` \| `null`

Defined in: [modules/payments/types.ts:483](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L483)

Pass it as `cursor` for the next page; `null` on the last page.

***

### object

> **object**: `"list"`

Defined in: [modules/payments/types.ts:477](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L477)

Always `list`.

***

### summary

> **summary**: [`LedgerSummary`](/packages/quasar-sdk/server/interfaces/LedgerSummary.md)

Defined in: [modules/payments/types.ts:485](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L485)

Who created the invoice and when its quote was locked and its receipt issued.

***

### total

> **total**: `number`

Defined in: [modules/payments/types.ts:481](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L481)

How many steps the whole ledger has.

***

### verification?

> `optional` **verification?**: [`LedgerVerification`](/packages/quasar-sdk/server/type-aliases/LedgerVerification.md)

Defined in: [modules/payments/types.ts:487](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L487)

The check of the whole chain, when asked for with `verify: true`.

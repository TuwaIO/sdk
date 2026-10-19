# InvoiceLedger

Defined in: modules/payments/types.ts:407

An invoice ledger, oldest first, as [PaymentsModule.getEvents](/packages/quasar-sdk/server/classes/PaymentsModule.md#getevents) returns it.

## Properties

### data

> **data**: [`LedgerEvent`](/packages/quasar-sdk/server/interfaces/LedgerEvent.md)[]

Defined in: modules/payments/types.ts:411

The steps.

***

### object

> **object**: `"list"`

Defined in: modules/payments/types.ts:409

Always `list`.

***

### verification?

> `optional` **verification?**: [`LedgerVerification`](/packages/quasar-sdk/server/type-aliases/LedgerVerification.md)

Defined in: modules/payments/types.ts:413

The chain check, when asked for with `verify: true`.

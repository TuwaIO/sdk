# InvoiceLedger

Defined in: modules/payments/types.ts:443

An invoice ledger, oldest first, as [PaymentsModule.getEvents](/packages/quasar-sdk/server/classes/PaymentsModule.md#getevents) returns it.

## Properties

### data

> **data**: [`LedgerEvent`](/packages/quasar-sdk/server/interfaces/LedgerEvent.md)[]

Defined in: modules/payments/types.ts:447

The steps.

***

### object

> **object**: `"list"`

Defined in: modules/payments/types.ts:445

Always `list`.

***

### verification?

> `optional` **verification?**: [`LedgerVerification`](/packages/quasar-sdk/server/type-aliases/LedgerVerification.md)

Defined in: modules/payments/types.ts:449

The chain check, when asked for with `verify: true`.

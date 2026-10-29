# LedgerSummary

Defined in: [modules/payments/types.ts:445](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L445)

Who created an invoice and when its payment steps happened, whatever page of its ledger is read.

## Properties

### createdBy

> **createdBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:447](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L447)

The actor of the first step (`invoice.issued`).

***

### stepTimes

> **stepTimes**: `object`

Defined in: [modules/payments/types.ts:449](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L449)

When the first quote was locked and the receipt issued (ISO 8601); `null` before.

#### quoted

> **quoted**: `string` \| `null`

#### receipt

> **receipt**: `string` \| `null`

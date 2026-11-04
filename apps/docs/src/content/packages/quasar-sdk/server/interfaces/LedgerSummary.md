# LedgerSummary

Defined in: [modules/payments/types.ts:462](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L462)

Who created an invoice and when its payment steps happened, whatever page of its ledger is read.

## Properties

### createdBy

> **createdBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:464](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L464)

The actor of the first step (`invoice.issued`).

***

### stepTimes

> **stepTimes**: `object`

Defined in: [modules/payments/types.ts:466](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L466)

When the first quote was locked and the receipt issued (ISO 8601); `null` before.

#### quoted

> **quoted**: `string` \| `null`

#### receipt

> **receipt**: `string` \| `null`

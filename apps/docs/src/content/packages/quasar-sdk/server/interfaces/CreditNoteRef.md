# CreditNoteRef

Defined in: [modules/payments/types.ts:305](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L305)

A credit note of an invoice.

## Properties

### issuedAt

> **issuedAt**: `string`

Defined in: [modules/payments/types.ts:311](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L311)

When it was issued.

***

### number

> **number**: `string`

Defined in: [modules/payments/types.ts:307](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L307)

Its number.

***

### refundId

> **refundId**: `string` \| `null`

Defined in: [modules/payments/types.ts:309](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L309)

The refund it credits; `null` for the credit note of a correction.

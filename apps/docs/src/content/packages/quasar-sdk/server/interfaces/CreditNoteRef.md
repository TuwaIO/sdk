# CreditNoteRef

Defined in: [modules/payments/types.ts:338](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L338)

A credit note of an invoice.

## Properties

### issuedAt

> **issuedAt**: `string`

Defined in: [modules/payments/types.ts:344](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L344)

When it was issued.

***

### number

> **number**: `string`

Defined in: [modules/payments/types.ts:340](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L340)

Its number.

***

### refundId

> **refundId**: `string` \| `null`

Defined in: [modules/payments/types.ts:342](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L342)

The refund it credits; `null` for the credit note of a correction.

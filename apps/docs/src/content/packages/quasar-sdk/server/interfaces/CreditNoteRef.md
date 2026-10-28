# CreditNoteRef

Defined in: [modules/payments/types.ts:341](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L341)

A credit note of an invoice.

## Properties

### issuedAt

> **issuedAt**: `string`

Defined in: [modules/payments/types.ts:347](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L347)

When it was issued.

***

### number

> **number**: `string`

Defined in: [modules/payments/types.ts:343](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L343)

Its number.

***

### refundId

> **refundId**: `string` \| `null`

Defined in: [modules/payments/types.ts:345](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L345)

The refund it credits; `null` for the credit note of a correction.

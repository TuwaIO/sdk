# InvoiceAml

Defined in: [modules/payments/types.ts:235](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L235)

The payer's AML screening of an invoice.

## Properties

### coverage

> **coverage**: `string` \| `null`

Defined in: [modules/payments/types.ts:241](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L241)

What screened the payer, when known.

***

### reasons

> **reasons**: `string`[]

Defined in: [modules/payments/types.ts:239](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L239)

Why.

***

### status

> **status**: `string`

Defined in: [modules/payments/types.ts:237](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L237)

`passed`, `flagged`, `blocked` or `failed`.

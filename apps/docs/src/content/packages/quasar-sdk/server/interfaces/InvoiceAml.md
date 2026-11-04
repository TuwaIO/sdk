# InvoiceAml

Defined in: [modules/payments/types.ts:238](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L238)

The payer's AML screening of an invoice.

## Properties

### coverage

> **coverage**: `string` \| `null`

Defined in: [modules/payments/types.ts:244](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L244)

What screened the payer, when known.

***

### reasons

> **reasons**: `string`[]

Defined in: [modules/payments/types.ts:242](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L242)

Why.

***

### status

> **status**: `string`

Defined in: [modules/payments/types.ts:240](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L240)

`passed`, `flagged`, `blocked` or `failed`.

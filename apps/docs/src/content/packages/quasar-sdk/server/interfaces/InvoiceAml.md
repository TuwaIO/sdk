# InvoiceAml

Defined in: [modules/payments/types.ts:202](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L202)

The payer's AML screening of an invoice.

## Properties

### coverage

> **coverage**: `string` \| `null`

Defined in: [modules/payments/types.ts:208](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L208)

What screened the payer, when known.

***

### reasons

> **reasons**: `string`[]

Defined in: [modules/payments/types.ts:206](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L206)

Why.

***

### status

> **status**: `string`

Defined in: [modules/payments/types.ts:204](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L204)

`passed`, `flagged`, `blocked` or `failed`.

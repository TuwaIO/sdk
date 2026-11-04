# InvoiceAml

Defined in: [modules/payments/types.ts:246](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L246)

The payer's AML screening of an invoice.

## Properties

### coverage

> **coverage**: `string` \| `null`

Defined in: [modules/payments/types.ts:252](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L252)

What screened the payer, when known.

***

### reasons

> **reasons**: `string`[]

Defined in: [modules/payments/types.ts:250](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L250)

Why.

***

### status

> **status**: `string`

Defined in: [modules/payments/types.ts:248](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L248)

`passed`, `flagged`, `blocked` or `failed`.

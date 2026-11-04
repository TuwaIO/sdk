# InvoiceAml

Defined in: [modules/payments/types.ts:243](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L243)

The payer's AML screening of an invoice.

## Properties

### coverage

> **coverage**: `string` \| `null`

Defined in: [modules/payments/types.ts:249](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L249)

What screened the payer, when known.

***

### reasons

> **reasons**: `string`[]

Defined in: [modules/payments/types.ts:247](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L247)

Why.

***

### status

> **status**: `string`

Defined in: [modules/payments/types.ts:245](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L245)

`passed`, `flagged`, `blocked` or `failed`.

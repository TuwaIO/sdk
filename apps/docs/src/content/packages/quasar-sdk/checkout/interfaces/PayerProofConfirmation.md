# PayerProofConfirmation

Defined in: [checkout/types.ts:356](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L356)

What `POST payer-proof` answers: the wallet's confirmation of the invoice, as Quasar recorded it.

## Properties

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:366](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L366)

The CAIP-2 network it confirmed on.

***

### confirmedAt

> **confirmedAt**: `string`

Defined in: [checkout/types.ts:368](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L368)

When.

***

### kind

> **kind**: [`PayerProofKind`](/packages/quasar-sdk/checkout/type-aliases/PayerProofKind.md)

Defined in: [checkout/types.ts:364](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L364)

How it confirmed.

***

### object

> **object**: `"payer_proof"`

Defined in: [checkout/types.ts:358](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L358)

Always `payer_proof`.

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:360](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L360)

The wallet, as a CAIP-10 account.

***

### proven

> **proven**: `true`

Defined in: [checkout/types.ts:362](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L362)

Always `true`.

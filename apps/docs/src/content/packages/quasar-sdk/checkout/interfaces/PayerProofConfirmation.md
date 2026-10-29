# PayerProofConfirmation

Defined in: [checkout/types.ts:347](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L347)

What `POST payer-proof` answers: the wallet's confirmation of the invoice, as Quasar recorded it.

## Properties

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:357](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L357)

The CAIP-2 network it confirmed on.

***

### confirmedAt

> **confirmedAt**: `string`

Defined in: [checkout/types.ts:359](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L359)

When.

***

### kind

> **kind**: [`PayerProofKind`](/packages/quasar-sdk/checkout/type-aliases/PayerProofKind.md)

Defined in: [checkout/types.ts:355](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L355)

How it confirmed.

***

### object

> **object**: `"payer_proof"`

Defined in: [checkout/types.ts:349](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L349)

Always `payer_proof`.

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:351](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L351)

The wallet, as a CAIP-10 account.

***

### proven

> **proven**: `true`

Defined in: [checkout/types.ts:353](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L353)

Always `true`.

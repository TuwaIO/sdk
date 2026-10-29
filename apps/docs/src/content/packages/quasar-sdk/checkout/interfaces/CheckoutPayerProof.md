# CheckoutPayerProof

Defined in: [checkout/types.ts:317](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L317)

A wallet that confirmed the invoice ([CheckoutView.payerProofs](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md#payerproofs)).

## Properties

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:323](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L323)

The CAIP-2 network it confirmed on: the only one where an `eip1271` or `eip6492` confirmation counts.

***

### confirmedAt

> **confirmedAt**: `string`

Defined in: [checkout/types.ts:325](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L325)

When.

***

### kind

> **kind**: [`PayerProofKind`](/packages/quasar-sdk/checkout/type-aliases/PayerProofKind.md)

Defined in: [checkout/types.ts:321](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L321)

How it confirmed.

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:319](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L319)

The wallet, as a CAIP-10 account on the network it confirmed on (the EVM address checksummed).

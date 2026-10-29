# CheckoutPayerProof

Defined in: [checkout/types.ts:308](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L308)

A wallet that confirmed the invoice ([CheckoutView.payerProofs](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md#payerproofs)).

## Properties

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:314](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L314)

The CAIP-2 network it confirmed on: the only one where an `eip1271` or `eip6492` confirmation counts.

***

### confirmedAt

> **confirmedAt**: `string`

Defined in: [checkout/types.ts:316](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L316)

When.

***

### kind

> **kind**: [`PayerProofKind`](/packages/quasar-sdk/checkout/type-aliases/PayerProofKind.md)

Defined in: [checkout/types.ts:312](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L312)

How it confirmed.

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:310](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L310)

The wallet, as a CAIP-10 account on the network it confirmed on (the EVM address checksummed).

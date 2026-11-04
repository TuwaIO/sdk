# InvoiceWalletConfirmation

Defined in: [modules/payments/types.ts:402](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L402)

What a wallet signed to confirm an invoice: the evidence that this wallet pays it.

## Properties

### account

> **account**: `string`

Defined in: [modules/payments/types.ts:404](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L404)

The wallet, as a CAIP-10 account on the network it signed on.

***

### at

> **at**: `string`

Defined in: [modules/payments/types.ts:421](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L421)

When it was confirmed.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:411](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L411)

CAIP-2 chain ID it signed on.

***

### domain

> **domain**: `string` \| `null`

Defined in: [modules/payments/types.ts:417](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L417)

The domain the message names.

***

### kind

> **kind**: `string`

Defined in: [modules/payments/types.ts:409](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L409)

How it confirmed: `eoa`, `eip1271` and `eip6492` signed an EIP-4361 message; `authorization` signed the EIP-3009
authorization of a relayed payment.

***

### message

> **message**: `string` \| `null`

Defined in: [modules/payments/types.ts:415](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L415)

The EIP-4361 message it signed; `null` for an authorization.

***

### nonce

> **nonce**: `string` \| `null`

Defined in: [modules/payments/types.ts:419](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L419)

The nonce the message names.

***

### signature

> **signature**: `string` \| `null`

Defined in: [modules/payments/types.ts:413](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L413)

The signature.

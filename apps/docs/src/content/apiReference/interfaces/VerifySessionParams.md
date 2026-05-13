[**@tuwaio/quasar-sdk**](../README.md)

***

# VerifySessionParams

Defined in: [packages/quasar-sdk/src/types.ts:201](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L201)

Parameters for verifying a mini-session signature.

## Extends

- `Omit`\<[`MiniSessionAuth`](MiniSessionAuth.md), `"walletAddress"`\>

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:192](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L192)

The blockchain ecosystem type.

#### Inherited from

[`MiniSessionAuth`](MiniSessionAuth.md).[`chainType`](MiniSessionAuth.md#chaintype)

***

### maxAge?

> `optional` **maxAge?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:208](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L208)

Maximum allowed age for the signature in milliseconds.
Default: 5 minutes (300,000ms).

***

### signature

> **signature**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:188](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L188)

The cryptographic signature (hex for EVM, base58 for Solana).

#### Inherited from

[`MiniSessionAuth`](MiniSessionAuth.md).[`signature`](MiniSessionAuth.md#signature)

***

### timestamp

> **timestamp**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:190](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L190)

ISO string timestamp used in the signed message.

#### Inherited from

[`MiniSessionAuth`](MiniSessionAuth.md).[`timestamp`](MiniSessionAuth.md#timestamp)

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:203](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L203)

The wallet address that allegedly signed the message.

[**@tuwaio/quasar-sdk**](../README.md)

***

# MiniSessionAuth

Defined in: [packages/quasar-sdk/src/types.ts:97](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L97)

Result of the Mini-Session signing process.
Used for both frontend-side caching and backend-side verification.

## Extends

- [`SignSessionResult`](SignSessionResult.md)

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:99](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L99)

The blockchain ecosystem type.

***

### signature

> **signature**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:87](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L87)

The cryptographic signature string.

#### Inherited from

[`SignSessionResult`](SignSessionResult.md).[`signature`](SignSessionResult.md#signature)

***

### timestamp

> **timestamp**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:89](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L89)

The ISO timestamp used to generate the message.

#### Inherited from

[`SignSessionResult`](SignSessionResult.md).[`timestamp`](SignSessionResult.md#timestamp)

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:101](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L101)

The wallet address that signed the message.

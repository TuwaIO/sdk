[**@tuwaio/quasar-sdk**](../README.md)

***

# VerifySessionParams

Defined in: [packages/quasar-sdk/src/types.ts:108](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L108)

Parameters for verifying a mini-session signature.

## Extends

- `Omit`\<[`MiniSessionAuth`](MiniSessionAuth.md), `"walletAddress"`\>

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:99](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L99)

The blockchain ecosystem type.

#### Inherited from

[`MiniSessionAuth`](MiniSessionAuth.md).[`chainType`](MiniSessionAuth.md#chaintype)

***

### maxAge?

> `optional` **maxAge?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:112](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L112)

Maximum allowed age for the signature in milliseconds. Defaults to 5 minutes.

***

### signature

> **signature**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:87](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L87)

The cryptographic signature string.

#### Inherited from

[`SignSessionResult`](SignSessionResult.md).[`signature`](SignSessionResult.md#signature)

***

### timestamp

> **timestamp**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:89](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L89)

The ISO timestamp used to generate the message.

#### Inherited from

[`SignSessionResult`](SignSessionResult.md).[`timestamp`](SignSessionResult.md#timestamp)

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:110](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L110)

The wallet address that allegedly signed the message.

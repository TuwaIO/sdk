[**@tuwaio/quasar-sdk**](../README.md)

***

# SignSessionParams

Defined in: [packages/quasar-sdk/src/types.ts:162](https://github.com/TuwaIO/sdk/blob/c8c0c68c647cef31269582c4fb618dd3cd0fb3ab/packages/quasar-sdk/src/types.ts#L162)

Parameters for signing a mini-session message.

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:168](https://github.com/TuwaIO/sdk/blob/c8c0c68c647cef31269582c4fb618dd3cd0fb3ab/packages/quasar-sdk/src/types.ts#L168)

The blockchain ecosystem type.

***

### signer

> **signer**: [`EvmSigner`](EvmSigner.md) \| [`SolanaSigner`](SolanaSigner.md)

Defined in: [packages/quasar-sdk/src/types.ts:164](https://github.com/TuwaIO/sdk/blob/c8c0c68c647cef31269582c4fb618dd3cd0fb3ab/packages/quasar-sdk/src/types.ts#L164)

The signer object for the respective ecosystem.

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:166](https://github.com/TuwaIO/sdk/blob/c8c0c68c647cef31269582c4fb618dd3cd0fb3ab/packages/quasar-sdk/src/types.ts#L166)

The wallet address to sign with.

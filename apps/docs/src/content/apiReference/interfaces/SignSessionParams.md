[**@tuwaio/quasar-sdk**](../README.md)

***

# SignSessionParams

Defined in: [packages/quasar-sdk/src/types.ts:162](https://github.com/TuwaIO/sdk/blob/1767f6d4f51dcad5c4d9c96710812f8cce304dac/packages/quasar-sdk/src/types.ts#L162)

Parameters for signing a mini-session message.

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:168](https://github.com/TuwaIO/sdk/blob/1767f6d4f51dcad5c4d9c96710812f8cce304dac/packages/quasar-sdk/src/types.ts#L168)

The blockchain ecosystem type.

***

### signer

> **signer**: [`EvmSigner`](EvmSigner.md) \| [`SolanaSigner`](SolanaSigner.md)

Defined in: [packages/quasar-sdk/src/types.ts:164](https://github.com/TuwaIO/sdk/blob/1767f6d4f51dcad5c4d9c96710812f8cce304dac/packages/quasar-sdk/src/types.ts#L164)

The signer object for the respective ecosystem.

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:166](https://github.com/TuwaIO/sdk/blob/1767f6d4f51dcad5c4d9c96710812f8cce304dac/packages/quasar-sdk/src/types.ts#L166)

The wallet address to sign with.

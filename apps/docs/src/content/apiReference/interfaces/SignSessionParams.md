[**@tuwaio/quasar-sdk**](../README.md)

***

# SignSessionParams

Defined in: [packages/quasar-sdk/src/types.ts:160](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L160)

Parameters for signing a mini-session message.

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:166](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L166)

The blockchain ecosystem type.

***

### signer

> **signer**: [`EvmSigner`](EvmSigner.md) \| [`SolanaSigner`](SolanaSigner.md)

Defined in: [packages/quasar-sdk/src/types.ts:162](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L162)

The signer object for the respective ecosystem.

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:164](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L164)

The wallet address to sign with.

[**@tuwaio/quasar-sdk**](../README.md)

***

# SignSessionParams

Defined in: [packages/quasar-sdk/src/types.ts:160](https://github.com/TuwaIO/sdk/blob/481db453690902aaac0d162605083e3cd1fe6605/packages/quasar-sdk/src/types.ts#L160)

Parameters for signing a mini-session message.

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:166](https://github.com/TuwaIO/sdk/blob/481db453690902aaac0d162605083e3cd1fe6605/packages/quasar-sdk/src/types.ts#L166)

The blockchain ecosystem type.

***

### signer

> **signer**: [`EvmSigner`](EvmSigner.md) \| [`SolanaSigner`](SolanaSigner.md)

Defined in: [packages/quasar-sdk/src/types.ts:162](https://github.com/TuwaIO/sdk/blob/481db453690902aaac0d162605083e3cd1fe6605/packages/quasar-sdk/src/types.ts#L162)

The signer object for the respective ecosystem.

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:164](https://github.com/TuwaIO/sdk/blob/481db453690902aaac0d162605083e3cd1fe6605/packages/quasar-sdk/src/types.ts#L164)

The wallet address to sign with.

[**@tuwaio/quasar-sdk**](../README.md)

***

# ConnectionData

Defined in: [packages/quasar-sdk/src/types.ts:189](https://github.com/TuwaIO/sdk/blob/f3a29c6eaa2493eeeb3b3df737591b68959113ae/packages/quasar-sdk/src/types.ts#L189)

Minimum connection data required for Mini-Session signing.

## Properties

### address

> **address**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:193](https://github.com/TuwaIO/sdk/blob/f3a29c6eaa2493eeeb3b3df737591b68959113ae/packages/quasar-sdk/src/types.ts#L193)

The active wallet address.

***

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:195](https://github.com/TuwaIO/sdk/blob/f3a29c6eaa2493eeeb3b3df737591b68959113ae/packages/quasar-sdk/src/types.ts#L195)

The blockchain ecosystem type.

***

### isConnected

> **isConnected**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:191](https://github.com/TuwaIO/sdk/blob/f3a29c6eaa2493eeeb3b3df737591b68959113ae/packages/quasar-sdk/src/types.ts#L191)

Whether a wallet is currently connected.

***

### signer

> **signer**: [`EvmSigner`](EvmSigner.md) \| [`SolanaSigner`](SolanaSigner.md)

Defined in: [packages/quasar-sdk/src/types.ts:197](https://github.com/TuwaIO/sdk/blob/f3a29c6eaa2493eeeb3b3df737591b68959113ae/packages/quasar-sdk/src/types.ts#L197)

The wallet signer object.

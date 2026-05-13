[**@tuwaio/quasar-sdk**](../README.md)

***

# ConnectionData

Defined in: [packages/quasar-sdk/src/types.ts:187](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L187)

Minimum connection data required for Mini-Session signing.

## Properties

### address

> **address**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:191](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L191)

The active wallet address.

***

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:193](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L193)

The blockchain ecosystem type.

***

### isConnected

> **isConnected**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:189](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L189)

Whether a wallet is currently connected.

***

### signer

> **signer**: [`EvmSigner`](EvmSigner.md) \| [`SolanaSigner`](SolanaSigner.md)

Defined in: [packages/quasar-sdk/src/types.ts:195](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/types.ts#L195)

The wallet signer object.

[**@tuwaio/quasar-sdk**](../README.md)

***

# ConnectionData

Defined in: [packages/quasar-sdk/src/types.ts:189](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/types.ts#L189)

Minimum connection data required for Mini-Session signing.

## Properties

### address

> **address**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:193](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/types.ts#L193)

The active wallet address.

***

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:195](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/types.ts#L195)

The blockchain ecosystem type.

***

### isConnected

> **isConnected**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:191](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/types.ts#L191)

Whether a wallet is currently connected.

***

### signer

> **signer**: [`EvmSigner`](EvmSigner.md) \| [`SolanaSigner`](SolanaSigner.md)

Defined in: [packages/quasar-sdk/src/types.ts:197](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/types.ts#L197)

The wallet signer object.

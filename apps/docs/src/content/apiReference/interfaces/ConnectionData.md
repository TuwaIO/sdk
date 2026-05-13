[**@tuwaio/quasar-sdk**](../README.md)

***

# ConnectionData

Defined in: [packages/quasar-sdk/src/types.ts:241](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L241)

Minimum connection data required for Mini-Session signing.

## Properties

### address

> **address**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:245](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L245)

The active wallet address.

***

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:247](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L247)

The blockchain ecosystem type.

***

### isConnected

> **isConnected**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:243](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L243)

Whether a wallet is currently connected.

***

### signer

> **signer**: `any`

Defined in: [packages/quasar-sdk/src/types.ts:249](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L249)

The wallet signer object (WalletClient for EVM, TransactionSendingSigner for Solana).

[**@tuwaio/quasar-sdk**](../README.md)

***

# SignSessionParams

Defined in: [packages/quasar-sdk/src/utils/auth.ts:52](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L52)

Parameters for signing a mini-session message.

## Properties

### chainType

> **chainType**: `"evm"` \| `"solana"`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:58](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L58)

The blockchain ecosystem type.

***

### signer

> **signer**: `any`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:54](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L54)

The signer object. For EVM, a `WalletClient`. For Solana, a `KeyPairSigner` or `TransactionSendingSigner`.

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:56](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L56)

The wallet address to sign with (required for EVM).

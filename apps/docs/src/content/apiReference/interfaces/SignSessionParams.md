[**@tuwaio/quasar-sdk**](../README.md)

***

# SignSessionParams

Defined in: [packages/quasar-sdk/src/types.ts:215](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L215)

Parameters for signing a mini-session message.

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:221](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L221)

The blockchain ecosystem type.

***

### signer

> **signer**: `any`

Defined in: [packages/quasar-sdk/src/types.ts:217](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L217)

The signer object. For EVM, a `WalletClient`. For Solana, a `KeyPairSigner` or `TransactionSendingSigner`.

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:219](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L219)

The wallet address to sign with (required for EVM).

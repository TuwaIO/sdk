[**@tuwaio/quasar-sdk**](../README.md)

***

# SignSessionParams

Defined in: [packages/quasar-sdk/src/utils/auth.ts:58](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L58)

Parameters for signing a mini-session message.

## Properties

### chainType

> **chainType**: `"evm"` \| `"solana"`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:64](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L64)

The blockchain ecosystem type.

***

### signer

> **signer**: `any`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:60](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L60)

The signer object. For EVM, a `WalletClient`. For Solana, a `KeyPairSigner` or `TransactionSendingSigner`.

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:62](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L62)

The wallet address to sign with (required for EVM).

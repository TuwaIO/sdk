[**@tuwaio/quasar-sdk**](../README.md)

***

# VerifySessionParams

Defined in: [packages/quasar-sdk/src/utils/auth.ts:9](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L9)

Parameters for verifying a mini-session signature.

## Properties

### chainType

> **chainType**: `"evm"` \| `"solana"`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:17](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L17)

The blockchain ecosystem type.

***

### signature

> **signature**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:15](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L15)

The cryptographic signature (hex for EVM, base58 for Solana).

***

### timestamp

> **timestamp**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:13](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L13)

ISO string timestamp matching the one used in the message.

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:11](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L11)

The wallet address that allegedly signed the message.

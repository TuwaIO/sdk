[**@tuwaio/quasar-sdk**](../README.md)

***

# MiniSessionAuth

Defined in: [packages/quasar-sdk/src/types.ts:186](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L186)

Result of the Mini-Session signing process.
Used for both frontend-side caching and backend-side verification.

## Properties

### chainType

> **chainType**: [`ChainType`](../enumerations/ChainType.md)

Defined in: [packages/quasar-sdk/src/types.ts:192](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L192)

The blockchain ecosystem type.

***

### signature

> **signature**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:188](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L188)

The cryptographic signature (hex for EVM, base58 for Solana).

***

### timestamp

> **timestamp**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:190](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L190)

ISO string timestamp used in the signed message.

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:194](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L194)

The wallet address that signed the message.

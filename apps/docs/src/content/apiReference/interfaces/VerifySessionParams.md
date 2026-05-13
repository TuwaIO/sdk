[**@tuwaio/quasar-sdk**](../README.md)

***

# VerifySessionParams

Defined in: [packages/quasar-sdk/src/utils/auth.ts:9](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L9)

Parameters for verifying a mini-session signature.

## Properties

### chainType

> **chainType**: `"evm"` \| `"solana"`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:17](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L17)

The blockchain ecosystem type.

***

### maxAge?

> `optional` **maxAge?**: `number`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:22](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L22)

Maximum allowed age for the signature in milliseconds.
Default: 5 minutes (300,000ms).

***

### signature

> **signature**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:15](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L15)

The cryptographic signature (hex for EVM, base58 for Solana).

***

### timestamp

> **timestamp**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:13](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L13)

ISO string timestamp matching the one used in the message.

***

### walletAddress

> **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:11](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L11)

The wallet address that allegedly signed the message.

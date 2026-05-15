[**@tuwaio/quasar-sdk**](../README.md)

***

# EvmSigner

Defined in: [packages/quasar-sdk/src/types.ts:119](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L119)

Interface for an EVM signer (compatible with Viem WalletClient).

## Properties

### signMessage

> **signMessage**: (`params`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/quasar-sdk/src/types.ts:121](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L121)

Signs a message using the specified account.

#### Parameters

##### params

###### account

`` `0x${string}` ``

###### message

`string`

#### Returns

`Promise`\<`` `0x${string}` ``\>

[**@tuwaio/quasar-sdk**](../README.md)

***

# EvmSigner

Defined in: [packages/quasar-sdk/src/types.ts:119](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L119)

Interface for an EVM signer (compatible with Viem WalletClient).

## Properties

### signMessage

> **signMessage**: (`params`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/quasar-sdk/src/types.ts:121](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L121)

Signs a message using the specified account.

#### Parameters

##### params

###### account

`` `0x${string}` ``

###### message

`string`

#### Returns

`Promise`\<`` `0x${string}` ``\>

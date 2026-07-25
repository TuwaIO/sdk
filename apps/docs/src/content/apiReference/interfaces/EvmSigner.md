[**@tuwaio/quasar-sdk**](../README.md)

***

# EvmSigner

Defined in: [packages/quasar-sdk/src/types.ts:119](https://github.com/TuwaIO/sdk/blob/2e1cd54fd6d1ec5ae29683660aead9c50c2a5711/packages/quasar-sdk/src/types.ts#L119)

Interface for an EVM signer (compatible with Viem WalletClient).

## Properties

### signMessage

> **signMessage**: (`params`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/quasar-sdk/src/types.ts:121](https://github.com/TuwaIO/sdk/blob/2e1cd54fd6d1ec5ae29683660aead9c50c2a5711/packages/quasar-sdk/src/types.ts#L121)

Signs a message using the specified account.

#### Parameters

##### params

###### account

`` `0x${string}` ``

###### message

`string`

#### Returns

`Promise`\<`` `0x${string}` ``\>

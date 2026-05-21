[**@tuwaio/quasar-sdk**](../README.md)

***

# EvmSigner

Defined in: [packages/quasar-sdk/src/types.ts:119](https://github.com/TuwaIO/sdk/blob/d96af45cd4a786670c62b88065c8a4c12b36d113/packages/quasar-sdk/src/types.ts#L119)

Interface for an EVM signer (compatible with Viem WalletClient).

## Properties

### signMessage

> **signMessage**: (`params`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/quasar-sdk/src/types.ts:121](https://github.com/TuwaIO/sdk/blob/d96af45cd4a786670c62b88065c8a4c12b36d113/packages/quasar-sdk/src/types.ts#L121)

Signs a message using the specified account.

#### Parameters

##### params

###### account

`` `0x${string}` ``

###### message

`string`

#### Returns

`Promise`\<`` `0x${string}` ``\>

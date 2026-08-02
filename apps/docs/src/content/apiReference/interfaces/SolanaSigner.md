[**@tuwaio/quasar-sdk**](../README.md)

***

# SolanaSigner

Defined in: [packages/quasar-sdk/src/types.ts:140](https://github.com/TuwaIO/sdk/blob/c3b3fedb1fd51716c9b397e4cf78d8cd632c5196/packages/quasar-sdk/src/types.ts#L140)

Interface for a Solana signer.
Optimized to handle modern Web3 v2 (MessageModifyingSigner), Standard, and Legacy interfaces.

## Properties

### address

> `readonly` **address**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:142](https://github.com/TuwaIO/sdk/blob/c3b3fedb1fd51716c9b397e4cf78d8cd632c5196/packages/quasar-sdk/src/types.ts#L142)

The public address of the signer.

***

### modifyAndSignMessages?

> `optional` **modifyAndSignMessages?**: (`messages`) => `Promise`\<readonly [`SolanaSignableMessage`](SolanaSignableMessage.md)[]\>

Defined in: [packages/quasar-sdk/src/types.ts:147](https://github.com/TuwaIO/sdk/blob/c3b3fedb1fd51716c9b397e4cf78d8cd632c5196/packages/quasar-sdk/src/types.ts#L147)

Modern Web3 v2 method to modify and sign messages.
Used by latest @solana/react hooks.

#### Parameters

##### messages

readonly [`SolanaSignableMessage`](SolanaSignableMessage.md)[]

#### Returns

`Promise`\<readonly [`SolanaSignableMessage`](SolanaSignableMessage.md)[]\>

***

### signMessage?

> `optional` **signMessage?**: (`message`) => `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [packages/quasar-sdk/src/types.ts:155](https://github.com/TuwaIO/sdk/blob/c3b3fedb1fd51716c9b397e4cf78d8cd632c5196/packages/quasar-sdk/src/types.ts#L155)

Singular signing method (Legacy).

#### Parameters

##### message

`Uint8Array`

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

***

### signMessages?

> `optional` **signMessages?**: (`messages`) => `Promise`\<readonly `object`[]\>

Defined in: [packages/quasar-sdk/src/types.ts:151](https://github.com/TuwaIO/sdk/blob/c3b3fedb1fd51716c9b397e4cf78d8cd632c5196/packages/quasar-sdk/src/types.ts#L151)

Plural signing method (Wallet Standard).

#### Parameters

##### messages

readonly `Uint8Array`\<`ArrayBufferLike`\>[]

#### Returns

`Promise`\<readonly `object`[]\>

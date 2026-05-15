[**@tuwaio/quasar-sdk**](../README.md)

***

# SolanaSigner

Defined in: [packages/quasar-sdk/src/types.ts:138](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L138)

Interface for a Solana signer.
Optimized to handle modern Web3 v2 (MessageModifyingSigner), Standard, and Legacy interfaces.

## Properties

### address

> `readonly` **address**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:140](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L140)

The public address of the signer.

***

### modifyAndSignMessages?

> `optional` **modifyAndSignMessages?**: (`messages`) => `Promise`\<readonly [`SolanaSignedMessage`](SolanaSignedMessage.md)[]\>

Defined in: [packages/quasar-sdk/src/types.ts:145](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L145)

Modern Web3 v2 method to modify and sign messages.
Used by latest @solana/react hooks.

#### Parameters

##### messages

readonly `unknown`[]

#### Returns

`Promise`\<readonly [`SolanaSignedMessage`](SolanaSignedMessage.md)[]\>

***

### signMessage?

> `optional` **signMessage?**: (`message`) => `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [packages/quasar-sdk/src/types.ts:153](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L153)

Singular signing method (Legacy).

#### Parameters

##### message

`Uint8Array`

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

***

### signMessages?

> `optional` **signMessages?**: (`messages`) => `Promise`\<readonly `object`[]\>

Defined in: [packages/quasar-sdk/src/types.ts:149](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L149)

Plural signing method (Wallet Standard).

#### Parameters

##### messages

readonly `Uint8Array`\<`ArrayBufferLike`\>[]

#### Returns

`Promise`\<readonly `object`[]\>

[**@tuwaio/quasar-sdk**](../README.md)

***

# SolanaSignableMessage

Defined in: [packages/quasar-sdk/src/types.ts:128](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L128)

Result structure for a signed Solana message in Web3 v2.

## Properties

### content

> `readonly` **content**: `Uint8Array`

Defined in: [packages/quasar-sdk/src/types.ts:130](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L130)

The content of the message as bytes.

***

### signatures

> `readonly` **signatures**: `Readonly`\<`Record`\<`string`, `Uint8Array`\>\>

Defined in: [packages/quasar-sdk/src/types.ts:132](https://github.com/TuwaIO/sdk/blob/89fd3c44f22f8e38e48f19240dbe515f6e35eb6d/packages/quasar-sdk/src/types.ts#L132)

A map of public addresses to their corresponding signature bytes.

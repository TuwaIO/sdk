# PulsarPoolStore\<T\>

Defined in: modules/pulsar/batches.ts:16

The part of a Pulsar store that [watchBatchHashes](/packages/quasar-sdk/server/functions/watchBatchHashes.md) reads: the store returned by `createPulsarStore` of
`@tuwaio/pulsar-core` has it.

## Type Parameters

### T

`T` *extends* `Transaction`

The transaction type of the store.

## Properties

### getState

> **getState**: () => `object`

Defined in: modules/pulsar/batches.ts:18

Returns the current state of the store.

#### Returns

`object`

##### transactionsPool

> **transactionsPool**: `Record`\<`string`, `T`\>

***

### subscribe

> **subscribe**: (`listener`) => () => `void`

Defined in: modules/pulsar/batches.ts:20

Calls `listener` with the new state on every change; returns the function that removes it.

#### Parameters

##### listener

(`state`) => `void`

#### Returns

() => `void`

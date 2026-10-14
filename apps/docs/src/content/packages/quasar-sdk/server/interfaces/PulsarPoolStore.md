# PulsarPoolStore\<T\>

Defined in: [modules/pulsar/batches.ts:16](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/pulsar/batches.ts#L16)

The part of a Pulsar store that [watchBatchHashes](/packages/quasar-sdk/server/functions/watchBatchHashes.md) reads: the store returned by `createPulsarStore` of
`@tuwaio/pulsar-core` has it.

## Type Parameters

### T

`T` *extends* `Transaction`

The transaction type of the store.

## Properties

### getState

> **getState**: () => `object`

Defined in: [modules/pulsar/batches.ts:18](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/pulsar/batches.ts#L18)

Returns the current state of the store.

#### Returns

`object`

##### transactionsPool

> **transactionsPool**: `Record`\<`string`, `T`\>

***

### subscribe

> **subscribe**: (`listener`) => () => `void`

Defined in: [modules/pulsar/batches.ts:20](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/pulsar/batches.ts#L20)

Calls `listener` with the new state on every change; returns the function that removes it.

#### Parameters

##### listener

(`state`) => `void`

#### Returns

() => `void`

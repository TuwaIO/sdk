# watchBatchHashes()

> **watchBatchHashes**\<`T`\>(`store`, `onHash`): () => `void`

Defined in: [modules/pulsar/batches.ts:44](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/pulsar/batches.ts#L44)

Watches a Pulsar store for EIP-5792 batches whose transaction became known and calls `onHash` once for each, so the
app can send the hash to Quasar with `PulsarModule.syncHash` (through a Server Action, since that call needs the
secret key). A batch is reported once Quasar has it (`syncStatus: 'synced'`) and Pulsar wrote its `hash`; batches
created more than an hour ago are skipped, because Quasar no longer waits for them. When `onHash` rejects, the batch
is reported again on the next change of the store.

Side effects: subscribes to the store until the returned function is called; keeps the reported batch IDs in memory.

## Type Parameters

### T

`T` *extends* `Transaction`

## Parameters

### store

[`PulsarPoolStore`](/packages/quasar-sdk/server/interfaces/PulsarPoolStore.md)\<`T`\>

The Pulsar store, for example the one `createPulsarStore` returns.

### onHash

(`tx`) => `void` \| `Promise`\<`void`\>

Called with each batch and its hash; return its promise so a failure is retried.

## Returns

A function that stops watching.

() => `void`

## Example

```ts
import { watchBatchHashes } from '@tuwaio/quasar-sdk';

// In the browser, next to the store; `syncBatchHash` is a Server Action that calls `quasar.pulsar.syncHash`
const stop = watchBatchHashes(pulsarStore, (tx) => syncBatchHash(tx.txKey, tx.hash));
```

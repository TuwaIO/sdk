/**
 * @file Hashes of EIP-5792 batches, read from a Pulsar store in the browser.
 */

import { type Transaction, TransactionTracker } from '@tuwaio/pulsar-core';

/** How long Quasar waits for the hash of a batch; older batches are no longer reported. */
const BATCH_HASH_WINDOW_SECONDS = 60 * 60;

/**
 * The part of a Pulsar store that {@link watchBatchHashes} reads: the store returned by `createPulsarStore` of
 * `@tuwaio/pulsar-core` has it.
 *
 * @typeParam T - The transaction type of the store.
 */
export interface PulsarPoolStore<T extends Transaction> {
  /** Returns the current state of the store. */
  getState: () => { transactionsPool: Record<string, T> };
  /** Calls `listener` with the new state on every change; returns the function that removes it. */
  subscribe: (listener: (state: { transactionsPool: Record<string, T> }) => void) => () => void;
}

/**
 * Watches a Pulsar store for EIP-5792 batches whose transaction became known and calls `onHash` once for each, so the
 * app can send the hash to Quasar with `PulsarModule.syncHash` (through a Server Action, since that call needs the
 * secret key). A batch is reported once Quasar has it (`syncStatus: 'synced'`) and Pulsar wrote its `hash`; batches
 * created more than an hour ago are skipped, because Quasar no longer waits for them. When `onHash` rejects, the batch
 * is reported again on the next change of the store.
 *
 * Side effects: subscribes to the store until the returned function is called; keeps the reported batch IDs in memory.
 *
 * @param store - The Pulsar store, for example the one `createPulsarStore` returns.
 * @param onHash - Called with each batch and its hash; return its promise so a failure is retried.
 * @returns A function that stops watching.
 *
 * @example
 * ```ts
 * import { watchBatchHashes } from '@tuwaio/quasar-sdk';
 *
 * // In the browser, next to the store; `syncBatchHash` is a Server Action that calls `quasar.pulsar.syncHash`
 * const stop = watchBatchHashes(pulsarStore, (tx) => syncBatchHash(tx.txKey, tx.hash));
 * ```
 */
export function watchBatchHashes<T extends Transaction>(
  store: PulsarPoolStore<T>,
  onHash: (tx: T & { hash: `0x${string}` }) => void | Promise<void>,
): () => void {
  const reported = new Set<string>();

  const report = (pool: Record<string, T>) => {
    const oldest = Math.floor(Date.now() / 1000) - BATCH_HASH_WINDOW_SECONDS;
    for (const tx of Object.values(pool)) {
      const hash = (tx as { hash?: `0x${string}` }).hash;
      if (tx.tracker !== TransactionTracker.EIP5792 || !hash) continue;
      if (tx.syncStatus === 'pending-sync' || tx.localTimestamp < oldest) continue;
      const key = `${tx.txKey}:${hash}`;
      if (reported.has(key)) continue;
      reported.add(key);
      try {
        Promise.resolve(onHash({ ...tx, hash })).catch(() => reported.delete(key));
      } catch {
        reported.delete(key);
      }
    }
  };

  report(store.getState().transactionsPool);
  return store.subscribe((state) => report(state.transactionsPool));
}

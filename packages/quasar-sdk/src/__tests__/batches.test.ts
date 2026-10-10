import { afterEach, describe, expect, it, vi } from 'vitest';

import { QuasarClient } from '../core/client';
import { pulsarSyncHashEndpoint, Quasar, type Transaction, TransactionTracker, watchBatchHashes } from '../index';

const HASH = `0x${'ab'.repeat(32)}` as const;
const now = () => Math.floor(Date.now() / 1000);

/** A store with the shape of a Pulsar store: its pool, a listener per subscriber, and a way to change the pool. */
function fakeStore(pool: Record<string, Partial<Transaction>>) {
  let state = { transactionsPool: pool as Record<string, Transaction> };
  const listeners = new Set<(s: typeof state) => void>();
  return {
    getState: () => state,
    subscribe: (listener: (s: typeof state) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set(next: Record<string, Partial<Transaction>>) {
      state = { transactionsPool: next as Record<string, Transaction> };
      listeners.forEach((listener) => listener(state));
    },
  };
}

const batch = (overrides: Partial<Transaction> & Record<string, unknown> = {}) =>
  ({
    txKey: 'batch-1',
    tracker: TransactionTracker.EIP5792,
    adapter: 'evm',
    syncStatus: 'synced',
    localTimestamp: now(),
    ...overrides,
  }) as Partial<Transaction>;

describe('EIP-5792 batches', () => {
  afterEach(() => vi.restoreAllMocks());

  it('sends the hash of a batch to its sync endpoint', async () => {
    const request = vi
      .spyOn(QuasarClient.prototype, 'request')
      .mockResolvedValue({ success: true, txKey: 'batch/1', hash: HASH });
    const quasar = new Quasar({ secretKey: 'sk_test_1' });

    await quasar.pulsar.syncHash('batch/1', HASH);

    expect(pulsarSyncHashEndpoint('batch/1')).toBe('/v1/engine/pulsar/sync/batch%2F1/hash');
    expect(request).toHaveBeenCalledWith('/v1/engine/pulsar/sync/batch%2F1/hash', {
      method: 'POST',
      body: { hash: HASH },
    });
  });

  it('reports each synced batch once, when the wallet gave it the hash of its transaction', async () => {
    const store = fakeStore({ 'batch-1': batch() });
    const onHash = vi.fn().mockResolvedValue(undefined);
    const stop = watchBatchHashes(store, onHash);

    // Still waiting for its transaction
    expect(onHash).not.toHaveBeenCalled();
    store.set({ 'batch-1': batch({ hash: HASH }) });
    store.set({ 'batch-1': batch({ hash: HASH, pending: false }) });
    await Promise.resolve();
    expect(onHash).toHaveBeenCalledTimes(1);
    expect(onHash).toHaveBeenCalledWith(expect.objectContaining({ txKey: 'batch-1', hash: HASH }));

    stop();
    store.set({ 'batch-2': batch({ txKey: 'batch-2', hash: HASH }) });
    expect(onHash).toHaveBeenCalledTimes(1);
  });

  it('waits until Quasar has the batch, skips other trackers and batches older than an hour', async () => {
    const store = fakeStore({
      tx: {
        txKey: 'tx',
        tracker: TransactionTracker.Ethereum,
        hash: HASH,
        localTimestamp: now(),
      } as Partial<Transaction>,
      old: batch({ txKey: 'old', hash: HASH, localTimestamp: now() - 3601 }),
      unsynced: batch({ txKey: 'unsynced', hash: HASH, syncStatus: 'pending-sync' }),
    });
    const onHash = vi.fn().mockResolvedValue(undefined);
    watchBatchHashes(store, onHash);
    expect(onHash).not.toHaveBeenCalled();

    store.set({ unsynced: batch({ txKey: 'unsynced', hash: HASH, syncStatus: 'synced' }) });
    expect(onHash).toHaveBeenCalledTimes(1);
  });

  it('tries a batch again on the next change of the pool when reporting it failed', async () => {
    const store = fakeStore({ 'batch-1': batch({ hash: HASH }) });
    const onHash = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined);
    watchBatchHashes(store, onHash);
    await new Promise((resolve) => setTimeout(resolve, 0));

    store.set({ 'batch-1': batch({ hash: HASH, pending: false }) });
    expect(onHash).toHaveBeenCalledTimes(2);
  });
});

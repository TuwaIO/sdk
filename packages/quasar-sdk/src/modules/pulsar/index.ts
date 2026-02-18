/**
 * @module modules/pulsar
 * @description Pulsar Transaction Engine module.
 * Provides methods for syncing transaction states to the Quasar Cloud
 * and retrieving paginated transaction history.
 */

import type { QuasarClient } from '../../core/client';
import type { HistoryQuery, PaginatedResult, Transaction, UpdatableTransactionFields } from '../../types';

/**
 * Pulsar module — the transaction engine interface for Quasar Cloud.
 *
 * Handles all operations related to blockchain transaction lifecycle:
 * creating, updating, and querying transactions through the API.
 *
 * @remarks
 * Access this module via `quasar.pulsar` after initializing the SDK.
 * All methods authenticate automatically using the configured secret key.
 *
 * @example
 * ```typescript
 * const quasar = new Quasar({ secretKey: 'sk_live_...' });
 *
 * // Create
 * const { txKey } = await quasar.pulsar.syncCreate(transaction);
 *
 * // Update
 * await quasar.pulsar.syncUpdate(txKey, { status: 'confirmed' });
 *
 * // Read
 * const history = await quasar.pulsar.getHistory({ chainId: 1 });
 * ```
 */
export class PulsarModule {
  /**
   * Creates a new PulsarModule instance.
   *
   * @param client - The internal {@link QuasarClient} instance for making authenticated API calls.
   * @internal
   */
  constructor(private readonly client: QuasarClient) {}

  /**
   * Syncs a newly created pending transaction to the Quasar Cloud.
   *
   * Sends the full transaction object to the `tx-sync` endpoint via POST.
   * The server assigns a unique `txKey` that can be used for subsequent updates.
   *
   * @param tx - The complete transaction object to sync.
   * @returns An object containing `success: true` and the assigned `txKey`.
   * @throws {QuasarSDKError} On authentication failure, validation error, or network issue.
   *
   * @example
   * ```typescript
   * const { txKey } = await quasar.pulsar.syncCreate({
   *   hash: '0xabc...',
   *   chainId: 1,
   *   status: 'pending',
   *   from: '0x123...',
   *   to: '0x456...',
   * });
   * ```
   */
  async syncCreate(tx: Transaction): Promise<{ success: true; txKey: string }> {
    return this.client.request('/api/v1/engine/tx-sync', {
      method: 'POST',
      body: tx,
    });
  }

  /**
   * Updates an existing transaction's status or mutable fields.
   *
   * Sends a PATCH request to the `tx-sync` endpoint with the transaction key
   * and the fields to update.
   *
   * @param txKey - The unique transaction key assigned by Quasar during {@link syncCreate}.
   * @param patches - An object containing the fields to update (e.g. `status`, `blockNumber`).
   * @returns An object containing `success: true` on successful update.
   * @throws {QuasarSDKError} On authentication failure, invalid txKey, or network issue.
   *
   * @example
   * ```typescript
   * await quasar.pulsar.syncUpdate('tx_abc123', {
   *   status: 'confirmed',
   * });
   * ```
   */
  async syncUpdate(txKey: string, patches: UpdatableTransactionFields): Promise<{ success: true }> {
    return this.client.request('/api/v1/engine/tx-sync', {
      method: 'PATCH',
      body: { txKey, ...patches },
    });
  }

  /**
   * Retrieves paginated transaction history from the Quasar Cloud.
   *
   * Supports filtering by chain ID, status, and specific transaction key.
   * Returns a typed {@link PaginatedResult} with navigation metadata.
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns A paginated result containing an array of {@link Transaction} documents.
   * @throws {QuasarSDKError} On authentication failure or network issue.
   *
   * @example
   * ```typescript
   * const result = await quasar.pulsar.getHistory({
   *   page: 1,
   *   limit: 20,
   *   chainId: 1,
   *   status: 'confirmed',
   * });
   *
   * for (const tx of result.docs) {
   *   console.log(tx.hash, tx.status);
   * }
   * ```
   */
  async getHistory(query: HistoryQuery = {}): Promise<PaginatedResult<Transaction>> {
    return this.client.request('/api/v1/engine/txs-history', {
      method: 'GET',
      query: {
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        chainId: query.chainId,
        status: query.status,
        txKey: query.txKey,
      },
    });
  }
}

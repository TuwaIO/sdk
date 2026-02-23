/**
 * @module modules/pulsar
 * @description Pulsar Transaction Engine module.
 * Provides methods for syncing transaction states to the Quasar Cloud
 * and retrieving paginated transaction history.
 */

import { PULSAR_HISTORY_ENDPOINT, PULSAR_SYNC_ENDPOINT } from '../../constants';
import type { QuasarClient } from '../../core/client';
import type { HistoryQuery, PaginatedResult, Transaction } from '../../types';

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
   * @param appName - The application name for filtering by.
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
  async syncCreate(tx: Transaction, appName?: string): Promise<{ success: true; txKey: string }> {
    return this.client.request(PULSAR_SYNC_ENDPOINT, {
      method: 'POST',
      body: {
        ...tx,
        appName,
      },
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
    return this.client.request(PULSAR_HISTORY_ENDPOINT, {
      method: 'GET',
      query: {
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        chainId: query.chainId,
        status: query.status,
        txKey: query.txKey,
        appName: query.appName,
      },
    });
  }
}

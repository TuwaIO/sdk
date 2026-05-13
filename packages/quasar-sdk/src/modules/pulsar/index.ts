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
 * The `PulsarModule` handles the lifecycle of blockchain transactions within the Quasar ecosystem.
 * It allows developers to sync transaction states (EVM, Solana, Starknet) to the cloud for
 * persistent tracking and to retrieve comprehensive transaction histories.
 *
 * @remarks
 * Access this module via `quasar.pulsar` after initializing the {@link Quasar} SDK.
 * All methods are authenticated automatically using the configured secret key.
 *
 * @example
 * ```typescript
 * const quasar = new Quasar({ secretKey: 'sk_live_...' });
 *
 * // Sync a new transaction to start tracking
 * const { txKey } = await quasar.pulsar.syncCreate(transaction);
 *
 * // Retrieve transaction history with filters
 * const history = await quasar.pulsar.getHistory({
 *   chainId: 1,
 *   status: 'Success',
 * });
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
   * Syncs a newly created or pending transaction to the Quasar Cloud.
   *
   * This method sends the full transaction object to the Pulsar sync engine.
   * Once synced, the transaction is indexed and tracked through the Iron Dome infrastructure.
   *
   * @param tx - The complete transaction object to sync. Must conform to the {@link Transaction} type.
   * @param appName - Optional application name to associate with this transaction for filtering purposes.
   * @returns A promise that resolves to an object containing the assigned `txKey`.
   * @throws {QuasarSDKError} If the request fails due to authentication, validation, or network issues.
   *
   * @example
   * ```typescript
   * const result = await quasar.pulsar.syncCreate({
   *   hash: '0xabc...',
   *   chainId: 1,
   *   status: 'pending',
   *   from: '0x123...',
   *   to: '0x456...',
   *   // ... other transaction fields
   * }, 'My Dashboard');
   *
   * console.log(result.txKey); // The unique key for this transaction
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
   * Retrieves a paginated list of transactions from the Quasar Cloud.
   *
   * Supports advanced filtering by chain, status, wallet address, and more.
   * Results are returned in a typed {@link PaginatedResult} wrapper.
   *
   * @param query - Optional query parameters for filtering and pagination. See {@link HistoryQuery}.
   * @returns A promise that resolves to a {@link PaginatedResult} containing an array of {@link Transaction} documents.
   * @throws {QuasarSDKError} If the request fails (e.g., 401 Unauthorized, 404 Not Found).
   *
   * @example
   * ```typescript
   * const result = await quasar.pulsar.getHistory({
   *   page: 1,
   *   limit: 20,
   *   walletAddress: '6x...',
   * });
   *
   * result.docs.forEach(tx => console.log(tx.txKey, tx.status));
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
        walletAddress: query.walletAddress,
      },
    });
  }
}

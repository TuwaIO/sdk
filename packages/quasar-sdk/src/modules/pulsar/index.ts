/**
 * @file Pulsar module of the Quasar client: transaction sync and history.
 */

import { PULSAR_HISTORY_ENDPOINT, PULSAR_SYNC_ENDPOINT } from '../../constants';
import type { QuasarClient } from '../../core/client';
import type { HistoryQuery, PaginatedResult, Transaction } from '../../types';

/**
 * Transaction sync and history of the Quasar API, available as `quasar.pulsar` on a {@link Quasar} client. Quasar
 * tracks every synced transaction on the server until it reaches a final status, so the status survives a closed tab,
 * and returns the history of your app for any device.
 *
 * @example
 * ```ts
 * import { Quasar, type Transaction } from '@tuwaio/quasar-sdk';
 *
 * const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });
 *
 * // Called by the `onRemoteCreate` callback of the Pulsar store (through a Server Action) with the new transaction.
 * export async function syncTransaction(tx: Transaction) {
 *   const { txKey } = await quasar.pulsar.syncCreate(tx, 'my-app');
 *   return txKey;
 * }
 * ```
 */
export class PulsarModule {
  /**
   * Creates the module. The {@link Quasar} client creates it for you.
   *
   * @param client - The HTTP client of the Quasar client.
   * @internal
   */
  constructor(private readonly client: QuasarClient) {}

  /**
   * Sends a new Pulsar transaction to Quasar, which starts tracking it on the server (`POST /v1/engine/pulsar/sync`).
   * Sending a transaction with a `txKey` that Quasar already has does not create a second record: the response has
   * `duplicate: true`.
   *
   * @param tx - The transaction created by Pulsar, as passed to `onRemoteCreate` of `createPulsarStore`.
   * @param appName - Application name saved with the transaction; filter the history by it with `appName`.
   * @returns `txKey` of the transaction and the tracking `mode`: `fast` (tracked right away) or `lazy` (queued, for
   *   example when the quota of the organization is used up).
   * @throws {QuasarSDKError} On an invalid transaction (400), an invalid key (401, 403), a timeout or a network error.
   */
  async syncCreate(
    tx: Transaction,
    appName?: string,
  ): Promise<{ success: true; txKey: string; mode: 'fast' | 'lazy'; duplicate?: true }> {
    return this.client.request(PULSAR_SYNC_ENDPOINT, {
      method: 'POST',
      body: {
        ...tx,
        appName,
      },
    });
  }

  /**
   * Reads the transactions of your app, newest first (`GET /v1/engine/pulsar/history`).
   *
   * @param query - Filters and pagination. `walletAddress` is compared with the sender address exactly as it was
   *   synced; the API returns at most 100 transactions per page.
   * @returns One page of transactions.
   * @throws {QuasarSDKError} On an invalid key (401, 403), a timeout or a network error.
   *
   * @example
   * ```ts
   * const page = await quasar.pulsar.getHistory({ walletAddress: '0x...', page: 1, limit: 20 });
   * page.docs.forEach((tx) => console.log(tx.txKey, tx.status));
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

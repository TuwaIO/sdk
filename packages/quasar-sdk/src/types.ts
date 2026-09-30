/**
 * @file Configuration, query and response types of the Quasar client, and the Pulsar transaction types it syncs.
 */

/**
 * Options of the {@link Quasar} client.
 */
export interface QuasarConfig {
  /**
   * Secret key of your Quasar app (`sk_live_...` for a live app, `sk_test_...` for a test app), sent in the
   * `x-tuwa-secret-key` header of every request. Keep it on the server.
   */
  secretKey: string;
  /**
   * Secret of the internal endpoints of a Quasar deployment, sent in the `x-internal-secret` header when set. The
   * Quasar dashboard uses it to call its own server; apps leave it unset.
   */
  internalSecret?: string;
  /** Base URL of the Quasar API: Quasar Cloud or your self-hosted server. Defaults to {@link BASE_API_URL}. */
  baseUrl?: string;
  /** Request timeout in milliseconds. Defaults to `10000`. */
  timeout?: number;
}

/**
 * Filters and pagination of {@link PulsarModule.getHistory}. Every filter is optional; the API returns the
 * transactions of your app that match all given filters.
 */
export interface HistoryQuery {
  /** Page number, starting at 1. Defaults to `1`. */
  page?: number;
  /** Number of transactions per page. Defaults to `10`. */
  limit?: number;
  /** Chain of the transactions: an EVM chain ID (`1`) or a Solana cluster (`'mainnet'`). */
  chainId?: string | number;
  /** Final status of the transactions (`'Success'`, `'Failed'` or `'Replaced'`, see `TransactionStatus`). */
  status?: string;
  /** Key of one transaction (`txKey` of the Pulsar transaction). */
  txKey?: string;
  /** Application name that was passed to {@link PulsarModule.syncCreate}. */
  appName?: string;
  /** Address of the wallet that sent the transactions. */
  walletAddress?: string;
}

/**
 * One page of results.
 *
 * @typeParam T - Type of the documents on the page.
 */
export interface PaginatedResult<T> {
  /** Documents of the current page. */
  docs: T[];
  /** Number of documents that match the query. */
  totalDocs: number;
  /** Number of pages. */
  totalPages: number;
  /** Current page number, starting at 1. */
  page: number;
  /** Whether a next page exists. */
  hasNextPage: boolean;
  /** Whether a previous page exists. */
  hasPrevPage: boolean;
}

export type { Transaction, UpdatableTransactionFields } from '@tuwaio/pulsar-core';
export { TransactionStatus, TransactionTracker } from '@tuwaio/pulsar-core';

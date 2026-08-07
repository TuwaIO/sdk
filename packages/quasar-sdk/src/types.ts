/**
 * @module types
 * @description Shared type definitions for the Quasar SDK.
 * Contains configuration interfaces, query parameters, and authentication structures.
 */

import type { Transaction, UpdatableTransactionFields } from '@tuwaio/pulsar-core';

/**
 * Configuration options for initializing the {@link Quasar} SDK client.
 *
 * @public
 */
export interface QuasarConfig {
  /** Your secret API key starting with `sk_live_`. */
  secretKey: string;
  /** Optional internal secret for system-to-system communication. */
  internalSecret?: string;
  /** The base URL of the Quasar Cloud API. Defaults to 'https://api.tuwa.io'. */
  baseUrl?: string;
  /** Request timeout in milliseconds. Defaults to 10000. */
  timeout?: number;
}

/**
 * Query parameters for filtering and paginating transaction history.
 *
 * @public
 */
export interface HistoryQuery {
  /** Page number for pagination (1-indexed). */
  page?: number;
  /** Maximum number of results to return per page. */
  limit?: number;
  /** Filter by blockchain chain ID (e.g., 1, 'solana'). */
  chainId?: string | number;
  /** Filter by transaction status (e.g., 'Success', 'Failed'). */
  status?: string;
  /** Filter by a specific Quasar transaction key. */
  txKey?: string;
  /** Filter by the application name. */
  appName?: string;
  /** Filter by the sender's wallet address. */
  walletAddress?: string;
}

/**
 * Generic wrapper for paginated API responses.
 *
 * @typeParam T - The type of the documents contained in the result set.
 * @public
 */
export interface PaginatedResult<T> {
  /** Array of documents for the current page. */
  docs: T[];
  /** Total number of documents matching the query. */
  totalDocs: number;
  /** Total number of available pages. */
  totalPages: number;
  /** The current page number (1-indexed). */
  page: number;
  /** Indicates if a subsequent page is available. */
  hasNextPage: boolean;
  /** Indicates if a preceding page is available. */
  hasPrevPage: boolean;
}

export type { Transaction, UpdatableTransactionFields };

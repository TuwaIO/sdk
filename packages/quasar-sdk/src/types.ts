import type { Transaction, UpdatableTransactionFields } from '@tuwaio/pulsar-core';

export interface QuasarConfig {
  /**
   * Your secret API key starting with 'sk_live_'.
   * This MUST be kept secure on the server side.
   */
  secretKey: string;

  /**
   * The base URL of the Quasar API.
   * Defaults to 'https://api.tuwa.io' (or your production URL).
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds.
   * Defaults to 10000ms.
   */
  timeout?: number;
}

export interface HistoryQuery {
  page?: number;
  limit?: number;
  chainId?: string | number;
  status?: string;
  txKey?: string;
}

export interface PaginatedResult<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Re-export for easier access by SDK consumers
export type { Transaction, UpdatableTransactionFields };

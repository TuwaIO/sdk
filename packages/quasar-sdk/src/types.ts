/**
 * @module types
 * @description Shared type definitions for the Quasar SDK.
 * Contains configuration interfaces, query parameters, paginated result structure,
 * and re-exports from `@tuwaio/pulsar-core`.
 */

import type { Transaction, UpdatableTransactionFields } from '@tuwaio/pulsar-core';

/**
 * Configuration options for initializing the {@link Quasar} SDK client.
 *
 * @example
 * ```typescript
 * const config: QuasarConfig = {
 *   secretKey: 'sk_live_abc123...',
 *   baseUrl: 'https://api.tuwa.io',
 *   timeout: 15000,
 * };
 * ```
 */
export interface QuasarConfig {
  /**
   * Your secret API key starting with `sk_live_`.
   *
   * @remarks
   * This key authenticates every request through the Iron Dome security perimeter.
   * It **MUST** be kept secure on the server side — never expose it in client bundles.
   */
  secretKey: string;

  /**
   * The base URL of the Quasar Cloud API.
   *
   * @defaultValue `'https://api.tuwa.io'`
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds.
   *
   * @defaultValue `10000`
   */
  timeout?: number;
}

/**
 * Query parameters for filtering transaction history.
 *
 * All fields are optional — omitted fields apply no filter.
 *
 * @example
 * ```typescript
 * const query: HistoryQuery = {
 *   page: 2,
 *   limit: 25,
 *   chainId: 1,
 *   status: 'confirmed',
 * };
 * ```
 */
export interface HistoryQuery {
  /**
   * Page number for pagination (1-indexed).
   *
   * @defaultValue `1`
   */
  page?: number;

  /**
   * Maximum number of results per page.
   *
   * @defaultValue `10`
   */
  limit?: number;

  /**
   * Filter by blockchain chain ID (e.g. `1` for Ethereum Mainnet, `'solana'` for Solana).
   */
  chainId?: string | number;

  /**
   * Filter by transaction status (e.g. `'pending'`, `'confirmed'`, `'failed'`).
   */
  status?: string;

  /**
   * Filter by a specific transaction key (unique identifier assigned by Quasar).
   */
  txKey?: string;
}

/**
 * Generic wrapper for paginated API responses.
 *
 * @typeParam T - The type of each document in the result set.
 *
 * @example
 * ```typescript
 * const result: PaginatedResult<Transaction> = await quasar.pulsar.getHistory();
 * console.log(result.docs);       // Transaction[]
 * console.log(result.totalPages);  // number
 * console.log(result.hasNextPage); // boolean
 * ```
 */
export interface PaginatedResult<T> {
  /** Array of documents for the current page. */
  docs: T[];

  /** Total number of documents matching the query across all pages. */
  totalDocs: number;

  /** Total number of available pages. */
  totalPages: number;

  /** Current page number (1-indexed). */
  page: number;

  /** Whether a subsequent page exists. */
  hasNextPage: boolean;

  /** Whether a previous page exists. */
  hasPrevPage: boolean;
}

/**
 * Re-exported `Transaction` type from `@tuwaio/pulsar-core`.
 *
 * Represents the full transaction object used across the TUWA ecosystem.
 * Supports EVM, Solana, and StarkNet transaction variants.
 */
export type { Transaction };

/**
 * Re-exported `UpdatableTransactionFields` type from `@tuwaio/pulsar-core`.
 *
 * A subset of `Transaction` fields that can be patched via `syncUpdate`.
 */
export type { UpdatableTransactionFields };

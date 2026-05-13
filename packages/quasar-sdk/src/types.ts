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
 * @public
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
   * It **MUST** be kept secure on the server side — never expose it in client-side bundles
   * as it grants full access to your organization's Quasar data.
   */
  secretKey: string;

  /**
   * Optional internal secret sent as `x-internal-secret` header on every request.
   *
   * @remarks
   * This is used for system-to-system communication between TUWA internal services.
   * Most third-party developers do not need to provide this.
   */
  internalSecret?: string;

  /**
   * The base URL of the Quasar Cloud API.
   *
   * @defaultValue `'https://api.tuwa.io'`
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds for all API calls.
   *
   * @defaultValue `10000` (10 seconds)
   */
  timeout?: number;
}

/**
 * Query parameters for filtering and paginating transaction history.
 *
 * All fields are optional. When omitted, no filtering is applied to that field.
 *
 * @public
 * @example
 * ```typescript
 * const query: HistoryQuery = {
 *   page: 1,
 *   limit: 10,
 *   chainId: 1,           // Ethereum Mainnet
 *   status: 'Success',    // Only successful transactions
 *   appName: 'Tuwa App',  // Filter by application
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
   * Maximum number of results to return per page.
   *
   * @defaultValue `10`
   */
  limit?: number;

  /**
   * Filter by blockchain chain ID.
   *
   * @example `1` (Ethereum), `'solana'`, `'SN_MAIN'` (Starknet)
   */
  chainId?: string | number;

  /**
   * Filter by transaction status.
   *
   * @example `'pending'`, `'Success'`, `'Failed'`, `'Replaced'`
   */
  status?: string;

  /**
   * Filter by a specific unique transaction key assigned by Quasar.
   */
  txKey?: string;

  /**
   * Filter by the application name that synced the transaction.
   */
  appName?: string;

  /**
   * Filter by the sender's wallet address.
   */
  walletAddress?: string;
}

/**
 * Generic wrapper for paginated API responses.
 *
 * @typeParam T - The type of the documents contained in the result set.
 *
 * @public
 * @example
 * ```typescript
 * const result: PaginatedResult<Transaction> = await quasar.pulsar.getHistory();
 *
 * console.log(`Showing page ${result.page} of ${result.totalPages}`);
 * console.log(`Total transactions found: ${result.totalDocs}`);
 * ```
 */
export interface PaginatedResult<T> {
  /** Array of documents for the current page. */
  docs: T[];

  /** Total number of documents matching the query across all pages. */
  totalDocs: number;

  /** Total number of available pages based on the limit. */
  totalPages: number;

  /** The current page number (1-indexed). */
  page: number;

  /** Indicates if a subsequent page of results is available. */
  hasNextPage: boolean;

  /** Indicates if a preceding page of results is available. */
  hasPrevPage: boolean;
}

/**
 * Re-exported `Transaction` type from `@tuwaio/pulsar-core`.
 *
 * Represents a unified blockchain transaction object used across the TUWA ecosystem.
 * It is a discriminated union of EVM, Solana, and Starknet transactions.
 *
 * @see {@link OrbitAdapter} for the discriminator field.
 */
export type { Transaction };

/**
 * Re-exported `UpdatableTransactionFields` type from `@tuwaio/pulsar-core`.
 *
 * A subset of {@link Transaction} fields that were intended for manual patches.
 * @internal
 */
export type { UpdatableTransactionFields };

/**
 * Supported blockchain ecosystems for authentication.
 * @public
 */
export enum ChainType {
  EVM = 'EVM',
  SOLANA = 'SOLANA',
}

/**
 * Result of the Mini-Session signing process.
 * Used for both frontend-side caching and backend-side verification.
 * @public
 */
export interface MiniSessionAuth {
  /** The cryptographic signature (hex for EVM, base58 for Solana). */
  signature: string;
  /** ISO string timestamp used in the signed message. */
  timestamp: string;
  /** The blockchain ecosystem type. */
  chainType: ChainType;
  /** The wallet address that signed the message. */
  walletAddress: string;
}

/**
 * Parameters for verifying a mini-session signature.
 * @public
 */
export interface VerifySessionParams extends Omit<MiniSessionAuth, 'walletAddress'> {
  /** The wallet address that allegedly signed the message. */
  walletAddress: string;
  /**
   * Maximum allowed age for the signature in milliseconds.
   * Default: 5 minutes (300,000ms).
   */
  maxAge?: number;
}

/**
 * Parameters for signing a mini-session message.
 * @public
 */
export interface SignSessionParams {
  /** The signer object. For EVM, a `WalletClient`. For Solana, a `KeyPairSigner` or `TransactionSendingSigner`. */
  signer: any;
  /** The wallet address to sign with (required for EVM). */
  walletAddress?: string;
  /** The blockchain ecosystem type. */
  chainType: ChainType;
}

/**
 * Zustand store interface for managing Mini-Sessions.
 * @public
 */
export interface MiniSessionStore {
  /** Current active session or null. */
  miniSession: MiniSessionAuth | null;
  /** Sets the active session. */
  setMiniSession: (session: MiniSessionAuth | null) => void;
  /** Clears the current session. */
  clearSession: () => void;
}

/**
 * Minimum connection data required for Mini-Session signing.
 * @public
 */
export interface ConnectionData {
  /** Whether a wallet is currently connected. */
  isConnected: boolean;
  /** The active wallet address. */
  address: string;
  /** The blockchain ecosystem type. */
  chainType: ChainType;
  /** The wallet signer object (WalletClient for EVM, TransactionSendingSigner for Solana). */
  signer: any;
}

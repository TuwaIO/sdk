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

/**
 * Supported blockchain ecosystems for authentication.
 * @public
 */
export enum ChainType {
  /** Ethereum and compatible L2s. */
  EVM = 'EVM',
  /** Solana blockchain. */
  SOLANA = 'SOLANA',
}

/**
 * Result structure for a signed message.
 * @public
 */
export interface SignSessionResult {
  /** The cryptographic signature string. */
  signature: string;
  /** The ISO timestamp used to generate the message. */
  timestamp: string;
}

/**
 * Result of the Mini-Session signing process.
 * Used for both frontend-side caching and backend-side verification.
 * @public
 */
export interface MiniSessionAuth extends SignSessionResult {
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
  /** Maximum allowed age for the signature in milliseconds. Defaults to 5 minutes. */
  maxAge?: number;
}

/**
 * Interface for an EVM signer (compatible with Viem WalletClient).
 * @public
 */
export interface EvmSigner {
  /** Signs a message using the specified account. */
  signMessage: (params: { account: `0x${string}`; message: string }) => Promise<`0x${string}`>;
}

/**
 * Result structure for a signed Solana message in Web3 v2.
 * @public
 */
export interface SolanaSignedMessage {
  /** A map of public addresses to their corresponding signature bytes. */
  readonly signatures: Readonly<Record<string, Uint8Array>>;
}

/**
 * Interface for a Solana signer.
 * Optimized to handle modern Web3 v2 (MessageModifyingSigner), Standard, and Legacy interfaces.
 * @public
 */
export interface SolanaSigner {
  /** The public address of the signer. */
  readonly address: string;
  /**
   * Modern Web3 v2 method to modify and sign messages.
   * Used by latest @solana/react hooks.
   */
  modifyAndSignMessages?: (messages: readonly unknown[]) => Promise<readonly SolanaSignedMessage[]>;
  /**
   * Plural signing method (Wallet Standard).
   */
  signMessages?: (messages: readonly Uint8Array[]) => Promise<readonly { signature: Uint8Array }[]>;
  /**
   * Singular signing method (Legacy).
   */
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>;
}

/**
 * Parameters for signing a mini-session message.
 * @public
 */
export interface SignSessionParams {
  /** The signer object for the respective ecosystem. */
  signer: EvmSigner | SolanaSigner;
  /** The wallet address to sign with. */
  walletAddress: string;
  /** The blockchain ecosystem type. */
  chainType: ChainType;
}

/**
 * Interface for a store that manages Mini-Session persistence.
 * Designed to be compatible with Zustand.
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
  /** The wallet signer object. */
  signer: EvmSigner | SolanaSigner;
}

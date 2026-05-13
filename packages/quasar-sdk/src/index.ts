/**
 * @module @tuwaio/quasar-sdk
 * The official server-side Node.js & Edge SDK for the TUWA Quasar Cloud.
 *
 * Provides a type-safe client for interacting with the Quasar API,
 * including transaction syncing, status tracking, and history retrieval
 * through the Iron Dome security perimeter.
 *
 * @example
 * ```typescript
 * import { Quasar } from '@tuwaio/quasar-sdk';
 *
 * const quasar = new Quasar({ secretKey: 'sk_live_...' });
 * const history = await quasar.pulsar.getHistory({ chainId: 1 });
 * ```
 *
 * @packageDocumentation
 */

import { QuasarClient } from './core/client';
import { PulsarModule } from './modules/pulsar';
import { QuasarConfig } from './types';
import * as authUtils from './utils';

/**
 * Security and authentication utilities.
 *
 * Includes methods for creating, signing, and verifying Mini-Session signatures
 * to protect your API quota. These can be used without initializing the Quasar class.
 *
 * @public
 */
export const utils = {
  /**
   * Standardizes the message format for Quasar Mini-Session login.
   * @see {@link createMiniSessionMessage}
   */
  createMiniSessionMessage: authUtils.createMiniSessionMessage,

  /**
   * Verifies a Mini-Session signature (EVM or Solana).
   * @see {@link verifyMiniSession}
   */
  verifyMiniSession: authUtils.verifyMiniSession,

  /**
   * Triggers a signature request in the connected wallet.
   * @see {@link signMiniSession}
   */
  signMiniSession: authUtils.signMiniSession,
};

/**
 * Main entry point for the Quasar SDK.
 *
 * The `Quasar` class provides a unified interface for interacting with the Quasar Cloud API.
 * It handles authentication, base URL configuration, and exposes domain-specific modules
 * like {@link PulsarModule} for transaction management.
 *
 * @example
 * ```typescript
 * import { Quasar } from '@tuwaio/quasar-sdk';
 *
 * // Initialize with your secret API key
 * const quasar = new Quasar({
 *   secretKey: 'sk_live_your_secret_key',
 *   baseUrl: 'https://api.tuwa.io', // Optional
 *   timeout: 10000,                // Optional, default is 10s
 * });
 *
 * // Access domain-specific modules
 * const history = await quasar.pulsar.getHistory({ chainId: 1 });
 * ```
 *
 * @public
 */
export class Quasar {
  /**
   * Security and authentication utilities.
   * Shared across all instances and available statically.
   */
  public static readonly utils = utils;

  /**
   * The internal HTTP client used for authenticated requests.
   * @internal
   */
  private readonly client: QuasarClient;

  /**
   * The Pulsar Transaction Engine module.
   *
   * This module provides methods to sync transaction states to the Quasar Cloud
   * and retrieve indexed transaction history across multiple blockchain networks.
   *
   * @see {@link PulsarModule}
   */
  public readonly pulsar: PulsarModule;

  /**
   * Creates a new instance of the Quasar SDK.
   *
   * @param config - Configuration options for the SDK.
   * @throws {Error} If the `secretKey` is missing or invalid.
   *
   * @example
   * ```typescript
   * const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY! });
   * ```
   */
  constructor(config: QuasarConfig) {
    this.client = new QuasarClient(config);
    this.pulsar = new PulsarModule(this.client);
  }
}

export * from './constants';
export { QuasarSDKError } from './core/client';
export { PulsarModule } from './modules/pulsar';
export * from './types';
export * from './utils';

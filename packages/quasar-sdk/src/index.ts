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

import { useSiwxSessionStore } from '@tuwaio/siwx-react';

import { BASE_API_URL } from './constants';
import { QuasarClient } from './core/client';
import { PulsarModule } from './modules/pulsar';
import { QuasarConfig } from './types';

/**
 * Pre-flight check before initiating a transaction.
 * Ensures the local SIWX Session is valid and verifies Quasar Engine health.
 *
 * @param customApiUrl - Optional custom API URL to override the default.
 * @throws {Error} If the session check fails or Quasar is unreachable.
 *
 * @public
 */
export async function preFlightTxCheck(customApiUrl?: string): Promise<void> {
  // 1. Ensure a valid session exists
  const session = useSiwxSessionStore.getState().session;
  if (!session) {
    throw new Error('[QuasarSDK] No SIWX Session found. User must be signed in.');
  }

  // 2. Ping /v1/engine/health to verify Quasar Cloud is reachable
  const apiUrl = customApiUrl || BASE_API_URL;

  try {
    const res = await fetch(`${apiUrl}/v1/engine/monitoring/health`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`[QuasarSDK] API Health check failed with status: ${res.status}`);
    }
  } catch (error) {
    throw new Error('[QuasarSDK] Quasar Cloud Engine is currently unreachable.', { cause: error });
  }
}

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

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

/**
 * Main entry point for the Quasar SDK.
 *
 * Initializes the internal HTTP client with your secret key
 * and exposes domain-specific modules for interacting with the Quasar Cloud API.
 *
 * @example
 * ```typescript
 * import { Quasar } from '@tuwaio/quasar-sdk';
 *
 * const quasar = new Quasar({
 *   secretKey: 'sk_live_your_secret_key',
 *   baseUrl: 'https://api.tuwa.io',
 *   timeout: 15000,
 * });
 *
 * // Access the Pulsar transaction engine
 * const { txKey } = await quasar.pulsar.syncCreate(tx);
 * ```
 */
export class Quasar {
  /** @internal */
  private readonly client: QuasarClient;

  /**
   * The Pulsar Transaction Engine module.
   *
   * Use this to sync transaction states to the Quasar Cloud
   * and retrieve paginated transaction history.
   *
   * @see {@link PulsarModule}
   */
  public readonly pulsar: PulsarModule;

  /**
   * Creates a new Quasar SDK instance.
   *
   * @param config - SDK configuration. See {@link QuasarConfig} for available options.
   * @throws {Error} If `config.secretKey` is missing.
   */
  constructor(config: QuasarConfig) {
    this.client = new QuasarClient(config);
    this.pulsar = new PulsarModule(this.client);
  }
}

export { QuasarSDKError } from './core/client';
export { PulsarModule } from './modules/pulsar';
export * from './types';

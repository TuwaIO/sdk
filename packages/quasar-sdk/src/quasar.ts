/**
 * @file The `Quasar` client, the entry point of the Quasar API.
 */

import { QuasarClient } from './core/client';
import { PulsarModule } from './modules/pulsar';
import type { QuasarConfig } from './types';

/**
 * Client of the Quasar API (Quasar Cloud at `https://api.tuwa.io`, or a self-hosted Quasar server). Create it on the
 * server: it sends the secret key of your Quasar app with every request.
 *
 * @example
 * ```ts
 * import { Quasar } from '@tuwaio/quasar-sdk';
 *
 * const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });
 * const history = await quasar.pulsar.getHistory({ walletAddress: '0x...', limit: 20 });
 * ```
 */
export class Quasar {
  /**
   * The HTTP client shared by the modules.
   *
   * @internal
   */
  private readonly client: QuasarClient;

  /** Syncs Pulsar transactions to Quasar and reads their history. */
  public readonly pulsar: PulsarModule;

  /**
   * Creates the client. Sends no request.
   *
   * @param config - The secret key of the Quasar app and optional overrides.
   * @throws {Error} If `config.secretKey` is empty.
   */
  constructor(config: QuasarConfig) {
    this.client = new QuasarClient(config);
    this.pulsar = new PulsarModule(this.client);
  }
}

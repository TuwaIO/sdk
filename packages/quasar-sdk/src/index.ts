import { QuasarClient } from './core/client';
import { PulsarModule } from './modules/pulsar';
import { QuasarConfig } from './types';

export class Quasar {
  private readonly client: QuasarClient;

  /**
   * Access the Pulsar Transaction Engine.
   * Use this to sync transaction states and retrieve history.
   */
  public readonly pulsar: PulsarModule;

  constructor(config: QuasarConfig) {
    this.client = new QuasarClient(config);
    this.pulsar = new PulsarModule(this.client);
  }
}

export { QuasarSDKError } from './core/client';
export * from './types';

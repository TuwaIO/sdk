import { describe, expect, it } from 'vitest';

import * as novaConnect from '../nova-connect.js';
import * as orbit from '../orbit.js';
import * as pulsar from '../pulsar.js';
import * as satellite from '../satellite.js';
import * as siwx from '../siwx.js';

describe('Solana SDK Re-Exports', () => {
  it('re-exports Orbit Solana utilities', () => {
    expect(typeof orbit.createSolanaRPC).toBe('function');
    expect(typeof orbit.createSolanaClientWithCache).toBe('function');
    expect(typeof orbit.getSolanaExplorerLink).toBe('function');
  });

  it('re-exports Pulsar Solana adapters and trackers', () => {
    expect(typeof pulsar.pulsarSolanaAdapter).toBe('function');
    expect(typeof pulsar.solanaTrackerForStore).toBe('function');
    expect(typeof pulsar.signAndSendSolanaTx).toBe('function');
  });

  it('re-exports Satellite Solana connection adapters and watchers', () => {
    expect(typeof satellite.satelliteSolanaAdapter).toBe('function');
    expect(typeof satellite.createSolanaConnectionsWatcher).toBe('function');
  });

  it('re-exports Nova Connect Solana components', () => {
    expect(novaConnect.SolanaConnectorsWatcher).toBeDefined();
  });

  it('re-exports SIWX Solana signers and verifiers', () => {
    expect(typeof siwx.createSolanaSiwxSigner).toBe('function');
    expect(typeof siwx.verifyEd25519).toBe('function');
  });
});

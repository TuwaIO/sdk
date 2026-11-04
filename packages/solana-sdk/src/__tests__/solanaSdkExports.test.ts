import { readFileSync } from 'node:fs';

import * as sdkNovaConnect from '@tuwaio/sdk/nova-connect/solana';
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

  it('re-exports the Nova Connect entry point of @tuwaio/sdk, so both share one copy of Nova Connect', () => {
    expect(novaConnect.SolanaConnectorsWatcher).toBe(sdkNovaConnect.SolanaConnectorsWatcher);
  });

  it('registers the Solana chain helpers of Nova Connect when /nova-connect is imported', () => {
    // The registry of `@tuwaio/nova-connect` lives on `globalThis` under this global symbol.
    const registry = (globalThis as Record<symbol, unknown>)[Symbol.for('tuwaio.nova-connect.chainAdapters')];
    expect(registry).toBeInstanceOf(Map);
    expect((registry as Map<string, unknown>).has('solana')).toBe(true);
  });

  it('does not mark the package side-effect free, so bundlers keep the registration', () => {
    const pkg = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as Record<
      string,
      unknown
    >;
    expect(pkg.sideEffects).not.toBe(false);
  });

  it('re-exports Nova Connect Solana components', () => {
    expect(novaConnect.SolanaConnectorsWatcher).toBeDefined();
  });

  it('re-exports SIWX Solana signers and verifiers', () => {
    expect(typeof siwx.createSolanaSiwxSigner).toBe('function');
    expect(typeof siwx.verifyEd25519).toBe('function');
  });
});

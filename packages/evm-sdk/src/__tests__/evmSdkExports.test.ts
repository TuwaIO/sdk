import { describe, expect, it } from 'vitest';

import * as novaConnect from '../nova-connect.js';
import * as orbit from '../orbit.js';
import * as pulsar from '../pulsar.js';
import * as satellite from '../satellite.js';
import * as siwx from '../siwx.js';

describe('EVM SDK Re-Exports', () => {
  it('re-exports Orbit EVM utilities', () => {
    expect(typeof orbit.createViemClient).toBe('function');
    expect(typeof orbit.checkAndSwitchChain).toBe('function');
    expect(typeof orbit.createBundlerRpcClient).toBe('function');
  });

  it('re-exports Pulsar EVM adapters and trackers', () => {
    expect(typeof pulsar.pulsarEvmAdapter).toBe('function');
    expect(typeof pulsar.evmTrackerForStore).toBe('function');
    expect(typeof pulsar.erc4337TrackerForStore).toBe('function');
    expect(typeof pulsar.selectEvmTxExplorerLink).toBe('function');
  });

  it('re-exports Satellite EVM connection adapters and watchers', () => {
    expect(typeof satellite.satelliteEVMAdapter).toBe('function');
    expect(typeof satellite.createEVMConnectionsWatcher).toBe('function');
  });

  it('re-exports Nova Connect EVM components', () => {
    expect(novaConnect.EVMConnectorsWatcher).toBeDefined();
  });

  it('re-exports SIWX EVM signers and verifiers', () => {
    expect(typeof siwx.createEvmSiwxSigner).toBe('function');
    expect(typeof siwx.verifyEip191).toBe('function');
    expect(typeof siwx.verifyEip1271).toBe('function');
  });
});

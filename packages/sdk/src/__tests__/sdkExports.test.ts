import { describe, expect, it } from 'vitest';

import * as novaConnect from '../nova-connect.js';
import * as novaConnectComponents from '../nova-connect-components.js';
import * as novaConnectHooks from '../nova-connect-hooks.js';
import * as novaCore from '../nova-core.js';
import * as novaTransactions from '../nova-transactions.js';
import * as novaTransactionsProviders from '../nova-transactions-providers.js';
import * as orbit from '../orbit.js';
import * as pulsar from '../pulsar.js';
import * as satellite from '../satellite.js';
import * as siwxReact from '../siwx.js';
import * as siwxCore from '../siwx-core.js';
import * as siwxServer from '../siwx-server.js';
import * as siwxServerNext from '../siwx-server-next.js';

describe('Unified SDK Re-Exports', () => {
  it('exports core SIWX utilities from siwx-core', () => {
    expect(typeof siwxCore.buildMessage).toBe('function');
    expect(typeof siwxCore.parseMessage).toBe('function');
    expect(typeof siwxCore.validateMessage).toBe('function');
    expect(typeof siwxCore.validatePolicy).toBe('function');
    expect(typeof siwxCore.generateNonce).toBe('function');
  });

  it('exports server SIWX utilities from siwx-server', () => {
    expect(typeof siwxServer.getSiwxServerSession).toBe('function');
    expect(typeof siwxServer.createClearCookie).toBe('function');
    expect(typeof siwxServer.MemorySiwxSessionStore).toBe('function');
    expect(typeof siwxServer.MemorySiwxNonceStore).toBe('function');
  });

  it('exports the JWT and JWKS helpers of siwx-server', () => {
    for (const name of [
      'generateSiwxJwtKey',
      'importSiwxJwtKey',
      'siwxJwkThumbprint',
      'createSiwxJwks',
      'siwxJwtSubject',
      'signSiwxJwt',
      'verifySiwxJwt',
    ] as const) {
      expect(typeof siwxServer[name]).toBe('function');
    }
  });

  it('exports the CAIP helpers of orbit-core', () => {
    expect(orbit.toCaip2ChainId(8453)).toBe('eip155:8453');
    expect(orbit.toEvmChainId('eip155:8453')).toBe(8453);
    expect(orbit.parseCaip10AccountId('eip155:1:0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B')?.address).toBe(
      '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    );
    expect(orbit.formatCaip19AssetId(1, 'slip44', '60')).toBe('eip155:1/slip44:60');
  });

  it('exports Next.js route handlers from siwx-server-next', () => {
    expect(typeof siwxServerNext.createSiwxApiHandler).toBe('function');
    expect(typeof siwxServerNext.createStatelessDemoSiwxHandler).toBe('function');
  });

  it('exports React SIWX hooks from siwx', () => {
    expect(typeof siwxReact.useSiwx).toBe('function');
    expect(typeof siwxReact.useSiwxSession).toBe('function');
    expect(typeof siwxReact.useSiwxSessionStore).toBe('function');
  });

  it('exports Pulsar, Satellite, Orbit, and Nova primitives with ERC4337 tracker', () => {
    expect(typeof pulsar.createPulsarStore).toBe('function');
    expect(pulsar.TransactionTracker.ERC4337).toBe('erc4337');
    expect(typeof satellite.createSatelliteConnectStore).toBe('function');
    expect(typeof orbit.OrbitAdapter).toBe('object');
    expect(typeof novaCore.cn).toBe('function');
    expect(typeof novaTransactionsProviders.NovaTransactionsProvider).toBe('function');
    expect(novaTransactions.TransactionsHistory).toBeDefined();
    expect(typeof novaConnect.NovaConnectProvider).toBe('function');
    expect(typeof novaConnectHooks.useNovaSiwx).toBe('function');
    expect(novaConnectComponents.ConnectButton).toBeDefined();
  });
});

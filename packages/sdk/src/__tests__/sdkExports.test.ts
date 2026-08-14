import assert from 'node:assert';
import { describe, it } from 'node:test';

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
    assert.strictEqual(typeof siwxCore.buildMessage, 'function');
    assert.strictEqual(typeof siwxCore.parseMessage, 'function');
    assert.strictEqual(typeof siwxCore.validateMessage, 'function');
    assert.strictEqual(typeof siwxCore.validatePolicy, 'function');
    assert.strictEqual(typeof siwxCore.generateNonce, 'function');
  });

  it('exports server SIWX utilities from siwx-server', () => {
    assert.strictEqual(typeof siwxServer.getSiwxServerSession, 'function');
    assert.strictEqual(typeof siwxServer.createClearCookie, 'function');
    assert.strictEqual(typeof siwxServer.MemorySiwxSessionStore, 'function');
    assert.strictEqual(typeof siwxServer.MemorySiwxNonceStore, 'function');
  });

  it('exports Next.js route handlers from siwx-server-next', () => {
    assert.strictEqual(typeof siwxServerNext.createSiwxApiHandler, 'function');
    assert.strictEqual(typeof siwxServerNext.createStatelessDemoSiwxHandler, 'function');
  });

  it('exports React SIWX hooks from siwx', () => {
    assert.strictEqual(typeof siwxReact.useSiwx, 'function');
    assert.strictEqual(typeof siwxReact.useSiwxSession, 'function');
    assert.strictEqual(typeof siwxReact.useSiwxSessionStore, 'function');
  });

  it('exports Pulsar, Satellite, Orbit, and Nova primitives', () => {
    assert.strictEqual(typeof pulsar.createPulsarStore, 'function');
    assert.strictEqual(typeof satellite.createSatelliteConnectStore, 'function');
    assert.strictEqual(typeof orbit.OrbitAdapter, 'object');
    assert.strictEqual(typeof novaCore.cn, 'function');
    assert.strictEqual(typeof novaTransactionsProviders.NovaTransactionsProvider, 'function');
    assert.ok(novaTransactions.TransactionsHistory !== undefined);
    assert.strictEqual(typeof novaConnect.NovaConnectProvider, 'function');
    assert.strictEqual(typeof novaConnectHooks.useNovaSiwx, 'function');
    assert.ok(novaConnectComponents.ConnectButton !== undefined);
  });
});

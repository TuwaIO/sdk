import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { preFlightTxCheck, Quasar } from '../index';

describe('Quasar SDK', () => {
  it('instantiates Quasar client with secret key', () => {
    const quasar = new Quasar({ secretKey: 'sk_live_test123456' });
    assert.ok(quasar);
    assert.ok(quasar.pulsar);
  });

  it('performs preFlightTxCheck with valid SIWX session and healthy API', async () => {
    const originalFetch = global.fetch;
    global.fetch = (async () => {
      return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as typeof global.fetch;

    try {
      // Mock session in useSiwxSessionStore
      const { useSiwxSessionStore } = await import('@tuwaio/siwx-react');
      useSiwxSessionStore.setState({
        session: {
          address: 'eip155:1:0x1234567890123456789012345678901234567890',
          chainId: 'eip155:1',
          domain: 'app.tuwa.io',
          issuedAt: new Date().toISOString(),
        },
        status: 'authenticated',
      });

      await assert.doesNotReject(async () => {
        await preFlightTxCheck('https://api.tuwa.io');
      });
    } finally {
      global.fetch = originalFetch;
    }
  });
});

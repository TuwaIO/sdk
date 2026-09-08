import { beforeEach, describe, expect, it, vi } from 'vitest';

import { preFlightTxCheck, Quasar, TransactionStatus, TransactionTracker } from '../index';

describe('Quasar SDK', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('instantiates Quasar client with secret key and default configuration', () => {
    const quasar = new Quasar({ secretKey: 'sk_live_test123456' });
    expect(quasar).toBeDefined();
    expect(quasar.pulsar).toBeDefined();
    expect(typeof quasar.pulsar.syncCreate).toBe('function');
    expect(typeof quasar.pulsar.getHistory).toBe('function');
  });

  it('throws error when instantiated without a secret key', () => {
    expect(() => new Quasar({ secretKey: '' })).toThrowError('[Quasar SDK] Missing API Key');
  });

  it('correctly re-exports TransactionTracker and TransactionStatus enums', () => {
    expect(TransactionTracker.ERC4337).toBe('erc4337');
    expect(TransactionTracker.Ethereum).toBe('ethereum');
    expect(TransactionTracker.Safe).toBe('safe');
    expect(TransactionTracker.Gelato).toBe('gelato');
    expect(TransactionTracker.Solana).toBe('solana');

    expect(TransactionStatus.Success).toBe('Success');
    expect(TransactionStatus.Failed).toBe('Failed');
    expect(TransactionStatus.Replaced).toBe('Replaced');
  });

  describe('preFlightTxCheck', () => {
    it('throws error when no SIWX session exists in store', async () => {
      const { useSiwxSessionStore } = await import('@tuwaio/siwx-react');
      useSiwxSessionStore.setState({
        session: null,
        status: 'idle',
      });

      await expect(preFlightTxCheck('https://api.tuwa.io')).rejects.toThrowError(
        '[QuasarSDK] No SIWX Session found. User must be signed in.',
      );
    });

    it('throws error when API health check fails with non-200 status', async () => {
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

      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: false,
        status: 503,
      } as Response);

      await expect(preFlightTxCheck('https://api.tuwa.io')).rejects.toThrowError(
        '[QuasarSDK] Quasar Cloud Engine is currently unreachable.',
      );

      expect(fetchSpy).toHaveBeenCalledWith('https://api.tuwa.io/v1/engine/monitoring/health', expect.anything());
    });

    it('resolves successfully when SIWX session is valid and API health check returns 200', async () => {
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

      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: 'ok' }),
      } as Response);

      await expect(preFlightTxCheck('https://api.tuwa.io')).resolves.toBeUndefined();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });
});

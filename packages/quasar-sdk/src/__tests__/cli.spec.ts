import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_FORWARD_URL, handleSseMessage, parseArgs, parseEnvFile } from '../cli';

describe('Quasar CLI - Webhook Local Dev Relay', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('parseEnvFile', () => {
    it('parses unquoted and quoted values, ignoring comments and blank lines', () => {
      const sampleEnv = `
# This is a comment
QUASAR_WEBHOOK_SECRET=whsec_abc123456789
NEXT_PUBLIC_QUASAR_BASE_URL="https://custom.api.tuwa.io"
QUASAR_WEBHOOK_FORWARD_TO='http://localhost:4000/api/webhooks'
EMPTY_LINE=
      `;

      const parsed = parseEnvFile(sampleEnv);

      expect(parsed.QUASAR_WEBHOOK_SECRET).toBe('whsec_abc123456789');
      expect(parsed.NEXT_PUBLIC_QUASAR_BASE_URL).toBe('https://custom.api.tuwa.io');
      expect(parsed.QUASAR_WEBHOOK_FORWARD_TO).toBe('http://localhost:4000/api/webhooks');
      expect(parsed['# This is a comment']).toBeUndefined();
    });
  });

  describe('parseArgs', () => {
    it('defaults to undefined when no options provided', () => {
      const options = parseArgs([]);
      expect(options.command).toBeUndefined();
      expect(options.secret).toBeUndefined();
      expect(options.forwardTo).toBeUndefined();
    });

    it('parses listen command and long flags correctly', () => {
      const options = parseArgs([
        'listen',
        '--secret',
        'whsec_test_secret',
        '--forward-to',
        'http://localhost:3000/api/webhooks/quasar',
        '--api-url',
        'https://api.tuwa.io',
      ]);

      expect(options.command).toBe('listen');
      expect(options.secret).toBe('whsec_test_secret');
      expect(options.forwardTo).toBe('http://localhost:3000/api/webhooks/quasar');
      expect(options.apiUrl).toBe('https://api.tuwa.io');
    });

    it('parses short flags correctly (-s, -f, -a, -e)', () => {
      const options = parseArgs([
        'listen',
        '-s',
        'whsec_short',
        '-f',
        'http://localhost:8080/hook',
        '-a',
        'http://localhost:3001',
        '-e',
        '.env.test',
      ]);

      expect(options.command).toBe('listen');
      expect(options.secret).toBe('whsec_short');
      expect(options.forwardTo).toBe('http://localhost:8080/hook');
      expect(options.apiUrl).toBe('http://localhost:3001');
      expect(options.envFile).toBe('.env.test');
    });

    it('parses help and version flags', () => {
      expect(parseArgs(['--help']).help).toBe(true);
      expect(parseArgs(['-h']).help).toBe(true);
      expect(parseArgs(['--version']).version).toBe(true);
      expect(parseArgs(['-v']).version).toBe(true);
    });
  });

  describe('handleSseMessage', () => {
    it('ignores ping and keepalive events', async () => {
      const mockFetch = vi.fn();
      globalThis.fetch = mockFetch;

      await handleSseMessage('ping', ':keepalive', DEFAULT_FORWARD_URL);
      await handleSseMessage('ping', '', DEFAULT_FORWARD_URL);
      await handleSseMessage('message', ':keepalive', DEFAULT_FORWARD_URL);

      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('forwards payload event to forwardTo URL with correct headers', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
      });
      globalThis.fetch = mockFetch;

      const rawPayload = JSON.stringify({
        deliveryId: 'del_123',
        event: 'transaction:success',
        timestamp: 1720000000,
        data: {
          txKey: '0xabc',
          status: 'Success',
        },
        signature: 'sha256_mock_signature',
      });

      await handleSseMessage('payload', rawPayload, 'http://localhost:3000/api/webhooks/quasar');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/webhooks/quasar',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-quasar-signature': 'sha256_mock_signature',
            'x-quasar-event': 'transaction:success',
            'x-quasar-delivery-id': 'del_123',
          },
          body: JSON.stringify({
            txKey: '0xabc',
            status: 'Success',
          }),
        }),
      );
    });

    it('handles target server error without crashing', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('ECONNREFUSED: connect ECONNREFUSED 127.0.0.1:3000'));
      globalThis.fetch = mockFetch;

      const rawPayload = JSON.stringify({
        deliveryId: 'del_fail',
        event: 'transaction:failed',
        timestamp: 1720000000,
        data: { error: 'Reverted' },
        signature: 'sig_123',
      });

      // Should not throw
      await expect(
        handleSseMessage('payload', rawPayload, 'http://localhost:3000/api/webhooks/quasar'),
      ).resolves.not.toThrow();

      expect(mockFetch).toHaveBeenCalled();
    });
  });
});

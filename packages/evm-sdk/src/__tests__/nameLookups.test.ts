import type { Config } from '@wagmi/core';
import { mainnet } from 'viem/chains';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { satelliteEVMAdapter } from '../satellite.js';

// The Satellite and Orbit this package depends on: by default the adapter looks no ENS avatar up, whose record can
// point at any host. An older pair let viem fetch it for every name
describe('the ENS avatar of the EVM adapter, by default', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('is null, with no request', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('A test sends nothing over the network'));
    const config = { state: { connections: new Map(), current: null } } as unknown as Config;

    expect(await satelliteEVMAdapter(config, [mainnet]).getAvatar?.('vitalik.eth')).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

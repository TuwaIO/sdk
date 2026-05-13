import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ConnectionData, MiniSessionAuth, MiniSessionStore } from '../types';
import { signMiniSession } from './auth';

/**
 * Creates a persistent Zustand store to cache Mini-Session signatures.
 * Requires `zustand` to be installed as a peer dependency.
 *
 * @param storageName - Key name for localStorage persistence.
 * @returns A Zustand store instance.
 */
export function createMiniSessionStore(storageName = 'mini-session-storage') {
  return create<MiniSessionStore>()(
    persist(
      (set) => ({
        miniSession: null,
        setMiniSession: (miniSession) => set({ miniSession }),
        clearSession: () => set({ miniSession: null }),
      }),
      {
        name: storageName,
      },
    ),
  );
}

/**
 * Generic helper to manage Mini-Session signing and caching.
 *
 * Checks the provided store for an existing session matching the current connection.
 * If no session is found, it triggers a signature request using the provided signer.
 *
 * @param connection - Current active connection state.
 * @param store - An object compatible with MiniSessionStore to read/write the session.
 * @returns A promise resolving to the authenticated session.
 * @throws {Error} If no wallet is connected or signing fails.
 */
export async function getMiniSessionAuth(
  connection: ConnectionData,
  store: { miniSession: MiniSessionAuth | null; setMiniSession: (s: MiniSessionAuth) => void },
): Promise<MiniSessionAuth> {
  if (!connection.isConnected || !connection.address) {
    throw new Error('Wallet not connected. Please connect your wallet first.');
  }

  const { address, chainType, signer } = connection;

  // 1. Check if we have a valid cached session
  if (store.miniSession && store.miniSession.walletAddress === address && store.miniSession.chainType === chainType) {
    return store.miniSession;
  }

  // 2. Perform signing if no cache found
  const authResult = await signMiniSession({
    signer,
    walletAddress: address,
    chainType: chainType,
  });

  const newSession: MiniSessionAuth = {
    ...authResult,
    chainType: chainType,
    walletAddress: address,
  };

  // 3. Update the store
  store.setMiniSession(newSession);

  return newSession;
}

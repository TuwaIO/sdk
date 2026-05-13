/**
 * @module utils/session
 * @description State-management utilities for Mini-Session persistence and orchestration.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ConnectionData, MiniSessionAuth, MiniSessionStore } from '../types';
import { DEFAULT_MAX_AGE, signMiniSession } from './auth';

/**
 * Creates a persistent Zustand store to cache Mini-Session signatures.
 * This is the recommended way to manage sessions in React applications.
 *
 * @param storageName - The localStorage key for persistence. Defaults to 'mini-session-storage'.
 * @returns A Zustand store instance initialized with MiniSessionStore interface.
 *
 * @public
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
 * High-level orchestrator to retrieve an existing Mini-Session or trigger a new signature.
 *
 * This function checks the provided store for a valid, non-expired session matching
 * the current wallet connection. If no session is found or it has expired, it
 * triggers a signature request through the wallet.
 *
 * @param connection - The current active wallet connection data (address, signer, etc).
 * @param store - A store implementation (Zustand or compatible) for session persistence.
 * @returns A promise resolving to a valid MiniSessionAuth object.
 * @throws {Error} If the wallet is disconnected or signing fails.
 *
 * @public
 */
export async function getMiniSessionAuth(
  connection: ConnectionData,
  store: {
    miniSession: MiniSessionAuth | null;
    setMiniSession: (session: MiniSessionAuth | null) => void;
  },
): Promise<MiniSessionAuth> {
  const { isConnected, address, chainType, signer } = connection;

  if (!isConnected || !address) {
    throw new Error('[SDK] Wallet not connected. Please connect your wallet first.');
  }

  // 1. Cache Hit Check (Valid Address, Chain, and not expired)
  const cached = store.miniSession;
  if (cached && cached.walletAddress === address && cached.chainType === chainType) {
    const now = Date.now();
    const timestampDate = new Date(cached.timestamp).getTime();

    // Use the default max age (5 mins) as the validity buffer
    if (now - timestampDate < DEFAULT_MAX_AGE) {
      return cached;
    }
  }

  // 2. Cache Miss -> Trigger Signature Request
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

  // 3. Update the store and return
  store.setMiniSession(newSession);
  return newSession;
}

/**
 * @module utils/session
 * @description State-management utilities for Mini-Session persistence and orchestration.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ConnectionData, MiniSessionAuth, MiniSessionStore } from '../types';
import { DEFAULT_MAX_AGE, NETWORK_SAFETY_BUFFER, signMiniSession } from './auth';

/**
 * Deduplicates concurrent signing requests. If multiple callers ask for auth
 * simultaneously when the cache is expired, only one wallet popup is shown.
 * @internal
 */
let signingInFlight: Promise<MiniSessionAuth> | null = null;

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

    // Subtract safety buffer to account for network latency between
    // cache check and server-side verifyMiniSession call.
    if (now - timestampDate < DEFAULT_MAX_AGE - NETWORK_SAFETY_BUFFER) {
      return cached;
    }
  }

  // 2. Cache Miss -> Trigger Signature Request (deduplicated)
  if (!signingInFlight) {
    signingInFlight = signMiniSession({ signer, walletAddress: address, chainType })
      .then((authResult) => {
        const newSession: MiniSessionAuth = { ...authResult, chainType, walletAddress: address };
        store.setMiniSession(newSession);
        return newSession;
      })
      .finally(() => {
        signingInFlight = null;
      });
  }

  return signingInFlight;
}

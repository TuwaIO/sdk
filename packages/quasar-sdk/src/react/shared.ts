/**
 * @module react/shared
 * @description Shared React-agnostic state and type definitions for Quasar React Bridges.
 */

import { MiniSessionAuth } from '../types';

/**
 * Structural interface for the active wallet connection state.
 * Used to decoupling the SDK from specific library hooks.
 * 
 * @public
 */
export interface QuasarActiveConnection {
  /** Whether the wallet is currently connected. */
  isConnected: boolean;
  /** The active wallet address. */
  address: string;
  /** The chain ID (number for EVM, string for Solana). */
  chainId: string | number;
  /** The UiWalletAccount object (required for Solana signing). */
  connectedAccount?: any;
}

/**
 * A static reference to the current auth helper.
 * This allows non-React code (like Pulsar sync) to trigger authentication.
 * 
 * @internal
 */
export let authHelperReference: (() => Promise<MiniSessionAuth>) | null = null;

/**
 * Sets the static reference to the authentication helper.
 * 
 * @param ref - The authentication helper callback function, or null.
 * @internal
 */
export function setAuthHelperReference(ref: (() => Promise<MiniSessionAuth>) | null) {
  authHelperReference = ref;
}

/**
 * Static utility to retrieve or trigger a Mini-Session authentication.
 * This is the primary way for services outside the React tree to get an auth token.
 *
 * @returns A promise resolving to the valid Mini-Session Auth.
 * @throws {Error} If the bridge is not mounted or the wallet is disconnected.
 *
 * @public
 */
export async function getMiniSessionAuth(): Promise<MiniSessionAuth> {
  // Retry mechanism to account for bridge initialization timing
  for (let i = 0; i < 15; i++) {
    if (authHelperReference) {
      return authHelperReference();
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(
    '[QuasarSDK] Auth helper not initialized. Ensure QuasarAuthBridge is mounted and wallet is connected.',
  );
}

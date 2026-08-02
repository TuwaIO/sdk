/**
 * @module react
 * @description Main React entrypoint of the Quasar SDK, featuring the unified QuasarAuthBridge.
 */

import { Config } from '@wagmi/core';
import { useEffect } from 'react';
import { StoreApi } from 'zustand';

import { ChainType, MiniSessionAuth } from '../types';
import { QuasarEvmAuthBridge } from './evm';
import { QuasarActiveConnection } from './shared';
import { QuasarSolanaAuthBridge } from './solana';

export type { QuasarActiveConnection };
export { getMiniSessionAuth, preFlightTxCheck } from './shared';

/**
 * Props for the unified QuasarAuthBridge component.
 *
 * @public
 */
export interface QuasarAuthBridgeProps {
  /** The active connection object (usually from useSatelliteConnectStore). */
  activeConnection: QuasarActiveConnection | null | undefined;
  /** The state store API (usually from SatelliteStoreContext). */
  store: StoreApi<unknown>;
  /** The Wagmi configuration instance for EVM signing. */
  wagmiConfig: Config;
  /** The current Mini-Session authentication data from your state store. */
  session: MiniSessionAuth | null;
  /** Callback to update the session in your state store. */
  setSession: (session: MiniSessionAuth | null) => void;
  /**
   * Maximum session age in milliseconds. Must be the same value passed to
   * `verifyMiniSession` — this is the single source of truth for session lifetime.
   * Defaults to 5 minutes.
   */
  maxAge?: number;
  /** Optional callback triggered when an address mismatch is detected. */
  onAddressMismatch?: () => void;
}

/**
 * The Unified Quasar Authentication Bridge.
 *
 * This component acts as a unified cross-chain coordinator. It dynamically
 * renders either the EVM or Solana specific bridges based on the connection type.
 * Note: importing this component requires having both `@wagmi/core` and `@solana/react` installed.
 * If you only need EVM or Solana bindings, import directly from the corresponding subpath:
 * - `@tuwaio/quasar-sdk/react/evm`
 * - `@tuwaio/quasar-sdk/react/solana`
 *
 * @example
 * ```tsx
 * import { QuasarAuthBridge } from '@tuwaio/quasar-sdk/react';
 *
 * <QuasarAuthBridge
 *   activeConnection={activeConnection}
 *   store={store}
 *   wagmiConfig={config}
 *   session={auth.miniSession}
 *   setSession={auth.setMiniSession}
 * />
 * ```
 *
 * @public
 */
export function QuasarAuthBridge({
  activeConnection,
  store,
  wagmiConfig,
  session,
  setSession,
  maxAge,
  onAddressMismatch,
}: QuasarAuthBridgeProps) {
  const isSolana = typeof activeConnection?.chainId === 'string';
  const chainType = isSolana ? ChainType.SOLANA : ChainType.EVM;

  // Address mismatch protection
  useEffect(() => {
    if (session && activeConnection?.address && session.walletAddress !== activeConnection.address) {
      console.log('[QuasarSDK] Address mismatch detected, clearing session...');
      setSession(null);
      onAddressMismatch?.();
    }
  }, [activeConnection?.address, session, setSession, onAddressMismatch]);

  if (!activeConnection?.isConnected || !store) return null;

  if (chainType === ChainType.SOLANA) {
    return (
      <QuasarSolanaAuthBridge
        activeConnection={activeConnection}
        store={store}
        session={session}
        setSession={setSession}
        maxAge={maxAge}
      />
    );
  }

  return (
    <QuasarEvmAuthBridge
      activeConnection={activeConnection}
      store={store}
      wagmiConfig={wagmiConfig}
      session={session}
      setSession={setSession}
      maxAge={maxAge}
    />
  );
}

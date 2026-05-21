/**
 * @module react/evm
 * @description React authentication bridge for EVM-based wallets.
 */

import { Config, getWalletClient } from '@wagmi/core';
import { useCallback, useEffect, useRef } from 'react';
import { StoreApi } from 'zustand';

import { ChainType, EvmSigner, MiniSessionAuth } from '../types';
import { getMiniSessionAuth as getAuthCore } from '../utils/session';
import { QuasarActiveConnection, setAuthHelperReference } from './shared';

export type { QuasarActiveConnection };
export { getMiniSessionAuth } from './shared';

/**
 * Props for the QuasarEvmAuthBridge component.
 * 
 * @public
 */
export interface QuasarEvmAuthBridgeProps {
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
 * The Quasar EVM Authentication Bridge.
 *
 * This component orchestrates signature requests specifically for EVM wallets,
 * avoiding any Solana library dependencies.
 *
 * @example
 * ```tsx
 * import { QuasarEvmAuthBridge } from '@tuwaio/quasar-sdk/react/evm';
 *
 * <QuasarEvmAuthBridge
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
export function QuasarEvmAuthBridge({
  activeConnection,
  store,
  wagmiConfig,
  session,
  setSession,
  maxAge,
  onAddressMismatch,
}: QuasarEvmAuthBridgeProps) {
  // Address mismatch protection
  useEffect(() => {
    if (session && activeConnection?.address && session.walletAddress !== activeConnection.address) {
      console.log('[QuasarSDK] Address mismatch detected, clearing session...');
      setSession(null);
      onAddressMismatch?.();
    }
  }, [activeConnection?.address, session, setSession, onAddressMismatch]);

  if (!activeConnection?.isConnected || !store) return null;

  return (
    <QuasarEvmAuthBridgeInternal
      wagmiConfig={wagmiConfig}
      store={store}
      session={session}
      setSession={setSession}
      maxAge={maxAge}
    />
  );
}

interface SatelliteConnectionState {
  isConnected: boolean;
  address: string;
}

/**
 * Internal component to register EVM signing callback helper.
 * 
 * @internal
 */
function QuasarEvmAuthBridgeInternal({
  wagmiConfig,
  store,
  session,
  setSession,
  maxAge,
}: {
  wagmiConfig: Config;
  store: StoreApi<unknown>;
  session: MiniSessionAuth | null;
  setSession: (s: MiniSessionAuth | null) => void;
  maxAge?: number;
}) {
  const sessionRef = useRef(session);
  const setSessionRef = useRef(setSession);

  useEffect(() => { sessionRef.current = session; }, [session]);
  useEffect(() => { setSessionRef.current = setSession; }, [setSession]);

  const getAuth = useCallback(async (): Promise<MiniSessionAuth> => {
    const state = store.getState() as { activeConnection: SatelliteConnectionState };
    const currentConn = state.activeConnection;

    if (!currentConn?.isConnected) throw new Error('[QuasarSDK] Wallet disconnected');

    const signer = await getWalletClient(wagmiConfig);
    if (!signer) throw new Error('[QuasarSDK] EVM Signer not found');

    return getAuthCore(
      {
        isConnected: currentConn.isConnected,
        address: currentConn.address,
        chainType: ChainType.EVM,
        signer: signer as unknown as EvmSigner,
      },
      {
        miniSession: sessionRef.current,
        setMiniSession: setSessionRef.current,
      },
      maxAge,
    );
  }, [store, wagmiConfig, maxAge]);

  useEffect(() => {
    setAuthHelperReference(getAuth);
    return () => {
      setAuthHelperReference(null);
    };
  }, [getAuth]);

  return null;
}

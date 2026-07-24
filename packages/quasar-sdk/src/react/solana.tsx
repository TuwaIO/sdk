/**
 * @module react/solana
 * @description React authentication bridge for Solana-based wallets.
 */

import { useWalletAccountMessageSigner } from '@solana/react';
import { useCallback, useEffect, useRef } from 'react';
import { StoreApi } from 'zustand';

import { ChainType, MiniSessionAuth, SolanaSigner } from '../types';
import { getMiniSessionAuth as getAuthCore } from '../utils/session';
import { QuasarActiveConnection, setAuthHelperReference } from './shared';

export type { QuasarActiveConnection };
export { getMiniSessionAuth } from './shared';

/**
 * Props for the QuasarSolanaAuthBridge component.
 *
 * @public
 */
export interface QuasarSolanaAuthBridgeProps {
  /** The active connection object (usually from useSatelliteConnectStore). */
  activeConnection: QuasarActiveConnection | null | undefined;
  /** The state store API (usually from SatelliteStoreContext). */
  store: StoreApi<unknown>;
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
 * The Quasar Solana Authentication Bridge.
 *
 * This component orchestrates signature requests specifically for Solana wallets,
 * avoiding any EVM / Wagmi library dependencies.
 *
 * @example
 * ```tsx
 * import { QuasarSolanaAuthBridge } from '@tuwaio/quasar-sdk/react/solana';
 *
 * <QuasarSolanaAuthBridge
 *   activeConnection={activeConnection}
 *   store={store}
 *   session={auth.miniSession}
 *   setSession={auth.setMiniSession}
 * />
 * ```
 *
 * @public
 */
export function QuasarSolanaAuthBridge({
  activeConnection,
  store,
  session,
  setSession,
  maxAge,
  onAddressMismatch,
}: QuasarSolanaAuthBridgeProps) {
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
    <QuasarSolanaAuthBridgeInternal
      connectedAccount={activeConnection.connectedAccount as MinimalUiWalletAccount}
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
 * Minimal interface for a wallet account, compatible with @solana/react.
 * @internal
 */
interface MinimalUiWalletAccount {
  readonly address: string;
  readonly publicKey: Uint8Array;
  readonly chains: readonly string[];
  readonly features: readonly string[];
  readonly icon?: string;
  readonly label?: string;
}

/**
 * Internal component to register Solana signing callback helper.
 *
 * @internal
 */
function QuasarSolanaAuthBridgeInternal({
  connectedAccount,
  store,
  session,
  setSession,
  maxAge,
}: {
  connectedAccount: MinimalUiWalletAccount;
  store: StoreApi<unknown>;
  session: MiniSessionAuth | null;
  setSession: (s: MiniSessionAuth | null) => void;
  maxAge?: number;
}) {
  const solanaSigner = useWalletAccountMessageSigner(
    connectedAccount as unknown as Parameters<typeof useWalletAccountMessageSigner>[0],
  ) as unknown as SolanaSigner;

  const signerRef = useRef(solanaSigner);
  const sessionRef = useRef(session);
  const setSessionRef = useRef(setSession);

  useEffect(() => {
    signerRef.current = solanaSigner;
  }, [solanaSigner]);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);
  useEffect(() => {
    setSessionRef.current = setSession;
  }, [setSession]);

  const getAuth = useCallback(async (): Promise<MiniSessionAuth> => {
    const state = store.getState() as { activeConnection: SatelliteConnectionState };
    const currentConn = state.activeConnection;

    if (!currentConn?.isConnected) throw new Error('[QuasarSDK] Wallet disconnected');

    const signer = signerRef.current;
    if (!signer) {
      throw new Error('[QuasarSDK] Solana Message Signer not initialized.');
    }

    return getAuthCore(
      {
        isConnected: currentConn.isConnected,
        address: currentConn.address,
        chainType: ChainType.SOLANA,
        signer: signer,
      },
      {
        miniSession: sessionRef.current,
        setMiniSession: setSessionRef.current,
      },
      maxAge,
    );
  }, [store, maxAge]);

  useEffect(() => {
    setAuthHelperReference(getAuth);
    return () => {
      setAuthHelperReference(null);
    };
  }, [getAuth]);

  return null;
}

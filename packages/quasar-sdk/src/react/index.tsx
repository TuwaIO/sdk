import { useWalletAccountMessageSigner } from '@solana/react';
import { Config, getWalletClient } from '@wagmi/core';
import { UiWalletAccount } from '@wallet-standard/react';
import { useCallback, useEffect, useRef } from 'react';
import { StoreApi } from 'zustand';

import { ChainType, EvmSigner, MiniSessionAuth, SolanaSigner } from '../types';
import { getMiniSessionAuth as getAuthCore } from '../utils/session';

/**
 * Structural interface for the internal connection state of a wallet store.
 * Used to avoid strict dependency on nova-connect internal types.
 * @internal
 */
interface SatelliteConnectionState {
  isConnected: boolean;
  address: string;
}

/**
 * Structural interface for an active wallet connection.
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
  connectedAccount?: UiWalletAccount;
}

/**
 * A static reference to the current auth helper.
 * This allows non-React code (like Pulsar sync) to trigger authentication.
 * @internal
 */
let authHelperReference: (() => Promise<MiniSessionAuth>) | null = null;

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

/**
 * Props for the QuasarAuthBridge component.
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
   *
   * @example
   * ```tsx
   * const TOKEN_EXPIRATION = 86400 * 1000; // 24 hours in ms
   *
   * <QuasarAuthBridge maxAge={TOKEN_EXPIRATION} ... />
   *
   * // Later, for verification:
   * verifyMiniSession({ ...auth, maxAge: TOKEN_EXPIRATION });
   * ```
   */
  maxAge?: number;
  /** Optional callback triggered when an address mismatch is detected. */
  onAddressMismatch?: () => void;
}

/**
 * The Quasar Authentication Bridge.
 *
 * This component orchestrates signature requests across Solana and EVM ecosystems.
 * It decouples the SDK from specific library hooks by accepting connection data as props.
 *
 * It automatically handles:
 * 1. Signature generation for both Solana and EVM wallets.
 * 2. Session caching and synchronization with your state store.
 * 3. Address mismatch protection (clearing sessions when the wallet changes).
 *
 * @example
 * ```tsx
 * const activeConnection = useSatelliteConnectStore(s => s.activeConnection);
 * const store = useContext(SatelliteStoreContext);
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
        connectedAccount={activeConnection.connectedAccount as UiWalletAccount}
        store={store}
        session={session}
        setSession={setSession}
        maxAge={maxAge}
      />
    );
  }

  return <QuasarEvmAuthBridge wagmiConfig={wagmiConfig} store={store} session={session} setSession={setSession} maxAge={maxAge} />;
}

/** @internal */
function QuasarSolanaAuthBridge({
  connectedAccount,
  store,
  session,
  setSession,
  maxAge,
}: {
  connectedAccount: UiWalletAccount;
  store: StoreApi<unknown>;
  session: MiniSessionAuth | null;
  setSession: (s: MiniSessionAuth | null) => void;
  maxAge?: number;
}) {
  const solanaSigner = useWalletAccountMessageSigner(connectedAccount);

  // Refs keep the callback stable across re-renders caused by session/signer updates.
  // Without this, every successful sign recreates getAuth → authHelperReference briefly
  // becomes null → incoming calls fall into the retry loop.
  const signerRef = useRef(solanaSigner);
  const sessionRef = useRef(session);
  const setSessionRef = useRef(setSession);

  useEffect(() => { signerRef.current = solanaSigner; }, [solanaSigner]);
  useEffect(() => { sessionRef.current = session; }, [session]);
  useEffect(() => { setSessionRef.current = setSession; }, [setSession]);

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
        signer: signer as unknown as SolanaSigner,
      },
      {
        miniSession: sessionRef.current,
        setMiniSession: setSessionRef.current,
      },
      maxAge,
    );
  }, [store, maxAge]);

  useEffect(() => {
    authHelperReference = getAuth;
    return () => {
      if (authHelperReference === getAuth) authHelperReference = null;
    };
  }, [getAuth]);

  return null;
}

/** @internal */
function QuasarEvmAuthBridge({
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
    authHelperReference = getAuth;
    return () => {
      if (authHelperReference === getAuth) authHelperReference = null;
    };
  }, [getAuth]);

  return null;
}

import { useWalletAccountMessageSigner } from '@solana/react';
import { Config, getWalletClient } from '@wagmi/core';
import { UiWalletAccount } from '@wallet-standard/react';
import { useCallback, useEffect } from 'react';
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
      />
    );
  }

  return <QuasarEvmAuthBridge wagmiConfig={wagmiConfig} store={store} session={session} setSession={setSession} />;
}

/** @internal */
function QuasarSolanaAuthBridge({
  connectedAccount,
  store,
  session,
  setSession,
}: {
  connectedAccount: UiWalletAccount;
  store: StoreApi<unknown>;
  session: MiniSessionAuth | null;
  setSession: (s: MiniSessionAuth | null) => void;
}) {
  const solanaSigner = useWalletAccountMessageSigner(connectedAccount);

  const getAuth = useCallback(async (): Promise<MiniSessionAuth> => {
    const state = store.getState() as { activeConnection: SatelliteConnectionState };
    const currentConn = state.activeConnection;

    if (!currentConn?.isConnected) throw new Error('[QuasarSDK] Wallet disconnected');

    if (!solanaSigner) {
      throw new Error('[QuasarSDK] Solana Message Signer not initialized.');
    }

    return getAuthCore(
      {
        isConnected: currentConn.isConnected,
        address: currentConn.address,
        chainType: ChainType.SOLANA,
        signer: solanaSigner as unknown as SolanaSigner,
      },
      {
        miniSession: session,
        setMiniSession: setSession,
      },
    );
  }, [store, solanaSigner, session, setSession]);

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
}: {
  wagmiConfig: Config;
  store: StoreApi<unknown>;
  session: MiniSessionAuth | null;
  setSession: (s: MiniSessionAuth | null) => void;
}) {
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
        miniSession: session,
        setMiniSession: setSession,
      },
    );
  }, [store, wagmiConfig, session, setSession]);

  useEffect(() => {
    authHelperReference = getAuth;
    return () => {
      if (authHelperReference === getAuth) authHelperReference = null;
    };
  }, [getAuth]);

  return null;
}

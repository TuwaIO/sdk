# @tuwaio/quasar-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/quasar-sdk.svg)](https://www.npmjs.com/package/@tuwaio/quasar-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/quasar-sdk.svg)](./LICENSE)

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/preview/repos/quasar_sdk.png" alt="Quasar SDK Architecture" width="100%" />
</p>

> The official **Layer 5 (L5)** server-side Node.js & Edge SDK for the **TUWA Quasar Cloud**, featuring built-in React authentication bridges.

---

## 🏛️ What is `@tuwaio/quasar-sdk`?

`@tuwaio/quasar-sdk` is **Layer 5 (L5)** of the TUWA ecosystem architecture — the official backend companion to the TUWA client libraries. It serves as the gateway to the **Quasar Cloud Engine**, allowing your server to securely push transaction logs, query paginated transaction histories, and cryptographically verify client signatures.

It operates strictly on the server (Node.js, Next.js Server Actions, or Edge functions) and uses Secret Keys to communicate with Quasar's iron-dome guarded endpoints. It also includes React Bridges for establishing secure "Mini-Session" authentication on the client side.

---

## ✨ Key Features

- **☁️ Cloud Sync**: Automatically persist pending and terminal transaction states to the Quasar Database for cross-device history.
- **🔐 Mini-Session Auth**: Built-in cryptographic verification and React bridges (`QuasarAuthBridge`) to handle mini-session authentication across EVM and Solana with zero boilerplate.
- **⚡ Edge Ready**: Uses `ofetch` and lightweight cryptography to run seamlessly in Cloudflare Workers and Vercel Edge.
- **📦 InMemory Sync**: Perfectly pairs with `@tuwaio/sdk/pulsar` (`createTxInMemoryStore`) to fetch history and hydrate local React states.
- **⛓️ Multi-Chain Support**: Provides separate lightweight bridges for EVM (`react/evm`) and Solana (`react/solana`), ensuring minimal bundle sizes.

---

## 💾 Installation

```bash
pnpm add @tuwaio/quasar-sdk ofetch @tuwaio/pulsar-core
```

_Note: `ofetch` and `@tuwaio/pulsar-core` are required as peer dependencies to ensure ultra-fast HTTP requests and strict TypeScript compatibility._

---

## 🚀 Quick Start (Node.js / Edge)

This is a basic example of how to interact with the Quasar Cloud directly from your secure backend environments (like Next.js API Routes, Server Actions, or NestJS).

```typescript
import { Quasar, MiniSessionAuth, utils } from '@tuwaio/quasar-sdk';
import type { Transaction } from '@tuwaio/sdk/pulsar';

// Initialize Quasar with your Secret Key from the Dashboard
const quasar = new Quasar({ secretKey: process.env.QUASAR_SDK_SK ?? '' });

/**
 * Example Next.js Server Action to Sync a Transaction
 */
export async function syncTransaction(tx: Transaction, authData: MiniSessionAuth) {
  // 1. Verify the client's signature (prevent unauthorized spoofing)
  const isValid = await utils.verifyMiniSession(authData);
  if (!isValid) throw new Error('Invalid signature.');

  // 2. Sync the transaction securely to the Quasar Cloud
  await quasar.pulsar.syncCreate(tx, 'My Application');
  return { success: true };
}

/**
 * Example Next.js Server Action to Fetch History
 */
export async function getHistory(
  params: { walletAddress: string; page: number; limit: number; appName: string },
  authData: MiniSessionAuth,
) {
  const isValid = await utils.verifyMiniSession(authData);
  if (!isValid) throw new Error('Invalid signature.');

  // Return the paginated transaction history
  return quasar.pulsar.getHistory(params);
}
```

---

## 🔐 React Authentication Bridge

The SDK provides React components to handle mini-session authentication with zero boilerplate. This bridges the gap between your frontend (where the wallet is) and your backend (where the Quasar Secret Key lives).

### 1. Create the Auth Store

Before using the bridge, create a persistent Zustand store using the provided utility to manage the signature lifecycle.

```ts
// src/hooks/useAuthStore.ts
import { utils } from '@tuwaio/quasar-sdk';

export const useAuthStore = utils.createMiniSessionStore('quasar-mini-session-storage');
```

To prevent issues with missing optional peer dependencies at build time, the SDK exposes separate ecosystem entry points for the Bridge:

### EVM-Only Bridge (No Solana dependencies required)

If your project only supports EVM chains, import from the `/react/evm` subpath.

```tsx
import { QuasarEvmAuthBridge } from '@tuwaio/quasar-sdk/react/evm';
import { useAuthStore } from '@/hooks/useAuthStore';

export function MyApp({ activeConnection, store, wagmiConfig }) {
  const session = useAuthStore((s) => s.miniSession);
  const setSession = useAuthStore((s) => s.setMiniSession);

  return (
    <QuasarEvmAuthBridge
      activeConnection={activeConnection} // Structural interface for wallet state
      store={store} // Zustand store API
      wagmiConfig={wagmiConfig} // Wagmi config
      session={session} // Current session state
      setSession={setSession} // Session setter
    />
  );
}
```

### Solana-Only Bridge (No EVM dependencies required)

If your project only supports Solana, import from the `/react/solana` subpath.

```tsx
import { QuasarSolanaAuthBridge } from '@tuwaio/quasar-sdk/react/solana';
import { useAuthStore } from '@/hooks/useAuthStore';

export function MyApp({ activeConnection, store }) {
  const session = useAuthStore((s) => s.miniSession);
  const setSession = useAuthStore((s) => s.setMiniSession);

  return (
    <QuasarSolanaAuthBridge
      activeConnection={activeConnection}
      store={store}
      session={session}
      setSession={setSession}
    />
  );
}
```

### Unified Cross-Chain Bridge

If your project supports both ecosystems and has all peer dependencies installed (`@wagmi/core`, `@solana/react`, etc.), you can use the unified bridge:

```tsx
import { QuasarAuthBridge } from '@tuwaio/quasar-sdk/react';
```

---

## 🌍 The Full Flow (Production Architecture)

To see how incredibly powerful `@tuwaio/quasar-sdk` is when combined with `@tuwaio/sdk`, here is a complete architectural overview without any skipped steps. Notice how the **Auth Store**, **Pulsar Store**, and **QuasarAuthBridge** dance together effortlessly:

### 1. Define Your Transaction Types (`types.ts`)

First, define the strict union of all possible transactions your app supports.

```ts
// src/types.ts
import type { Transaction } from '@tuwaio/sdk/pulsar';

export enum AppTxType {
  SWAP = 'SWAP',
}

export type SwapTx = Transaction & {
  type: AppTxType.SWAP;
  payload: { tokenIn: string; tokenOut: string; amount: number };
};

export type TransactionUnion = SwapTx;
```

### 2. Secure Server Proxy (`actions.ts`)

Proxy calls to Quasar Cloud using your backend to protect secret keys.

```ts
// src/app/actions.ts
'use server';

import { Quasar, MiniSessionAuth, utils } from '@tuwaio/quasar-sdk';
import { TransactionUnion } from '@/types';

const quasar = new Quasar({ secretKey: process.env.QUASAR_SDK_SK ?? '' });

export async function syncTransaction(tx: TransactionUnion, authData: MiniSessionAuth) {
  const isValid = await utils.verifyMiniSession(authData);
  if (!isValid) throw new Error('Invalid signature.');

  await quasar.pulsar.syncCreate(tx, 'My App');
  return { success: true };
}

export async function getHistory(params: any, authData: MiniSessionAuth) {
  const isValid = await utils.verifyMiniSession(authData);
  if (!isValid) throw new Error('Invalid signature.');

  return quasar.pulsar.getHistory(params);
}
```

### 3. The Client Auth Store (`useAuthStore.ts`)

```tsx
// src/hooks/useAuthStore.ts
import { utils } from '@tuwaio/quasar-sdk';

// Automatically persists the verified signature in localStorage
export const useAuthStore = utils.createMiniSessionStore('quasar-mini-session-storage');
```

### 4. The Headless Tracking Store (`usePulsarStore.ts`)

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { createPulsarStore, createTxInMemoryStore, createBoundedUseStore } from '@tuwaio/sdk/pulsar';
import { pulsarEvmAdapter } from '@tuwaio/evm-sdk/pulsar';
import { pulsarSolanaAdapter } from '@tuwaio/solana-sdk/pulsar';
import { getMiniSessionAuth } from '@tuwaio/quasar-sdk/react';

import { getHistory, syncTransaction } from '@/app/actions';
import { wagmiConfig, appEVMChains, solanaRPCUrls } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

const storageName = 'transactions-tracking-storage';

const initialStore = createPulsarStore<TransactionUnion>({
  name: storageName,
  adapter: [pulsarEvmAdapter(wagmiConfig, appEVMChains), pulsarSolanaAdapter({ rpcUrls: solanaRPCUrls })],
  beforeTxProcess: async () => {
    // Ensures we have a valid signature before executing any blockchain logic
    await getMiniSessionAuth();
  },
  onRemoteCreate: async (tx) => {
    try {
      // Syncs the new transaction to Quasar via Next.js Server Actions
      const auth = await getMiniSessionAuth();
      await syncTransaction(tx as TransactionUnion, auth);
    } catch (err) {
      console.error('[PulsarHook] Remote sync failed:', err);
    }
  },
});

export const usePulsarStore = createBoundedUseStore(initialStore);

// Wrap with inMemoryStore to enable remote history fetching & pagination
const pulsarInMemoryStore = createTxInMemoryStore<TransactionUnion>({
  localTransactionsPool: initialStore.getState().transactionsPool,
  getHistory: async ({ page, walletAddress }) => {
    try {
      const auth = await getMiniSessionAuth();
      const history = await getHistory({ walletAddress, page, limit: 10, appName: 'My App' }, auth);

      if (!history) return null;

      return { ...history, docs: history.docs as TransactionUnion[] };
    } catch (error) {
      console.error('[PulsarHook] Failed to fetch history:', error);
      throw error;
    }
  },
  onHistoryFetched: async (remoteTxs) => {
    await initialStore.getState().injectExternalPendingTxs(remoteTxs);
  },
});

initialStore.subscribe((state) => pulsarInMemoryStore.getState().syncWithLocalPool(state.transactionsPool));

export const usePulsarInMemoryStore = createBoundedUseStore(pulsarInMemoryStore);
```

### 5. The Quasar Auth Bridge (`QuasarSDKAuthProvider.tsx`)

```tsx
// src/providers/QuasarSDKAuthProvider.tsx
'use client';

import { useContext, useEffect } from 'react';
import { useSatelliteConnectStore, SatelliteStoreContext } from '@tuwaio/sdk/satellite';
import { QuasarActiveConnection, QuasarAuthBridge as QuasarSDKAuthBridge } from '@tuwaio/quasar-sdk/react';

import { wagmiConfig } from '@/configs/appConfig';
import { useAuthStore } from '@/hooks/useAuthStore';

export function QuasarAuthBridge() {
  const activeConnection = useSatelliteConnectStore((s) => s.activeConnection);
  const store = useContext(SatelliteStoreContext);

  const session = useAuthStore((s) => s.miniSession);
  const setSession = useAuthStore((s) => s.setMiniSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  // Clear Quasar Mini-Session when wallet disconnects
  useEffect(() => {
    if (!activeConnection?.isConnected) {
      clearSession();
    }
  }, [activeConnection?.isConnected, clearSession]);

  if (!activeConnection || !store) return null;

  return (
    <QuasarSDKAuthBridge
      activeConnection={activeConnection as QuasarActiveConnection}
      store={store as any}
      wagmiConfig={wagmiConfig}
      session={session}
      setSession={setSession}
    />
  );
}
```

### 6. Nova Transactions Provider (`NovaTransactionsProvider.tsx`)

```tsx
// src/providers/NovaTransactionsProvider.tsx
'use client';

import { useSatelliteConnectStore } from '@tuwaio/sdk/satellite';
import { useInitializeTransactionsPool, type TxInMemoryPagination } from '@tuwaio/sdk/pulsar';
import { getAdapterFromConnectorType } from '@tuwaio/sdk/orbit';
import { NovaTransactionsProvider as NTP } from '@tuwaio/sdk/nova-transactions/providers';
import { usePulsarInMemoryStore, usePulsarStore } from '@/hooks/usePulsarStore';

export function NovaTransactionsProvider({ pagination }: { pagination: TxInMemoryPagination }) {
  const initialTx = usePulsarStore((state) => state.initialTx);
  const closeTxTrackedModal = usePulsarStore((state) => state.closeTxTrackedModal);
  const executeTxAction = usePulsarStore((state) => state.executeTxAction);
  const initializeTransactionsPool = usePulsarStore((state) => state.initializeTransactionsPool);

  const activeConnection = useSatelliteConnectStore((state) => state.activeConnection);
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarInMemoryStore((state) => state.transactionsPool);

  useInitializeTransactionsPool({ initializeTransactionsPool });

  return (
    <NTP
      transactionsPool={transactionsPool}
      initialTx={initialTx}
      closeTxTrackedModal={closeTxTrackedModal}
      executeTxAction={executeTxAction}
      connectedWalletAddress={activeConnection?.isConnected ? activeConnection.address : undefined}
      connectedAdapterType={getAdapterFromConnectorType(activeConnection?.connectorType ?? 'evm:')}
      adapter={getAdapter()}
      pagination={pagination}
    />
  );
}
```

### 7. The Seamless UI Integration (`AppProviders.tsx`)

```tsx
// src/providers/AppProviders.tsx
'use client';

import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { satelliteEVMAdapter } from '@tuwaio/evm-sdk/satellite';
import { EVMConnectorsWatcher } from '@tuwaio/evm-sdk/nova-connect';
import { satelliteSolanaAdapter } from '@tuwaio/solana-sdk/satellite';
import { SolanaConnectorsWatcher } from '@tuwaio/solana-sdk/nova-connect';
import { getMiniSessionAuth } from '@tuwaio/quasar-sdk/react';

import { appEVMChains, solanaRPCUrls, wagmiConfig } from '@/configs/appConfig';
import { usePulsarInMemoryStore, usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';
import { QuasarAuthBridge } from '@/providers/QuasarSDKAuthProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarInMemoryStore((state) => state.transactionsPool);

  const isLoading = usePulsarInMemoryStore((state) => state.isLoading);
  const isError = usePulsarInMemoryStore((state) => state.isError);
  const currentPage = usePulsarInMemoryStore((state) => state.currentPage);
  const hasMore = usePulsarInMemoryStore((state) => state.hasMore);
  const fetchNextPage = usePulsarInMemoryStore((state) => state.fetchNextPage);
  const fetchInitial = usePulsarInMemoryStore((state) => state.fetchInitial);

  const pagination = { isLoading, isError, currentPage, hasMore, fetchNextPage };

  return (
    <SatelliteConnectProvider
      adapter={[satelliteEVMAdapter(wagmiConfig, appEVMChains), satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })]}
      autoConnect={true}
      callbackAfterConnected={async (connection) => {
        try {
          await getMiniSessionAuth();
          setTimeout(() => fetchInitial(connection.address), 2000);
        } catch (err) {
          console.error('[QuasarAuth] Auto-authentication failed:', err);
          setTimeout(() => fetchInitial(connection.address), 2000);
        }
      }}
    >
      <EVMConnectorsWatcher wagmiConfig={wagmiConfig} />
      <SolanaConnectorsWatcher />

      <QuasarAuthBridge />
      <NovaTransactionsProvider pagination={pagination} />

      <NovaConnectProvider
        appChains={appEVMChains}
        solanaRPCUrls={solanaRPCUrls}
        transactionPool={transactionsPool}
        pulsarAdapter={getAdapter() as any}
        withImpersonated
        withBalance
        withChain
        pagination={pagination}
      >
        {children}
      </NovaConnectProvider>
    </SatelliteConnectProvider>
  );
}
```

### 8. Creating a Transaction (Usage)

Now you can safely execute strictly-typed, cross-chain transactions anywhere in your app. The store automatically routes the transaction to the correct adapter, and Quasar syncs it to the cloud.

```tsx
// src/components/SwapButton.tsx
'use client';

import { getAdapterFromConnectorType, OrbitAdapter } from '@tuwaio/sdk/orbit';
import { useSatelliteConnectStore } from '@tuwaio/sdk/satellite';
import { TxActionButton } from '@tuwaio/sdk/nova-transactions';
import { usePulsarStore, usePulsarInMemoryStore } from '@/hooks/usePulsarStore';
import { AppTxType } from '@/types';

export function SwapButton() {
  const executeTxAction = usePulsarStore((s) => s.executeTxAction);
  const getLastTxKey = usePulsarStore((s) => s.getLastTxKey);
  const transactionsPool = usePulsarInMemoryStore((s) => s.transactionsPool);
  const activeConnection = useSatelliteConnectStore((s) => s.activeConnection);

  const handleSwapAction = async () => {
    // Dynamically determine the adapter based on the currently connected wallet
    const adapterType = getAdapterFromConnectorType(activeConnection?.connectorType ?? 'evm:');

    await executeTxAction({
      actionFunction: async () => {
        /* your wagmi/solana contract call */
      },
      params: {
        adapter: adapterType,
        type: AppTxType.SWAP,
        title: 'Token Swap',
        desiredChainID: adapterType === OrbitAdapter.EVM ? 1 : undefined,
        payload: { tokenIn: 'USDC', tokenOut: adapterType === OrbitAdapter.EVM ? 'ETH' : 'SOL', amount: 100 },
      },
    });
  };

  return (
    <TxActionButton
      action={handleSwapAction}
      getLastTxKey={getLastTxKey}
      transactionsPool={transactionsPool}
      walletAddress={activeConnection?.address}
    >
      Cross-Chain Swap
    </TxActionButton>
  );
}
```

---

## 📦 Available Namespaces

This package provides the following server-side utilities and React bridges:

- `Quasar` — The main server-side client class instance used to access `quasar.pulsar.*` methods.
- `utils` — Security and authentication utilities for signature verification (`verifyMiniSession`, `signMiniSession`, `createMiniSessionStore`).
- `QuasarAuthBridge` (exported via subpaths) — The client-side React component for triggering and managing the signature flow automatically when the wallet connects.
- `MiniSessionAuth` — The strict type definition mapping the structure of the authentication payload.

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

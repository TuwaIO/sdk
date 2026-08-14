# @tuwaio/quasar-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/quasar-sdk.svg)](https://www.npmjs.com/package/@tuwaio/quasar-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/quasar-sdk.svg)](./LICENSE)

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/preview/repos/quasar_sdk.png" alt="Quasar SDK Architecture" width="100%" />
</p>

> The official **Layer 5 (L5)** server-side Node.js & Edge SDK for the **TUWA Quasar Cloud**.

---

## 🏛️ What is `@tuwaio/quasar-sdk`?

`@tuwaio/quasar-sdk` is **Layer 5 (L5)** of the TUWA ecosystem architecture — the official backend companion to the TUWA client libraries. It serves as the gateway to the **Quasar Cloud Engine**, allowing your server to securely push transaction logs, query paginated transaction histories, and sync infrastructure states.

It operates strictly on the server (Node.js, Next.js Server Actions, or Edge functions) and uses Secret Keys to communicate with Quasar's iron-dome guarded endpoints.

---

## ✨ Key Features

- **☁️ Cloud Sync**: Automatically persist pending and terminal transaction states to the Quasar Database for cross-device history.
- **🔐 Headless SIWX (CAIP-122) Auth Ready**: Seamlessly pairs with `@tuwaio/sdk/siwx/server` for strict cryptographic verification of user sessions before allowing database writes.
- **⚡ Edge Ready**: Uses `ofetch` and lightweight cryptography to run seamlessly in Cloudflare Workers and Vercel Edge.
- **📦 InMemory Sync**: Perfectly pairs with `@tuwaio/sdk/pulsar` (`createTxInMemoryStore`) to fetch history and hydrate local React states.

---

## 💾 Installation

```bash
pnpm add @tuwaio/quasar-sdk ofetch @tuwaio/pulsar-core @tuwaio/siwx-core @tuwaio/siwx-server @tuwaio/siwx-react
```

_Note: `ofetch` and `@tuwaio/pulsar-core` are required peer dependencies. The `@tuwaio/siwx-*` packages are required if you intend to use the headless SIWX (CAIP-122) authentication integrations._

---

## 🚀 Quick Start (Node.js / Edge)

This is a basic example of how to interact with the Quasar Cloud directly from your secure backend environments (like Next.js API Routes, Server Actions, or NestJS).

```typescript
import { cookies } from 'next/headers';
import { Quasar, type Transaction } from '@tuwaio/quasar-sdk';
import { isSessionMatchingTarget } from '@tuwaio/sdk/siwx';
import { getSiwxServerSession } from '@tuwaio/sdk/siwx/server';
import { sessionStore } from '@/lib/authStores';

// Initialize Quasar with your Secret Key from the Dashboard
const quasar = new Quasar({ secretKey: process.env.QUASAR_SDK_SK ?? '' });

/**
 * Example Next.js Server Action to Sync a Transaction
 */
export async function syncTransaction(tx: Transaction) {
  const session = await getSiwxServerSession({
    cookieSource: await cookies(),
    sessionStore,
  });
  if (!session) throw new Error('Unauthorized: No active session.');

  // Verify that the transaction sender matches the authenticated session address
  if (tx.from && !isSessionMatchingTarget(session, tx.from, tx.chainId)) {
    throw new Error('Forbidden: Session address mismatch.');
  }

  // Sync the transaction securely to the Quasar Cloud
  await quasar.pulsar.syncCreate(tx, 'My Application');
  return { success: true };
}

/**
 * Example Next.js Server Action to Fetch History
 */
export async function getHistory(params: {
  walletAddress: string;
  page?: number;
  limit?: number;
  appName?: string;
  chainId?: string;
}) {
  const session = await getSiwxServerSession({
    cookieSource: await cookies(),
    sessionStore,
  });
  if (!session || !isSessionMatchingTarget(session, params.walletAddress, params.chainId)) {
    throw new Error('Unauthorized: Session address mismatch.');
  }

  // Return the paginated transaction history
  return quasar.pulsar.getHistory(params);
}
```

---

## 🔐 Frontend Authentication (SIWX)

The Quasar SDK relies on the standard **SIWX (CAIP-122)** protocol for authenticating client requests.

You can use the headless `<NovaSiwxWatcher />` component or `useSiwx` / `useSiwxSession` hooks provided by `@tuwaio/sdk/siwx` (and `@tuwaio/sdk/nova-connect`). The auto-auth watcher automatically prompts users to sign a CAIP-122 message when they connect their wallet and synchronizes active session state.

For detailed frontend integration, see the [SIWX Documentation](https://siwx.docs.tuwa.io/).

---

## 🌍 The Full Flow (Production Architecture)

To see how incredibly powerful `@tuwaio/quasar-sdk` is when combined with `@tuwaio/sdk`, here is a complete architectural overview without any skipped steps. Notice how the **Pulsar Store** and **Headless SIWX** dance together effortlessly:

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

Proxy calls to Quasar Cloud using your backend to protect secret keys. Never accept client-side session credentials in Server Actions.

```ts
// src/app/actions.ts
'use server';

import { cookies } from 'next/headers';
import { Quasar } from '@tuwaio/quasar-sdk';
import { isSessionMatchingTarget } from '@tuwaio/sdk/siwx';
import { getSiwxServerSession } from '@tuwaio/sdk/siwx/server';
import { sessionStore } from '@/lib/authStores';
import { TransactionUnion } from '@/types';

const quasar = new Quasar({ secretKey: process.env.QUASAR_SDK_SK ?? '' });

export async function syncTransaction(tx: TransactionUnion) {
  const session = await getSiwxServerSession({
    cookieSource: await cookies(),
    sessionStore,
  });
  if (!session) throw new Error('Unauthorized: No active session.');
  if (tx.from && !isSessionMatchingTarget(session, tx.from, tx.chainId)) {
    throw new Error('Forbidden: Session address mismatch.');
  }

  await quasar.pulsar.syncCreate(tx, 'My App');
  return { success: true };
}

export async function getHistory(params: {
  walletAddress: string;
  page?: number;
  limit?: number;
  appName?: string;
  chainId?: string;
}) {
  const session = await getSiwxServerSession({
    cookieSource: await cookies(),
    sessionStore,
  });
  if (!session || !isSessionMatchingTarget(session, params.walletAddress, params.chainId)) {
    throw new Error('Unauthorized: Session address mismatch.');
  }

  return quasar.pulsar.getHistory(params);
}
```

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { createPulsarStore, createTxInMemoryStore, createBoundedUseStore } from '@tuwaio/sdk/pulsar';
import { pulsarEvmAdapter } from '@tuwaio/evm-sdk/pulsar';
import { pulsarSolanaAdapter } from '@tuwaio/solana-sdk/pulsar';
import { preFlightTxCheck } from '@tuwaio/quasar-sdk';

import { getHistory, syncTransaction } from '@/app/actions';
import { wagmiConfig, appEVMChains, solanaRPCUrls } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

const storageName = 'transactions-tracking-storage';

const initialStore = createPulsarStore<TransactionUnion>({
  name: storageName,
  adapter: [pulsarEvmAdapter(wagmiConfig, appEVMChains), pulsarSolanaAdapter({ rpcUrls: solanaRPCUrls })],
  beforeTxProcess: async () => {
    // Ensures we have a valid SIWX session and Quasar Cloud is reachable before executing blockchain logic
    await preFlightTxCheck();
  },
  onRemoteCreate: async (tx) => {
    try {
      // Syncs the new transaction to Quasar via Next.js Server Actions
      await syncTransaction(tx as TransactionUnion);
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
      const history = await getHistory({ walletAddress, page, limit: 10, appName: 'My App' });

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

### 4. Nova Transactions Provider (`NovaTransactionsProvider.tsx`)

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

### 5. The Seamless UI Integration (`AppProviders.tsx`)

```tsx
// src/providers/AppProviders.tsx
'use client';

import { SatelliteConnectProvider, useSatelliteConnection } from '@tuwaio/sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { satelliteEVMAdapter } from '@tuwaio/evm-sdk/satellite';
import { EVMConnectorsWatcher } from '@tuwaio/evm-sdk/nova-connect';
import { satelliteSolanaAdapter } from '@tuwaio/solana-sdk/satellite';
import { SolanaConnectorsWatcher } from '@tuwaio/solana-sdk/nova-connect';
import { useSiwx, useSiwxSession } from '@tuwaio/sdk/siwx';
import { isSafeApp, getAdapterFromConnectorType, OrbitAdapter } from '@tuwaio/sdk/orbit';

import { appEVMChains, solanaRPCUrls, wagmiConfig } from '@/configs/appConfig';
import { usePulsarInMemoryStore, usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';

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

  // Watch SIWX session to keep connection state aligned
  const siwxSession = useSiwxSession();
  const { signIn } = useSiwx();

  return (
    <SatelliteConnectProvider
      adapter={[satelliteEVMAdapter(wagmiConfig, appEVMChains), satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })]}
      autoConnect={true}
      callbackAfterConnected={async (connection) => {
        const isEVM = getAdapterFromConnectorType(connection.connectorType) === OrbitAdapter.EVM;
        if (isEVM && isSafeApp) return;

        // Trigger SIWX flow
        await signIn();

        // Fetch history slightly after connection and sign-in
        setTimeout(() => fetchInitial(connection.address), 2000);
      }}
    >
      <EVMConnectorsWatcher wagmiConfig={wagmiConfig} siwx={siwxSession} />
      <SolanaConnectorsWatcher siwx={siwxSession} />

      <NovaTransactionsProvider pagination={pagination} />

      <NovaConnectProvider
        appChains={appEVMChains}
        solanaRPCUrls={solanaRPCUrls}
        transactionPool={transactionsPool}
        pulsarAdapter={getAdapter()}
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

### 6. Creating a Transaction (Usage)

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

This package provides the following server-side utilities and React helpers:

- `Quasar` — The main server-side client class instance used to access `quasar.pulsar.*` methods.
- `preFlightTxCheck` — A client-side helper to ensure the user has a valid SIWX session and Quasar Cloud is reachable before prompting wallet signatures.

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

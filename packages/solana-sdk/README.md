# @tuwaio/solana-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/solana-sdk.svg)](https://www.npmjs.com/package/@tuwaio/solana-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/solana-sdk.svg)](./LICENSE)

The **Layer 9 (L9)** Solana Network Adapter SDK for the TUWA Ecosystem. Packages all Solana-compatible logic (`OrbitSolana`, `PulsarSolana`, `SatelliteSolana`, `SolanaConnectorsWatcher`) into clean subpath entry points.

---

## 🏛️ What is `@tuwaio/solana-sdk`?

`@tuwaio/solana-sdk` is **Layer 9 (L9)** of the TUWA ecosystem architecture — a **headless**, purely logical adapter SDK designed to teach the core `@tuwaio/sdk` (L8) how to interact with the Solana blockchain.

It completely avoids legacy `@solana/web3.js` classes and is built from the ground up on modern primitives: **Gill** and **Wallet Standard**. It provides standardized adapters for Wallet Connection (Satellite) and Transaction Tracking (Pulsar). This modular subpath approach ensures your app only ships Solana dependencies when you actually need them.

---

## ✨ Key Features

- **🪙 Solana Native**: Built entirely on Wallet Standard to ensure maximum forward compatibility.
- **🌐 Ecosystem Adapters**: Packages OrbitSolana, PulsarSolana, SatelliteSolana, and SolanaConnectorsWatcher under unified subpaths.
- **⚡ Subpath Architecture**: Clean subpath imports (`@tuwaio/solana-sdk/satellite`, `@tuwaio/solana-sdk/pulsar`, `@tuwaio/solana-sdk/orbit`, `@tuwaio/solana-sdk/nova-connect`).
- **🧩 Zero UI Bloat**: Focuses strictly on connection logic, standard wallet features, and transaction tracking adapters.
- **🔄 Standardized Auto-Discovery**: Seamlessly detects and connects to any browser extension that supports Wallet Standard (`SolanaConnectorsWatcher`).

---

## 💾 Installation

Install this package alongside the core SDK and the required Web3 singletons:

```bash
pnpm add @tuwaio/sdk @tuwaio/solana-sdk gill @wallet-standard/react @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

---

## 🚀 Quick Start (Solana Integration)

To cleanly integrate Solana wallets and transaction tracking with TUWA, you should adopt a modular architecture. Below is the recommended implementation pattern using subpath imports.

> **Note:** This example uses standard client-side state. For Quasar Cloud syncing and server-side tracking, see the full-stack guide in the core `@tuwaio/sdk` documentation.

### 1. Define Transaction Types (`types.ts`)

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

### 2. Tracking Store (`usePulsarStore.ts`)

Create a headless tracking store specifically for Solana transactions.

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { createPulsarStore, createBoundedUseStore } from '@tuwaio/sdk/pulsar';
import { pulsarSolanaAdapter } from '@tuwaio/solana-sdk/pulsar';
import { solanaRPCUrls } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

const initialStore = createPulsarStore<TransactionUnion>({
  name: 'tuwa-transactions-solana',
  adapter: [pulsarSolanaAdapter({ rpcUrls: solanaRPCUrls })],
});

export const usePulsarStore = createBoundedUseStore(initialStore);
```

### 3. Nova Transactions Provider (`NovaTransactionsProvider.tsx`)

Binds the React UI elements to the headless transaction state.

```tsx
// src/providers/NovaTransactionsProvider.tsx
'use client';

import { useSatelliteConnectStore } from '@tuwaio/sdk/satellite';
import { useInitializeTransactionsPool } from '@tuwaio/sdk/pulsar';
import { getAdapterFromConnectorType } from '@tuwaio/sdk/orbit';
import { NovaTransactionsProvider as NTP } from '@tuwaio/sdk/nova-transactions/providers';
import { usePulsarStore } from '@/hooks/usePulsarStore';

export function NovaTransactionsProvider() {
  const initialTx = usePulsarStore((s) => s.initialTx);
  const closeTxTrackedModal = usePulsarStore((s) => s.closeTxTrackedModal);
  const executeTxAction = usePulsarStore((s) => s.executeTxAction);
  const initializeTransactionsPool = usePulsarStore((s) => s.initializeTransactionsPool);
  const getAdapter = usePulsarStore((s) => s.getAdapter);
  const transactionsPool = usePulsarStore((s) => s.transactionsPool);

  const activeConnection = useSatelliteConnectStore((s) => s.activeConnection);

  useInitializeTransactionsPool({ initializeTransactionsPool });

  return (
    <NTP
      transactionsPool={transactionsPool}
      initialTx={initialTx}
      closeTxTrackedModal={closeTxTrackedModal}
      executeTxAction={executeTxAction}
      connectedWalletAddress={activeConnection?.isConnected ? activeConnection.address : undefined}
      connectedAdapterType={getAdapterFromConnectorType(activeConnection?.connectorType ?? 'solana:')}
      adapter={getAdapter()}
    />
  );
}
```

### 4. App Providers Layout (`AppProviders.tsx`)

Assembling the complete Solana layout. The `SolanaConnectorsWatcher` handles the standard wallet auto-discovery and syncs the state invisibly.

```tsx
// src/providers/AppProviders.tsx
'use client';

import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { satelliteSolanaAdapter } from '@tuwaio/solana-sdk/satellite';
import { SolanaConnectorsWatcher } from '@tuwaio/solana-sdk/nova-connect';

import { solanaRPCUrls } from '@/configs/appConfig';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const getAdapter = usePulsarStore((s) => s.getAdapter);
  const transactionsPool = usePulsarStore((s) => s.transactionsPool);

  return (
    <SatelliteConnectProvider adapter={[satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })]} autoConnect={true}>
      <SolanaConnectorsWatcher />

      <NovaTransactionsProvider />

      <NovaConnectProvider
        solanaRPCUrls={solanaRPCUrls}
        transactionPool={transactionsPool}
        pulsarAdapter={getAdapter() as any}
        withImpersonated
        withBalance
        withChain
      >
        {children}
      </NovaConnectProvider>
    </SatelliteConnectProvider>
  );
}
```

### 5. Creating a Solana Transaction (Usage)

Now you can safely execute strictly-typed transactions anywhere in your app.

```tsx
// src/components/SwapButton.tsx
'use client';

import { OrbitAdapter } from '@tuwaio/sdk/orbit';
import { useSatelliteConnectStore } from '@tuwaio/sdk/satellite';
import { TxActionButton } from '@tuwaio/sdk/nova-transactions';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { AppTxType } from '@/types';

export function SwapButton() {
  const executeTxAction = usePulsarStore((s) => s.executeTxAction);
  const getLastTxKey = usePulsarStore((s) => s.getLastTxKey);
  const transactionsPool = usePulsarStore((s) => s.transactionsPool);
  const activeConnection = useSatelliteConnectStore((s) => s.activeConnection);

  const handleSwapAction = async () => {
    await executeTxAction({
      actionFunction: async () => {
        /* solana web3 contract call */
      },
      params: {
        adapter: OrbitAdapter.SOLANA,
        type: AppTxType.SWAP,
        title: 'Token Swap',
        payload: { tokenIn: 'USDC', tokenOut: 'SOL', amount: 100 },
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
      Execute Solana Swap
    </TxActionButton>
  );
}
```

---

## 📦 Available Subpath Exports

- **`@tuwaio/solana-sdk/satellite`** — Solana Satellite adapter (`satelliteSolanaAdapter`).
- **`@tuwaio/solana-sdk/pulsar`** — Solana Pulsar adapter (`pulsarSolanaAdapter`).
- **`@tuwaio/solana-sdk/orbit`** — Solana Orbit helpers & types.
- **`@tuwaio/solana-sdk/nova-connect`** — Solana React watcher component (`SolanaConnectorsWatcher`).

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

# @tuwaio/evm-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/evm-sdk.svg)](https://www.npmjs.com/package/@tuwaio/evm-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/evm-sdk.svg)](./LICENSE)

The **Layer 9 (L9)** EVM Network Adapter SDK for the TUWA Ecosystem. Packages all Ethereum-compatible logic (`OrbitEVM`, `PulsarEVM`, `SatelliteEVM`, `EVMConnectorsWatcher`) into clean subpath entry points.

---

## 🏛️ What is `@tuwaio/evm-sdk`?

`@tuwaio/evm-sdk` is **Layer 9 (L9)** of the TUWA ecosystem architecture — a **headless**, purely logical adapter SDK designed to teach the core `@tuwaio/sdk` (L8) how to interact with EVM-compatible blockchains.

It securely wraps `viem` and `@wagmi/core`, providing standardized adapters for Wallet Connection (Satellite) and Transaction Tracking (Pulsar). This modular subpath approach ensures your app only ships EVM dependencies when you actually need them.

---

## ✨ Key Features

- **⛓️ EVM Native**: Full support for Wagmi config creation, Viem transports, and injected connectors.
- **🌐 Ecosystem Adapters**: Packages OrbitEVM, PulsarEVM, SatelliteEVM, and EVMConnectorsWatcher under unified subpaths.
- **⚡ Subpath Architecture**: Clean subpath imports (`@tuwaio/evm-sdk/satellite`, `@tuwaio/evm-sdk/pulsar`, `@tuwaio/evm-sdk/orbit`, `@tuwaio/evm-sdk/nova-connect`).
- **🧩 Zero UI Bloat**: Focuses strictly on connection logic and transaction processing adapters.
- **🔄 State Sync & Watchers**: Includes background watchers (`EVMConnectorsWatcher`) that automatically sync Wagmi state with Satellite's unified store.

---

## 💾 Installation

Install this package alongside the core SDK and the required Web3 singletons:

```bash
pnpm add @tuwaio/sdk @tuwaio/evm-sdk viem @wagmi/core
```

---

## 🚀 Quick Start (EVM Integration)

To cleanly integrate EVM wallets and transaction tracking with TUWA, you should adopt a modular architecture. Below is the recommended implementation pattern using subpath imports.

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

Create a headless tracking store specifically for EVM transactions.

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { createPulsarStore, createBoundedUseStore } from '@tuwaio/sdk/pulsar';
import { pulsarEvmAdapter } from '@tuwaio/evm-sdk/pulsar';
import { wagmiConfig, appEVMChains } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

const initialStore = createPulsarStore<TransactionUnion>({
  name: 'tuwa-transactions-evm',
  adapter: [pulsarEvmAdapter(wagmiConfig, appEVMChains)],
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
  const initialTx = usePulsarStore((state) => state.initialTx);
  const closeTxTrackedModal = usePulsarStore((state) => state.closeTxTrackedModal);
  const executeTxAction = usePulsarStore((state) => state.executeTxAction);
  const initializeTransactionsPool = usePulsarStore((state) => state.initializeTransactionsPool);
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarStore((state) => state.transactionsPool);

  const activeConnection = useSatelliteConnectStore((state) => state.activeConnection);

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
    />
  );
}
```

### 4. App Providers Layout (`AppProviders.tsx`)

Assembling the complete EVM layout. The `EVMConnectorsWatcher` runs invisibly in the background to sync Wagmi's state with the unified `SatelliteConnectProvider` store.

```tsx
// src/providers/AppProviders.tsx
'use client';

import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { satelliteEVMAdapter } from '@tuwaio/evm-sdk/satellite';
import { EVMConnectorsWatcher } from '@tuwaio/evm-sdk/nova-connect';

import { appEVMChains, wagmiConfig } from '@/configs/appConfig';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarStore((state) => state.transactionsPool);

  return (
    <SatelliteConnectProvider adapter={[satelliteEVMAdapter(wagmiConfig, appEVMChains)]} autoConnect={true}>
      <EVMConnectorsWatcher wagmiConfig={wagmiConfig} />

      <NovaTransactionsProvider />

      <NovaConnectProvider
        appChains={appEVMChains}
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

### 5. Creating an EVM Transaction (Usage)

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
        /* your wagmi contract call */
      },
      params: {
        adapter: OrbitAdapter.EVM,
        type: AppTxType.SWAP,
        title: 'Token Swap',
        desiredChainID: 1,
        payload: { tokenIn: 'USDC', tokenOut: 'ETH', amount: 100 },
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
      Execute EVM Swap
    </TxActionButton>
  );
}
```

---

## 📦 Available Subpath Exports

- **`@tuwaio/evm-sdk/satellite`** — EVM Satellite adapter (`satelliteEVMAdapter`, `createEVMConnectionsWatcher`, `checkIsWalletAddressContract`, `impersonated`).
- **`@tuwaio/evm-sdk/pulsar`** — EVM Pulsar adapter (`pulsarEvmAdapter`).
- **`@tuwaio/evm-sdk/orbit`** — EVM Orbit helpers & types.
- **`@tuwaio/evm-sdk/nova-connect`** — EVM React watcher component (`EVMConnectorsWatcher`).

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

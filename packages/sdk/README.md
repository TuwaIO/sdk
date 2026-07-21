# @tuwaio/sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/sdk.svg)](https://www.npmjs.com/package/@tuwaio/sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/sdk.svg)](./LICENSE)

The Core Umbrella SDK for the TUWA Ecosystem. It provides a unified entry point for `Orbit`, `Pulsar`, `Satellite`, and `Nova UI` core layers, minimizing boilerplate while ensuring maximum type safety.

---

## 🏛️ What is `@tuwaio/sdk`?

`@tuwaio/sdk` is the massive, all-in-one UI and Logic foundation for the TUWA ecosystem. Instead of manually resolving versions and importing from a dozen decoupled packages (`@tuwaio/pulsar-core`, `@tuwaio/nova-connect`, etc.), you install this single SDK and access beautifully namespaced exports. 

It abstracts away complex dependency management (automatically handling `zustand`, `framer-motion`, `radix-ui`, etc.) and lets you focus on building your application.

---

## ✨ Key Features

- **📦 Zero-Config Integration**: Combines blockchain connection layers with beautiful React UI components out of the box.
- **⚡ Namespaced Architecture**: Clean exports without naming collisions (e.g., `PulsarCore`, `SatelliteReact`).
- **🎨 Includes Nova UI**: Access beautifully styled wallet connection modals and transaction toasts without additional configuration.
- **🛡️ Strict Singleton Contexts**: Uses intelligent peer dependencies to ensure you never run into multiple instances of React or Web3 singletons.

---

## 💾 Installation

To install the core SDK, simply run:

```bash
pnpm add @tuwaio/sdk react react-dom
```

*Note: For network-specific capabilities, you must also install either `@tuwaio/evm-sdk` or `@tuwaio/solana-sdk`.*

---

## 🚀 Quick Start (Multi-Chain Integration)

The true power of the TUWA Umbrella SDKs is composability. Below is a complete production-grade architectural guide showing how to compose **EVM**, **Solana**, headless transaction state, and Nova UI layers effortlessly.

> **Note:** This example uses standard client-side state. If you are building a Quasar-powered app (with cloud syncing, history, and pagination), please refer to the `@tuwaio/quasar-sdk` documentation.

### 1. Define Your Transaction Types (`types.ts`)

First, define the strict union of all possible transactions your app supports.

```ts
// src/types.ts
import { PulsarCore } from '@tuwaio/sdk';

export enum AppTxType { SWAP = 'SWAP' }

export type SwapTx = PulsarCore.Transaction & {
  type: AppTxType.SWAP;
  payload: { tokenIn: string; tokenOut: string; amount: number };
};

export type TransactionUnion = SwapTx;
```

### 2. Multi-Chain Tracking Store (`usePulsarStore.ts`)

Configure the headless tracking store with both EVM and Solana adapters.

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { PulsarCore } from '@tuwaio/sdk';
import { PulsarEVM } from '@tuwaio/evm-sdk';
import { PulsarSolana } from '@tuwaio/solana-sdk';

import { wagmiConfig, appEVMChains, solanaRPCUrls } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

// Create the headless tracking store with BOTH EVM and Solana adapters
const initialStore = PulsarCore.createPulsarStore<TransactionUnion>({
  name: 'tuwa-transactions-multi',
  adapter: [
    PulsarEVM.pulsarEvmAdapter(wagmiConfig, appEVMChains),
    PulsarSolana.pulsarSolanaAdapter({ rpcUrls: solanaRPCUrls }),
  ],
});

export const usePulsarStore = PulsarCore.createBoundedUseStore(initialStore);
```

### 3. Nova Transactions Provider (`NovaTransactionsProvider.tsx`)

Binds the React UI elements to the headless transaction state.

```tsx
// src/providers/NovaTransactionsProvider.tsx
'use client';

import { SatelliteReact, NovaTransactions, OrbitCore, PulsarReact } from '@tuwaio/sdk';
import { usePulsarStore } from '@/hooks/usePulsarStore';

export function NovaTransactionsProvider() {
  const initialTx = usePulsarStore((state) => state.initialTx);
  const closeTxTrackedModal = usePulsarStore((state) => state.closeTxTrackedModal);
  const executeTxAction = usePulsarStore((state) => state.executeTxAction);
  const initializeTransactionsPool = usePulsarStore((state) => state.initializeTransactionsPool);
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarStore((state) => state.transactionsPool);
  
  const activeConnection = SatelliteReact.useSatelliteConnectStore((state) => state.activeConnection);

  PulsarReact.useInitializeTransactionsPool({ initializeTransactionsPool });

  return (
    <NovaTransactions.NovaTransactionsProvider
      transactionsPool={transactionsPool}
      initialTx={initialTx}
      closeTxTrackedModal={closeTxTrackedModal}
      executeTxAction={executeTxAction}
      connectedWalletAddress={activeConnection?.isConnected ? activeConnection.address : undefined}
      connectedAdapterType={OrbitCore.getAdapterFromConnectorType(activeConnection?.connectorType ?? 'evm:')}
      adapter={getAdapter()}
    />
  );
}
```

### 4. App Providers Layout (`AppProviders.tsx`)

Assembling the complete multi-chain ecosystem layout. Notice how both `EVMConnectorsWatcher` and `SolanaConnectorsWatcher` operate simultaneously in the background.

```tsx
// src/providers/AppProviders.tsx
'use client';

import { NovaConnect, SatelliteReact } from '@tuwaio/sdk';
import { SatelliteEVM } from '@tuwaio/evm-sdk';
import { SatelliteSolana } from '@tuwaio/solana-sdk';

import { appEVMChains, solanaRPCUrls, wagmiConfig } from '@/configs/appConfig';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarStore((state) => state.transactionsPool);

  return (
    <SatelliteReact.SatelliteConnectProvider
      adapter={[
        SatelliteEVM.satelliteEVMAdapter(wagmiConfig, appEVMChains),
        SatelliteSolana.satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })
      ]}
      autoConnect={true}
    >
      <SatelliteEVM.EVMConnectorsWatcher wagmiConfig={wagmiConfig} />
      <SatelliteSolana.SolanaConnectorsWatcher />
      
      <NovaTransactionsProvider />
      
      <NovaConnect.NovaConnectProvider
        appChains={appEVMChains}
        solanaRPCUrls={solanaRPCUrls}
        transactionPool={transactionsPool}
        pulsarAdapter={getAdapter() as any}
        withImpersonated
        withBalance
        withChain
      >
        {children}
      </NovaConnect.NovaConnectProvider>
    </SatelliteReact.SatelliteConnectProvider>
  );
}
```

### 5. Creating a Multi-Chain Transaction (Usage)

Now you can safely execute strictly-typed, cross-chain transactions anywhere in your app. The store automatically routes the transaction to the correct adapter.

```tsx
// src/components/SwapButton.tsx
'use client';

import { OrbitCore, NovaTransactions, SatelliteReact } from '@tuwaio/sdk';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { AppTxType } from '@/types';

export function SwapButton() {
  const executeTxAction = usePulsarStore((s) => s.executeTxAction);
  const getLastTxKey = usePulsarStore((s) => s.getLastTxKey);
  const transactionsPool = usePulsarStore((s) => s.transactionsPool);
  const activeConnection = SatelliteReact.useSatelliteConnectStore((s) => s.activeConnection);

  const handleSwapAction = async () => {
    // Dynamically determine the adapter based on the currently connected wallet
    const adapterType = OrbitCore.getAdapterFromConnectorType(activeConnection?.connectorType ?? 'evm:');

    await executeTxAction({
      actionFunction: async () => { /* your wagmi/solana contract call */ },
      params: {
        adapter: adapterType,
        type: AppTxType.SWAP,
        title: 'Token Swap',
        desiredChainID: adapterType === OrbitCore.OrbitAdapter.EVM ? 1 : undefined,
        payload: { tokenIn: 'USDC', tokenOut: adapterType === OrbitCore.OrbitAdapter.EVM ? 'ETH' : 'SOL', amount: 100 },
      },
    });
  };

  return (
    <NovaTransactions.TxActionButton
      action={handleSwapAction}
      getLastTxKey={getLastTxKey}
      transactionsPool={transactionsPool}
      walletAddress={activeConnection?.address}
    >
      Cross-Chain Swap
    </NovaTransactions.TxActionButton>
  );
}
```

---

## 📦 Available Namespaces

This package re-exports the framework-agnostic and UI layers of TUWA:

- `OrbitCore` ([@tuwaio/orbit-core](https://github.com/TuwaIO/orbit))
- `PulsarCore` ([@tuwaio/pulsar-core](https://github.com/TuwaIO/pulsar-core))
- `PulsarReact` ([@tuwaio/pulsar-react](https://github.com/TuwaIO/pulsar-core))
- `SatelliteCore` ([@tuwaio/satellite-core](https://github.com/TuwaIO/satellite-connect))
- `SatelliteReact` ([@tuwaio/satellite-react](https://github.com/TuwaIO/satellite-connect))
- `SatelliteSiwe` ([@tuwaio/satellite-siwe-next-auth](https://github.com/TuwaIO/satellite-connect))
- `NovaCore` ([@tuwaio/nova-core](https://github.com/TuwaIO/nova-uikit))
- `NovaConnect` ([@tuwaio/nova-connect](https://github.com/TuwaIO/nova-uikit))
- `NovaTransactions` ([@tuwaio/nova-transactions](https://github.com/TuwaIO/nova-uikit))

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

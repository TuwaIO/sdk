# @tuwaio/evm-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/evm-sdk.svg)](https://www.npmjs.com/package/@tuwaio/evm-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/evm-sdk.svg)](./LICENSE)

The EVM Adapter SDK for the TUWA Ecosystem. Packages all Ethereum-compatible logic (`OrbitEVM`, `PulsarEVM`, `SatelliteEVM`) into a single import point.

---

## 🏛️ What is `@tuwaio/evm-sdk`?

`@tuwaio/evm-sdk` is a **headless**, purely logical adapter SDK designed to teach the core `@tuwaio/sdk` how to interact with EVM-compatible blockchains. 

It does **not** contain React or UI components. Instead, it securely wraps `viem` and `@wagmi/core`, providing standardized adapters for Wallet Connection (Satellite) and Transaction Tracking (Pulsar). This modular approach ensures your app only ships EVM dependencies when you actually need them.

---

## ✨ Key Features

- **⛓️ EVM Native**: Full support for Wagmi config creation, Viem transports, and injected connectors.
- **⚡ Namespaced Architecture**: Clean exports without naming collisions (e.g., `SatelliteEVM`, `PulsarEVM`).
- **🧩 Zero UI Bloat**: Focuses strictly on connection logic and transaction processing.
- **🔄 Sync & Watchers**: Includes background watchers that automatically sync Wagmi state with Satellite's unified store.

---

## 💾 Installation

Install this package alongside the core SDK and the required Web3 singletons:

```bash
pnpm add @tuwaio/sdk @tuwaio/evm-sdk viem @wagmi/core
```

---

## 🚀 Quick Start (EVM Integration)

To cleanly integrate EVM wallets and transaction tracking with TUWA, you should adopt a modular architecture. Below is the recommended implementation pattern.

> **Note:** This example uses standard client-side state. For Quasar Cloud syncing and server-side tracking, see the full-stack guide in the core `@tuwaio/sdk` documentation.

### 1. Define Transaction Types (`types.ts`)

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

### 2. Tracking Store (`usePulsarStore.ts`)

Create a headless tracking store specifically for EVM transactions.

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { PulsarCore } from '@tuwaio/sdk';
import { PulsarEVM } from '@tuwaio/evm-sdk';
import { wagmiConfig, appEVMChains } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

const initialStore = PulsarCore.createPulsarStore<TransactionUnion>({
  name: 'tuwa-transactions-evm',
  adapter: [PulsarEVM.pulsarEvmAdapter(wagmiConfig, appEVMChains)],
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

Assembling the complete EVM layout. The `EVMConnectorsWatcher` runs invisibly in the background to sync Wagmi's state with the unified `SatelliteReact` store.

```tsx
// src/providers/AppProviders.tsx
'use client';

import { NovaConnect, SatelliteReact } from '@tuwaio/sdk';
import { SatelliteEVM } from '@tuwaio/evm-sdk';

import { appEVMChains, wagmiConfig } from '@/configs/appConfig';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarStore((state) => state.transactionsPool);

  return (
    <SatelliteReact.SatelliteConnectProvider
      adapter={[SatelliteEVM.satelliteEVMAdapter(wagmiConfig, appEVMChains)]}
      autoConnect={true}
    >
      <SatelliteEVM.EVMConnectorsWatcher wagmiConfig={wagmiConfig} />
      
      <NovaTransactionsProvider />
      
      <NovaConnect.NovaConnectProvider
        appChains={appEVMChains}
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

### 5. Creating an EVM Transaction (Usage)

Now you can safely execute strictly-typed transactions anywhere in your app.

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
    await executeTxAction({
      actionFunction: async () => { /* your wagmi contract call */ },
      params: {
        adapter: OrbitCore.OrbitAdapter.EVM,
        type: AppTxType.SWAP,
        title: 'Token Swap',
        desiredChainID: 1,
        payload: { tokenIn: 'USDC', tokenOut: 'ETH', amount: 100 },
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
      Execute EVM Swap
    </NovaTransactions.TxActionButton>
  );
}
```

---

## 📦 Available Namespaces

- `OrbitEVM` ([@tuwaio/orbit-evm](https://github.com/TuwaIO/orbit))
- `PulsarEVM` ([@tuwaio/pulsar-evm](https://github.com/TuwaIO/pulsar-core))
- `SatelliteEVM` ([@tuwaio/satellite-evm](https://github.com/TuwaIO/satellite-connect))

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

# @tuwaio/solana-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/solana-sdk.svg)](https://www.npmjs.com/package/@tuwaio/solana-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/solana-sdk.svg)](./LICENSE)

The Solana Adapter SDK for the TUWA Ecosystem. Packages all Solana-compatible logic (`OrbitSolana`, `PulsarSolana`, `SatelliteSolana`) into a single import point.

---

## 🏛️ What is `@tuwaio/solana-sdk`?

`@tuwaio/solana-sdk` is a **headless**, purely logical adapter SDK designed to teach the core `@tuwaio/sdk` how to interact with the Solana blockchain. 

It completely avoids legacy `@solana/web3.js` classes and is built from the ground up on modern primitives: **Gill** and **Wallet Standard**. It provides standardized adapters for Wallet Connection (Satellite) and Transaction Tracking (Pulsar). This modular approach ensures your app only ships Solana dependencies when you actually need them.

---

## ✨ Key Features

- **🪙 Solana Native**: Built entirely on Wallet Standard to ensure maximum forward compatibility.
- **⚡ Namespaced Architecture**: Clean exports without naming collisions (e.g., `SatelliteSolana`, `PulsarSolana`).
- **🧩 Zero UI Bloat**: Focuses strictly on connection logic, standard wallet features, and transaction tracking.
- **🔄 Standardized Auto-Discovery**: Seamlessly detects and connects to any browser extension that supports Wallet Standard.

---

## 💾 Installation

Install this package alongside the core SDK and the required Web3 singletons:

```bash
pnpm add @tuwaio/sdk @tuwaio/solana-sdk gill @wallet-standard/react @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

---

## 🚀 Quick Start (Solana Integration)

To cleanly integrate Solana wallets and transaction tracking with TUWA, you should adopt a modular architecture. Below is the recommended implementation pattern.

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

Create a headless tracking store specifically for Solana transactions.

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { PulsarCore } from '@tuwaio/sdk';
import { PulsarSolana } from '@tuwaio/solana-sdk';
import { solanaRPCUrls } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

const initialStore = PulsarCore.createPulsarStore<TransactionUnion>({
  name: 'tuwa-transactions-solana',
  adapter: [PulsarSolana.pulsarSolanaAdapter({ rpcUrls: solanaRPCUrls })],
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
      connectedAdapterType={OrbitCore.getAdapterFromConnectorType(activeConnection?.connectorType ?? 'solana:')}
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

import { NovaConnect, SatelliteReact } from '@tuwaio/sdk';
import { SatelliteSolana } from '@tuwaio/solana-sdk';

import { solanaRPCUrls } from '@/configs/appConfig';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarStore((state) => state.transactionsPool);

  return (
    <SatelliteReact.SatelliteConnectProvider
      adapter={[SatelliteSolana.satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })]}
      autoConnect={true}
    >
      <SatelliteSolana.SolanaConnectorsWatcher />
      
      <NovaTransactionsProvider />
      
      <NovaConnect.NovaConnectProvider
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

### 5. Creating a Solana Transaction (Usage)

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
      actionFunction: async () => { /* solana web3 contract call */ },
      params: {
        adapter: OrbitCore.OrbitAdapter.SOLANA,
        type: AppTxType.SWAP,
        title: 'Token Swap',
        payload: { tokenIn: 'USDC', tokenOut: 'SOL', amount: 100 },
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
      Execute Solana Swap
    </NovaTransactions.TxActionButton>
  );
}
```

---

## 📦 Available Namespaces

- `OrbitSolana` ([@tuwaio/orbit-solana](https://github.com/TuwaIO/orbit))
- `PulsarSolana` ([@tuwaio/pulsar-solana](https://github.com/TuwaIO/pulsar-core))
- `SatelliteSolana` ([@tuwaio/satellite-solana](https://github.com/TuwaIO/satellite-connect))

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

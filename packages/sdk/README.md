# @tuwaio/sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/sdk.svg)](https://www.npmjs.com/package/@tuwaio/sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/sdk.svg)](./LICENSE)

The **Layer 8 (L8)** Core Umbrella SDK for the TUWA Ecosystem. It provides a unified entry point bundling `Orbit`, `Pulsar`, `Satellite`, and `Nova UI` core layers into modular subpath entrypoints, minimizing boilerplate while ensuring maximum type safety.

---

## 🏛️ What is `@tuwaio/sdk`?

`@tuwaio/sdk` is **Layer 8 (L8)** of the TUWA ecosystem architecture — the all-in-one UI and Logic foundation. Instead of manually resolving versions and importing from a dozen decoupled packages (`@tuwaio/pulsar-core`, `@tuwaio/nova-connect`, etc.), you install this single SDK and access clean, modular subpath exports.

It abstracts away complex dependency management (automatically handling `zustand`, `framer-motion`, `radix-ui`, `siwe`, `iron-session`, etc.) and lets you focus on building your application.

---

## ✨ Key Features

- **📦 Zero-Config Integration**: Combines Orbit (adapters), Pulsar (tracking), Satellite (connections), and Nova (UI) out of the box.
- **⚡ Modular Subpath Imports**: Clean exports for each domain (e.g. `@tuwaio/sdk/pulsar`, `@tuwaio/sdk/satellite`, `@tuwaio/sdk/orbit`, `@tuwaio/sdk/nova-connect`).
- **🎨 Includes Nova UI & Styles**: Access beautifully styled wallet connection modals and transaction toasts with simple CSS imports (`@import '@tuwaio/sdk/styles/all.css'`).
- **🛡️ Strict Singleton Contexts**: Uses intelligent peer dependencies to ensure you never run into multiple instances of React or Web3 singletons.

---

## 💾 Installation

To install the core SDK, simply run:

```bash
pnpm add @tuwaio/sdk react react-dom
```

_Note: For network-specific capabilities, you must also install either `@tuwaio/evm-sdk` or `@tuwaio/solana-sdk`._

---

## 🎨 Styles Configuration

Import the bundled CSS styles into your global CSS file (e.g., `globals.css`):

```css
/* Import all Nova UI styles at once */
@import '@tuwaio/sdk/styles/all.css';

/* Optional: if your dApp uses Tailwind CSS v4 */
@import 'tailwindcss';

/* Or import individually if needed */
/* @import '@tuwaio/sdk/styles/nova-core.css'; */
/* @import '@tuwaio/sdk/styles/nova-connect.css'; */
/* @import '@tuwaio/sdk/styles/nova-transactions.css'; */
```

> **Note**: Nova UI components include fully compiled, self-contained styles inside `@tuwaio/sdk/styles/all.css`. Tailwind CSS is **optional** — we use Tailwind utility classes in our documentation layout examples for convenience, but you can use any styling solution (CSS Modules, Styled Components, Vanilla CSS) for your dApp layout. If you do use Tailwind CSS v4 in your project, include `@import 'tailwindcss';` in your global CSS file.

---

## 🚀 Quick Start (Multi-Chain Integration)

The true power of the TUWA Umbrella SDKs is composability. Below is a complete production-grade architectural guide showing how to compose **EVM**, **Solana**, headless transaction state, and Nova UI layers effortlessly.

> **Note:** This example uses standard client-side state. If you are building a Quasar-powered app (with cloud syncing, history, and pagination), please refer to the `@tuwaio/quasar-sdk` documentation.

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

### 2. Multi-Chain Tracking Store (`usePulsarStore.ts`)

Configure the headless tracking store with both EVM and Solana adapters.

```ts
// src/hooks/usePulsarStore.ts
'use client';

import { createPulsarStore, createBoundedUseStore } from '@tuwaio/sdk/pulsar';
import { pulsarEvmAdapter } from '@tuwaio/evm-sdk/pulsar';
import { pulsarSolanaAdapter } from '@tuwaio/solana-sdk/pulsar';

import { wagmiConfig, appEVMChains, solanaRPCUrls } from '@/configs/appConfig';
import { TransactionUnion } from '@/types';

// Create the headless tracking store with BOTH EVM and Solana adapters
const initialStore = createPulsarStore<TransactionUnion>({
  name: 'tuwa-transactions-multi',
  adapter: [pulsarEvmAdapter(wagmiConfig, appEVMChains), pulsarSolanaAdapter({ rpcUrls: solanaRPCUrls })],
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
      connectedAdapterType={getAdapterFromConnectorType(activeConnection?.connectorType ?? 'evm:')}
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

import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { satelliteEVMAdapter } from '@tuwaio/evm-sdk/satellite';
import { EVMConnectorsWatcher } from '@tuwaio/evm-sdk/nova-connect';
import { satelliteSolanaAdapter } from '@tuwaio/solana-sdk/satellite';
import { SolanaConnectorsWatcher } from '@tuwaio/solana-sdk/nova-connect';

import { appEVMChains, solanaRPCUrls, wagmiConfig } from '@/configs/appConfig';
import { usePulsarStore } from '@/hooks/usePulsarStore';
import { NovaTransactionsProvider } from '@/providers/NovaTransactionsProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const getAdapter = usePulsarStore((state) => state.getAdapter);
  const transactionsPool = usePulsarStore((state) => state.transactionsPool);

  return (
    <SatelliteConnectProvider
      adapter={[satelliteEVMAdapter(wagmiConfig, appEVMChains), satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })]}
      autoConnect={true}
    >
      <EVMConnectorsWatcher wagmiConfig={wagmiConfig} />
      <SolanaConnectorsWatcher />

      <NovaTransactionsProvider />

      <NovaConnectProvider
        appChains={appEVMChains}
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

### 5. Creating a Multi-Chain Transaction (Usage)

Now you can safely execute strictly-typed, cross-chain transactions anywhere in your app. The store automatically routes the transaction to the correct adapter.

```tsx
// src/components/SwapButton.tsx
'use client';

import { getAdapterFromConnectorType, OrbitAdapter } from '@tuwaio/sdk/orbit';
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
    const adapterType = activeConnection?.connectorType
      ? getAdapterFromConnectorType(activeConnection.connectorType)
      : OrbitAdapter.EVM;
    const isEvm = adapterType === OrbitAdapter.EVM;

    await executeTxAction({
      actionFunction: async () => {
        // Execute smart contract call (e.g. writeContract via Viem/Wagmi or sendTransaction via Gill)
        /* return await swapTokensContractCall(); */
      },
      onSuccess: (tx) => {
        console.log('Swap transaction completed successfully:', tx);
      },
      params: {
        type: AppTxType.SWAP,
        adapter: adapterType,
        desiredChainID: isEvm ? 1 : 'mainnet',
        rpcUrl: isEvm ? undefined : activeConnection?.rpcURL,
        title: ['Swapping Tokens', 'Tokens Swapped', 'Error During Swap', 'Swap Transaction Replaced'],
        description: [
          `Swapping 100 USDC for ${isEvm ? 'ETH' : 'SOL'}...`,
          `Success! Swapped 100 USDC for ${isEvm ? 'ETH' : 'SOL'}.`,
          'Something went wrong during token swap.',
          'Transaction was replaced in wallet.',
        ],
        payload: {
          tokenIn: 'USDC',
          tokenOut: isEvm ? 'ETH' : 'SOL',
          amount: 100,
        },
        withTrackedModal: true,
        requiredConfirmations: isEvm ? 3 : undefined,
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

## 📦 Available Subpath Exports

This package provides direct subpath entry points for clean, tree-shakeable imports:

- **`@tuwaio/sdk/pulsar`** — State machine & tracking stores (`createPulsarStore`, `createTxInMemoryStore`, `useInitializeTransactionsPool`).
- **`@tuwaio/sdk/satellite`** — Wallet state & react hooks (`useSatelliteConnectStore`, `SatelliteConnectProvider`, `useAccount`).
- **`@tuwaio/sdk/satellite/siwe`** — Client-side SIWE authentication utilities.
- **`@tuwaio/sdk/satellite/siwe/server`** — Server-side SIWE API handler (`createSiweApiHandler`).
- **`@tuwaio/sdk/nova-connect`** — Connect UI main entry (`ConnectButton`, `NovaConnectProvider`).
- **`@tuwaio/sdk/nova-connect/components`** — Standalone UI components (`ConnectButton`, Modals, Customization interfaces).
- **`@tuwaio/sdk/nova-connect/hooks`** — Helper hooks (`useGetWalletNameAndAvatar`, `useWalletChainsList`).
- **`@tuwaio/sdk/nova-connect/i18n`** — Internationalization and label providers (`NovaConnectLabelsProvider`).
- **`@tuwaio/sdk/nova-transactions`** — Transaction UI components (`TxActionButton`).
- **`@tuwaio/sdk/nova-transactions/providers`** — Transaction UI provider (`NovaTransactionsProvider`).
- **`@tuwaio/sdk/nova-core`** — UI Core variables, base components, and utilities.
- **`@tuwaio/sdk/orbit`** — Core multi-chain types and adapters (`OrbitAdapter`, `getAdapterFromConnectorType`).
- **`@tuwaio/sdk/styles/all.css`** — Complete bundled stylesheet for Nova UI components.

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

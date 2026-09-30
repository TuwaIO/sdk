# @tuwaio/evm-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/evm-sdk.svg)](https://www.npmjs.com/package/@tuwaio/evm-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/evm-sdk.svg)](https://github.com/TuwaIO/sdk/blob/main/packages/evm-sdk/LICENSE)

`@tuwaio/evm-sdk` is the EVM add-on (Layer 9, L9) of [`@tuwaio/sdk`](https://sdk.docs.tuwa.io/packages/sdk). It re-exports the EVM packages of the TUWA projects under subpaths — Orbit Utils, Satellite Connect, Pulsar, SIWX and Nova Connect — built on [`viem`](https://viem.sh) and [`@wagmi/core`](https://wagmi.sh/core). An app with EVM wallets installs `@tuwaio/sdk` and this package; nothing of it is loaded in a Solana-only app.

---

## 🏛️ Core Capabilities

- **Chain packages in one install:** `@tuwaio/orbit-evm`, `@tuwaio/satellite-evm`, `@tuwaio/pulsar-evm` and `@tuwaio/siwx-evm` are dependencies, pinned to versions that work with the same release of `@tuwaio/sdk`.
- **Nova Connect for EVM:** importing `@tuwaio/evm-sdk/nova-connect` registers the EVM chain helpers of `@tuwaio/orbit-evm` for the chain lists of Nova Connect, types `appChains` of `NovaConnectProvider` as your viem chains and adds the EVM connection types to Satellite Connect. It goes through `@tuwaio/sdk/nova-connect/evm`, so this applies to the `NovaConnectProvider` and `SatelliteConnectProvider` that `@tuwaio/sdk` exports.
- **Subpaths:** every subpath re-exports one package, unchanged. Its reference is on the site of that package.

---

## 💾 Installation

```bash
pnpm add @tuwaio/sdk @tuwaio/evm-sdk @wagmi/core viem react react-dom
```

Peer dependencies: `@tuwaio/sdk` (the same release line), `@wagmi/core` (3.x), `viem` (2.x) and `@tuwaio/satellite-core` (>=0.6, a dependency of `@tuwaio/sdk`).

| Import path                    | Re-exports                                         | Reference                                                                                 |
| ------------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `@tuwaio/evm-sdk/orbit`        | `@tuwaio/orbit-evm`                                | [orbit.docs.tuwa.io](https://orbit.docs.tuwa.io/packages/orbit-evm)                       |
| `@tuwaio/evm-sdk/satellite`    | `@tuwaio/satellite-evm`                            | [satellite.docs.tuwa.io](https://satellite.docs.tuwa.io/packages/satellite-evm)           |
| `@tuwaio/evm-sdk/pulsar`       | `@tuwaio/pulsar-evm`                               | [pulsar.docs.tuwa.io](https://pulsar.docs.tuwa.io/packages/pulsar-evm)                    |
| `@tuwaio/evm-sdk/siwx`         | `@tuwaio/siwx-evm`                                 | [siwx.docs.tuwa.io](https://siwx.docs.tuwa.io/packages/siwx-evm)                          |
| `@tuwaio/evm-sdk/nova-connect` | `@tuwaio/nova-connect/evm` (through `@tuwaio/sdk`) | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-connect-evm-overview--docs) |

---

## 🚀 Usage

```tsx
'use client';

import { EVMConnectorsWatcher } from '@tuwaio/evm-sdk/nova-connect';
import { pulsarEvmAdapter } from '@tuwaio/evm-sdk/pulsar';
import { createDefaultTransports, satelliteEVMAdapter } from '@tuwaio/evm-sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { createPulsarStore } from '@tuwaio/sdk/pulsar';
import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { createConfig, injected } from '@wagmi/core';
import type { ReactNode } from 'react';
import { base, mainnet } from 'viem/chains';

const appChains = [mainnet, base] as const;
const wagmiConfig = createConfig({
  chains: appChains,
  connectors: [injected()],
  transports: createDefaultTransports(appChains),
});

export const pulsarStore = createPulsarStore({
  name: 'my-app-transactions',
  adapter: [pulsarEvmAdapter(wagmiConfig, appChains)],
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SatelliteConnectProvider adapter={satelliteEVMAdapter(wagmiConfig, appChains)} autoConnect>
      <EVMConnectorsWatcher wagmiConfig={wagmiConfig} />
      <NovaConnectProvider appChains={appChains}>{children}</NovaConnectProvider>
    </SatelliteConnectProvider>
  );
}
```

`createDefaultTransports` uses the public, rate-limited RPC URLs of the viem chains; pass your own transports in production. The complete app, with Solana, Nova Transactions, SIWX and Quasar, is the **[Full-Stack React guide](https://docs.tuwa.io/guides/full-stack-react)**.

---

## 🗄️ Browser Storage

`@tuwaio/evm-sdk` saves nothing itself. The EVM packages use the `localStorage` keys of Satellite Connect and Pulsar, listed on the [`@tuwaio/sdk`](https://sdk.docs.tuwa.io/packages/sdk) page; `@tuwaio/satellite-evm` reads `satellite-connect:impersonatedAddress` for its `impersonated` development connector.

## 🌐 External Services

`@tuwaio/evm-sdk` sends no requests itself. The re-exported packages contact the RPC transports of your wagmi config (balances, transaction tracking), the RPC of Ethereum Mainnet for ENS names and avatars, Pimlico or your bundler for ERC-4337 transactions, and the Safe Transaction Service for Safe transactions. Each package page lists the hosts: [satellite-evm](https://satellite.docs.tuwa.io/packages/satellite-evm), [pulsar-evm](https://pulsar.docs.tuwa.io/packages/pulsar-evm), [orbit-evm](https://orbit.docs.tuwa.io/packages/orbit-evm), [siwx-evm](https://siwx.docs.tuwa.io/packages/siwx-evm).

---

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](https://github.com/TuwaIO/sdk/blob/main/packages/evm-sdk/LICENSE) file for details.

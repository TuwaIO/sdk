# @tuwaio/solana-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/solana-sdk.svg)](https://www.npmjs.com/package/@tuwaio/solana-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/solana-sdk.svg)](https://github.com/TuwaIO/sdk/blob/main/packages/solana-sdk/LICENSE)

`@tuwaio/solana-sdk` is the Solana add-on (Layer 9, L9) of [`@tuwaio/sdk`](https://sdk.docs.tuwa.io/packages/sdk). It re-exports the Solana packages of the TUWA projects under subpaths — Orbit Utils, Satellite Connect, Pulsar, SIWX and Nova Connect — built on [`@solana/kit`](https://github.com/anza-xyz/kit) and the [Wallet Standard](https://github.com/wallet-standard/wallet-standard), without `@solana/web3.js`. An app with Solana wallets installs `@tuwaio/sdk` and this package; nothing of it is loaded in an EVM-only app.

---

## 🏛️ Core Capabilities

- **Chain packages in one install:** `@tuwaio/orbit-solana`, `@tuwaio/satellite-solana`, `@tuwaio/pulsar-solana` and `@tuwaio/siwx-solana` are dependencies, pinned to versions that work with the same release of `@tuwaio/sdk`.
- **Nova Connect for Solana:** importing `@tuwaio/solana-sdk/nova-connect` registers the Solana chain helpers of `@tuwaio/orbit-solana` for the chain lists of Nova Connect, types `solanaRPCUrls` of `NovaConnectProvider` with the cluster monikers (`mainnet`, `devnet`, `testnet`) and adds the Solana connection types to Satellite Connect. It goes through `@tuwaio/sdk/nova-connect/solana`, so this applies to the `NovaConnectProvider` and `SatelliteConnectProvider` that `@tuwaio/sdk` exports.
- **Subpaths:** every subpath re-exports one package, unchanged. Its reference is on the site of that package.

---

## 💾 Installation

```bash
pnpm add @tuwaio/sdk @tuwaio/solana-sdk @solana/kit @wallet-standard/react @wallet-standard/app @wallet-standard/base @wallet-standard/features @wallet-standard/ui @wallet-standard/ui-registry react react-dom
```

Peer dependencies: `@tuwaio/sdk` (>=0.4, the same release line), `@solana/kit` (>=8.2), the Wallet Standard packages above (1.x) and `@tuwaio/satellite-core` (>=0.7, a dependency of `@tuwaio/sdk`).

| Import path                       | Re-exports                                            | Reference                                                                                    |
| --------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `@tuwaio/solana-sdk/orbit`        | `@tuwaio/orbit-solana`                                | [orbit.docs.tuwa.io](https://orbit.docs.tuwa.io/packages/orbit-solana)                       |
| `@tuwaio/solana-sdk/satellite`    | `@tuwaio/satellite-solana`                            | [satellite.docs.tuwa.io](https://satellite.docs.tuwa.io/packages/satellite-solana)           |
| `@tuwaio/solana-sdk/pulsar`       | `@tuwaio/pulsar-solana`                               | [pulsar.docs.tuwa.io](https://pulsar.docs.tuwa.io/packages/pulsar-solana)                    |
| `@tuwaio/solana-sdk/siwx`         | `@tuwaio/siwx-solana`                                 | [siwx.docs.tuwa.io](https://siwx.docs.tuwa.io/packages/siwx-solana)                          |
| `@tuwaio/solana-sdk/nova-connect` | `@tuwaio/nova-connect/solana` (through `@tuwaio/sdk`) | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-connect-solana-overview--docs) |

---

## 🚀 Usage

```tsx
'use client';

import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { createPulsarStore } from '@tuwaio/sdk/pulsar';
import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { SolanaConnectorsWatcher } from '@tuwaio/solana-sdk/nova-connect';
import { pulsarSolanaAdapter } from '@tuwaio/solana-sdk/pulsar';
import { satelliteSolanaAdapter } from '@tuwaio/solana-sdk/satellite';
import type { ReactNode } from 'react';

const solanaRPCUrls = { devnet: 'https://api.devnet.solana.com' };

export const pulsarStore = createPulsarStore({
  name: 'my-app-transactions',
  adapter: [pulsarSolanaAdapter({ rpcUrls: solanaRPCUrls })],
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SatelliteConnectProvider adapter={satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })} autoConnect>
      <SolanaConnectorsWatcher />
      <NovaConnectProvider solanaRPCUrls={solanaRPCUrls}>{children}</NovaConnectProvider>
    </SatelliteConnectProvider>
  );
}
```

The public `api.*.solana.com` endpoints are rate-limited; pass your own RPC URLs in production. The complete app, with EVM, Nova Transactions, SIWX and Quasar, is the **[Full-Stack React guide](https://docs.tuwa.io/guides/full-stack-react)**.

---

## 🗄️ Browser Storage

`@tuwaio/solana-sdk` saves nothing itself. The Solana packages use the `localStorage` keys of Satellite Connect and Pulsar, listed on the [`@tuwaio/sdk`](https://sdk.docs.tuwa.io/packages/sdk) page; `@tuwaio/pulsar-solana` reads the last connection to find the connected wallet and its cluster. RPC URLs are kept in memory only.

## 🌐 External Services

`@tuwaio/solana-sdk` sends no requests itself. The re-exported packages contact your `rpcUrls` (or the public endpoint of the cluster) for balances and signature tracking, and `sns-api.bonfida.com` and `image-api.bonfida.com` for SNS names and avatars; wallets are reached through the Wallet Standard. Each package page lists the hosts: [satellite-solana](https://satellite.docs.tuwa.io/packages/satellite-solana), [pulsar-solana](https://pulsar.docs.tuwa.io/packages/pulsar-solana), [orbit-solana](https://orbit.docs.tuwa.io/packages/orbit-solana), [siwx-solana](https://siwx.docs.tuwa.io/packages/siwx-solana).

---

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](https://github.com/TuwaIO/sdk/blob/main/packages/solana-sdk/LICENSE) file for details.

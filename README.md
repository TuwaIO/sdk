# TUWA SDK

[![License](https://img.shields.io/npm/l/@tuwaio/sdk.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/sdk/release.yml?branch=main)](https://github.com/TuwaIO/sdk/actions)

<img src="https://raw.githubusercontent.com/TuwaIO/workflows/refs/heads/main/preview/repos/sdk.png" alt="TUWA SDK" width="400" style="border-radius: 10px; text-align: center; margin-bottom: 20px; margin-top: 20px; margin-left: auto; margin-right: auto; display: block;" />

The **TUWA SDK** is the shortest way to use TUWA in a React app. `@tuwaio/sdk` re-exports the client packages of Orbit Utils, Pulsar, Satellite Connect, SIWX and Nova UI Kit under subpaths, and its add-ons `@tuwaio/evm-sdk` and `@tuwaio/solana-sdk` add the chains your app uses. Payments are a module of their own on top of it, [`@tuwaio/payments-sdk`](https://payments.docs.tuwa.io/?path=/docs/packages-payments-sdk-overview--docs), in [Quasar Client](https://github.com/TuwaIO/quasar-client).

📖 **Documentation:** [sdk.docs.tuwa.io](https://sdk.docs.tuwa.io)

---

## 🏛️ Ecosystem Layer Architecture

TUWA is built in stages. The SDK is **Stage 5 (SDK Integration)**: it adds no logic of its own and packages the client projects of the stages below it — [Orbit Utils](https://orbit.docs.tuwa.io/) and [SIWX](https://siwx.docs.tuwa.io/), [Satellite Connect](https://satellite.docs.tuwa.io/) and [Pulsar](https://pulsar.docs.tuwa.io/), [Nova UI Kit](https://stories.tuwa.io/).

### Layer 8: SDK (L8)

- **[`@tuwaio/sdk`](./packages/sdk)**: Orbit, Pulsar, Satellite Connect, SIWX and Nova UI Kit under subpaths (`@tuwaio/sdk/pulsar`, `@tuwaio/sdk/nova-connect`, …) and the Nova stylesheets. The TUWA packages are dependencies; peer dependencies: `react`, `react-dom`.

### Layer 9: Chain add-ons (L9)

- **[`@tuwaio/evm-sdk`](./packages/evm-sdk)**: the EVM packages of Orbit, Satellite Connect, Pulsar, SIWX and Nova Connect. Peer dependencies: `@tuwaio/sdk`, `@wagmi/core`, `viem`.
- **[`@tuwaio/solana-sdk`](./packages/solana-sdk)**: the Solana packages of the same projects. Peer dependencies: `@tuwaio/sdk`, `@solana/kit` and the `@wallet-standard` packages.

---

## 🔧 Monorepo Structure

```
sdk/
├── apps/
│   └── docs/                   # sdk.docs.tuwa.io (Next.js 16 + Nextra 4)
│       ├── src/content/        # Introduction (MDX) + generated `packages/` pages
│       └── pages/              # Packages overview page, page script and sidebar templates
├── packages/
│   ├── sdk/                    # L8: re-exports of the TUWA client packages and the Nova stylesheets
│   ├── evm-sdk/                # L9: re-exports of the EVM packages
│   └── solana-sdk/             # L9: re-exports of the Solana packages
```

---

## 💾 Installation

```bash
# React app
pnpm add @tuwaio/sdk react react-dom

# EVM chains
pnpm add @tuwaio/evm-sdk @wagmi/core viem

# Solana
pnpm add @tuwaio/solana-sdk @solana/kit
```

pnpm (8 and later), npm (7 and later) and Bun also install the Wallet Standard peers of `@tuwaio/solana-sdk` (`@wallet-standard/app`, `base`, `features`, `react`, `ui` and `ui-registry`); with Yarn, add them to the command.

---

## 🚀 Architectural Usage Example

The providers of a React app with EVM and Solana wallets and a connect button:

```tsx
'use client';

import { EVMConnectorsWatcher } from '@tuwaio/evm-sdk/nova-connect';
import { satelliteEVMAdapter } from '@tuwaio/evm-sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { ConnectButton } from '@tuwaio/sdk/nova-connect/components';
import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { SolanaConnectorsWatcher } from '@tuwaio/solana-sdk/nova-connect';
import { satelliteSolanaAdapter } from '@tuwaio/solana-sdk/satellite';
import { createConfig, http, injected } from '@wagmi/core';
import type { ReactNode } from 'react';
import { mainnet } from 'viem/chains';

const appChains = [mainnet] as const;
const solanaRPCUrls = { devnet: 'https://api.devnet.solana.com' };
const wagmiConfig = createConfig({ chains: appChains, connectors: [injected()], transports: { [mainnet.id]: http() } });
const adapters = [satelliteEVMAdapter(wagmiConfig, appChains), satelliteSolanaAdapter({ rpcUrls: solanaRPCUrls })];

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SatelliteConnectProvider adapter={adapters} autoConnect>
      <EVMConnectorsWatcher wagmiConfig={wagmiConfig} />
      <SolanaConnectorsWatcher />
      <NovaConnectProvider appChains={appChains} solanaRPCUrls={solanaRPCUrls}>
        <ConnectButton />
        {children}
      </NovaConnectProvider>
    </SatelliteConnectProvider>
  );
}
```

Transaction tracking, SIWX sign-in and Quasar sync are added in the **[Full-Stack React guide](https://docs.tuwa.io/guides/full-stack-react)**.

---

## 🛠️ Development

```bash
pnpm install                          # installs dependencies and builds all packages
pnpm build                            # builds packages with tsup (ESM, CJS, types) and copies the Nova stylesheets
pnpm test                             # runs vitest in every package
pnpm lint                             # runs ESLint
pnpm docs:gen                         # regenerates the Packages pages in apps/docs
pnpm --filter @tuwaio/sdk-docs dev    # runs the docs site locally
```

The Packages pages are regenerated by the pre-commit hook: the page of each package is its README. The tests of `@tuwaio/evm-sdk` and `@tuwaio/solana-sdk` import the built `@tuwaio/sdk`: run `pnpm build` after changing it.

---

## 🤝 Contribution & Auditing

Please review our ecosystem **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.

# @tuwaio/sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/sdk.svg)](https://www.npmjs.com/package/@tuwaio/sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/sdk.svg)](https://github.com/TuwaIO/sdk/blob/main/packages/sdk/LICENSE)

`@tuwaio/sdk` is the Layer 8 (L8) package of the **TUWA SDK**: one package for React apps that re-exports the client packages of the TUWA projects under subpaths — Orbit Utils, Pulsar (transaction tracking), Satellite Connect (wallet connection), SIWX (sign-in with a wallet) and Nova UI Kit (connect and transaction components) — with the Nova stylesheets. Chain support comes from its two add-ons, [`@tuwaio/evm-sdk`](https://sdk.docs.tuwa.io/packages/evm-sdk) and [`@tuwaio/solana-sdk`](https://sdk.docs.tuwa.io/packages/solana-sdk); none of the subpaths below loads EVM or Solana code.

---

## 🏛️ Core Capabilities

- **One version to install:** the TUWA packages and the libraries they share (`zustand`, `immer`, `framer-motion`, Radix UI, `react-toastify`, `dayjs`) are dependencies of `@tuwaio/sdk`, so a release of the SDK pins a set of TUWA versions that work together. `react` and `react-dom` are peer dependencies: the app keeps one copy of React.
- **Subpaths:** every subpath re-exports one entry point of a TUWA package, unchanged (see [Subpaths](#-subpaths)). Its reference is on the site of that package.
- **Stylesheets:** `@tuwaio/sdk/styles/*.css` are copies of the compiled stylesheets of Nova Core, Nova Connect and Nova Transactions, with the fonts of Nova Core next to them in `dist/styles/fonts`. The app does not need Tailwind CSS.

---

## 💾 Installation

```bash
pnpm add @tuwaio/sdk react react-dom
```

Then add the chains of your app:

```bash
# EVM
pnpm add @tuwaio/evm-sdk @wagmi/core viem

# Solana
pnpm add @tuwaio/solana-sdk @solana/kit
```

pnpm (8 and later), npm (7 and later) and Bun also install the Wallet Standard peers of `@tuwaio/solana-sdk` (`@wallet-standard/app`, `base`, `features`, `react`, `ui` and `ui-registry`); with Yarn, add them to the command.

Do not install the re-exported TUWA packages separately at other versions: two copies of a package with a store or a React context, such as `@tuwaio/satellite-react` or `@tuwaio/nova-connect`, do not share their state or their types.

Import the stylesheets once, for example in the global CSS file of the app:

```css
@import '@tuwaio/sdk/styles/all.css';
```

`all.css` joins `nova-core.css` (the `--tuwa-*` theme variables and the motions of the pixel icons), `nova-connect.css` and `nova-transactions.css`; import them one by one to leave one out.

Nova draws the pixel icons of `@tuwaio/nova-icons` in its look of paper and ink. For its classic look with Heroicons, install `@heroicons/react` (an optional peer, needed only for this) and give the set to every Nova provider the app renders. A `NovaTransactionsProvider` outside `NovaConnectProvider` takes its own `icons`:

```bash
pnpm add @heroicons/react
```

```tsx
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { heroicons } from '@tuwaio/sdk/nova-core/heroicons';
import { NovaTransactionsProvider } from '@tuwaio/sdk/nova-transactions/providers';
import type { ComponentProps } from 'react';

export function ClassicNovaConnect(props: ComponentProps<typeof NovaConnectProvider>) {
  return <NovaConnectProvider {...props} icons={heroicons} />;
}

export function ClassicNovaTransactions(props: ComponentProps<typeof NovaTransactionsProvider>) {
  return <NovaTransactionsProvider {...props} icons={heroicons} />;
}
```

---

## 🧭 Subpaths

| Import path                               | Re-exports                                                                                                                                  | Reference                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@tuwaio/sdk/orbit`                       | `@tuwaio/orbit-core`                                                                                                                        | [orbit.docs.tuwa.io](https://orbit.docs.tuwa.io/packages/orbit-core)                                                                                       |
| `@tuwaio/sdk/pulsar`                      | `@tuwaio/pulsar-core` and `@tuwaio/pulsar-react`                                                                                            | [pulsar-core](https://pulsar.docs.tuwa.io/packages/pulsar-core), [pulsar-react](https://pulsar.docs.tuwa.io/packages/pulsar-react)                         |
| `@tuwaio/sdk/satellite`                   | `@tuwaio/satellite-core` and `@tuwaio/satellite-react` (its `Connector` type as `SatelliteReactConnector`)                                  | [satellite-core](https://satellite.docs.tuwa.io/packages/satellite-core), [satellite-react](https://satellite.docs.tuwa.io/packages/satellite-react/react) |
| `@tuwaio/sdk/siwx`                        | `@tuwaio/siwx-react`                                                                                                                        | [siwx.docs.tuwa.io](https://siwx.docs.tuwa.io/packages/siwx-react)                                                                                         |
| `@tuwaio/sdk/siwx/core`                   | `@tuwaio/siwx-core`                                                                                                                         | [siwx.docs.tuwa.io](https://siwx.docs.tuwa.io/packages/siwx-core)                                                                                          |
| `@tuwaio/sdk/siwx/server`                 | `@tuwaio/siwx-server`                                                                                                                       | [siwx.docs.tuwa.io](https://siwx.docs.tuwa.io/packages/siwx-server/server)                                                                                 |
| `@tuwaio/sdk/siwx/server-next`            | `@tuwaio/siwx-server/next`                                                                                                                  | [siwx.docs.tuwa.io](https://siwx.docs.tuwa.io/packages/siwx-server/next)                                                                                   |
| `@tuwaio/sdk/nova-core`                   | `@tuwaio/nova-core`                                                                                                                         | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-core-overview--docs)                                                                         |
| `@tuwaio/sdk/nova-core/utils`             | `@tuwaio/nova-core/utils`: only the helpers (`cn`, `deepMerge`, `getChainName`, `textCenterEllipsis`…), without React, components and icons | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-core-overview--docs)                                                                         |
| `@tuwaio/sdk/nova-core/heroicons`         | `@tuwaio/nova-core/heroicons`: the Heroicons set of the classic look (needs `@heroicons/react`)                                             | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-core-overview--docs)                                                                         |
| `@tuwaio/sdk/nova-icons`                  | `@tuwaio/nova-icons`: the pixel icons and the helpers that draw them                                                                        | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-icons-overview--docs)                                                                        |
| `@tuwaio/sdk/nova-icons/24/outline`       | `@tuwaio/nova-icons/24/outline`, the path of `@heroicons/react/24/outline`                                                                  | [Gallery](https://stories.tuwa.io/?path=/story/nova-icons-gallery--gallery)                                                                                |
| `@tuwaio/sdk/nova-icons/24/solid`         | `@tuwaio/nova-icons/24/solid`, the path of `@heroicons/react/24/solid`                                                                      | [Gallery](https://stories.tuwa.io/?path=/story/nova-icons-gallery--gallery)                                                                                |
| `@tuwaio/sdk/nova-icons/tuwa`             | `@tuwaio/nova-icons/tuwa`: the icons of TUWA's own                                                                                          | [Gallery](https://stories.tuwa.io/?path=/story/nova-icons-gallery--gallery)                                                                                |
| `@tuwaio/sdk/nova-icons/brands`           | `@tuwaio/nova-icons/brands`: the pixel marks of brands                                                                                      | [Gallery](https://stories.tuwa.io/?path=/story/nova-icons-gallery--gallery)                                                                                |
| `@tuwaio/sdk/nova-connect`                | `@tuwaio/nova-connect`                                                                                                                      | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-connect-connect-overview--docs)                                                              |
| `@tuwaio/sdk/nova-connect/components`     | `@tuwaio/nova-connect/components`                                                                                                           | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-connect-components-overview--docs)                                                           |
| `@tuwaio/sdk/nova-connect/hooks`          | `@tuwaio/nova-connect/hooks`                                                                                                                | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-connect-hooks-overview--docs)                                                                |
| `@tuwaio/sdk/nova-connect/i18n`           | `@tuwaio/nova-connect/i18n`                                                                                                                 | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-connect-i18n-overview--docs)                                                                 |
| `@tuwaio/sdk/nova-connect/satellite`      | `@tuwaio/nova-connect/satellite`                                                                                                            | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-connect-satellite-overview--docs)                                                            |
| `@tuwaio/sdk/nova-transactions`           | `@tuwaio/nova-transactions`                                                                                                                 | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-transactions-transactions-overview--docs)                                                    |
| `@tuwaio/sdk/nova-transactions/providers` | `@tuwaio/nova-transactions/providers`                                                                                                       | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-transactions-providers-overview--docs)                                                       |
| `@tuwaio/sdk/nova-transactions/i18n`      | `@tuwaio/nova-transactions/i18n`                                                                                                            | [Storybook](https://stories.tuwa.io/?path=/docs/packages-nova-transactions-i18n-overview--docs)                                                            |
| `@tuwaio/sdk/styles/*.css`                | `dist/index.css` of the three Nova packages                                                                                                 | `all.css`, `nova-core.css`, `nova-connect.css`, `nova-transactions.css`                                                                                    |

`@tuwaio/sdk/nova-connect/evm` and `@tuwaio/sdk/nova-connect/solana` re-export the chain entry points of Nova Connect for the add-ons; import them as `@tuwaio/evm-sdk/nova-connect` and `@tuwaio/solana-sdk/nova-connect`. They need the chain packages that the add-ons install, and going through `@tuwaio/sdk` makes their chain registration and types apply to the same copy of Nova Connect and Satellite React as the other subpaths.

`@tuwaio/sdk/satellite/react` re-exports `@tuwaio/satellite-react` with its own names, for [`@tuwaio/payments-sdk`](https://payments.docs.tuwa.io/?path=/docs/packages-payments-sdk-overview--docs): the Payments module takes Nova, Satellite, Pulsar and Orbit from the subpaths of this package, so an app has one copy of each. Payments are not part of this package: apps without them install nothing of it.

---

## 🚀 Usage

The providers of an EVM app with a connect button:

```tsx
'use client';

import { EVMConnectorsWatcher } from '@tuwaio/evm-sdk/nova-connect';
import { satelliteEVMAdapter } from '@tuwaio/evm-sdk/satellite';
import { NovaConnectProvider } from '@tuwaio/sdk/nova-connect';
import { ConnectButton } from '@tuwaio/sdk/nova-connect/components';
import { SatelliteConnectProvider } from '@tuwaio/sdk/satellite';
import { createConfig, http, injected } from '@wagmi/core';
import type { ReactNode } from 'react';
import { mainnet } from 'viem/chains';

const appChains = [mainnet] as const;
const wagmiConfig = createConfig({ chains: appChains, connectors: [injected()], transports: { [mainnet.id]: http() } });
const adapter = satelliteEVMAdapter(wagmiConfig, appChains);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SatelliteConnectProvider adapter={adapter} autoConnect>
      <EVMConnectorsWatcher wagmiConfig={wagmiConfig} />
      <NovaConnectProvider appChains={appChains}>{children}</NovaConnectProvider>
    </SatelliteConnectProvider>
  );
}

export function Header() {
  return <ConnectButton />;
}
```

The full setup — EVM and Solana, transaction tracking with Pulsar and Nova Transactions, SIWX sign-in and Quasar sync — is the **[Full-Stack React guide](https://docs.tuwa.io/guides/full-stack-react)**. Ready-made apps are in the [starter templates](https://docs.tuwa.io/guides/starter-templates).

The versions in this package go together: Nova UI Kit 0.11 shows a transaction sped up in the wallet as one operation, followed to its result, and needs `@tuwaio/pulsar-core` 0.12, which comes with it. An app with its own labels adds their new required keys: `actions.replacementFailed` in Nova Transactions, `cancelled` and `transactionCancelled` in Nova Connect. Nova Transactions 0.15.1 names the two regions of its toasts for screen readers (the transaction toasts and the validation errors): an app with its own `toast` or `validationError` labels adds their `region` key.

---

## 🗄️ Browser Storage

`@tuwaio/sdk` saves nothing itself. The re-exported packages use these browser storage keys; each page lists when they are written:

- `orbit-core:lastConnectedConnector`, `orbit-core:recentlyConnectedConnectorsListHelpers`: the last connection and the recent wallets, in `localStorage`, or in `sessionStorage` until the tab closes when `rememberWallet` of `SatelliteConnectProvider` is `false` or "Remember this wallet" of Nova Connect is unticked ([`@tuwaio/satellite-core`](https://satellite.docs.tuwa.io/packages/satellite-core), read by Nova Connect);
- `satellite-connect:impersonatedAddress` in `localStorage`: the impersonated address ([`@tuwaio/satellite-core`](https://satellite.docs.tuwa.io/packages/satellite-core));
- the `name` passed to `createPulsarStore` in `localStorage`: the tracked transactions ([`@tuwaio/pulsar-core`](https://pulsar.docs.tuwa.io/packages/pulsar-core));
- `siwx-react:session` in `localStorage`: the SIWX session shown in the UI ([`@tuwaio/siwx-react`](https://siwx.docs.tuwa.io/packages/siwx-react));
- `nova-transactions:closedToasts` in `localStorage`: the keys of up to 50 pending transactions whose toast was closed, so it stays closed after a page load ([`@tuwaio/nova-transactions`](https://stories.tuwa.io/?path=/docs/packages-nova-transactions-transactions-overview--docs)).

## 🌐 External Services

`@tuwaio/sdk` sends no requests itself. Of the packages it re-exports, only `@tuwaio/nova-core` does: it loads network and wallet icons that `@web3icons/common` does not have from `raw.githubusercontent.com` ([details](https://stories.tuwa.io/?path=/docs/packages-nova-core-overview--docs)). The chain requests (RPC endpoints, ENS, SNS, Pimlico, Safe Transaction Service) come from the chain packages of the add-ons: see [`@tuwaio/evm-sdk`](https://sdk.docs.tuwa.io/packages/evm-sdk) and [`@tuwaio/solana-sdk`](https://sdk.docs.tuwa.io/packages/solana-sdk). The SIWX endpoints are those of your server.

---

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](https://github.com/TuwaIO/sdk/blob/main/packages/sdk/LICENSE) file for details.

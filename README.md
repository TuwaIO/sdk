# TUWA SDK

[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/sdk/release.yml?branch=main)](https://github.com/TuwaIO/sdk/actions)

> The official umbrella SDKs and server-side Quasar client for the **TUWA Ecosystem**.

---

## Overview

This monorepo contains the core TUWA SDKs — a production-grade toolkit for interacting with the TUWA ecosystem. It provides the umbrella packages that bundle Orbit, Pulsar, Satellite, and Nova UI into a single seamless installation point, alongside the server-side Quasar Cloud client.

### Key Features

- 🧩 **Umbrella Architecture** — Install `@tuwaio/sdk` and get all TUWA functionality out of the box.
- ⚡ **Framework Agnostic** — Clean separation of EVM and Solana specific dependencies.
- 🔐 **Iron Dome Protocol** — Server-side Quasar Cloud syncing via `@tuwaio/quasar-sdk`.
- 📦 **Dual format** — Ships as both ESM and CJS (`tsup` powered).
- 📖 **Auto-generated API docs** — TypeDoc → Markdown → Nextra docs site.

---

## Repository Structure

```
sdk/
├── packages/
│   ├── sdk/                 # @tuwaio/sdk — The core umbrella SDK (UI + Logic)
│   ├── evm-sdk/             # @tuwaio/evm-sdk — EVM-specific implementations
│   ├── solana-sdk/          # @tuwaio/solana-sdk — Solana-specific implementations
│   └── quasar-sdk/          # @tuwaio/quasar-sdk — Node.js Quasar Cloud Client
├── apps/
│   └── docs/                # Nextra-based documentation site
├── typedoc.json             # TypeDoc config
└── .github/workflows/       # CI: Release Please + npm publish
```

---

## Installation

### 1. Base SDK

Install the core SDK and the required React peer dependencies:

```bash
pnpm add @tuwaio/sdk react react-dom
```

### 2. Network Adapters

Depending on your target blockchain, install the network-specific SDK and its Web3 singletons:

**For EVM:**
```bash
pnpm add @tuwaio/evm-sdk viem @wagmi/core
```

**For Solana:**
```bash
pnpm add @tuwaio/solana-sdk gill @wallet-standard/react @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

### 3. Quasar Cloud Client (Server-side)

The Quasar SDK requires `ofetch` and `@tuwaio/pulsar-core` (for type definitions) as peer dependencies.

```bash
pnpm add @tuwaio/quasar-sdk ofetch @tuwaio/pulsar-core
```
*Note: If you plan to use the React Auth Bridges (`QuasarAuthBridge`), you will also need `react` and the respective Web3 singletons for your target network (e.g. `viem` / `gill`).*

---

## 🚀 Explore the SDKs (Examples & Guides)

The true power of the TUWA Umbrella SDKs is composability. Because the ecosystem is highly modular, each package has its own detailed documentation and integration examples. 

Dive into the specific READMEs below to see how to use them in detail:

- **[Core SDK (`@tuwaio/sdk`)](./packages/sdk/README.md)** — The main client-side integration point. Shows how to combine EVM, Solana, and Nova UI.
- **[Quasar Cloud SDK (`@tuwaio/quasar-sdk`)](./packages/quasar-sdk/README.md)** — The server-side backend client. Contains the **Full Architecture Example** showing how to sync transactions to the cloud securely via React Auth Bridges and Next.js Server Actions.
- **[EVM SDK (`@tuwaio/evm-sdk`)](./packages/evm-sdk/README.md)** — EVM-specific implementations and Wagmi adapters.
- **[Solana SDK (`@tuwaio/solana-sdk`)](./packages/solana-sdk/README.md)** — Solana-specific implementations and Gill/Wallet-Standard adapters.

---

## Documentation

The full documentation site lives at **[sdk.docs.tuwa.io](https://sdk.docs.tuwa.io/)**. 

### API Reference Generation

API reference documentation is auto-generated from TypeDoc annotations using `typedoc-plugin-markdown`:

```bash
# Generate API reference pages
pnpm docs:gen
```

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** — see the [LICENSE](./LICENSE) file for details.

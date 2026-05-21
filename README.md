# TUWA SDK

[![License](https://img.shields.io/npm/l/@tuwaio/quasar-sdk.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/sdk/release.yml?branch=main)](https://github.com/TuwaIO/sdk/actions)

> The official server-side Node.js & Edge SDK for the **TUWA Ecosystem**, featuring built-in React authentication bridges.

---

## Overview

This monorepo contains the TUWA SDK — a production-grade toolkit for interacting with the **Quasar Cloud** API.
It provides a type-safe, zero-dependency-bloat client for transaction syncing, status tracking, and history retrieval through the **Iron Dome** security perimeter.

### Key Features

- 🔐 **Iron Dome Protocol** — every request is authenticated via `x-tuwa-secret-key` header
- 🛡️ **QuasarAuthBridge** — built-in React component for unified EVM & Solana authentication
- 📦 **Dual format** — ships as both ESM and CJS (`tsup` powered)
- 🧩 **Modular architecture** — isolated modules for Pulsar (Transactions) and Utils (Security)
- 🔒 **Server-side only** — secret keys never leak to the client
- 📖 **Auto-generated API docs** — TypeDoc → Markdown → Nextra docs site

---

## Repository Structure

```
sdk/
├── packages/
│   └── quasar-sdk/          # @tuwaio/quasar-sdk — core SDK package
│       └── src/
│           ├── core/        # HTTP transport & error handling
│           ├── modules/     # Pulsar (Transaction Engine)
│           ├── react/       # React Authentication Bridge & Hooks
│           ├── utils/       # Security & Auth utilities
│           ├── types.ts     # Shared interfaces
│           └── index.ts     # Core public API (exports Quasar & utils)
├── apps/
│   └── docs/                 # Nextra-based documentation site
├── typedoc.json              # TypeDoc config
└── .github/workflows/        # CI: Release Please + npm publish
```

---

## Installation

```bash
pnpm add @tuwaio/quasar-sdk
```

---

## Quick Start (Core SDK)

```typescript
import { Quasar, utils } from '@tuwaio/quasar-sdk';

// 1. Using the Client (Server-side)
const quasar = new Quasar({ secretKey: 'sk_live_...' });
const { txKey } = await quasar.pulsar.syncCreate(transaction);

// 2. Using Utils (Shared)
const isValid = await utils.verifyMiniSession(params);
```

## Quick Start (React Bridge)

To avoid missing optional peer dependencies at build time, import the bridge for your target ecosystem:

- **EVM-Only**:
```tsx
import { QuasarEvmAuthBridge } from '@tuwaio/quasar-sdk/react/evm';
```
- **Solana-Only**:
```tsx
import { QuasarSolanaAuthBridge } from '@tuwaio/quasar-sdk/react/solana';
```
- **Multi-Chain**:
```tsx
import { QuasarAuthBridge } from '@tuwaio/quasar-sdk/react';
```

---

## Documentation

The documentation site is powered by [Nextra](https://nextra.site) and lives in `apps/docs/`.

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

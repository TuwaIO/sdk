# TUWA SDK

[![License](https://img.shields.io/npm/l/@tuwaio/quasar-sdk.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/sdk/release.yml?branch=main)](https://github.com/TuwaIO/sdk/actions)

> The official server-side Node.js & Edge SDK for the **TUWA Ecosystem**.

---

## Overview

This monorepo contains the TUWA SDK — a production-grade toolkit for interacting with the **Quasar Cloud** API.
It provides a type-safe, zero-dependency-bloat client for transaction syncing, status tracking, and history retrieval through the **Iron Dome** security perimeter.

### Key Features

- 🔐 **Iron Dome Protocol** — every request is authenticated via `x-tuwa-secret-key` header
- 📦 **Dual format** — ships as both ESM and CJS (`tsup` powered)
- 🧩 **Modular architecture** — each domain (Pulsar, future modules) is an isolated module
- 🔒 **Server-side only** — secret keys never leak to the client
- 📖 **Auto-generated API docs** — TypeDoc → Markdown → Nextra docs site

---

## Repository Structure

```
sdk/
├── packages/
│   └── quasar-sdk/          # @tuwaio/quasar-sdk — the core SDK package
│       └── src/
│           ├── core/
│           │   └── client.ts # QuasarClient — HTTP transport & error handling
│           ├── modules/
│           │   └── pulsar/   # PulsarModule — transaction engine operations
│           ├── types.ts      # Shared interfaces & re-exports from @tuwaio/pulsar-core
│           └── index.ts      # Public API surface (Quasar class + re-exports)
├── apps/
│   └── docs/                 # Nextra-based documentation site (@tuwaio/sdk-docs)
├── typedoc.json              # TypeDoc config (generates Markdown into docs)
├── release-please-config.json
└── .github/workflows/        # CI: Release Please + npm publish
```

---

## Installation

```bash
# npm
npm install @tuwaio/quasar-sdk

# pnpm
pnpm add @tuwaio/quasar-sdk

# yarn
yarn add @tuwaio/quasar-sdk
```

### Peer Dependencies

The SDK requires the following peer dependencies:

| Package              | Version   |
| -------------------- | --------- |
| `@tuwaio/pulsar-core` | `>=0.5.1` |
| `ofetch`             | `>=1.5.1` |

---

## Quick Start

```typescript
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({
  secretKey: 'sk_live_your_secret_key',
  // baseUrl: 'https://api.tuwa.io',  // optional, default
  // timeout: 10000,                   // optional, ms
});

// Sync a new pending transaction
const { txKey } = await quasar.pulsar.syncCreate({
  hash: '0xabc...',
  chainId: 1,
  status: 'pending',
  // ...full Transaction object
});

// Update transaction status
await quasar.pulsar.syncUpdate(txKey, { status: 'confirmed' });

// Query transaction history
const history = await quasar.pulsar.getHistory({
  page: 1,
  limit: 20,
  chainId: 1,
  status: 'confirmed',
});
```

---

## SDK Modules

### Quasar (Entry Point)

The `Quasar` class is the main SDK entry point. It initializes the internal HTTP client and exposes domain-specific modules.

```typescript
const quasar = new Quasar(config: QuasarConfig);
```

### Pulsar Module — `quasar.pulsar`

The transaction engine interface for the Quasar Cloud.

| Method | Description |
| --- | --- |
| `syncCreate(tx)` | Sync a new pending transaction to the cloud |
| `syncUpdate(txKey, patches)` | Update an existing transaction's status or fields |
| `getHistory(query?)` | Retrieve paginated transaction history with filters |

### Error Handling

All API errors are wrapped in `QuasarSDKError`:

```typescript
import { QuasarSDKError } from '@tuwaio/quasar-sdk';

try {
  await quasar.pulsar.getHistory();
} catch (err) {
  if (err instanceof QuasarSDKError) {
    console.error(err.status);        // HTTP status code
    console.error(err.message);       // Formatted error message
    console.error(err.originalError); // Raw fetch error
  }
}
```

---

## Configuration

| Property    | Type     | Required | Default                | Description |
| ----------- | -------- | -------- | ---------------------- | ----------- |
| `secretKey` | `string` | ✅       | —                      | Server-side API key (`sk_live_*`) |
| `baseUrl`   | `string` | ❌       | `https://api.tuwa.io`  | Quasar API base URL |
| `timeout`   | `number` | ❌       | `10000`                | Request timeout in milliseconds |

---

## Documentation

The documentation site is powered by [Nextra](https://nextra.site) and lives in `apps/docs/`.

### API Reference Generation

API reference documentation is auto-generated from TypeDoc annotations using `typedoc-plugin-markdown`:

```bash
# Generate API reference pages into apps/docs/src/content/apiReference/
pnpm docs:gen
```

### Running Docs Locally

```bash
cd apps/docs
pnpm dev
```

---

## Development

### Prerequisites

- **Node.js** 20-24
- **pnpm** ≥ 10.28

### Setup

```bash
# Install dependencies (also runs postinstall build)
pnpm install

# Build all packages
pnpm build

# Run linter
pnpm lint

# Format code
pnpm format
```

---

## CI / CD

- **Release Please** — automated version bumping and changelog generation on `main`
- **Stable Publish** — reusable workflow from `TuwaIO/workflows` triggers npm publish on new releases
- **Alpha Releases** — separate workflow for pre-release versions

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** — see the [LICENSE](./LICENSE) file for details.

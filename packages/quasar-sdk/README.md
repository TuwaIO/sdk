# Quasar SDK

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/quasar-sdk.svg)](https://www.npmjs.com/package/@tuwaio/quasar-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/quasar-sdk.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/sdk/release.yml?branch=main)](https://github.com/TuwaIO/sdk/actions)

> The official server-side Node.js & Edge SDK for the **TUWA Quasar Cloud**.

## Installation

```bash
# Using pnpm (recommended), but you can use npm, yarn or bun as well
pnpm add @tuwaio/quasar-sdk ofetch
```

### Peer Dependencies

| Package               | Version   | Requirement                               |
| --------------------- | --------- | ----------------------------------------- |
| `@tuwaio/pulsar-core` | `>=0.6.0` | **Required** (Core types)                 |
| `ofetch`              | `>=1.5.1` | **Required** (Transport)                  |
| `viem`                | `^2.0.0`  | Optional (EVM Auth & Signing)             |
| `gill`                | `^0.14.0` | Optional (Solana Auth & Signing)          |
| `zustand`             | `^5.0.0`  | Optional (Persistent Session Management)  |

## Quick Start

```typescript
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: 'sk_live_your_secret_key' });

// Sync a pending transaction to the cloud
const { txKey } = await quasar.pulsar.syncCreate(transaction, 'My Application');

// Query transaction history
const history = await quasar.pulsar.getHistory({ chainId: 1 });
```

## Modules

### Pulsar — `quasar.pulsar`

| Method                     | Description                                         |
| -------------------------- | --------------------------------------------------- |
| `syncCreate(tx, appName?)` | Sync a new pending transaction to the cloud         |
| `getHistory(query?)`       | Retrieve paginated transaction history with filters |

### Utils — `utils`

Security and authentication utilities. These can be used as standalone functions (ideal for frontends).

| Method                         | Description                                            |
| ------------------------------ | ------------------------------------------------------ |
| `createMiniSessionMessage(ts)` | Format a standard login message for signing            |
| `signMiniSession(params)`      | Trigger signature request in the connected wallet      |
| `verifyMiniSession(params)`    | Verify an EVM or Solana signature with expiration check |
| `createMiniSessionStore(name)` | Create a persistent Zustand store for session caching  |
| `getMiniSessionAuth(conn, st)` | Reusable helper for signing and caching logic          |

## Error Handling

```typescript
import { QuasarSDKError } from '@tuwaio/quasar-sdk';

try {
  await quasar.pulsar.getHistory();
} catch (err) {
  if (err instanceof QuasarSDKError) {
    console.error(err.status); // HTTP status code
    console.error(err.message); // Formatted error message
    console.error(err.originalError); // Raw fetch error
  }
}
```

## Configuration

| Property    | Type     | Required | Default               | Description                       |
| ----------- | -------- | -------- | --------------------- | --------------------------------- |
| `secretKey` | `string` | ✅       | —                     | Server-side API key (`sk_live_*`) |
| `baseUrl`   | `string` | ❌       | `https://api.tuwa.io` | API base URL                      |
| `timeout`   | `number` | ❌       | `10000`               | Request timeout (ms)              |

## Documentation

Full API reference: [sdk.docs.tuwa.io](https://sdk.docs.tuwa.io/)

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

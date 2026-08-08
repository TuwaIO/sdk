[**@tuwaio/quasar-sdk**](../README.md)

***

# Quasar

Defined in: [packages/quasar-sdk/src/index.ts:84](https://github.com/TuwaIO/sdk/blob/89544d64f9b859c827dbbb28893e35f38279b5fc/packages/quasar-sdk/src/index.ts#L84)

Main entry point for the Quasar SDK.

The `Quasar` class provides a unified interface for interacting with the Quasar Cloud API.
It handles authentication, base URL configuration, and exposes domain-specific modules
like [PulsarModule](PulsarModule.md) for transaction management.

## Example

```typescript
import { Quasar } from '@tuwaio/quasar-sdk';

// Initialize with your secret API key
const quasar = new Quasar({
  secretKey: 'sk_live_your_secret_key',
  baseUrl: 'https://api.tuwa.io', // Optional
  timeout: 10000,                // Optional, default is 10s
});

// Access domain-specific modules
const history = await quasar.pulsar.getHistory({ chainId: 1 });
```

## Constructors

### Constructor

> **new Quasar**(`config`): `Quasar`

Defined in: [packages/quasar-sdk/src/index.ts:112](https://github.com/TuwaIO/sdk/blob/89544d64f9b859c827dbbb28893e35f38279b5fc/packages/quasar-sdk/src/index.ts#L112)

Creates a new instance of the Quasar SDK.

#### Parameters

##### config

[`QuasarConfig`](../interfaces/QuasarConfig.md)

Configuration options for the SDK.

#### Returns

`Quasar`

#### Throws

If the `secretKey` is missing or invalid.

#### Example

```typescript
const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY! });
```

## Properties

### pulsar

> `readonly` **pulsar**: [`PulsarModule`](PulsarModule.md)

Defined in: [packages/quasar-sdk/src/index.ts:99](https://github.com/TuwaIO/sdk/blob/89544d64f9b859c827dbbb28893e35f38279b5fc/packages/quasar-sdk/src/index.ts#L99)

The Pulsar Transaction Engine module.

This module provides methods to sync transaction states to the Quasar Cloud
and retrieve indexed transaction history across multiple blockchain networks.

#### See

[PulsarModule](PulsarModule.md)

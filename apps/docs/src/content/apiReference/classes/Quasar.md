[**@tuwaio/quasar-sdk**](../README.md)

***

# Quasar

Defined in: [packages/quasar-sdk/src/index.ts:48](https://github.com/TuwaIO/sdk/blob/278964210e6a2f193f4cd1ad209653fda6239b42/packages/quasar-sdk/src/index.ts#L48)

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

Defined in: [packages/quasar-sdk/src/index.ts:76](https://github.com/TuwaIO/sdk/blob/278964210e6a2f193f4cd1ad209653fda6239b42/packages/quasar-sdk/src/index.ts#L76)

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

Defined in: [packages/quasar-sdk/src/index.ts:63](https://github.com/TuwaIO/sdk/blob/278964210e6a2f193f4cd1ad209653fda6239b42/packages/quasar-sdk/src/index.ts#L63)

The Pulsar Transaction Engine module.

This module provides methods to sync transaction states to the Quasar Cloud
and retrieve indexed transaction history across multiple blockchain networks.

#### See

[PulsarModule](PulsarModule.md)

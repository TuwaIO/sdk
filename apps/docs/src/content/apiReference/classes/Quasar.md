[**@tuwaio/quasar-sdk**](../README.md)

***

# Quasar

Defined in: [packages/quasar-sdk/src/index.ts:44](https://github.com/TuwaIO/sdk/blob/86c91658ce8dc11eb9cfeca067985f546573be5b/packages/quasar-sdk/src/index.ts#L44)

Main entry point for the Quasar SDK.

Initializes the internal HTTP client with your secret key
and exposes domain-specific modules for interacting with the Quasar Cloud API.

## Example

```typescript
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({
  secretKey: 'sk_live_your_secret_key',
  baseUrl: 'https://api.tuwa.io',
  timeout: 15000,
});

// Access the Pulsar transaction engine
const { txKey } = await quasar.pulsar.syncCreate(tx);
```

## Constructors

### Constructor

> **new Quasar**(`config`): `Quasar`

Defined in: [packages/quasar-sdk/src/index.ts:64](https://github.com/TuwaIO/sdk/blob/86c91658ce8dc11eb9cfeca067985f546573be5b/packages/quasar-sdk/src/index.ts#L64)

Creates a new Quasar SDK instance.

#### Parameters

##### config

[`QuasarConfig`](../interfaces/QuasarConfig.md)

SDK configuration. See [QuasarConfig](../interfaces/QuasarConfig.md) for available options.

#### Returns

`Quasar`

#### Throws

If `config.secretKey` is missing.

## Properties

### pulsar

> `readonly` **pulsar**: [`PulsarModule`](PulsarModule.md)

Defined in: [packages/quasar-sdk/src/index.ts:56](https://github.com/TuwaIO/sdk/blob/86c91658ce8dc11eb9cfeca067985f546573be5b/packages/quasar-sdk/src/index.ts#L56)

The Pulsar Transaction Engine module.

Use this to sync transaction states to the Quasar Cloud
and retrieve paginated transaction history.

#### See

[PulsarModule](PulsarModule.md)

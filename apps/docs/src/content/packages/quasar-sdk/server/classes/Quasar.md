# Quasar

Defined in: [quasar.ts:21](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/quasar.ts#L21)

Client of the Quasar API (Quasar Cloud at `https://api.tuwa.io`, or a self-hosted Quasar server). Create it on the
server: it sends the secret key of your Quasar app with every request.

## Example

```ts
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });
const history = await quasar.pulsar.getHistory({ walletAddress: '0x...', limit: 20 });
```

## Constructors

### Constructor

> **new Quasar**(`config`): `Quasar`

Defined in: [quasar.ts:38](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/quasar.ts#L38)

Creates the client. Sends no request.

#### Parameters

##### config

[`QuasarConfig`](/packages/quasar-sdk/server/interfaces/QuasarConfig.md)

The secret key of the Quasar app and optional overrides.

#### Returns

`Quasar`

#### Throws

If `config.secretKey` is empty.

## Properties

### pulsar

> `readonly` **pulsar**: [`PulsarModule`](/packages/quasar-sdk/server/classes/PulsarModule.md)

Defined in: [quasar.ts:30](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/quasar.ts#L30)

Syncs Pulsar transactions to Quasar and reads their history.

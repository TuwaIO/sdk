# PulsarModule

Defined in: [modules/pulsar/index.ts:27](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/pulsar/index.ts#L27)

Transaction sync and history of the Quasar API, available as `quasar.pulsar` on a [Quasar](/packages/quasar-sdk/server/classes/Quasar.md) client. Quasar
tracks every synced transaction on the server until it reaches a final status, so the status survives a closed tab,
and returns the history of your app for any device.

## Example

```ts
import { Quasar, type Transaction } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });

// Called by the `onRemoteCreate` callback of the Pulsar store (through a Server Action) with the new transaction.
export async function syncTransaction(tx: Transaction) {
  const { txKey } = await quasar.pulsar.syncCreate(tx, 'my-app');
  return txKey;
}
```

## Methods

### getHistory()

> **getHistory**(`query?`): `Promise`\<[`PaginatedResult`](/packages/quasar-sdk/server/interfaces/PaginatedResult.md)\<`Transaction`\>\>

Defined in: [modules/pulsar/index.ts:74](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/pulsar/index.ts#L74)

Reads the transactions of your app, newest first (`GET /v1/engine/pulsar/history`).

#### Parameters

##### query?

[`HistoryQuery`](/packages/quasar-sdk/server/interfaces/HistoryQuery.md) = `{}`

Filters and pagination. `walletAddress` is compared with the sender address exactly as it was
  synced; the API returns at most 100 transactions per page.

#### Returns

`Promise`\<[`PaginatedResult`](/packages/quasar-sdk/server/interfaces/PaginatedResult.md)\<`Transaction`\>\>

One page of transactions.

#### Throws

On an invalid key (401, 403), a timeout or a network error.

#### Example

```ts
const page = await quasar.pulsar.getHistory({ walletAddress: '0x...', page: 1, limit: 20 });
page.docs.forEach((tx) => console.log(tx.txKey, tx.status));
```

***

### syncCreate()

> **syncCreate**(`tx`, `appName?`): `Promise`\<\{ `duplicate?`: `true`; `mode`: `"fast"` \| `"lazy"`; `success`: `true`; `txKey`: `string`; \}\>

Defined in: [modules/pulsar/index.ts:47](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/pulsar/index.ts#L47)

Sends a new Pulsar transaction to Quasar, which starts tracking it on the server (`POST /v1/engine/pulsar/sync`).
Sending a transaction with a `txKey` that Quasar already has does not create a second record: the response has
`duplicate: true`.

#### Parameters

##### tx

`Transaction`

The transaction created by Pulsar, as passed to `onRemoteCreate` of `createPulsarStore`.

##### appName?

`string`

Application name saved with the transaction; filter the history by it with `appName`.

#### Returns

`Promise`\<\{ `duplicate?`: `true`; `mode`: `"fast"` \| `"lazy"`; `success`: `true`; `txKey`: `string`; \}\>

`txKey` of the transaction and the tracking `mode`: `fast` (tracked right away) or `lazy` (queued, for
  example when the quota of the organization is used up).

#### Throws

On an invalid transaction (400), an invalid key (401, 403), a timeout or a network error.

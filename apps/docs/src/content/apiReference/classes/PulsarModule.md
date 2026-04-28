[**@tuwaio/quasar-sdk**](../README.md)

***

# PulsarModule

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:36](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/modules/pulsar/index.ts#L36)

Pulsar module — the transaction engine interface for Quasar Cloud.

Handles all operations related to blockchain transaction lifecycle:
creating, updating, and querying transactions through the API.

## Remarks

Access this module via `quasar.pulsar` after initializing the SDK.
All methods authenticate automatically using the configured secret key.

## Example

```typescript
const quasar = new Quasar({ secretKey: 'sk_live_...' });

// Create
const { txKey } = await quasar.pulsar.syncCreate(transaction);

// Update
await quasar.pulsar.syncUpdate(txKey, { status: 'confirmed' });

// Read
const history = await quasar.pulsar.getHistory({ chainId: 1 });
```

## Constructors

### Constructor

> **new PulsarModule**(`client`): `PulsarModule`

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:43](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/modules/pulsar/index.ts#L43)

**`Internal`**

Creates a new PulsarModule instance.

#### Parameters

##### client

[`QuasarClient`](#)

The internal [QuasarClient](#) instance for making authenticated API calls.

#### Returns

`PulsarModule`

## Methods

### getHistory()

> **getHistory**(`query?`): `Promise`\<[`PaginatedResult`](../interfaces/PaginatedResult.md)\<[`Transaction`](../type-aliases/Transaction.md)\>\>

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:101](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/modules/pulsar/index.ts#L101)

Retrieves paginated transaction history from the Quasar Cloud.

Supports filtering by chain ID, status, and specific transaction key.
Returns a typed [PaginatedResult](../interfaces/PaginatedResult.md) with navigation metadata.

#### Parameters

##### query?

[`HistoryQuery`](../interfaces/HistoryQuery.md) = `{}`

Optional query parameters for filtering and pagination.

#### Returns

`Promise`\<[`PaginatedResult`](../interfaces/PaginatedResult.md)\<[`Transaction`](../type-aliases/Transaction.md)\>\>

A paginated result containing an array of [Transaction](../type-aliases/Transaction.md) documents.

#### Throws

On authentication failure or network issue.

#### Example

```typescript
const result = await quasar.pulsar.getHistory({
  page: 1,
  limit: 20,
  chainId: 1,
  status: 'confirmed',
});

for (const tx of result.docs) {
  console.log(tx.hash, tx.status);
}
```

***

### syncCreate()

> **syncCreate**(`tx`, `appName?`): `Promise`\<\{ `success`: `true`; `txKey`: `string`; \}\>

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:67](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/modules/pulsar/index.ts#L67)

Syncs a newly created pending transaction to the Quasar Cloud.

Sends the full transaction object to the `tx-sync` endpoint via POST.
The server assigns a unique `txKey` that can be used for subsequent updates.

#### Parameters

##### tx

[`Transaction`](../type-aliases/Transaction.md)

The complete transaction object to sync.

##### appName?

`string`

The application name for filtering by.

#### Returns

`Promise`\<\{ `success`: `true`; `txKey`: `string`; \}\>

An object containing `success: true` and the assigned `txKey`.

#### Throws

On authentication failure, validation error, or network issue.

#### Example

```typescript
const { txKey } = await quasar.pulsar.syncCreate({
  hash: '0xabc...',
  chainId: 1,
  status: 'pending',
  from: '0x123...',
  to: '0x456...',
});
```

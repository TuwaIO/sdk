[**@tuwaio/quasar-sdk**](../README.md)

***

# PulsarModule

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:36](https://github.com/TuwaIO/sdk/blob/32138154b3282b03f5cfe2de623cd732cd3ee087/packages/quasar-sdk/src/modules/pulsar/index.ts#L36)

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

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:43](https://github.com/TuwaIO/sdk/blob/32138154b3282b03f5cfe2de623cd732cd3ee087/packages/quasar-sdk/src/modules/pulsar/index.ts#L43)

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

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:122](https://github.com/TuwaIO/sdk/blob/32138154b3282b03f5cfe2de623cd732cd3ee087/packages/quasar-sdk/src/modules/pulsar/index.ts#L122)

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

> **syncCreate**(`tx`): `Promise`\<\{ `success`: `true`; `txKey`: `string`; \}\>

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:66](https://github.com/TuwaIO/sdk/blob/32138154b3282b03f5cfe2de623cd732cd3ee087/packages/quasar-sdk/src/modules/pulsar/index.ts#L66)

Syncs a newly created pending transaction to the Quasar Cloud.

Sends the full transaction object to the `tx-sync` endpoint via POST.
The server assigns a unique `txKey` that can be used for subsequent updates.

#### Parameters

##### tx

[`Transaction`](../type-aliases/Transaction.md)

The complete transaction object to sync.

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

***

### syncUpdate()

> **syncUpdate**(`txKey`, `patches`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:91](https://github.com/TuwaIO/sdk/blob/32138154b3282b03f5cfe2de623cd732cd3ee087/packages/quasar-sdk/src/modules/pulsar/index.ts#L91)

Updates an existing transaction's status or mutable fields.

Sends a PATCH request to the `tx-sync` endpoint with the transaction key
and the fields to update.

#### Parameters

##### txKey

`string`

The unique transaction key assigned by Quasar during [syncCreate](#synccreate).

##### patches

[`UpdatableTransactionFields`](../type-aliases/UpdatableTransactionFields.md)

An object containing the fields to update (e.g. `status`, `blockNumber`).

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

An object containing `success: true` on successful update.

#### Throws

On authentication failure, invalid txKey, or network issue.

#### Example

```typescript
await quasar.pulsar.syncUpdate('tx_abc123', {
  status: 'confirmed',
});
```

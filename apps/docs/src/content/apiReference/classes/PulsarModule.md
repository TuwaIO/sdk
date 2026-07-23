[**@tuwaio/quasar-sdk**](../README.md)

***

# PulsarModule

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:37](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/modules/pulsar/index.ts#L37)

Pulsar module — the transaction engine interface for Quasar Cloud.

The `PulsarModule` handles the lifecycle of blockchain transactions within the Quasar ecosystem.
It allows developers to sync transaction states (EVM, Solana, Starknet) to the cloud for
persistent tracking and to retrieve comprehensive transaction histories.

## Remarks

Access this module via `quasar.pulsar` after initializing the [Quasar](Quasar.md) SDK.
All methods are authenticated automatically using the configured secret key.

## Example

```typescript
const quasar = new Quasar({ secretKey: 'sk_live_...' });

// Sync a new transaction to start tracking
const { txKey } = await quasar.pulsar.syncCreate(transaction);

// Retrieve transaction history with filters
const history = await quasar.pulsar.getHistory({
  chainId: 1,
  status: 'Success',
});
```

## Constructors

### Constructor

> **new PulsarModule**(`client`): `PulsarModule`

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:44](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/modules/pulsar/index.ts#L44)

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

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:102](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/modules/pulsar/index.ts#L102)

Retrieves a paginated list of transactions from the Quasar Cloud.

Supports advanced filtering by chain, status, wallet address, and more.
Results are returned in a typed [PaginatedResult](../interfaces/PaginatedResult.md) wrapper.

#### Parameters

##### query?

[`HistoryQuery`](../interfaces/HistoryQuery.md) = `{}`

Optional query parameters for filtering and pagination. See [HistoryQuery](../interfaces/HistoryQuery.md).

#### Returns

`Promise`\<[`PaginatedResult`](../interfaces/PaginatedResult.md)\<[`Transaction`](../type-aliases/Transaction.md)\>\>

A promise that resolves to a [PaginatedResult](../interfaces/PaginatedResult.md) containing an array of [Transaction](../type-aliases/Transaction.md) documents.

#### Throws

If the request fails (e.g., 401 Unauthorized, 404 Not Found).

#### Example

```typescript
const result = await quasar.pulsar.getHistory({
  page: 1,
  limit: 20,
  walletAddress: '6x...',
});

result.docs.forEach(tx => console.log(tx.txKey, tx.status));
```

***

### syncCreate()

> **syncCreate**(`tx`, `appName?`): `Promise`\<\{ `success`: `true`; `txKey`: `string`; \}\>

Defined in: [packages/quasar-sdk/src/modules/pulsar/index.ts:71](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/modules/pulsar/index.ts#L71)

Syncs a newly created or pending transaction to the Quasar Cloud.

This method sends the full transaction object to the Pulsar sync engine.
Once synced, the transaction is indexed and tracked through the Iron Dome infrastructure.

#### Parameters

##### tx

[`Transaction`](../type-aliases/Transaction.md)

The complete transaction object to sync. Must conform to the [Transaction](../type-aliases/Transaction.md) type.

##### appName?

`string`

Optional application name to associate with this transaction for filtering purposes.

#### Returns

`Promise`\<\{ `success`: `true`; `txKey`: `string`; \}\>

A promise that resolves to an object containing the assigned `txKey`.

#### Throws

If the request fails due to authentication, validation, or network issues.

#### Example

```typescript
const result = await quasar.pulsar.syncCreate({
  hash: '0xabc...',
  chainId: 1,
  status: 'pending',
  from: '0x123...',
  to: '0x456...',
  // ... other transaction fields
}, 'My Dashboard');

console.log(result.txKey); // The unique key for this transaction
```

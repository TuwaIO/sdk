[**@tuwaio/quasar-sdk**](../README.md)

***

# HistoryQuery

Defined in: [packages/quasar-sdk/src/types.ts:75](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L75)

Query parameters for filtering and paginating transaction history.

All fields are optional. When omitted, no filtering is applied to that field.

## Example

```typescript
const query: HistoryQuery = {
  page: 1,
  limit: 10,
  chainId: 1,           // Ethereum Mainnet
  status: 'Success',    // Only successful transactions
  appName: 'Tuwa App',  // Filter by application
};
```

## Properties

### appName?

> `optional` **appName?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:112](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L112)

Filter by the application name that synced the transaction.

***

### chainId?

> `optional` **chainId?**: `string` \| `number`

Defined in: [packages/quasar-sdk/src/types.ts:95](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L95)

Filter by blockchain chain ID.

#### Example

```ts
`1` (Ethereum), `'solana'`, `'SN_MAIN'` (Starknet)
```

***

### limit?

> `optional` **limit?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:88](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L88)

Maximum number of results to return per page.

#### Default Value

`10`

***

### page?

> `optional` **page?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:81](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L81)

Page number for pagination (1-indexed).

#### Default Value

`1`

***

### status?

> `optional` **status?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:102](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L102)

Filter by transaction status.

#### Example

```ts
`'pending'`, `'Success'`, `'Failed'`, `'Replaced'`
```

***

### txKey?

> `optional` **txKey?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:107](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L107)

Filter by a specific unique transaction key assigned by Quasar.

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:117](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/types.ts#L117)

Filter by the sender's wallet address.

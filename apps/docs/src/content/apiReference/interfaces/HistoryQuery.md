[**@tuwaio/quasar-sdk**](../README.md)

***

# HistoryQuery

Defined in: [packages/quasar-sdk/src/types.ts:62](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L62)

Query parameters for filtering transaction history.

All fields are optional — omitted fields apply no filter.

## Example

```typescript
const query: HistoryQuery = {
  page: 2,
  limit: 25,
  chainId: 1,
  status: 'confirmed',
};
```

## Properties

### appName?

> `optional` **appName**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:95](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L95)

Filter by a specific app name.

***

### chainId?

> `optional` **chainId**: `string` \| `number`

Defined in: [packages/quasar-sdk/src/types.ts:80](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L80)

Filter by blockchain chain ID (e.g. `1` for Ethereum Mainnet, `'solana'` for Solana).

***

### limit?

> `optional` **limit**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:75](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L75)

Maximum number of results per page.

#### Default Value

`10`

***

### page?

> `optional` **page**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:68](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L68)

Page number for pagination (1-indexed).

#### Default Value

`1`

***

### status?

> `optional` **status**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:85](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L85)

Filter by transaction status (e.g. `'pending'`, `'confirmed'`, `'failed'`).

***

### txKey?

> `optional` **txKey**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:90](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L90)

Filter by a specific transaction key (unique identifier assigned by Quasar).

***

### walletAddress?

> `optional` **walletAddress**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:100](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L100)

Filter by a specific wallet address.

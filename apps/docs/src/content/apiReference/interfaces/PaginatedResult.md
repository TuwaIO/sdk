[**@tuwaio/quasar-sdk**](../README.md)

***

# PaginatedResult\<T\>

Defined in: [packages/quasar-sdk/src/types.ts:134](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L134)

Generic wrapper for paginated API responses.

## Example

```typescript
const result: PaginatedResult<Transaction> = await quasar.pulsar.getHistory();

console.log(`Showing page ${result.page} of ${result.totalPages}`);
console.log(`Total transactions found: ${result.totalDocs}`);
```

## Type Parameters

### T

`T`

The type of the documents contained in the result set.

## Properties

### docs

> **docs**: `T`[]

Defined in: [packages/quasar-sdk/src/types.ts:136](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L136)

Array of documents for the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:148](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L148)

Indicates if a subsequent page of results is available.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:151](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L151)

Indicates if a preceding page of results is available.

***

### page

> **page**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:145](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L145)

The current page number (1-indexed).

***

### totalDocs

> **totalDocs**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:139](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L139)

Total number of documents matching the query across all pages.

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:142](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/types.ts#L142)

Total number of available pages based on the limit.

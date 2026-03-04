[**@tuwaio/quasar-sdk**](../README.md)

***

# PaginatedResult\<T\>

Defined in: [packages/quasar-sdk/src/types.ts:111](https://github.com/TuwaIO/sdk/blob/69d279697a2f1bda6c3e992ac87ac4d587072eb6/packages/quasar-sdk/src/types.ts#L111)

Generic wrapper for paginated API responses.

## Example

```typescript
const result: PaginatedResult<Transaction> = await quasar.pulsar.getHistory();
console.log(result.docs);       // Transaction[]
console.log(result.totalPages);  // number
console.log(result.hasNextPage); // boolean
```

## Type Parameters

### T

`T`

The type of each document in the result set.

## Properties

### docs

> **docs**: `T`[]

Defined in: [packages/quasar-sdk/src/types.ts:113](https://github.com/TuwaIO/sdk/blob/69d279697a2f1bda6c3e992ac87ac4d587072eb6/packages/quasar-sdk/src/types.ts#L113)

Array of documents for the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:125](https://github.com/TuwaIO/sdk/blob/69d279697a2f1bda6c3e992ac87ac4d587072eb6/packages/quasar-sdk/src/types.ts#L125)

Whether a subsequent page exists.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:128](https://github.com/TuwaIO/sdk/blob/69d279697a2f1bda6c3e992ac87ac4d587072eb6/packages/quasar-sdk/src/types.ts#L128)

Whether a previous page exists.

***

### page

> **page**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:122](https://github.com/TuwaIO/sdk/blob/69d279697a2f1bda6c3e992ac87ac4d587072eb6/packages/quasar-sdk/src/types.ts#L122)

Current page number (1-indexed).

***

### totalDocs

> **totalDocs**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:116](https://github.com/TuwaIO/sdk/blob/69d279697a2f1bda6c3e992ac87ac4d587072eb6/packages/quasar-sdk/src/types.ts#L116)

Total number of documents matching the query across all pages.

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:119](https://github.com/TuwaIO/sdk/blob/69d279697a2f1bda6c3e992ac87ac4d587072eb6/packages/quasar-sdk/src/types.ts#L119)

Total number of available pages.

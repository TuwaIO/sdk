[**@tuwaio/quasar-sdk**](../README.md)

***

# PaginatedResult\<T\>

Defined in: [packages/quasar-sdk/src/types.ts:106](https://github.com/TuwaIO/sdk/blob/4500c640df3b8017f3e8676e234bb99e89959e0f/packages/quasar-sdk/src/types.ts#L106)

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

Defined in: [packages/quasar-sdk/src/types.ts:108](https://github.com/TuwaIO/sdk/blob/4500c640df3b8017f3e8676e234bb99e89959e0f/packages/quasar-sdk/src/types.ts#L108)

Array of documents for the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:120](https://github.com/TuwaIO/sdk/blob/4500c640df3b8017f3e8676e234bb99e89959e0f/packages/quasar-sdk/src/types.ts#L120)

Whether a subsequent page exists.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:123](https://github.com/TuwaIO/sdk/blob/4500c640df3b8017f3e8676e234bb99e89959e0f/packages/quasar-sdk/src/types.ts#L123)

Whether a previous page exists.

***

### page

> **page**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:117](https://github.com/TuwaIO/sdk/blob/4500c640df3b8017f3e8676e234bb99e89959e0f/packages/quasar-sdk/src/types.ts#L117)

Current page number (1-indexed).

***

### totalDocs

> **totalDocs**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:111](https://github.com/TuwaIO/sdk/blob/4500c640df3b8017f3e8676e234bb99e89959e0f/packages/quasar-sdk/src/types.ts#L111)

Total number of documents matching the query across all pages.

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:114](https://github.com/TuwaIO/sdk/blob/4500c640df3b8017f3e8676e234bb99e89959e0f/packages/quasar-sdk/src/types.ts#L114)

Total number of available pages.

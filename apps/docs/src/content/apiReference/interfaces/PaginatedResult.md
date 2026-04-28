[**@tuwaio/quasar-sdk**](../README.md)

***

# PaginatedResult\<T\>

Defined in: [packages/quasar-sdk/src/types.ts:126](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L126)

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

Defined in: [packages/quasar-sdk/src/types.ts:128](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L128)

Array of documents for the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:140](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L140)

Whether a subsequent page exists.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:143](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L143)

Whether a previous page exists.

***

### page

> **page**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:137](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L137)

Current page number (1-indexed).

***

### totalDocs

> **totalDocs**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:131](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L131)

Total number of documents matching the query across all pages.

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:134](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L134)

Total number of available pages.

[**@tuwaio/quasar-sdk**](../README.md)

***

# PaginatedResult\<T\>

Defined in: [packages/quasar-sdk/src/types.ts:116](https://github.com/TuwaIO/sdk/blob/ab3f66eb65ff5472af5321358b341f741a2bedcc/packages/quasar-sdk/src/types.ts#L116)

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

Defined in: [packages/quasar-sdk/src/types.ts:118](https://github.com/TuwaIO/sdk/blob/ab3f66eb65ff5472af5321358b341f741a2bedcc/packages/quasar-sdk/src/types.ts#L118)

Array of documents for the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:130](https://github.com/TuwaIO/sdk/blob/ab3f66eb65ff5472af5321358b341f741a2bedcc/packages/quasar-sdk/src/types.ts#L130)

Whether a subsequent page exists.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:133](https://github.com/TuwaIO/sdk/blob/ab3f66eb65ff5472af5321358b341f741a2bedcc/packages/quasar-sdk/src/types.ts#L133)

Whether a previous page exists.

***

### page

> **page**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:127](https://github.com/TuwaIO/sdk/blob/ab3f66eb65ff5472af5321358b341f741a2bedcc/packages/quasar-sdk/src/types.ts#L127)

Current page number (1-indexed).

***

### totalDocs

> **totalDocs**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:121](https://github.com/TuwaIO/sdk/blob/ab3f66eb65ff5472af5321358b341f741a2bedcc/packages/quasar-sdk/src/types.ts#L121)

Total number of documents matching the query across all pages.

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:124](https://github.com/TuwaIO/sdk/blob/ab3f66eb65ff5472af5321358b341f741a2bedcc/packages/quasar-sdk/src/types.ts#L124)

Total number of available pages.

[**@tuwaio/quasar-sdk**](../README.md)

***

# PaginatedResult\<T\>

Defined in: [packages/quasar-sdk/src/types.ts:53](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L53)

Generic wrapper for paginated API responses.

## Type Parameters

### T

`T`

The type of the documents contained in the result set.

## Properties

### docs

> **docs**: `T`[]

Defined in: [packages/quasar-sdk/src/types.ts:55](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L55)

Array of documents for the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:63](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L63)

Indicates if a subsequent page is available.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [packages/quasar-sdk/src/types.ts:65](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L65)

Indicates if a preceding page is available.

***

### page

> **page**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:61](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L61)

The current page number (1-indexed).

***

### totalDocs

> **totalDocs**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:57](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L57)

Total number of documents matching the query.

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:59](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L59)

Total number of available pages.

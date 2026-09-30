# PaginatedResult\<T\>

Defined in: [types.ts:51](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L51)

One page of results.

## Type Parameters

### T

`T`

Type of the documents on the page.

## Properties

### docs

> **docs**: `T`[]

Defined in: [types.ts:53](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L53)

Documents of the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [types.ts:61](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L61)

Whether a next page exists.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [types.ts:63](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L63)

Whether a previous page exists.

***

### page

> **page**: `number`

Defined in: [types.ts:59](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L59)

Current page number, starting at 1.

***

### totalDocs

> **totalDocs**: `number`

Defined in: [types.ts:55](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L55)

Number of documents that match the query.

***

### totalPages

> **totalPages**: `number`

Defined in: [types.ts:57](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L57)

Number of pages.

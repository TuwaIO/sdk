# PaginatedResult\<T\>

Defined in: [types.ts:56](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L56)

One page of results.

## Type Parameters

### T

`T`

Type of the documents on the page.

## Properties

### docs

> **docs**: `T`[]

Defined in: [types.ts:58](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L58)

Documents of the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: [types.ts:66](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L66)

Whether a next page exists.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: [types.ts:68](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L68)

Whether a previous page exists.

***

### page

> **page**: `number`

Defined in: [types.ts:64](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L64)

Current page number, starting at 1.

***

### totalDocs

> **totalDocs**: `number`

Defined in: [types.ts:60](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L60)

Number of documents that match the query.

***

### totalPages

> **totalPages**: `number`

Defined in: [types.ts:62](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L62)

Number of pages.

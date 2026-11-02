# PaginatedResult\<T\>

Defined in: types.ts:56

One page of results.

## Type Parameters

### T

`T`

Type of the documents on the page.

## Properties

### docs

> **docs**: `T`[]

Defined in: types.ts:58

Documents of the current page.

***

### hasNextPage

> **hasNextPage**: `boolean`

Defined in: types.ts:66

Whether a next page exists.

***

### hasPrevPage

> **hasPrevPage**: `boolean`

Defined in: types.ts:68

Whether a previous page exists.

***

### page

> **page**: `number`

Defined in: types.ts:64

Current page number, starting at 1.

***

### totalDocs

> **totalDocs**: `number`

Defined in: types.ts:60

Number of documents that match the query.

***

### totalPages

> **totalPages**: `number`

Defined in: types.ts:62

Number of pages.

# QuasarRequestIssue

Defined in: [core/errors.ts:8](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/errors.ts#L8)

A field of a request the API refused, and why: `path` names it with dots (`buyer.country`).

## Properties

### message

> **message**: `string`

Defined in: [core/errors.ts:12](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/errors.ts#L12)

Why it was refused.

***

### path

> **path**: `string`

Defined in: [core/errors.ts:10](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/errors.ts#L10)

The field, for example `buyer.country`.

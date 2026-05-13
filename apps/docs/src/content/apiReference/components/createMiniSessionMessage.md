[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionMessage()

> **createMiniSessionMessage**(`timestamp`): `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:43](https://github.com/TuwaIO/sdk/blob/481db453690902aaac0d162605083e3cd1fe6605/packages/quasar-sdk/src/utils/auth.ts#L43)

Standardizes the message format for Mini-Session authentication.
Both frontend and backend MUST use this exact template for verification to pass.

## Parameters

### timestamp

`string`

ISO string timestamp (e.g., `new Date().toISOString()`).

## Returns

`string`

The formatted message string to be signed.

## Example

```typescript
const msg = createMiniSessionMessage(new Date().toISOString());
// msg -> "Mini-Session Login: 2026-05-13T10:00:00.000Z"
```

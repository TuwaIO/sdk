[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionMessage()

> **createMiniSessionMessage**(`timestamp`): `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:45](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L45)

Standardizes the message format for Quasar Mini-Session login.
Both frontend and backend must use this exact template.

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
// msg -> "Quasar Login: 2026-05-13T10:00:00.000Z"
```

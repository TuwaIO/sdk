[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionMessage()

> **createMiniSessionMessage**(`timestamp`): `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:43](https://github.com/TuwaIO/sdk/blob/45d929ec52cfd7b7cca544725d3e594c7423f0b7/packages/quasar-sdk/src/utils/auth.ts#L43)

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

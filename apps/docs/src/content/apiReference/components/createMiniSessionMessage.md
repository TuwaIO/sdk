[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionMessage()

> **createMiniSessionMessage**(`timestamp`): `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:52](https://github.com/TuwaIO/sdk/blob/c8c0c68c647cef31269582c4fb618dd3cd0fb3ab/packages/quasar-sdk/src/utils/auth.ts#L52)

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

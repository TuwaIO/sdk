[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionMessage()

> **createMiniSessionMessage**(`timestamp`): `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:33](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/utils/auth.ts#L33)

Standardizes the message format for Mini-Session login.
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
// msg -> "Mini-Session Login: 2026-05-13T10:00:00.000Z"
```

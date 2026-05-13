[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionMessage()

> **createMiniSessionMessage**(`timestamp`): `string`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:51](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L51)

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

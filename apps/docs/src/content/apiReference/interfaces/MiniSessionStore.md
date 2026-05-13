[**@tuwaio/quasar-sdk**](../README.md)

***

# MiniSessionStore

Defined in: [packages/quasar-sdk/src/types.ts:228](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L228)

Zustand store interface for managing Mini-Sessions.

## Properties

### clearSession

> **clearSession**: () => `void`

Defined in: [packages/quasar-sdk/src/types.ts:234](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L234)

Clears the current session.

#### Returns

`void`

***

### miniSession

> **miniSession**: [`MiniSessionAuth`](MiniSessionAuth.md) \| `null`

Defined in: [packages/quasar-sdk/src/types.ts:230](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L230)

Current active session or null.

***

### setMiniSession

> **setMiniSession**: (`session`) => `void`

Defined in: [packages/quasar-sdk/src/types.ts:232](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L232)

Sets the active session.

#### Parameters

##### session

[`MiniSessionAuth`](MiniSessionAuth.md) \| `null`

#### Returns

`void`

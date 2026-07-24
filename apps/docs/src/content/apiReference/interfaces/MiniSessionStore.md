[**@tuwaio/quasar-sdk**](../README.md)

***

# MiniSessionStore

Defined in: [packages/quasar-sdk/src/types.ts:176](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L176)

Interface for a store that manages Mini-Session persistence.
Designed to be compatible with Zustand.

## Properties

### clearSession

> **clearSession**: () => `void`

Defined in: [packages/quasar-sdk/src/types.ts:182](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L182)

Clears the current session.

#### Returns

`void`

***

### miniSession

> **miniSession**: [`MiniSessionAuth`](MiniSessionAuth.md) \| `null`

Defined in: [packages/quasar-sdk/src/types.ts:178](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L178)

Current active session or null.

***

### setMiniSession

> **setMiniSession**: (`session`) => `void`

Defined in: [packages/quasar-sdk/src/types.ts:180](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/types.ts#L180)

Sets the active session.

#### Parameters

##### session

[`MiniSessionAuth`](MiniSessionAuth.md) \| `null`

#### Returns

`void`

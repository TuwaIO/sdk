[**@tuwaio/quasar-sdk**](../README.md)

***

# MiniSessionStore

Defined in: [packages/quasar-sdk/src/types.ts:174](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L174)

Interface for a store that manages Mini-Session persistence.
Designed to be compatible with Zustand.

## Properties

### clearSession

> **clearSession**: () => `void`

Defined in: [packages/quasar-sdk/src/types.ts:180](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L180)

Clears the current session.

#### Returns

`void`

***

### miniSession

> **miniSession**: [`MiniSessionAuth`](MiniSessionAuth.md) \| `null`

Defined in: [packages/quasar-sdk/src/types.ts:176](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L176)

Current active session or null.

***

### setMiniSession

> **setMiniSession**: (`session`) => `void`

Defined in: [packages/quasar-sdk/src/types.ts:178](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/types.ts#L178)

Sets the active session.

#### Parameters

##### session

[`MiniSessionAuth`](MiniSessionAuth.md) \| `null`

#### Returns

`void`

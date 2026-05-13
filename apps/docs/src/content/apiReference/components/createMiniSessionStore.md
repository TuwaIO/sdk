[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionStore()

> **createMiniSessionStore**(`storageName?`): `UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

Defined in: [packages/quasar-sdk/src/utils/session.ts:14](https://github.com/TuwaIO/sdk/blob/494fbc95844351c2656d7f175f4f1af1877ba7dc/packages/quasar-sdk/src/utils/session.ts#L14)

Creates a persistent Zustand store to cache Mini-Session signatures.
Requires `zustand` to be installed as a peer dependency.

## Parameters

### storageName?

`string` = `'mini-session-storage'`

Key name for localStorage persistence.

## Returns

`UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

A Zustand store instance.

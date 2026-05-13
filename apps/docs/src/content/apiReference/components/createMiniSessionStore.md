[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionStore()

> **createMiniSessionStore**(`storageName?`): `UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

Defined in: [packages/quasar-sdk/src/utils/session.ts:14](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/utils/session.ts#L14)

Creates a persistent Zustand store to cache Mini-Session signatures.
Requires `zustand` to be installed as a peer dependency.

## Parameters

### storageName?

`string` = `'mini-session-storage'`

Key name for localStorage persistence.

## Returns

`UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

A Zustand store instance.

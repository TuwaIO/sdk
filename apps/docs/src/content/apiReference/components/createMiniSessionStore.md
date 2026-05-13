[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionStore()

> **createMiniSessionStore**(`storageName?`): `UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

Defined in: [packages/quasar-sdk/src/utils/session.ts:14](https://github.com/TuwaIO/sdk/blob/7b4fa2d828783f8e5a64b9061a463e1a36db4ee9/packages/quasar-sdk/src/utils/session.ts#L14)

Creates a persistent Zustand store to cache Mini-Session signatures.
Requires `zustand` to be installed as a peer dependency.

## Parameters

### storageName?

`string` = `'mini-session-storage'`

Key name for localStorage persistence.

## Returns

`UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

A Zustand store instance.

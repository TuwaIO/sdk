[**@tuwaio/quasar-sdk**](../README.md)

***

# createMiniSessionStore()

> **createMiniSessionStore**(`storageName?`): `UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

Defined in: [packages/quasar-sdk/src/utils/session.ts:28](https://github.com/TuwaIO/sdk/blob/4921616721c44ea26dbd18d72f452e63c4750c3a/packages/quasar-sdk/src/utils/session.ts#L28)

Creates a persistent Zustand store to cache Mini-Session signatures.
This is the recommended way to manage sessions in React applications.

## Parameters

### storageName?

`string` = `'mini-session-storage'`

The localStorage key for persistence. Defaults to 'mini-session-storage'.

## Returns

`UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

A Zustand store instance initialized with MiniSessionStore interface.

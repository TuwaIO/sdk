[**@tuwaio/quasar-sdk**](../README.md)

***

# getMiniSessionAuth()

> **getMiniSessionAuth**(`connection`, `store`): `Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

Defined in: [packages/quasar-sdk/src/utils/session.ts:40](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/utils/session.ts#L40)

Generic helper to manage Mini-Session signing and caching.

Checks the provided store for an existing session matching the current connection.
If no session is found, it triggers a signature request using the provided signer.

## Parameters

### connection

[`ConnectionData`](../interfaces/ConnectionData.md)

Current active connection state.

### store

An object compatible with MiniSessionStore to read/write the session.

#### miniSession

[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md) \| `null`

#### setMiniSession

(`s`) => `void`

## Returns

`Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

A promise resolving to the authenticated session.

## Throws

If no wallet is connected or signing fails.

[**@tuwaio/quasar-sdk**](../README.md)

***

# getMiniSessionAuth()

> **getMiniSessionAuth**(`connection`, `store`): `Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

Defined in: [packages/quasar-sdk/src/utils/session.ts:50](https://github.com/TuwaIO/sdk/blob/40e865856a0617a904fae0c2bda5ce0c68ac8117/packages/quasar-sdk/src/utils/session.ts#L50)

High-level orchestrator to retrieve an existing Mini-Session or trigger a new signature.

This function checks the provided store for a valid, non-expired session matching
the current wallet connection. If no session is found or it has expired, it
triggers a signature request through the wallet.

## Parameters

### connection

[`ConnectionData`](../interfaces/ConnectionData.md)

The current active wallet connection data (address, signer, etc).

### store

A store implementation (Zustand or compatible) for session persistence.

#### miniSession

[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md) \| `null`

#### setMiniSession

(`session`) => `void`

## Returns

`Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

A promise resolving to a valid MiniSessionAuth object.

## Throws

If the wallet is disconnected or signing fails.

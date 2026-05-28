[**@tuwaio/quasar-sdk**](../README.md)

***

# getMiniSessionAuth()

> **getMiniSessionAuth**(`connection`, `store`, `maxAge?`): `Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

Defined in: [packages/quasar-sdk/src/utils/session.ts:60](https://github.com/TuwaIO/sdk/blob/0cd523205b2f5b4c431bcfa884fa86ed8804dd3b/packages/quasar-sdk/src/utils/session.ts#L60)

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

### maxAge?

`number` = `DEFAULT_MAX_AGE`

Maximum allowed session age in milliseconds. Must match the value
  passed to `verifyMiniSession` to keep cache and verification in sync.
  Defaults to `DEFAULT_MAX_AGE` (5 minutes).

## Returns

`Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

A promise resolving to a valid MiniSessionAuth object.

## Throws

If the wallet is disconnected or signing fails.

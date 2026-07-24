[**@tuwaio/quasar-sdk**](../README.md)

***

# Quasar

Defined in: [packages/quasar-sdk/src/index.ts:89](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/index.ts#L89)

Main entry point for the Quasar SDK.

The `Quasar` class provides a unified interface for interacting with the Quasar Cloud API.
It handles authentication, base URL configuration, and exposes domain-specific modules
like [PulsarModule](PulsarModule.md) for transaction management.

## Example

```typescript
import { Quasar } from '@tuwaio/quasar-sdk';

// Initialize with your secret API key
const quasar = new Quasar({
  secretKey: 'sk_live_your_secret_key',
  baseUrl: 'https://api.tuwa.io', // Optional
  timeout: 10000,                // Optional, default is 10s
});

// Access domain-specific modules
const history = await quasar.pulsar.getHistory({ chainId: 1 });
```

## Constructors

### Constructor

> **new Quasar**(`config`): `Quasar`

Defined in: [packages/quasar-sdk/src/index.ts:123](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/index.ts#L123)

Creates a new instance of the Quasar SDK.

#### Parameters

##### config

[`QuasarConfig`](../interfaces/QuasarConfig.md)

Configuration options for the SDK.

#### Returns

`Quasar`

#### Throws

If the `secretKey` is missing or invalid.

#### Example

```typescript
const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY! });
```

## Properties

### pulsar

> `readonly` **pulsar**: [`PulsarModule`](PulsarModule.md)

Defined in: [packages/quasar-sdk/src/index.ts:110](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/index.ts#L110)

The Pulsar Transaction Engine module.

This module provides methods to sync transaction states to the Quasar Cloud
and retrieve indexed transaction history across multiple blockchain networks.

#### See

[PulsarModule](PulsarModule.md)

***

### utils

> `readonly` `static` **utils**: `object`

Defined in: [packages/quasar-sdk/src/index.ts:94](https://github.com/TuwaIO/sdk/blob/e77c61202e1466b722530b0dd500e856d37bb656/packages/quasar-sdk/src/index.ts#L94)

Security and authentication utilities.
Shared across all instances and available statically.

#### createMiniSessionMessage

> **createMiniSessionMessage**: (`timestamp`) => `string` = `authUtils.createMiniSessionMessage`

Standardizes the message format for Quasar Mini-Session login.

Standardizes the message format for Mini-Session authentication.
Both frontend and backend MUST use this exact template for verification to pass.

##### Parameters

###### timestamp

`string`

ISO string timestamp (e.g., `new Date().toISOString()`).

##### Returns

`string`

The formatted message string to be signed.

##### Example

```typescript
const msg = createMiniSessionMessage(new Date().toISOString());
// msg -> "Mini-Session Login: 2026-05-13T10:00:00.000Z"
```

##### See

[createMiniSessionMessage](../functions/createMiniSessionMessage.md)

#### createMiniSessionStore

> **createMiniSessionStore**: (`storageName`) => `UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\> = `authUtils.createMiniSessionStore`

Creates a persistent Zustand store for session management.

Creates a persistent Zustand store to cache Mini-Session signatures.
This is the recommended way to manage sessions in React applications.

##### Parameters

###### storageName?

`string` = `'mini-session-storage'`

The localStorage key for persistence. Defaults to 'mini-session-storage'.

##### Returns

`UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

A Zustand store instance initialized with MiniSessionStore interface.

##### See

[createMiniSessionStore](../functions/createMiniSessionStore.md)

#### getMiniSessionAuth

> **getMiniSessionAuth**: (`connection`, `store`, `maxAge`) => `Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\> = `authUtils.getMiniSessionAuth`

Reusable helper to manage signing and session caching.

High-level orchestrator to retrieve an existing Mini-Session or trigger a new signature.

This function checks the provided store for a valid, non-expired session matching
the current wallet connection. If no session is found or it has expired, it
triggers a signature request through the wallet.

##### Parameters

###### connection

[`ConnectionData`](../interfaces/ConnectionData.md)

The current active wallet connection data (address, signer, etc).

###### store

A store implementation (Zustand or compatible) for session persistence.

###### miniSession

[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md) \| `null`

###### setMiniSession

(`session`) => `void`

###### maxAge?

`number` = `DEFAULT_MAX_AGE`

Maximum allowed session age in milliseconds. Must match the value
  passed to `verifyMiniSession` to keep cache and verification in sync.
  Defaults to `DEFAULT_MAX_AGE` (5 minutes).

##### Returns

`Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

A promise resolving to a valid MiniSessionAuth object.

##### Throws

If the wallet is disconnected or signing fails.

##### See

[getMiniSessionAuth](../functions/getMiniSessionAuth.md)

#### signMiniSession

> **signMiniSession**: (`params`) => `Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\> = `authUtils.signMiniSession`

Triggers a signature request in the connected wallet.

Triggers a signature request in the connected wallet to create a Mini-Session.

This function detects the signer's capabilities and uses the most appropriate
signing method available (e.g., Web3 v2, Standard, or Legacy).

##### Parameters

###### params

[`SignSessionParams`](../interfaces/SignSessionParams.md)

Parameters containing the signer and target ecosystem.

##### Returns

`Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

A promise resolving to the signature and timestamp.

##### Throws

If signing fails or the signer lacks required methods.

##### See

[signMiniSession](../functions/signMiniSession.md)

#### verifyMiniSession

> **verifyMiniSession**: (`params`) => `Promise`\<`boolean`\> = `authUtils.verifyMiniSession`

Verifies a Mini-Session signature (EVM or Solana).

Verifies a Mini-Session signature for authenticity and freshness.

Performs cryptographic verification against the provided wallet address and
ensures the signature hasn't expired according to the `maxAge` parameter.

##### Parameters

###### params

[`VerifySessionParams`](../interfaces/VerifySessionParams.md)

Verification data including signature and timestamp.

##### Returns

`Promise`\<`boolean`\>

A promise resolving to true if the session is valid.

##### See

[verifyMiniSession](../functions/verifyMiniSession.md)

[**@tuwaio/quasar-sdk**](../README.md)

***

# utils

> `const` **utils**: `object`

Defined in: [packages/quasar-sdk/src/index.ts:33](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/index.ts#L33)

Security and authentication utilities.

Includes methods for creating, signing, and verifying Mini-Session signatures
to protect your API quota. These can be used without initializing the Quasar class.

## Type Declaration

### createMiniSessionMessage

> **createMiniSessionMessage**: (`timestamp`) => `string` = `authUtils.createMiniSessionMessage`

Standardizes the message format for Quasar Mini-Session login.

Standardizes the message format for Mini-Session login.
Both frontend and backend must use this exact template.

#### Parameters

##### timestamp

`string`

ISO string timestamp (e.g., `new Date().toISOString()`).

#### Returns

`string`

The formatted message string to be signed.

#### Example

```typescript
const msg = createMiniSessionMessage(new Date().toISOString());
// msg -> "Mini-Session Login: 2026-05-13T10:00:00.000Z"
```

#### See

[createMiniSessionMessage](../functions/createMiniSessionMessage.md)

### createMiniSessionStore

> **createMiniSessionStore**: (`storageName`) => `UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\> = `authUtils.createMiniSessionStore`

Creates a persistent Zustand store for session management.

Creates a persistent Zustand store to cache Mini-Session signatures.
Requires `zustand` to be installed as a peer dependency.

#### Parameters

##### storageName?

`string` = `'mini-session-storage'`

Key name for localStorage persistence.

#### Returns

`UseBoundStore`\<`WithPersist`\<`StoreApi`\<[`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>, [`MiniSessionStore`](../interfaces/MiniSessionStore.md)\>\>

A Zustand store instance.

#### See

[createMiniSessionStore](../functions/createMiniSessionStore.md)

### getMiniSessionAuth

> **getMiniSessionAuth**: (`connection`, `store`) => `Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\> = `authUtils.getMiniSessionAuth`

Reusable helper to manage signing and session caching.

Generic helper to manage Mini-Session signing and caching.

Checks the provided store for an existing session matching the current connection.
If no session is found, it triggers a signature request using the provided signer.

#### Parameters

##### connection

[`ConnectionData`](../interfaces/ConnectionData.md)

Current active connection state.

##### store

An object compatible with MiniSessionStore to read/write the session.

###### miniSession

[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md) \| `null`

###### setMiniSession

(`s`) => `void`

#### Returns

`Promise`\<[`MiniSessionAuth`](../interfaces/MiniSessionAuth.md)\>

A promise resolving to the authenticated session.

#### Throws

If no wallet is connected or signing fails.

#### See

[getMiniSessionAuth](../functions/getMiniSessionAuth.md)

### signMiniSession

> **signMiniSession**: (`params`) => `Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\> = `authUtils.signMiniSession`

Triggers a signature request in the connected wallet.

Triggers a signature request in the connected wallet to create a Mini-Session.

This is a frontend-friendly helper that:
1. Generates a fresh ISO timestamp.
2. Formats the standard login message.
3. Triggers the wallet's signMessage method.
4. Returns the signature and timestamp for verification on the backend.

#### Parameters

##### params

[`SignSessionParams`](../interfaces/SignSessionParams.md)

The signing parameters including the signer and ecosystem type.

#### Returns

`Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

A promise that resolves to the signature and timestamp.

#### Throws

If the required peer dependencies are missing or signing fails.

#### See

[signMiniSession](../functions/signMiniSession.md)

### verifyMiniSession

> **verifyMiniSession**: (`params`) => `Promise`\<`boolean`\> = `authUtils.verifyMiniSession`

Verifies a Mini-Session signature (EVM or Solana).

Verifies a Mini-Session signature to protect API quota from unauthorized access.

This utility performs three checks:
1. Timestamp freshness (rejects if older than 5 minutes or in the future).
2. Cryptographic validity (checks if the signature matches the wallet address and message).
3. Ecosystem-specific logic (EVM via `viem`, Solana via `gill`).

#### Parameters

##### params

[`VerifySessionParams`](../interfaces/VerifySessionParams.md)

The verification parameters including address, signature, and timestamp.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` if the signature is valid and fresh.

#### Throws

If the required peer dependencies (`viem` or `gill`) are missing.

#### Throws

If the timestamp is invalid or expired.

#### See

[verifyMiniSession](../functions/verifyMiniSession.md)

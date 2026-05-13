[**@tuwaio/quasar-sdk**](../README.md)

***

# utils

> `const` **utils**: `object`

Defined in: [packages/quasar-sdk/src/index.ts:33](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/index.ts#L33)

Security and authentication utilities.

Includes methods for creating, signing, and verifying Mini-Session signatures
to protect your API quota. These can be used without initializing the Quasar class.

## Type Declaration

### createMiniSessionMessage

> **createMiniSessionMessage**: (`timestamp`) => `string` = `authUtils.createMiniSessionMessage`

Standardizes the message format for Quasar Mini-Session login.

Standardizes the message format for Quasar Mini-Session login.
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
// msg -> "Quasar Login: 2026-05-13T10:00:00.000Z"
```

#### See

[createMiniSessionMessage](../functions/createMiniSessionMessage.md)

### signMiniSession

> **signMiniSession**: (`params`) => `Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\> = `authUtils.signMiniSession`

Triggers a signature request in the connected wallet.

Triggers a signature request in the connected wallet to create a Mini-Session.

This is a frontend-friendly helper that:
1. Generates a fresh ISO timestamp.
2. Formats the standard Quasar login message.
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

#### Example

```typescript
// EVM (viem)
const { signature, timestamp } = await signMiniSession({
  signer: walletClient,
  walletAddress: '0x...',
  chainType: 'evm',
});

// Solana (gill)
const { signature, timestamp } = await signMiniSession({
  signer: keypairSigner,
  chainType: 'solana',
});
```

#### See

[signMiniSession](../functions/signMiniSession.md)

### verifyMiniSession

> **verifyMiniSession**: (`params`) => `Promise`\<`boolean`\> = `authUtils.verifyMiniSession`

Verifies a Mini-Session signature (EVM or Solana).

Verifies a Mini-Session signature to protect API quota from unauthorized access.

This utility performs three checks:
1. Timestamp freshness (rejects if older than 5 minutes or in the future).
2. Cryptographic validity (checks if the signature matches the wallet address and message).
3. ecosystem-specific logic (EVM via `viem`, Solana via `gill`).

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

#### Example

```typescript
const isValid = await verifyMiniSession({
  walletAddress: '0x...',
  timestamp: '2026-05-13T10:00:00.000Z',
  signature: '0x...',
  chainType: 'evm',
});
```

#### See

[verifyMiniSession](../functions/verifyMiniSession.md)

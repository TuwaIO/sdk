[**@tuwaio/quasar-sdk**](../README.md)

***

# signMiniSession()

> **signMiniSession**(`params`): `Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:100](https://github.com/TuwaIO/sdk/blob/cac842692dc42a6eb953a623b23aa9e6ce5c3f3b/packages/quasar-sdk/src/utils/auth.ts#L100)

Triggers a signature request in the connected wallet to create a Mini-Session.

This is a frontend-friendly helper that:
1. Generates a fresh ISO timestamp.
2. Formats the standard Quasar login message.
3. Triggers the wallet's signMessage method.
4. Returns the signature and timestamp for verification on the backend.

## Parameters

### params

[`SignSessionParams`](../interfaces/SignSessionParams.md)

The signing parameters including the signer and ecosystem type.

## Returns

`Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

A promise that resolves to the signature and timestamp.

## Throws

If the required peer dependencies are missing or signing fails.

## Example

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

[**@tuwaio/quasar-sdk**](../README.md)

***

# signMiniSession()

> **signMiniSession**(`params`): `Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:60](https://github.com/TuwaIO/sdk/blob/248399a6984792d96235541a58c591dc8188e928/packages/quasar-sdk/src/utils/auth.ts#L60)

Triggers a signature request in the connected wallet to create a Mini-Session.

This is a frontend-friendly helper that:
1. Generates a fresh ISO timestamp.
2. Formats the standard login message.
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

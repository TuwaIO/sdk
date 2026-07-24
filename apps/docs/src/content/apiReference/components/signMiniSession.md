[**@tuwaio/quasar-sdk**](../README.md)

***

# signMiniSession()

> **signMiniSession**(`params`): `Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:68](https://github.com/TuwaIO/sdk/blob/2d540932d8802ea7063f28dc8d8a2349091d9d49/packages/quasar-sdk/src/utils/auth.ts#L68)

Triggers a signature request in the connected wallet to create a Mini-Session.

This function detects the signer's capabilities and uses the most appropriate
signing method available (e.g., Web3 v2, Standard, or Legacy).

## Parameters

### params

[`SignSessionParams`](../interfaces/SignSessionParams.md)

Parameters containing the signer and target ecosystem.

## Returns

`Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

A promise resolving to the signature and timestamp.

## Throws

If signing fails or the signer lacks required methods.

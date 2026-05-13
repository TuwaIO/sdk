[**@tuwaio/quasar-sdk**](../README.md)

***

# signMiniSession()

> **signMiniSession**(`params`): `Promise`\<[`SignSessionResult`](../interfaces/SignSessionResult.md)\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:59](https://github.com/TuwaIO/sdk/blob/40e865856a0617a904fae0c2bda5ce0c68ac8117/packages/quasar-sdk/src/utils/auth.ts#L59)

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

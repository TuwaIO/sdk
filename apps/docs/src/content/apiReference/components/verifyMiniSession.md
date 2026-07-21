[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:159](https://github.com/TuwaIO/sdk/blob/4921616721c44ea26dbd18d72f452e63c4750c3a/packages/quasar-sdk/src/utils/auth.ts#L159)

Verifies a Mini-Session signature for authenticity and freshness.

Performs cryptographic verification against the provided wallet address and
ensures the signature hasn't expired according to the `maxAge` parameter.

## Parameters

### params

[`VerifySessionParams`](../interfaces/VerifySessionParams.md)

Verification data including signature and timestamp.

## Returns

`Promise`\<`boolean`\>

A promise resolving to true if the session is valid.

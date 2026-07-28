[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:159](https://github.com/TuwaIO/sdk/blob/c8c0c68c647cef31269582c4fb618dd3cd0fb3ab/packages/quasar-sdk/src/utils/auth.ts#L159)

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

[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:159](https://github.com/TuwaIO/sdk/blob/fe67c543a0f125fbcbaca8a0ff4173a1d6a6e749/packages/quasar-sdk/src/utils/auth.ts#L159)

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

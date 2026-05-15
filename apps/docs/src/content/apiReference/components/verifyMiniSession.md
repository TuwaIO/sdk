[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:157](https://github.com/TuwaIO/sdk/blob/ce81cef2e11371edca68c5ede6f63a43b1f217a3/packages/quasar-sdk/src/utils/auth.ts#L157)

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

[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:148](https://github.com/TuwaIO/sdk/blob/6a8c521029a1526ee3cbe7403db634fcca238cea/packages/quasar-sdk/src/utils/auth.ts#L148)

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

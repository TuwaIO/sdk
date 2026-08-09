[**@tuwaio/quasar-sdk**](../README.md)

***

# preFlightTxCheck()

> **preFlightTxCheck**(`customApiUrl?`): `Promise`\<`void`\>

Defined in: [packages/quasar-sdk/src/index.ts:36](https://github.com/TuwaIO/sdk/blob/26ba3f4bfb2159f169ad07a374b36d95574359d8/packages/quasar-sdk/src/index.ts#L36)

Pre-flight check before initiating a transaction.
Ensures the local SIWX Session is valid and verifies Quasar Engine health.

## Parameters

### customApiUrl?

`string`

Optional custom API URL to override the default.

## Returns

`Promise`\<`void`\>

## Throws

If the session check fails or Quasar is unreachable.

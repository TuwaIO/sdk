[**@tuwaio/quasar-sdk**](../README.md)

***

# preFlightTxCheck()

> **preFlightTxCheck**(`customApiUrl?`): `Promise`\<`void`\>

Defined in: [packages/quasar-sdk/src/index.ts:36](https://github.com/TuwaIO/sdk/blob/f39fbc86343f741f6ec1f2a3480f634e4162bab4/packages/quasar-sdk/src/index.ts#L36)

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

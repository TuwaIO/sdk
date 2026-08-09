[**@tuwaio/quasar-sdk**](../README.md)

***

# preFlightTxCheck()

> **preFlightTxCheck**(`customApiUrl?`): `Promise`\<`void`\>

Defined in: [packages/quasar-sdk/src/index.ts:36](https://github.com/TuwaIO/sdk/blob/9e1e91414e54492189d8fa18e441e45c781102d5/packages/quasar-sdk/src/index.ts#L36)

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

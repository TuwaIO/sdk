# pulsarSyncHashEndpoint()

> **pulsarSyncHashEndpoint**(`txKey`): `string`

Defined in: [constants.ts:20](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/constants.ts#L20)

Path of the endpoint that `PulsarModule.syncHash` calls (`POST`) for the EIP-5792 batch with this `txKey`.

## Parameters

### txKey

`string`

The batch ID, the `txKey` of the transaction.

## Returns

`string`

The path, with the batch ID URL-encoded.

[**@tuwaio/quasar-sdk**](../README.md)

***

# QuasarConfig

Defined in: [packages/quasar-sdk/src/types.ts:12](https://github.com/TuwaIO/sdk/blob/1db4cddd8b400e659a8cc0f194b78efc98f9cf08/packages/quasar-sdk/src/types.ts#L12)

Configuration options for initializing the [Quasar](../classes/Quasar.md) SDK client.

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:18](https://github.com/TuwaIO/sdk/blob/1db4cddd8b400e659a8cc0f194b78efc98f9cf08/packages/quasar-sdk/src/types.ts#L18)

The base URL of the Quasar Cloud API. Defaults to 'https://api.tuwa.io'.

***

### internalSecret?

> `optional` **internalSecret?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:16](https://github.com/TuwaIO/sdk/blob/1db4cddd8b400e659a8cc0f194b78efc98f9cf08/packages/quasar-sdk/src/types.ts#L16)

Optional internal secret for system-to-system communication.

***

### secretKey

> **secretKey**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:14](https://github.com/TuwaIO/sdk/blob/1db4cddd8b400e659a8cc0f194b78efc98f9cf08/packages/quasar-sdk/src/types.ts#L14)

Your secret API key starting with `sk_live_`.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:20](https://github.com/TuwaIO/sdk/blob/1db4cddd8b400e659a8cc0f194b78efc98f9cf08/packages/quasar-sdk/src/types.ts#L20)

Request timeout in milliseconds. Defaults to 10000.

[**@tuwaio/quasar-sdk**](../README.md)

***

# QuasarConfig

Defined in: [packages/quasar-sdk/src/types.ts:3](https://github.com/TuwaIO/sdk/blob/dbab468f283e6a76cd08b2bb6516e1029ef1f854/packages/quasar-sdk/src/types.ts#L3)

## Properties

### baseUrl?

> `optional` **baseUrl**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:14](https://github.com/TuwaIO/sdk/blob/dbab468f283e6a76cd08b2bb6516e1029ef1f854/packages/quasar-sdk/src/types.ts#L14)

The base URL of the Quasar API.
Defaults to 'https://api.tuwa.io' (or your production URL).

***

### secretKey

> **secretKey**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:8](https://github.com/TuwaIO/sdk/blob/dbab468f283e6a76cd08b2bb6516e1029ef1f854/packages/quasar-sdk/src/types.ts#L8)

Your secret API key starting with 'sk_live_'.
This MUST be kept secure on the server side.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:20](https://github.com/TuwaIO/sdk/blob/dbab468f283e6a76cd08b2bb6516e1029ef1f854/packages/quasar-sdk/src/types.ts#L20)

Request timeout in milliseconds.
Defaults to 10000ms.

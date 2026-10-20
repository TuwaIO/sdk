# QuasarConfig

Defined in: [types.ts:8](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L8)

Options of the [Quasar](/packages/quasar-sdk/server/classes/Quasar.md) client.

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [types.ts:20](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L20)

Base URL of the Quasar API: Quasar Cloud or your self-hosted server. Defaults to [BASE\_API\_URL](/packages/quasar-sdk/server/variables/BASE_API_URL.md).

***

### internalSecret?

> `optional` **internalSecret?**: `string`

Defined in: [types.ts:18](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L18)

Secret of the internal endpoints of a Quasar deployment, sent in the `x-internal-secret` header when set. The
Quasar dashboard uses it to call its own server; apps leave it unset.

***

### secretKey

> **secretKey**: `string`

Defined in: [types.ts:13](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L13)

Secret key of your Quasar app (`sk_live_...` for a live app, `sk_test_...` for a test app), sent in the
`x-tuwa-secret-key` header of every request. Keep it on the server.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [types.ts:22](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L22)

Request timeout in milliseconds. Defaults to `10000`.

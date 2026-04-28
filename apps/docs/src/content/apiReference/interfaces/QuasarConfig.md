[**@tuwaio/quasar-sdk**](../README.md)

***

# QuasarConfig

Defined in: [packages/quasar-sdk/src/types.ts:23](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L23)

Configuration options for initializing the [Quasar](../classes/Quasar.md) SDK client.

## Example

```typescript
const config: QuasarConfig = {
  secretKey: 'sk_live_abc123...',
  internalSecret: 'int_secret_abc123...',
  baseUrl: 'https://api.tuwa.io',
  timeout: 15000,
};
```

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:47](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L47)

The base URL of the Quasar Cloud API.

#### Default Value

`'https://api.tuwa.io'`

***

### internalSecret?

> `optional` **internalSecret?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:40](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L40)

Optional internal secret sent as `x-internal-secret` header on every request.

#### Remarks

If provided, the SDK automatically includes it in outgoing requests.
If omitted, the header is not added.

***

### secretKey

> **secretKey**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:31](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L31)

Your secret API key starting with `sk_live_`.

#### Remarks

This key authenticates every request through the Iron Dome security perimeter.
It **MUST** be kept secure on the server side — never expose it in client bundles.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:54](https://github.com/TuwaIO/sdk/blob/c2625042fd8efe75112dc2e68c7dae1f6227d865/packages/quasar-sdk/src/types.ts#L54)

Request timeout in milliseconds.

#### Default Value

`10000`

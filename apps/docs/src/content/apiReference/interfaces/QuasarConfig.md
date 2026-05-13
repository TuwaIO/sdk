[**@tuwaio/quasar-sdk**](../README.md)

***

# QuasarConfig

Defined in: [packages/quasar-sdk/src/types.ts:23](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L23)

Configuration options for initializing the [Quasar](../classes/Quasar.md) SDK client.

## Example

```typescript
const config: QuasarConfig = {
  secretKey: 'sk_live_abc123...',
  baseUrl: 'https://api.tuwa.io',
  timeout: 15000,
};
```

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:48](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L48)

The base URL of the Quasar Cloud API.

#### Default Value

`'https://api.tuwa.io'`

***

### internalSecret?

> `optional` **internalSecret?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:41](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L41)

Optional internal secret sent as `x-internal-secret` header on every request.

#### Remarks

This is used for system-to-system communication between TUWA internal services.
Most third-party developers do not need to provide this.

***

### secretKey

> **secretKey**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:32](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L32)

Your secret API key starting with `sk_live_`.

#### Remarks

This key authenticates every request through the Iron Dome security perimeter.
It **MUST** be kept secure on the server side — never expose it in client-side bundles
as it grants full access to your organization's Quasar data.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:55](https://github.com/TuwaIO/sdk/blob/56f32d05204d8e3face85bd0cfcf4d125f27ce73/packages/quasar-sdk/src/types.ts#L55)

Request timeout in milliseconds for all API calls.

#### Default Value

`10000` (10 seconds)

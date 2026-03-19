[**@tuwaio/quasar-sdk**](../README.md)

***

# QuasarConfig

Defined in: [packages/quasar-sdk/src/types.ts:22](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L22)

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

> `optional` **baseUrl**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:37](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L37)

The base URL of the Quasar Cloud API.

#### Default Value

`'https://api.tuwa.io'`

***

### secretKey

> **secretKey**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:30](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L30)

Your secret API key starting with `sk_live_`.

#### Remarks

This key authenticates every request through the Iron Dome security perimeter.
It **MUST** be kept secure on the server side — never expose it in client bundles.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:44](https://github.com/TuwaIO/sdk/blob/d3e1c18dd5b723ccdc8bb587c6c0ea77feb96cf7/packages/quasar-sdk/src/types.ts#L44)

Request timeout in milliseconds.

#### Default Value

`10000`

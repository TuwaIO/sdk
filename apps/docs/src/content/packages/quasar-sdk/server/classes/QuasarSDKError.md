# QuasarSDKError

Defined in: [core/client.ts:27](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L27)

Error thrown by the methods of the [Quasar](/packages/quasar-sdk/server/classes/Quasar.md) client when a request fails: an HTTP error status, a timeout or a
network error.

## Example

```typescript
try {
  await quasar.pulsar.getHistory();
} catch (err) {
  if (err instanceof QuasarSDKError) {
    console.error(err.status);        // e.g. 401
    console.error(err.message);       // "[Quasar SDK] Request Failed (401): <error of the API>"
    console.error(err.originalError); // FetchError from ofetch
  }
}
```

## Extends

- `Error`

## Constructors

### Constructor

> **new QuasarSDKError**(`message`, `status`, `originalError`): `QuasarSDKError`

Defined in: [core/client.ts:42](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L42)

Creates the error.

#### Parameters

##### message

`string`

Message: `[Quasar SDK] Request Failed (<status>): <error>`, where `<error>` is the `error` field of
  the response body or the message of the fetch error.

##### status

`number` \| `undefined`

HTTP status code, or `undefined` when no response was received.

##### originalError

`Error`

The error thrown by `ofetch`.

#### Returns

`QuasarSDKError`

#### Overrides

`Error.constructor`

## Properties

### originalError

> `readonly` **originalError**: `Error`

Defined in: [core/client.ts:32](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L32)

The error thrown by `ofetch`.

***

### status

> `readonly` **status**: `number` \| `undefined`

Defined in: [core/client.ts:29](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L29)

HTTP status code of the response, or `undefined` when no response was received.

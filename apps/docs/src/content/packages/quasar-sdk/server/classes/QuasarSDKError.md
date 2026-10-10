# QuasarSDKError

Defined in: [core/client.ts:36](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L36)

Error thrown by the methods of the [Quasar](/packages/quasar-sdk/server/classes/Quasar.md) client when a request fails: an HTTP error status, a timeout or a
network error. The Payments API also names the refusal with a stable `code` and, for an invalid request, the fields
at fault (`issues`).

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

> **new QuasarSDKError**(`message`, `status`, `originalError`, `refusal?`): `QuasarSDKError`

Defined in: [core/client.ts:61](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L61)

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

##### refusal?

The code, issues and further fields of the refusal, when the API named them.

###### code?

`string`

###### details?

`Record`\<`string`, `unknown`\>

###### issues?

[`QuasarRequestIssue`](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)[]

#### Returns

`QuasarSDKError`

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: `string` \| `undefined`

Defined in: [core/client.ts:44](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L44)

Stable code of the refusal, for example `invoice_not_found`; `undefined` when the API gave none.

***

### details

> `readonly` **details**: `Record`\<`string`, `unknown`\> \| `undefined`

Defined in: [core/client.ts:50](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L50)

Further fields of the refusal (for example `reason` of `auto_charge_unavailable`).

***

### issues

> `readonly` **issues**: [`QuasarRequestIssue`](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)[] \| `undefined`

Defined in: [core/client.ts:47](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L47)

The fields of an invalid request and why each was refused (code `invalid_request`).

***

### originalError

> `readonly` **originalError**: `Error`

Defined in: [core/client.ts:41](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L41)

The error thrown by `ofetch`.

***

### status

> `readonly` **status**: `number` \| `undefined`

Defined in: [core/client.ts:38](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/core/client.ts#L38)

HTTP status code of the response, or `undefined` when no response was received.

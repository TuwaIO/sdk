# EventSourceLike

Defined in: [checkout/store.ts:177](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L177)

The part of the browser's `EventSource` the store uses.

## Properties

### addEventListener

> **addEventListener**: (`type`, `listener`) => `void`

Defined in: [checkout/store.ts:183](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L183)

Listens to named events.

#### Parameters

##### type

`string`

##### listener

(`event`) => `void`

#### Returns

`void`

***

### close

> **close**: () => `void`

Defined in: [checkout/store.ts:185](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L185)

Closes the stream.

#### Returns

`void`

***

### onerror

> **onerror**: ((`event`) => `void`) \| `null`

Defined in: [checkout/store.ts:181](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L181)

Called on a failure; the browser reconnects unless `readyState` is `2`.

***

### readyState

> **readyState**: `number`

Defined in: [checkout/store.ts:179](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L179)

`2` once closed for good.

# EventSourceLike

Defined in: [checkout/store.ts:308](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L308)

The part of the browser's `EventSource` the store uses.

## Properties

### addEventListener

> **addEventListener**: (`type`, `listener`) => `void`

Defined in: [checkout/store.ts:314](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L314)

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

Defined in: [checkout/store.ts:316](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L316)

Closes the stream.

#### Returns

`void`

***

### onerror

> **onerror**: ((`event`) => `void`) \| `null`

Defined in: [checkout/store.ts:312](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L312)

Called on a failure; the browser reconnects unless `readyState` is `2`.

***

### readyState

> **readyState**: `number`

Defined in: [checkout/store.ts:310](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L310)

`2` once closed for good.

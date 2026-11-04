# EventSourceLike

Defined in: [checkout/store.ts:459](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L459)

The part of the browser's `EventSource` the store uses.

## Properties

### addEventListener

> **addEventListener**: (`type`, `listener`) => `void`

Defined in: [checkout/store.ts:465](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L465)

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

Defined in: [checkout/store.ts:467](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L467)

Closes the stream.

#### Returns

`void`

***

### onerror

> **onerror**: ((`event`) => `void`) \| `null`

Defined in: [checkout/store.ts:463](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L463)

Called on a failure; the browser reconnects unless `readyState` is `2`.

***

### readyState

> **readyState**: `number`

Defined in: [checkout/store.ts:461](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L461)

`2` once closed for good.

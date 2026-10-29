# EventSourceLike

Defined in: [checkout/store.ts:445](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L445)

The part of the browser's `EventSource` the store uses.

## Properties

### addEventListener

> **addEventListener**: (`type`, `listener`) => `void`

Defined in: [checkout/store.ts:451](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L451)

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

Defined in: [checkout/store.ts:453](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L453)

Closes the stream.

#### Returns

`void`

***

### onerror

> **onerror**: ((`event`) => `void`) \| `null`

Defined in: [checkout/store.ts:449](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L449)

Called on a failure; the browser reconnects unless `readyState` is `2`.

***

### readyState

> **readyState**: `number`

Defined in: [checkout/store.ts:447](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L447)

`2` once closed for good.

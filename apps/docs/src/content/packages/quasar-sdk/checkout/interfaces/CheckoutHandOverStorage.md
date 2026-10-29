# CheckoutHandOverStorage

Defined in: [checkout/store.ts:472](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L472)

The part of the browser's `Storage` (`sessionStorage`) the checkout store keeps its hand-overs in.

## Properties

### getItem

> **getItem**: (`key`) => `string` \| `null`

Defined in: [checkout/store.ts:474](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L474)

Reads an entry; `null` when there is none.

#### Parameters

##### key

`string`

#### Returns

`string` \| `null`

***

### removeItem

> **removeItem**: (`key`) => `void`

Defined in: [checkout/store.ts:478](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L478)

Removes an entry.

#### Parameters

##### key

`string`

#### Returns

`void`

***

### setItem

> **setItem**: (`key`, `value`) => `void`

Defined in: [checkout/store.ts:476](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L476)

Writes an entry.

#### Parameters

##### key

`string`

##### value

`string`

#### Returns

`void`

# CheckoutHandOverStorage

Defined in: [checkout/store.ts:353](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L353)

The part of the browser's `Storage` (`sessionStorage`) the checkout store keeps its hand-overs in.

## Properties

### getItem

> **getItem**: (`key`) => `string` \| `null`

Defined in: [checkout/store.ts:355](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L355)

Reads an entry; `null` when there is none.

#### Parameters

##### key

`string`

#### Returns

`string` \| `null`

***

### removeItem

> **removeItem**: (`key`) => `void`

Defined in: [checkout/store.ts:359](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L359)

Removes an entry.

#### Parameters

##### key

`string`

#### Returns

`void`

***

### setItem

> **setItem**: (`key`, `value`) => `void`

Defined in: [checkout/store.ts:357](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L357)

Writes an entry.

#### Parameters

##### key

`string`

##### value

`string`

#### Returns

`void`

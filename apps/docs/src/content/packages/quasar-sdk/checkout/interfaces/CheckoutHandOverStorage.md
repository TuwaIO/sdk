# CheckoutHandOverStorage

Defined in: [checkout/store.ts:493](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L493)

The part of the browser's `Storage` (`sessionStorage`) the checkout store keeps its hand-overs in.

## Properties

### getItem

> **getItem**: (`key`) => `string` \| `null`

Defined in: [checkout/store.ts:495](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L495)

Reads an entry; `null` when there is none.

#### Parameters

##### key

`string`

#### Returns

`string` \| `null`

***

### removeItem

> **removeItem**: (`key`) => `void`

Defined in: [checkout/store.ts:499](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L499)

Removes an entry.

#### Parameters

##### key

`string`

#### Returns

`void`

***

### setItem

> **setItem**: (`key`, `value`) => `void`

Defined in: [checkout/store.ts:497](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L497)

Writes an entry.

#### Parameters

##### key

`string`

##### value

`string`

#### Returns

`void`

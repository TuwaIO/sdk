# CheckoutHandOverStorage

Defined in: [checkout/store.ts:490](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L490)

The part of the browser's `Storage` (`sessionStorage`) the checkout store keeps its hand-overs in.

## Properties

### getItem

> **getItem**: (`key`) => `string` \| `null`

Defined in: [checkout/store.ts:492](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L492)

Reads an entry; `null` when there is none.

#### Parameters

##### key

`string`

#### Returns

`string` \| `null`

***

### removeItem

> **removeItem**: (`key`) => `void`

Defined in: [checkout/store.ts:496](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L496)

Removes an entry.

#### Parameters

##### key

`string`

#### Returns

`void`

***

### setItem

> **setItem**: (`key`, `value`) => `void`

Defined in: [checkout/store.ts:494](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L494)

Writes an entry.

#### Parameters

##### key

`string`

##### value

`string`

#### Returns

`void`

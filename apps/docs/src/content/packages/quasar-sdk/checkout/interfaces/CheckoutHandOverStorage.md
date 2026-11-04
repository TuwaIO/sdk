# CheckoutHandOverStorage

Defined in: [checkout/store.ts:502](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L502)

The part of the browser's `Storage` (`sessionStorage`) the checkout store keeps its hand-overs in.

## Properties

### getItem

> **getItem**: (`key`) => `string` \| `null`

Defined in: [checkout/store.ts:504](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L504)

Reads an entry; `null` when there is none.

#### Parameters

##### key

`string`

#### Returns

`string` \| `null`

***

### removeItem

> **removeItem**: (`key`) => `void`

Defined in: [checkout/store.ts:508](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L508)

Removes an entry.

#### Parameters

##### key

`string`

#### Returns

`void`

***

### setItem

> **setItem**: (`key`, `value`) => `void`

Defined in: [checkout/store.ts:506](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L506)

Writes an entry.

#### Parameters

##### key

`string`

##### value

`string`

#### Returns

`void`

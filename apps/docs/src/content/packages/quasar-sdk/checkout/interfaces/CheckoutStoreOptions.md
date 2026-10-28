# CheckoutStoreOptions

Defined in: [checkout/store.ts:221](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L221)

Options of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### api?

> `optional` **api?**: [`CheckoutApi`](/packages/quasar-sdk/checkout/interfaces/CheckoutApi.md)

Defined in: [checkout/store.ts:237](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L237)

The calls to make instead of the HTTP ones of `token` and `baseUrl`, for tests and simulations (the TUWA docs
Playground). With your own calls, pass `EventSource: null` too, or the store opens `api.url('events')`.

***

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [checkout/store.ts:225](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L225)

The Quasar API. Defaults to [BASE\_API\_URL](/packages/quasar-sdk/server/variables/BASE_API_URL.md).

***

### EventSource?

> `optional` **EventSource?**: [`EventSourceConstructor`](/packages/quasar-sdk/checkout/type-aliases/EventSourceConstructor.md) \| `null`

Defined in: [checkout/store.ts:232](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L232)

The `EventSource` to follow the invoice with. Defaults to the global one; `null` reads the invoice every `pollMs`
instead.

***

### pollMs?

> `optional` **pollMs?**: `number`

Defined in: [checkout/store.ts:227](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L227)

How often to read the invoice when there is no event stream, in milliseconds. Defaults to `5000`.

***

### token

> **token**: `string`

Defined in: [checkout/store.ts:223](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L223)

The checkout token of the invoice (from its `checkoutToken` or the end of its `payUrl`).

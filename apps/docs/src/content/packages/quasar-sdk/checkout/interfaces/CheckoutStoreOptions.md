# CheckoutStoreOptions

Defined in: [checkout/store.ts:176](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L176)

Options of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### api?

> `optional` **api?**: [`CheckoutApi`](/packages/quasar-sdk/checkout/interfaces/CheckoutApi.md)

Defined in: [checkout/store.ts:192](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L192)

The calls to make instead of the HTTP ones of `token` and `baseUrl`, for tests and simulations (the TUWA docs
Playground). With your own calls, pass `EventSource: null` too, or the store opens `api.url('events')`.

***

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [checkout/store.ts:180](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L180)

The Quasar API. Defaults to [BASE\_API\_URL](/packages/quasar-sdk/server/variables/BASE_API_URL.md).

***

### EventSource?

> `optional` **EventSource?**: [`EventSourceConstructor`](/packages/quasar-sdk/checkout/type-aliases/EventSourceConstructor.md) \| `null`

Defined in: [checkout/store.ts:187](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L187)

The `EventSource` to follow the invoice with. Defaults to the global one; `null` reads the invoice every `pollMs`
instead.

***

### pollMs?

> `optional` **pollMs?**: `number`

Defined in: [checkout/store.ts:182](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L182)

How often to read the invoice when there is no event stream, in milliseconds. Defaults to `5000`.

***

### token

> **token**: `string`

Defined in: [checkout/store.ts:178](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L178)

The checkout token of the invoice (from its `checkoutToken` or the end of its `payUrl`).

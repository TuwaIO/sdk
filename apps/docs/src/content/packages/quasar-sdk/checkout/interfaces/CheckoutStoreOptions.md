# CheckoutStoreOptions

Defined in: [checkout/store.ts:174](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L174)

Options of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [checkout/store.ts:178](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L178)

The Quasar API. Defaults to [BASE\_API\_URL](/packages/quasar-sdk/server/variables/BASE_API_URL.md).

***

### EventSource?

> `optional` **EventSource?**: [`EventSourceConstructor`](/packages/quasar-sdk/checkout/type-aliases/EventSourceConstructor.md) \| `null`

Defined in: [checkout/store.ts:185](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L185)

The `EventSource` to follow the invoice with. Defaults to the global one; `null` reads the invoice every `pollMs`
instead.

***

### pollMs?

> `optional` **pollMs?**: `number`

Defined in: [checkout/store.ts:180](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L180)

How often to read the invoice when there is no event stream, in milliseconds. Defaults to `5000`.

***

### token

> **token**: `string`

Defined in: [checkout/store.ts:176](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L176)

The checkout token of the invoice (from its `checkoutToken` or the end of its `payUrl`).

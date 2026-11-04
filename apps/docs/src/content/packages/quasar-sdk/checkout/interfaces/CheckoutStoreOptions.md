# CheckoutStoreOptions

Defined in: [checkout/store.ts:464](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L464)

Options of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### api?

> `optional` **api?**: [`CheckoutApi`](/packages/quasar-sdk/checkout/interfaces/CheckoutApi.md)

Defined in: [checkout/store.ts:480](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L480)

The calls to make instead of the HTTP ones of `token` and `baseUrl`, for tests and simulations (the TUWA docs
Playground). With your own calls, pass `EventSource: null` too, or the store opens `api.url('events')`.

***

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [checkout/store.ts:468](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L468)

The Quasar API. Defaults to [BASE\_API\_URL](/packages/quasar-sdk/server/variables/BASE_API_URL.md).

***

### EventSource?

> `optional` **EventSource?**: [`EventSourceConstructor`](/packages/quasar-sdk/checkout/type-aliases/EventSourceConstructor.md) \| `null`

Defined in: [checkout/store.ts:475](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L475)

The `EventSource` to follow the invoice with. Defaults to the global one; `null` reads the invoice every `pollMs`
instead.

***

### handOverStorage?

> `optional` **handOverStorage?**: [`CheckoutHandOverStorage`](/packages/quasar-sdk/checkout/interfaces/CheckoutHandOverStorage.md) \| `null`

Defined in: [checkout/store.ts:490](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L490)

Where the store keeps the hand-overs of transactions the wallet sent that Quasar has not taken yet
([CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit)), so that the next [CheckoutState.load](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#load) of the same checkout hands them over
again. Defaults to the browser's `sessionStorage` (the tab, until it closes), or none with your own `api`; `null`
keeps nothing. The entry is `quasar-sdk:checkoutHandOvers:<token>`: a JSON array of
`{ txKey, from?, connectorType?, at }` (the transaction, the sending wallet and the wallet connector as passed to
`submit`, and when the store first got it, in milliseconds since 1970), removed once Quasar takes or refuses it.
Failures of the storage are ignored.

***

### pollMs?

> `optional` **pollMs?**: `number`

Defined in: [checkout/store.ts:470](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L470)

How often to read the invoice when there is no event stream, in milliseconds. Defaults to `5000`.

***

### token

> **token**: `string`

Defined in: [checkout/store.ts:466](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L466)

The checkout token of the invoice (from its `checkoutToken` or the end of its `payUrl`).

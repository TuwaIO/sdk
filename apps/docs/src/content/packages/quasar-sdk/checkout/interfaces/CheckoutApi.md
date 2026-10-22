# CheckoutApi

Defined in: [checkout/types.ts:345](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L345)

The calls a checkout store makes, one per checkout route. [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md) makes them over HTTP; pass
your own as `api` to drive the store without a network, as tests and the TUWA docs Playground do. A call rejects with
a `QuasarSDKError` that carries the Payments `code` when Quasar refuses it.

## Properties

### buyer

> **buyer**: (`body`) => `Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

Defined in: [checkout/types.ts:351](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L351)

Sends the buyer details (`POST buyer`) and answers with the checkout.

#### Parameters

##### body

###### buyer

[`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md)

###### company?

`boolean`

#### Returns

`Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

***

### locale

> **locale**: (`locale`) => `Promise`\<\{ `locale`: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md); \}\>

Defined in: [checkout/types.ts:353](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L353)

Sets the language of the page and the documents still to be issued (`POST locale`).

#### Parameters

##### locale

[`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md)

#### Returns

`Promise`\<\{ `locale`: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md); \}\>

***

### permission

> **permission**: (`body`) => `Promise`\<\{ `permission`: `unknown`; \}\>

Defined in: [checkout/types.ts:363](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L363)

Sends the ERC-7715 permission the wallet granted (`POST permission`).

#### Parameters

##### body

[`GrantPermissionParams`](/packages/quasar-sdk/checkout/interfaces/GrantPermissionParams.md)

#### Returns

`Promise`\<\{ `permission`: `unknown`; \}\>

***

### quote

> **quote**: (`body`) => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md)\>

Defined in: [checkout/types.ts:349](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L349)

Locks a quote for a method and, when connected, the payer, with the buyer's consent when given (`POST quote`).

#### Parameters

##### body

###### consentGiven?

`boolean`

###### methodId

`string`

###### payer?

`string`

#### Returns

`Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md)\>

***

### relay

> **relay**: (`signature`) => `Promise`\<\{ `status`: `"submitted"` \| `"sending"`; `txHash?`: `string`; `userOpHash?`: `string`; \}\>

Defined in: [checkout/types.ts:361](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L361)

Relays the signed EIP-3009 authorization (`POST relay`).

#### Parameters

##### signature

`string`

#### Returns

`Promise`\<\{ `status`: `"submitted"` \| `"sending"`; `txHash?`: `string`; `userOpHash?`: `string`; \}\>

***

### submit

> **submit**: (`body`) => `Promise`\<\{ `status`: `string`; `txKey`: `string`; \}\>

Defined in: [checkout/types.ts:355](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L355)

Hands over the transaction the wallet sent (`POST submit`).

#### Parameters

##### body

###### connectorType?

`string`

###### from?

`string`

###### txKey

`string`

#### Returns

`Promise`\<\{ `status`: `string`; `txKey`: `string`; \}\>

***

### url

> **url**: (`route`) => `string`

Defined in: [checkout/types.ts:365](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L365)

The URL of a route that is read without the store: `receipt`, `logo`, `paymaster`, `events`.

#### Parameters

##### route

`string`

#### Returns

`string`

***

### view

> **view**: () => `Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

Defined in: [checkout/types.ts:347](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L347)

Reads the checkout (`GET`).

#### Returns

`Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

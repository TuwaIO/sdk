# CheckoutApi

Defined in: [checkout/types.ts:564](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L564)

The calls a checkout store makes, one per checkout route. [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md) makes them over HTTP; pass
your own as `api` to drive the store without a network, as tests and the TUWA docs Playground do. A call rejects with
a `QuasarSDKError` that carries the Payments `code` when Quasar refuses it.

## Properties

### buyer

> **buyer**: (`body`) => `Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

Defined in: [checkout/types.ts:577](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L577)

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

Defined in: [checkout/types.ts:579](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L579)

Sets the language of the page and the documents still to be issued (`POST locale`).

#### Parameters

##### locale

[`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md)

#### Returns

`Promise`\<\{ `locale`: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md); \}\>

***

### payerProof?

> `optional` **payerProof?**: (`body`) => `Promise`\<[`PayerProofConfirmation`](/packages/quasar-sdk/checkout/interfaces/PayerProofConfirmation.md)\>

Defined in: [checkout/types.ts:575](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L575)

Sends the signed message, which Quasar checks and records (`POST payer-proof`). Optional like `payerProofMessage`.

#### Parameters

##### body

###### message

`string`

###### payer

`string`

###### signature

`string`

#### Returns

`Promise`\<[`PayerProofConfirmation`](/packages/quasar-sdk/checkout/interfaces/PayerProofConfirmation.md)\>

***

### payerProofMessage?

> `optional` **payerProofMessage?**: (`body`) => `Promise`\<[`PayerProofMessage`](/packages/quasar-sdk/checkout/interfaces/PayerProofMessage.md)\>

Defined in: [checkout/types.ts:573](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L573)

The message the wallet signs to confirm the invoice (`POST payer-proof/message`). Optional for an `api` written
before payer proofs: without it and [CheckoutApi.payerProof](/packages/quasar-sdk/checkout/interfaces/CheckoutApi.md#payerproof), [CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer) fails.

#### Parameters

##### body

###### payer

`string`

#### Returns

`Promise`\<[`PayerProofMessage`](/packages/quasar-sdk/checkout/interfaces/PayerProofMessage.md)\>

***

### permission

> **permission**: (`body`) => `Promise`\<\{ `permission`: `unknown`; \}\>

Defined in: [checkout/types.ts:589](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L589)

Sends the ERC-7715 permission the wallet granted (`POST permission`).

#### Parameters

##### body

[`GrantPermissionParams`](/packages/quasar-sdk/checkout/interfaces/GrantPermissionParams.md)

#### Returns

`Promise`\<\{ `permission`: `unknown`; \}\>

***

### quote

> **quote**: (`body`) => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md)\>

Defined in: [checkout/types.ts:568](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L568)

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

Defined in: [checkout/types.ts:587](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L587)

Relays the signed EIP-3009 authorization (`POST relay`).

#### Parameters

##### signature

`string`

#### Returns

`Promise`\<\{ `status`: `"submitted"` \| `"sending"`; `txHash?`: `string`; `userOpHash?`: `string`; \}\>

***

### submit

> **submit**: (`body`) => `Promise`\<\{ `status`: `string`; `txKey`: `string`; \}\>

Defined in: [checkout/types.ts:581](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L581)

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

Defined in: [checkout/types.ts:591](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L591)

The URL of a route that is read without the store: `receipt`, `logo`, `paymaster`, `events`.

#### Parameters

##### route

`string`

#### Returns

`string`

***

### view

> **view**: () => `Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

Defined in: [checkout/types.ts:566](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L566)

Reads the checkout (`GET`).

#### Returns

`Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

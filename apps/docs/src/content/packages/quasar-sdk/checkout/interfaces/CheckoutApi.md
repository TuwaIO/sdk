# CheckoutApi

Defined in: [checkout/types.ts:554](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L554)

The calls a checkout store makes, one per checkout route. [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md) makes them over HTTP; pass
your own as `api` to drive the store without a network, as tests and the TUWA docs Playground do. A call rejects with
a `QuasarSDKError` that carries the Payments `code` when Quasar refuses it.

## Properties

### buyer

> **buyer**: (`body`) => `Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

Defined in: [checkout/types.ts:567](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L567)

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

Defined in: [checkout/types.ts:569](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L569)

Sets the language of the page and the documents still to be issued (`POST locale`).

#### Parameters

##### locale

[`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md)

#### Returns

`Promise`\<\{ `locale`: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md); \}\>

***

### payerProof?

> `optional` **payerProof?**: (`body`) => `Promise`\<[`PayerProofConfirmation`](/packages/quasar-sdk/checkout/interfaces/PayerProofConfirmation.md)\>

Defined in: [checkout/types.ts:565](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L565)

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

Defined in: [checkout/types.ts:563](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L563)

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

Defined in: [checkout/types.ts:579](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L579)

Sends the ERC-7715 permission the wallet granted (`POST permission`).

#### Parameters

##### body

[`GrantPermissionParams`](/packages/quasar-sdk/checkout/interfaces/GrantPermissionParams.md)

#### Returns

`Promise`\<\{ `permission`: `unknown`; \}\>

***

### quote

> **quote**: (`body`) => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md)\>

Defined in: [checkout/types.ts:558](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L558)

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

Defined in: [checkout/types.ts:577](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L577)

Relays the signed EIP-3009 authorization (`POST relay`).

#### Parameters

##### signature

`string`

#### Returns

`Promise`\<\{ `status`: `"submitted"` \| `"sending"`; `txHash?`: `string`; `userOpHash?`: `string`; \}\>

***

### submit

> **submit**: (`body`) => `Promise`\<\{ `status`: `string`; `txKey`: `string`; \}\>

Defined in: [checkout/types.ts:571](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L571)

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

Defined in: [checkout/types.ts:581](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L581)

The URL of a route that is read without the store: `receipt`, `logo`, `paymaster`, `events`.

#### Parameters

##### route

`string`

#### Returns

`string`

***

### view

> **view**: () => `Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

Defined in: [checkout/types.ts:556](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L556)

Reads the checkout (`GET`).

#### Returns

`Promise`\<[`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)\>

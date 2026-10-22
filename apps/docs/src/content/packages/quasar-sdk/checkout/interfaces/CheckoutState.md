# CheckoutState

Defined in: [checkout/store.ts:64](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L64)

The state and actions of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### checkout

> **checkout**: [`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md) \| `null`

Defined in: [checkout/store.ts:68](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L68)

What the checkout token opens; `null` until loaded.

***

### consentGiven

> **consentGiven**: `boolean`

Defined in: [checkout/store.ts:76](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L76)

Whether the buyer ticked the merchant's consent (`checkout.consent`).

***

### destroy

> **destroy**: () => `void`

Defined in: [checkout/store.ts:173](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L173)

Stops following the invoice (closes the event stream or the reads). Call it when the page goes away.

#### Returns

`void`

***

### error

> **error**: [`CheckoutError`](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md) \| `null`

Defined in: [checkout/store.ts:86](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L86)

Why the last action failed; cleared by the next one.

***

### grantPermission

> **grantPermission**: (`params`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:171](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L171)

Passes the wallet's answer to `wallet_grantPermissions` for a subscription's automatic charges (`POST permission`).

#### Parameters

##### params

[`GrantPermissionParams`](/packages/quasar-sdk/checkout/interfaces/GrantPermissionParams.md)

The granting account, the permission context, its delegation manager and dependencies.

#### Returns

`Promise`\<`boolean`\>

Whether Quasar accepted it; `checkout.autoCharge` is then `active`.

***

### invoiceStatus

> **invoiceStatus**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| `null`

Defined in: [checkout/store.ts:70](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L70)

State of the invoice, as Quasar last reported it.

***

### load

> **load**: () => `Promise`\<`void`\>

Defined in: [checkout/store.ts:99](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L99)

Reads the checkout (`GET`) and, while the invoice can change, follows it (server-sent events, else a read every
`pollMs`). Sets `phase` `error` when the link is wrong or retired.

#### Returns

`Promise`\<`void`\>

Resolves when the checkout is read.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [checkout/store.ts:80](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L80)

Language of the page and the documents still to be issued.

***

### logoUrl

> **logoUrl**: `string` \| `null`

Defined in: [checkout/store.ts:92](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L92)

The merchant's logo (PNG or JPEG, a plain `GET` for an `<img>`); `null` when the merchant has none.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [checkout/store.ts:72](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L72)

The chosen payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/store.ts:74](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L74)

The connected wallet as a CAIP-10 account on the method's chain.

***

### paymasterUrl

> **paymasterUrl**: `string` \| `null`

Defined in: [checkout/store.ts:90](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L90)

The ERC-7677 paymaster URL for `wallet_sendCalls` when the quote offers sponsored calls; `null` otherwise.

***

### phase

> **phase**: [`CheckoutPhase`](/packages/quasar-sdk/checkout/type-aliases/CheckoutPhase.md)

Defined in: [checkout/store.ts:66](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L66)

Where the payment stands.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/store.ts:78](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L78)

The locked quote.

***

### receiptUrl

> **receiptUrl**: `string` \| `null`

Defined in: [checkout/store.ts:88](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L88)

The receipt PDF of a paid invoice (a plain `GET`, for a link); `null` before.

***

### relay

> **relay**: (`signature`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:164](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L164)

Sends the payer's signature of `quote.gasless.relay.typedData` (`POST relay`): Quasar sends the transfer and the
merchant pays the gas.

#### Parameters

##### signature

`string`

The 65-byte EIP-712 signature.

#### Returns

`Promise`\<`boolean`\>

Whether it was relayed; `phase` is then `confirming`.

***

### releaseQuote

> **releaseQuote**: () => `void`

Defined in: [checkout/store.ts:125](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L125)

Forgets the locked quote and goes back to choosing a method ("Back to methods"), also for a Solana Pay QR quote
that no other action drops. Nothing changes once the payment is on its way (`submitting`, `confirming`) or done.
Quasar keeps the lock until it ends: a payment of the old quote that still arrives is credited.

#### Returns

`void`

***

### requestQuote

> **requestQuote**: () => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

Defined in: [checkout/store.ts:132](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L132)

Screens the payer and locks the price (`POST quote`).

#### Returns

`Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
  details come first; `consent_required`, without a request, when a required consent is not ticked).

***

### selectMethod

> **selectMethod**: (`methodId`) => `void`

Defined in: [checkout/store.ts:105](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L105)

Chooses a payment method; a quote for another method is dropped.

#### Parameters

##### methodId

`string`

One of `checkout.methods`.

#### Returns

`void`

***

### setBuyer

> **setBuyer**: (`buyer`, `options?`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:140](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L140)

Sends the buyer details the checkout collects (`POST buyer`); the invoice document is issued with them.

#### Parameters

##### buyer

[`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md)

The details.

##### options?

`company: true` for an invoice for a company (name, address line, country and tax ID needed).

###### company?

`boolean`

#### Returns

`Promise`\<`boolean`\>

Whether they were taken.

***

### setConsentGiven

> **setConsentGiven**: (`given`) => `void`

Defined in: [checkout/store.ts:119](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L119)

Ticks or clears the merchant's consent (`checkout.consent`): a required one must be ticked before
[CheckoutState.requestQuote](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#requestquote), which sends it with the quote.

#### Parameters

##### given

`boolean`

Whether the buyer ticked it.

#### Returns

`void`

***

### setLocale

> **setLocale**: (`locale`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:147](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L147)

Changes the language of the page and of the documents still to be issued (`POST locale`).

#### Parameters

##### locale

[`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md)

The language.

#### Returns

`Promise`\<`boolean`\>

Whether it was saved.

***

### setPayer

> **setPayer**: (`payer`) => `void`

Defined in: [checkout/store.ts:112](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L112)

Sets the connected wallet; a quote locked to another wallet is dropped.

#### Parameters

##### payer

`string` \| `null`

CAIP-10 account (`eip155:8453:0x…`, `solana:<genesis hash>:<address>`), or `null` for a Solana Pay
  QR payment from another device.

#### Returns

`void`

***

### submit

> **submit**: (`params`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:156](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L156)

Hands Quasar the transaction the wallet sent (`POST submit`). For an EIP-5792 batch, pass the hash of its
transaction (from `wallet_getCallsStatus`), not the batch ID.

#### Parameters

##### params

`txKey`: transaction hash or Solana signature; `from`: the sender, for a Solana Pay quote without
  a payer; `connectorType`: the wallet connector, for the record.

###### connectorType?

`string`

###### from?

`string`

###### txKey

`string`

#### Returns

`Promise`\<`boolean`\>

Whether Quasar took it; `phase` is then `confirming`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/store.ts:84](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L84)

The payment's transaction, once Quasar has one.

***

### txKey

> **txKey**: `string` \| `null`

Defined in: [checkout/store.ts:82](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L82)

The transaction handed to Quasar.

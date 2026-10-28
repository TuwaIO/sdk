# CheckoutState

Defined in: [checkout/store.ts:67](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L67)

The state and actions of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### checkout

> **checkout**: [`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md) \| `null`

Defined in: [checkout/store.ts:71](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L71)

What the checkout token opens; `null` until loaded.

***

### consentGiven

> **consentGiven**: `boolean`

Defined in: [checkout/store.ts:79](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L79)

Whether the buyer ticked the merchant's consent (`checkout.consent`).

***

### destroy

> **destroy**: () => `void`

Defined in: [checkout/store.ts:202](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L202)

Stops following the invoice (closes the event stream or the reads). Call it when the page goes away.

#### Returns

`void`

***

### error

> **error**: [`CheckoutError`](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md) \| `null`

Defined in: [checkout/store.ts:105](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L105)

Why the last action failed; cleared by the next one.

***

### grantPermission

> **grantPermission**: (`params`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:200](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L200)

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

Defined in: [checkout/store.ts:73](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L73)

State of the invoice, as Quasar last reported it.

***

### load

> **load**: () => `Promise`\<`void`\>

Defined in: [checkout/store.ts:126](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L126)

Reads the checkout (`GET`) and, while the invoice can change, follows it (server-sent events, else a read every
`pollMs`). An event that brings an outcome (underpaid, held, paid, refunded, expired, cancelled) updates
`checkout.invoice.amountPaid` at once and reads the checkout again for the rest (`review`, the refund, the invoice
that replaced it, `autoCharge`). It stops at a final state, except `expired` while
[CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway): it keeps the event stream while Quasar keeps it open for that payment, and
otherwise closes it and reads the checkout every 20 seconds (or every `pollMs`, when longer), until the payment
ends the invoice (`paid`, `held`), fails, Quasar reports no payment on its way, 35 minutes past the later of
`dueAt` and the hand-over (an hour after the expiry without `dueAt`), or `destroy` is called. It never expires the
invoice by the clock: past `dueAt`, a confirming payment stays `confirming` until Quasar reports the outcome. Sets
`phase` `error` when the link is wrong or retired.

#### Returns

`Promise`\<`void`\>

Resolves when the checkout is read.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [checkout/store.ts:83](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L83)

Language of the page and the documents still to be issued.

***

### logoUrl

> **logoUrl**: `string` \| `null`

Defined in: [checkout/store.ts:111](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L111)

The merchant's logo (PNG or JPEG, a plain `GET` for an `<img>`); `null` when the merchant has none.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [checkout/store.ts:75](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L75)

The chosen payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/store.ts:77](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L77)

The connected wallet as a CAIP-10 account on the method's chain.

***

### paymasterUrl

> **paymasterUrl**: `string` \| `null`

Defined in: [checkout/store.ts:109](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L109)

The ERC-7677 paymaster URL for `wallet_sendCalls` when the quote offers sponsored calls; `null` otherwise.

***

### paymentOnTheWay

> `readonly` **paymentOnTheWay**: `boolean`

Defined in: [checkout/store.ts:101](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L101)

Whether a payment this store handed to Quasar ([CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit), [CheckoutState.relay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#relay), also a
relay still `sending`, without a `txKey`) is on its way: `true` from the hand-over until the payment settles
(the invoice becomes `paid`, `underpaid`, `held`, `refunded` or `cancelled`) or fails. It fails when Quasar lists
it among the rejected payments (`rejectedTxKeys` of the status events: reverted, dropped, a wrong amount…), then
`error` is `payment_failed`, on an `open` invoice too, or when the invoice goes back to `open` after `processing`.
On an `expired` invoice it tells the page that the buyer's payment may still arrive: `false` again once Quasar
reports no payment of the invoice on its way, or 35 minutes past the later of `dueAt` and the hand-over (an hour
after the invoice expired when it has no `dueAt`), when the store stops following the invoice. Read-only: the
store sets it.

***

### phase

> **phase**: [`CheckoutPhase`](/packages/quasar-sdk/checkout/type-aliases/CheckoutPhase.md)

Defined in: [checkout/store.ts:69](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L69)

Where the payment stands.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/store.ts:81](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L81)

The locked quote.

***

### receiptUrl

> **receiptUrl**: `string` \| `null`

Defined in: [checkout/store.ts:107](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L107)

The receipt PDF of a paid invoice (a plain `GET`, for a link); `null` before.

***

### relay

> **relay**: (`signature`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:193](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L193)

Sends the payer's signature of `quote.gasless.relay.typedData` (`POST relay`): Quasar sends the transfer and the
merchant pays the gas.

#### Parameters

##### signature

`string`

The 65-byte EIP-712 signature.

#### Returns

`Promise`\<`boolean`\>

Whether it was relayed; `phase` is then `confirming` and [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) `true`.
  `txKey` is the transfer's hash when Quasar returns it, `null` while the relay is still `sending`.

***

### releaseQuote

> **releaseQuote**: () => `void`

Defined in: [checkout/store.ts:152](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L152)

Forgets the locked quote and goes back to choosing a method ("Back to methods"), also for a Solana Pay QR quote
that no other action drops. Nothing changes once the payment is on its way (`submitting`, `confirming`) or done.
Quasar keeps the lock until it ends: a payment of the old quote that still arrives is credited.

#### Returns

`void`

***

### requestQuote

> **requestQuote**: () => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

Defined in: [checkout/store.ts:159](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L159)

Screens the payer and locks the price (`POST quote`).

#### Returns

`Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
  details come first; `consent_required`, without a request, when a required consent is not ticked).

***

### selectMethod

> **selectMethod**: (`methodId`) => `void`

Defined in: [checkout/store.ts:132](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L132)

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

Defined in: [checkout/store.ts:167](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L167)

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

Defined in: [checkout/store.ts:146](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L146)

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

Defined in: [checkout/store.ts:174](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L174)

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

Defined in: [checkout/store.ts:139](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L139)

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

Defined in: [checkout/store.ts:184](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L184)

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

Whether Quasar took it; `phase` is then `confirming` (`expired` when the invoice expired meanwhile: Quasar
  still takes the transaction, and holds it as a late payment) and [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) `true`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/store.ts:103](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L103)

The payment's transaction, once Quasar has one.

***

### txKey

> **txKey**: `string` \| `null`

Defined in: [checkout/store.ts:89](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L89)

The transaction handed to Quasar: the hash or signature passed to [CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit), or the hash of a
relayed transfer when Quasar returns it. A relay Quasar answers with `sending` has none yet: read
[CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) to know that a payment is on its way.

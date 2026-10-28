# CheckoutState

Defined in: [checkout/store.ts:95](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L95)

The state and actions of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### checkout

> **checkout**: [`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md) \| `null`

Defined in: [checkout/store.ts:99](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L99)

What the checkout token opens; `null` until loaded.

***

### consentGiven

> **consentGiven**: `boolean`

Defined in: [checkout/store.ts:107](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L107)

Whether the buyer ticked the merchant's consent (`checkout.consent`).

***

### destroy

> **destroy**: () => `void`

Defined in: [checkout/store.ts:283](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L283)

Stops following the invoice (closes the event stream or the reads). Call it when the page goes away.

#### Returns

`void`

***

### error

> **error**: [`CheckoutError`](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md) \| `null`

Defined in: [checkout/store.ts:167](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L167)

Why the last action failed; cleared by the next one.

***

### grantPermission

> **grantPermission**: (`params`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:275](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L275)

Passes the wallet's answer to `wallet_grantPermissions` for a subscription's automatic charges (`POST permission`).

#### Parameters

##### params

[`GrantPermissionParams`](/packages/quasar-sdk/checkout/interfaces/GrantPermissionParams.md)

The granting account, the permission context, its delegation manager and dependencies.

#### Returns

`Promise`\<`boolean`\>

Whether Quasar accepted it; `checkout.autoCharge` is then `active`.

***

### invoicePaymentOnTheWay

> `readonly` **invoicePaymentOnTheWay**: `boolean`

Defined in: [checkout/store.ts:141](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L141)

Whether Quasar last reported a payment of the invoice on its way (`pendingPayments` above `0`), whoever handed it
over: another tab, the page before it was reloaded, a Solana Pay transfer Quasar found. While it is `true` on a
payable invoice the phase is `confirming`, not a payment; on an `expired` invoice the payment may still arrive, and
the store follows it as it follows [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway). `false` with a Quasar that does not report
it, and once the store stops following an expired invoice. Read-only: the store sets it.

***

### invoicePaymentUnresolved

> `readonly` **invoicePaymentUnresolved**: `boolean`

Defined in: [checkout/store.ts:155](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L155)

Whether Quasar last reported a payment of the invoice that may still arrive (`unresolvedPayments` above `0`, with
no time limit: also one stuck past the 25 minutes `pendingPayments` counts, and one whose tracker lost sight of it,
which Quasar reads again for 24 hours); with a Quasar that does not report it, `pendingPayments` above `0`. While it
is `true` the page never says that nothing was charged, and a reopened page that finds no payment on its way starts
in `unconfirmed` (or `expired` with `payment_unconfirmed`). Read-only: the store sets it.

***

### invoiceStatus

> **invoiceStatus**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| `null`

Defined in: [checkout/store.ts:101](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L101)

State of the invoice, as Quasar last reported it.

***

### load

> **load**: () => `Promise`\<`void`\>

Defined in: [checkout/store.ts:194](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L194)

Reads the checkout (`GET`) and, while the invoice can change, follows it (server-sent events, else a read every
`pollMs`). An event that brings an outcome (underpaid, held, paid, refunded, expired, cancelled) updates
`checkout.invoice.amountPaid` at once and reads the checkout again for the rest (`review`, the refund, the invoice
that replaced it, `autoCharge`). A checkout whose invoice has a payment on its way (a reloaded or reopened page)
starts in `confirming`, not at the payment, and the store follows that payment as its own. One whose latest
payment Quasar could not confirm (its latest rejection is not `final`), or that has a payment that may still arrive
([CheckoutState.invoicePaymentUnresolved](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentunresolved)) with none on its way, starts in `unconfirmed` (`expired` stays
`expired`) with `error` `payment_unconfirmed`; one whose latest transaction does not pay the invoice starts with
`error` `payment_mismatch`. It stops at a final
state, except `expired` while [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) or
[CheckoutState.invoicePaymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentontheway): it keeps the event stream while Quasar keeps it open for that payment, and
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

Defined in: [checkout/store.ts:111](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L111)

Language of the page and the documents still to be issued.

***

### logoUrl

> **logoUrl**: `string` \| `null`

Defined in: [checkout/store.ts:173](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L173)

The merchant's logo (PNG or JPEG, a plain `GET` for an `<img>`); `null` when the merchant has none.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [checkout/store.ts:103](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L103)

The chosen payment method.

***

### payAgain

> **payAgain**: () => `void`

Defined in: [checkout/store.ts:281](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L281)

Goes back to the payment from `unconfirmed`, once the buyer checked that the payment did not leave the wallet:
`awaitingPayment` while the locked quote is valid, `underpaid` for the rest of an underpaid invoice, otherwise
`selectMethod` (the expired quote is dropped). Nothing changes in another phase.

#### Returns

`void`

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/store.ts:105](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L105)

The connected wallet as a CAIP-10 account on the method's chain.

***

### paymasterUrl

> **paymasterUrl**: `string` \| `null`

Defined in: [checkout/store.ts:171](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L171)

The ERC-7677 paymaster URL for `wallet_sendCalls` when the quote offers sponsored calls; `null` otherwise.

***

### paymentCountsUntil

> `readonly` **paymentCountsUntil**: `string` \| `null`

Defined in: [checkout/store.ts:147](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L147)

Until when the invoice waits for a payment Quasar learned of before `dueAt` (`dueAt` plus 30 minutes), while one is
on its way; `null` otherwise or with a Quasar that does not report it. The page can say from it, not from the
browser's clock, that the payment was sent in time. Read-only: the store sets it.

***

### paymentOnTheWay

> `readonly` **paymentOnTheWay**: `boolean`

Defined in: [checkout/store.ts:133](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L133)

Whether a payment this store handed to Quasar ([CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit), [CheckoutState.relay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#relay), also a
relay still `sending`, without a `txKey`) is on its way: `true` from the hand-over until the payment settles
(the invoice becomes `paid`, `underpaid`, `held`, `refunded` or `cancelled`) or ends. It ends when Quasar lists it
among the rejected payments (`rejectedPayments` of the status events, by its `txKey`, the hash it replaced or the
relay's `userOpHash`), on an `open` invoice too: with a final reason `error` is `payment_failed` (reverted,
cancelled…) or `payment_mismatch` (a wrong amount or recipient…: it may have moved money) and the buyer may pay
again; otherwise (not found, no receipt in time…) `error` is
`payment_unconfirmed` and `phase` `unconfirmed`. The same when the invoice goes back to `open` after `processing`.
On an `expired` invoice it tells the page that the buyer's payment may still arrive: `false` again once Quasar
reports no payment of the invoice on its way, or 35 minutes past the later of `dueAt` and the hand-over (an hour
after the invoice expired when it has no `dueAt`), when the store stops following the invoice (`error`
`payment_unconfirmed` then, or on a read without a payment on its way, while
[CheckoutState.invoicePaymentUnresolved](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentunresolved) is `true`). Read-only: the store sets it.

***

### paymentSentInTime

> `readonly` **paymentSentInTime**: `boolean` \| `null`

Defined in: [checkout/store.ts:163](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L163)

Whether the payment this store handed over counts as sent before `dueAt`, as Quasar says (one of its keys is in
`onTimeTxKeys`): `true` once Quasar lists it, `false` while Quasar lists the payments sent in time without it (one
handed over after `dueAt`, which Quasar holds as late), `null` before Quasar reported it, with a Quasar that does
not report it, or without a payment of this page. Use it, not the browser clock. Reset by the next hand-over.
Read-only: the store sets it.

***

### phase

> **phase**: [`CheckoutPhase`](/packages/quasar-sdk/checkout/type-aliases/CheckoutPhase.md)

Defined in: [checkout/store.ts:97](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L97)

Where the payment stands.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/store.ts:109](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L109)

The locked quote.

***

### receiptUrl

> **receiptUrl**: `string` \| `null`

Defined in: [checkout/store.ts:169](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L169)

The receipt PDF of a paid invoice (a plain `GET`, for a link); `null` before.

***

### relay

> **relay**: (`signature`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:268](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L268)

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

Defined in: [checkout/store.ts:220](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L220)

Forgets the locked quote and goes back to choosing a method ("Back to methods"), also for a Solana Pay QR quote
that no other action drops. Nothing changes once the payment is on its way (`submitting`, `confirming`) or done.
Quasar keeps the lock until it ends: a payment of the old quote that still arrives is credited.

#### Returns

`void`

***

### requestQuote

> **requestQuote**: () => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

Defined in: [checkout/store.ts:227](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L227)

Screens the payer and locks the price (`POST quote`).

#### Returns

`Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
  details come first; `consent_required`, without a request, when a required consent is not ticked).

***

### selectMethod

> **selectMethod**: (`methodId`) => `void`

Defined in: [checkout/store.ts:200](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L200)

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

Defined in: [checkout/store.ts:235](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L235)

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

Defined in: [checkout/store.ts:214](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L214)

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

Defined in: [checkout/store.ts:242](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L242)

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

Defined in: [checkout/store.ts:207](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L207)

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

Defined in: [checkout/store.ts:259](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L259)

Hands Quasar the transaction the wallet sent (`POST submit`). For an EIP-5792 batch, pass the hash of its
transaction (from `wallet_getCallsStatus`), not the batch ID.

The wallet has already sent the transaction, so a hand-over that gets no answer (the network, HTTP 408, 429 or
5xx, `too_many_pending`) is not a failed payment: `txKey` keeps the transaction, `phase` is `unconfirmed` with
`error` `payment_unconfirmed` (`reason` `submit_retrying`), and the store hands it over again after 2, 4, 8, 16
and then every 30 seconds (Quasar takes a transaction once per `txKey`), for up to an hour or until `destroy`.
Once Quasar takes it, the store follows it as below. A refusal (any other 4xx) is not retried.

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
  `false` while the hand-over is retried.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/store.ts:165](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L165)

The payment's transaction, once Quasar has one.

***

### txKey

> **txKey**: `string` \| `null`

Defined in: [checkout/store.ts:117](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L117)

The transaction handed to Quasar: the hash or signature passed to [CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit), or the hash of a
relayed transfer when Quasar returns it. A relay Quasar answers with `sending` has none yet: read
[CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) to know that a payment is on its way.

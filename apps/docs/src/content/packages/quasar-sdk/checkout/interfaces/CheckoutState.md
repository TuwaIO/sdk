# CheckoutState

Defined in: [checkout/store.ts:106](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L106)

The state and actions of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### checkout

> **checkout**: [`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md) \| `null`

Defined in: [checkout/store.ts:110](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L110)

What the checkout token opens; `null` until loaded.

***

### consentGiven

> **consentGiven**: `boolean`

Defined in: [checkout/store.ts:118](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L118)

Whether the buyer ticked the merchant's consent (`checkout.consent`).

***

### destroy

> **destroy**: () => `void`

Defined in: [checkout/store.ts:304](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L304)

Stops following the invoice (closes the event stream or the reads). Call it when the page goes away.

#### Returns

`void`

***

### error

> **error**: [`CheckoutError`](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md) \| `null`

Defined in: [checkout/store.ts:178](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L178)

Why the last action failed; cleared by the next one.

***

### grantPermission

> **grantPermission**: (`params`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:296](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L296)

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

Defined in: [checkout/store.ts:152](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L152)

Whether Quasar last reported a payment of the invoice on its way (`pendingPayments` above `0`), whoever handed it
over: another tab, the page before it was reloaded, a Solana Pay transfer Quasar found. While it is `true` on a
payable invoice the phase is `confirming`, not a payment; on an `expired` invoice the payment may still arrive, and
the store follows it as it follows [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway). `false` with a Quasar that does not report
it, and once the store stops following an expired invoice. Read-only: the store sets it.

***

### invoicePaymentUnresolved

> `readonly` **invoicePaymentUnresolved**: `boolean`

Defined in: [checkout/store.ts:166](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L166)

Whether Quasar last reported a payment of the invoice that may still arrive (`unresolvedPayments` above `0`, with
no time limit: also one stuck past the 25 minutes `pendingPayments` counts, and one whose tracker lost sight of it,
which Quasar reads again for 24 hours); with a Quasar that does not report it, `pendingPayments` above `0`. While it
is `true` the page never says that nothing was charged, and a reopened page that finds no payment on its way starts
in `unconfirmed` (or `expired` with `payment_unconfirmed`). Read-only: the store sets it.

***

### invoiceStatus

> **invoiceStatus**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| `null`

Defined in: [checkout/store.ts:112](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L112)

State of the invoice, as Quasar last reported it.

***

### load

> **load**: () => `Promise`\<`void`\>

Defined in: [checkout/store.ts:208](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L208)

Reads the checkout (`GET`) and, while the invoice can change, follows it (server-sent events, else a read every
`pollMs`). An event that brings an outcome (underpaid, held, paid, refunded, expired, cancelled) updates
`checkout.invoice.amountPaid` at once and reads the checkout again for the rest (`review`, the refund, the invoice
that replaced it, `autoCharge`). A checkout whose invoice has a payment on its way (a reloaded or reopened page)
starts in `confirming`, not at the payment, and the store follows that payment as its own. One whose latest
payment Quasar could not confirm (its latest rejection is not `final`), or that has a payment that may still arrive
([CheckoutState.invoicePaymentUnresolved](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentunresolved)) with none on its way, starts in `unconfirmed` (`expired` stays
`expired`) with `error` `payment_unconfirmed`; one whose latest transaction does not pay the invoice starts with
`error` `payment_mismatch` (in `unconfirmed`, with no plain payment, when the rejection is not `final`). A latest
rejection that Quasar reads again (`not_found`, `timeout`, `replaced`) no longer counts once Quasar reports no
payment that may still arrive (`unresolvedPayments` `0`): Quasar resolved it. Hand-overs this tab kept
([CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit)) that Quasar does not list yet are handed over again at once. It stops at a final
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

Defined in: [checkout/store.ts:122](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L122)

Language of the page and the documents still to be issued.

***

### logoUrl

> **logoUrl**: `string` \| `null`

Defined in: [checkout/store.ts:184](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L184)

The merchant's logo (PNG or JPEG, a plain `GET` for an `<img>`); `null` when the merchant has none.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [checkout/store.ts:114](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L114)

The chosen payment method.

***

### payAgain

> **payAgain**: () => `void`

Defined in: [checkout/store.ts:302](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L302)

Goes back to the payment from `unconfirmed`, once the buyer checked that the payment did not leave the wallet:
`awaitingPayment` while the locked quote is valid, `underpaid` for the rest of an underpaid invoice, otherwise
`selectMethod` (the expired quote is dropped). Nothing changes in another phase.

#### Returns

`void`

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/store.ts:116](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L116)

The connected wallet as a CAIP-10 account on the method's chain.

***

### paymasterUrl

> **paymasterUrl**: `string` \| `null`

Defined in: [checkout/store.ts:182](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L182)

The ERC-7677 paymaster URL for `wallet_sendCalls` when the quote offers sponsored calls; `null` otherwise.

***

### paymentCountsUntil

> `readonly` **paymentCountsUntil**: `string` \| `null`

Defined in: [checkout/store.ts:158](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L158)

Until when the invoice waits for a payment Quasar learned of before `dueAt` (`dueAt` plus 30 minutes), while one is
on its way; `null` otherwise or with a Quasar that does not report it. The page can say from it, not from the
browser's clock, that the payment was sent in time. Read-only: the store sets it.

***

### paymentOnTheWay

> `readonly` **paymentOnTheWay**: `boolean`

Defined in: [checkout/store.ts:144](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L144)

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

Defined in: [checkout/store.ts:174](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L174)

Whether the payment this store handed over counts as sent before `dueAt`, as Quasar says (one of its keys is in
`onTimeTxKeys`): `true` once Quasar lists it, `false` while Quasar lists the payments sent in time without it (one
handed over after `dueAt`, which Quasar holds as late), `null` before Quasar reported it, with a Quasar that does
not report it, or without a payment of this page. Use it, not the browser clock. Reset by the next hand-over.
Read-only: the store sets it.

***

### phase

> **phase**: [`CheckoutPhase`](/packages/quasar-sdk/checkout/type-aliases/CheckoutPhase.md)

Defined in: [checkout/store.ts:108](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L108)

Where the payment stands.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/store.ts:120](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L120)

The locked quote.

***

### receiptUrl

> **receiptUrl**: `string` \| `null`

Defined in: [checkout/store.ts:180](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L180)

The receipt PDF of a paid invoice (a plain `GET`, for a link); `null` before.

***

### relay

> **relay**: (`signature`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:289](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L289)

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

Defined in: [checkout/store.ts:234](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L234)

Forgets the locked quote and goes back to choosing a method ("Back to methods"), also for a Solana Pay QR quote
that no other action drops. Nothing changes once the payment is on its way (`submitting`, `confirming`) or done.
Quasar keeps the lock until it ends: a payment of the old quote that still arrives is credited.

#### Returns

`void`

***

### requestQuote

> **requestQuote**: () => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

Defined in: [checkout/store.ts:241](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L241)

Screens the payer and locks the price (`POST quote`).

#### Returns

`Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
  details come first; `consent_required`, without a request, when a required consent is not ticked).

***

### selectMethod

> **selectMethod**: (`methodId`) => `void`

Defined in: [checkout/store.ts:214](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L214)

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

Defined in: [checkout/store.ts:249](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L249)

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

Defined in: [checkout/store.ts:228](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L228)

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

Defined in: [checkout/store.ts:256](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L256)

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

Defined in: [checkout/store.ts:221](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L221)

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

Defined in: [checkout/store.ts:280](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L280)

Hands Quasar the transaction the wallet sent (`POST submit`). For an EIP-5792 batch, pass the hash of its
transaction (from `wallet_getCallsStatus`), not the batch ID.

The wallet has already sent the transaction, so a hand-over that gets no answer (the network, HTTP 408, 429 or
5xx, `too_many_pending`) is not a failed payment: `txKey` keeps the transaction, `phase` is `unconfirmed` with
`error` `payment_unconfirmed` (`reason` `submit_retrying`), and the store hands it over again after 2, 4, 8, 16
and then every 30 seconds (Quasar takes a transaction once per `txKey`), for up to an hour or until `destroy`;
after the hour `error.reason` is `submit_failed` (Quasar never received it: the buyer contacts the merchant with
the transaction hash if money left the wallet). Once Quasar takes it, the store follows it as below; taken while
the invoice is already `paid`, `held`, `cancelled` or `refunded`, it leaves the phase as it is (Quasar records it
for the merchant) and the store reads the checkout once more. A refusal (any other 4xx) is not retried.

Until Quasar takes or refuses it, the hand-over is kept in the tab's `sessionStorage`
([CheckoutStoreOptions.handOverStorage](/packages/quasar-sdk/checkout/interfaces/CheckoutStoreOptions.md#handoverstorage)), so a page closed or reloaded meanwhile hands it over again on the
next [CheckoutState.load](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#load) of the same checkout.

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

Defined in: [checkout/store.ts:176](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L176)

The payment's transaction, once Quasar has one.

***

### txKey

> **txKey**: `string` \| `null`

Defined in: [checkout/store.ts:128](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L128)

The transaction handed to Quasar: the hash or signature passed to [CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit), or the hash of a
relayed transfer when Quasar returns it. A relay Quasar answers with `sending` has none yet: read
[CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) to know that a payment is on its way.

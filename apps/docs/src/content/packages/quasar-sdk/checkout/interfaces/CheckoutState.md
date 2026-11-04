# CheckoutState

Defined in: [checkout/store.ts:187](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L187)

The state and actions of [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md).

## Properties

### checkout

> **checkout**: [`CheckoutView`](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md) \| `null`

Defined in: [checkout/store.ts:191](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L191)

What the checkout token opens; `null` until loaded.

***

### confirmPayer

> **confirmPayer**: (`sign`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:369](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L369)

Confirms that the connected wallet pays this invoice: asks Quasar for the exact message
(`POST payer-proof/message`), has `sign` sign it with the wallet (a free signature that moves no funds), and sends
the signature (`POST payer-proof`), which Quasar checks (an ordinary wallet's by recovery, a smart wallet's through
its contract) and records for the invoice. Call it right after the wallet and the method are chosen, while
[CheckoutState.payerProof](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#payerproof) is `required`, and before a transfer or a paymaster payment while it is
`unless_relayed`. A wallet confirms an invoice once: a wallet Quasar or this page already knows as confirmed asks
for no signature (also one Quasar answers `proven` for, confirmed from another tab), and a method that needs none
(`not_needed`) answers `true` at once. The page stays in its phase meanwhile ([CheckoutState.payerProof](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#payerproof) is
`confirming` for the wallet being asked before the price, never for another one or an `unless_relayed` one). A new call replaces a confirmation under way, so a
prompt the buyer closed that never answers blocks nothing: call it again to try again. The replaced attempt's late
answer only records the wallet's proof (no `error`, no phase change). Side effect: a wallet prompt through `sign`.

#### Parameters

##### sign

[`PayerProofSigner`](/packages/quasar-sdk/checkout/type-aliases/PayerProofSigner.md)

Signs the message with the wallet ([PayerProofSigner](/packages/quasar-sdk/checkout/type-aliases/PayerProofSigner.md)).

#### Returns

`Promise`\<`boolean`\>

Whether the wallet confirmed the invoice; [CheckoutState.payerProof](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#payerproof) is then `confirmed`. `false`
  for a replaced attempt that did not confirm it (nothing changes), and with `error` set: `payer_required` (no wallet),
  `request_failed` (an `api` without the payer proof calls), `payer_proof_declined` (`sign` rejected: the buyer
  refused, or the wallet cannot sign messages), or Quasar's refusal (`payer_proof_invalid`, `payer_proof_unavailable`,
  `payer_chain_mismatch`, `origin_required`, `rate_limited`, `too_many_payers`, `invoice_not_payable`;
  `payer_not_expected` sets `phase` `blocked`, `invoice_expired` `expired`).

***

### consentGiven

> **consentGiven**: `boolean`

Defined in: [checkout/store.ts:199](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L199)

Whether the buyer ticked the merchant's consent (`checkout.consent`).

***

### destroy

> **destroy**: () => `void`

Defined in: [checkout/store.ts:451](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L451)

Stops following the invoice (closes the event stream or the reads). Call it when the page goes away.

#### Returns

`void`

***

### error

> **error**: [`CheckoutError`](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md) \| `null`

Defined in: [checkout/store.ts:277](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L277)

Why the last action failed; cleared by the next one.

***

### followingUntil

> `readonly` **followingUntil**: `string` \| `null`

Defined in: [checkout/store.ts:273](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L273)

Until when this page follows an `expired` or `cancelled` invoice for a payment on its way (ISO 8601), `null` when it
does not (an invoice that can still be paid is followed with no limit). An expired invoice is followed until 35
minutes past the later of `dueAt` and the latest hand-over of this page (Quasar waits 30 minutes past `dueAt` at
most for a payment it learned of before it, and settles a later one in minutes); when the page found the payment on
its way instead (a reload, another tab), the time it found it counts as the hand-over; an hour after the store found
the invoice expired when it has no `dueAt`. A cancelled invoice is followed until 35 minutes after the later of when
the store found it cancelled and the latest hand-over. A later hand-over moves it on. Past it the page shows nothing
more without a reload, so say "this page follows the payment until {time}", never that it shows the outcome
whenever it comes; a reloaded page reads the outcome. Read-only: the store sets it.

***

### grantPermission

> **grantPermission**: (`params`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:434](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L434)

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

Defined in: [checkout/store.ts:239](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L239)

Whether Quasar last reported a payment of the invoice on its way (`pendingPayments` above `0`), whoever handed it
over: another tab, the page before it was reloaded, a Solana Pay transfer Quasar found, this invoice's claim on a
transaction another invoice handed over first. While it is `true` on a payable invoice the phase is `confirming`,
not a payment; on an `expired` or `cancelled` invoice the payment may still arrive, and the store follows it as it
follows [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway). `false` with a Quasar that does not report it, and once the store
stops following an expired or cancelled invoice. Read-only: the store sets it.

***

### invoicePaymentUnresolved

> `readonly` **invoicePaymentUnresolved**: `boolean`

Defined in: [checkout/store.ts:253](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L253)

Whether Quasar last reported a payment of the invoice that may still arrive (`unresolvedPayments` above `0`, with
no time limit: also one stuck past the 25 minutes `pendingPayments` counts, and one whose tracker lost sight of it,
which Quasar reads again for 24 hours); with a Quasar that does not report it, `pendingPayments` above `0`. While it
is `true` the page never says that nothing was charged, and a reopened page that finds no payment on its way starts
in `unconfirmed` (or `expired` with `payment_unconfirmed`). Read-only: the store sets it.

***

### invoiceStatus

> **invoiceStatus**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md) \| `null`

Defined in: [checkout/store.ts:193](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L193)

State of the invoice, as Quasar last reported it.

***

### load

> **load**: () => `Promise`\<`void`\>

Defined in: [checkout/store.ts:308](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L308)

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
state, except `expired` and `cancelled` while [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) or
[CheckoutState.invoicePaymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentontheway): it keeps the event stream while Quasar keeps it open for that payment, and
otherwise closes it and reads the checkout every 20 seconds (or every `pollMs`, when longer), until the payment
ends the invoice (`paid`, `held`), fails, Quasar reports no payment on its way, [CheckoutState.followingUntil](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#followinguntil)
comes, or `destroy` is called. A cancelled invoice with a payment that may still arrive
and none on its way opens with `error` `payment_unconfirmed`, like an expired one. It never expires the invoice by
the clock: past `dueAt`, a confirming payment stays `confirming` until Quasar reports the outcome. Sets `phase`
`error` when the link is wrong or retired.

#### Returns

`Promise`\<`void`\>

Resolves when the checkout is read.

***

### locale

> **locale**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md) \| `null`

Defined in: [checkout/store.ts:208](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L208)

Language of the page and the documents still to be issued.

***

### logoUrl

> **logoUrl**: `string` \| `null`

Defined in: [checkout/store.ts:283](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L283)

The merchant's logo (PNG or JPEG, a plain `GET` for an `<img>`); `null` when the merchant has none.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [checkout/store.ts:195](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L195)

The chosen payment method.

***

### payAgain

> **payAgain**: () => `void`

Defined in: [checkout/store.ts:449](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L449)

Goes back to the payment from `unconfirmed`, once the buyer checked that the payment did not leave the wallet:
`awaitingPayment` while the locked quote is valid, `underpaid` for the rest of an underpaid invoice, otherwise
`selectMethod` (the expired quote is dropped); the outcome of an invoice that no longer takes a payment. Nothing
changes in another phase, nor while `error.reason` is `tx_already_used` or `settlement_failed`: that payment left
the wallet and may still pay the invoice.

#### Returns

`void`

***

### payer

> **payer**: `string` \| `null`

Defined in: [checkout/store.ts:197](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L197)

The connected wallet as a CAIP-10 account on the method's chain.

***

### payerProof

> `readonly` **payerProof**: [`PayerProofStatus`](/packages/quasar-sdk/checkout/type-aliases/PayerProofStatus.md)

Defined in: [checkout/store.ts:204](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L204)

Whether the connected wallet must confirm the invoice before it pays, for the chosen method ([PayerProofStatus](/packages/quasar-sdk/checkout/type-aliases/PayerProofStatus.md)).
Read-only: the store sets it from the method, the wallet and the confirmations Quasar and this page know of.

***

### paymasterUrl

> **paymasterUrl**: `string` \| `null`

Defined in: [checkout/store.ts:281](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L281)

The ERC-7677 paymaster URL for `wallet_sendCalls` when the quote offers sponsored calls; `null` otherwise.

***

### paymentCountsUntil

> `readonly` **paymentCountsUntil**: `string` \| `null`

Defined in: [checkout/store.ts:245](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L245)

Until when the invoice waits for a payment Quasar learned of before `dueAt` (`dueAt` plus 30 minutes), while one is
on its way; `null` otherwise or with a Quasar that does not report it. The page can say from it, not from the
browser's clock, that the payment was sent in time. Read-only: the store sets it.

***

### paymentOnTheWay

> `readonly` **paymentOnTheWay**: `boolean`

Defined in: [checkout/store.ts:230](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L230)

Whether a payment this store handed to Quasar ([CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit), [CheckoutState.relay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#relay), also a
relay still `sending`, without a `txKey`) is on its way: `true` from the hand-over until the payment settles
(the invoice becomes `paid`, `underpaid`, `held`, `refunded` or `cancelled`) or ends. It ends when Quasar lists it
among the rejected payments (`rejectedPayments` of the status events, by its `txKey`, the hash it replaced or the
relay's `userOpHash`), on an `open` invoice too: with a final reason `error` is `payment_failed` (reverted,
cancelled…) or `payment_mismatch` (a wrong amount or recipient…: it may have moved money) and the buyer may pay
again; otherwise (not found, no receipt in time…) `error` is
`payment_unconfirmed` and `phase` `unconfirmed`. The same when the invoice goes back to `open` after `processing`.
On an `expired` or `cancelled` invoice it tells the page that the buyer's payment may still arrive: `false` again
once Quasar reports no payment of the invoice on its way, or at [CheckoutState.followingUntil](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#followinguntil), when the store
stops following the invoice (`error` `payment_unconfirmed` then, or on a read without a payment on its way, while
[CheckoutState.invoicePaymentUnresolved](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentunresolved) is `true`). Also `true` while Quasar decides about a transaction
another invoice handed over first (`error.reason` `tx_already_used`). Read-only: the store sets it.

***

### paymentSentInTime

> `readonly` **paymentSentInTime**: `boolean` \| `null`

Defined in: [checkout/store.ts:261](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L261)

Whether the payment this store handed over counts as sent before `dueAt`, as Quasar says (one of its keys is in
`onTimeTxKeys`): `true` once Quasar lists it, `false` while Quasar lists the payments sent in time without it (one
handed over after `dueAt`, which Quasar holds as late), `null` before Quasar reported it, with a Quasar that does
not report it, or without a payment of this page. Use it, not the browser clock. Reset by the next hand-over.
Read-only: the store sets it.

***

### permissionRevoked

> **permissionRevoked**: () => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:441](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L441)

Tells Quasar that the wallet sent the transaction that revokes the permission (`autoCharge.revocation`): Quasar asks
the chain (`POST permission/revoked`), and `checkout.autoCharge` follows what it finds.

#### Returns

`Promise`\<`boolean`\>

Whether the permission has ended; `false` while the chain does not show it yet, or on an error.

***

### phase

> **phase**: [`CheckoutPhase`](/packages/quasar-sdk/checkout/type-aliases/CheckoutPhase.md)

Defined in: [checkout/store.ts:189](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L189)

Where the payment stands.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/store.ts:206](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L206)

The locked quote.

***

### receiptUrl

> **receiptUrl**: `string` \| `null`

Defined in: [checkout/store.ts:279](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L279)

The receipt PDF of a paid invoice (a plain `GET`, for a link); `null` before.

***

### relay

> **relay**: (`signature`) => `Promise`\<`boolean`\>

Defined in: [checkout/store.ts:427](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L427)

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

Defined in: [checkout/store.ts:335](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L335)

Forgets the locked quote and goes back to choosing a method ("Back to methods"), also for a Solana Pay QR quote
that no other action drops; from the quote of a rest it goes back to the `underpaid` outcome. Nothing changes once
the payment is on its way (`submitting`, `confirming`) or done. Quasar keeps the lock until it ends: a payment of the
old quote that still arrives is credited.

#### Returns

`void`

***

### requestQuote

> **requestQuote**: () => `Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

Defined in: [checkout/store.ts:347](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L347)

Screens the payer and locks the price (`POST quote`).

#### Returns

`Promise`\<[`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`\>

The quote, or `null` with `error` set (`phase` `blocked` when AML refuses the wallet, `buyer` when the
  details come first; `consent_required`, without a request, when a required consent is not ticked;
  `payer_proof_required`, without a request while [CheckoutState.payerProof](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#payerproof) is `required`, and from Quasar
  for a wallet it wants confirmed first, `phase` back at `selectMethod`). On an underpaid invoice it prices the
  rest ([CheckoutQuote.amountDue](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md#amountdue)) at the rate of the first quote, with no consent asked again, and refuses
  with `409`, back at `underpaid`: `payer_mismatch` and [CheckoutError.originWallet](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md#originwallet) (the rest is paid from the
  wallet that paid first) or `rest_method_mismatch` (in the method that paid first).

***

### selectMethod

> **selectMethod**: (`methodId`) => `void`

Defined in: [checkout/store.ts:314](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L314)

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

Defined in: [checkout/store.ts:377](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L377)

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

Defined in: [checkout/store.ts:328](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L328)

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

Defined in: [checkout/store.ts:384](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L384)

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

Defined in: [checkout/store.ts:321](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L321)

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

Defined in: [checkout/store.ts:418](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L418)

Hands Quasar the transaction the wallet sent (`POST submit`). For an EIP-5792 batch, pass the hash of its
transaction (from `wallet_getCallsStatus`), not the batch ID.

The wallet has already sent the transaction, so a hand-over that gets no answer (the network, HTTP 408, 429 or
5xx, `too_many_pending`) is not a failed payment: `txKey` keeps the transaction, `phase` is `unconfirmed` with
`error` `payment_unconfirmed` (`reason` `submit_retrying`), and the store hands it over again after 2, 4, 8, 16
and then every 30 seconds (Quasar takes a transaction once per `txKey`), for up to an hour or until `destroy`;
after the hour `error.reason` is `submit_failed` (Quasar never received it: the buyer contacts the merchant with
the transaction hash if money left the wallet). Once Quasar takes it, the store follows it as below; taken while
the invoice is already `paid`, `held` or `refunded`, it leaves the phase as it is (Quasar records it for the
merchant) and the store reads the checkout once more; taken while it is `expired` or `cancelled`, the phase stays
and the store follows the payment until Quasar holds it (or pays the expired invoice in its grace).

Quasar answers `409 tx_already_used` when it tracks the transaction for another invoice whose page handed it over
first (EVM invoices share the merchant's address, so anyone who saw the hash may have done so). That is not a
refusal of the payment: Quasar records this invoice's claim and credits the transaction to the invoice whose quoted
wallet sent it. The store follows it as its payment, with `phase` `unconfirmed` (the outcome's on an expired or
cancelled invoice) and `error` `payment_unconfirmed` with `reason` `tx_already_used`, and offers no payment
([CheckoutState.payAgain](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#payagain) does nothing) until Quasar decides. It is not handed over again. Any other refusal
(4xx) is not retried either.

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

Whether Quasar took it; `phase` is then `confirming` (`expired` or `cancelled` when the invoice expired or
  was cancelled meanwhile: Quasar still takes the transaction, and holds it as a late payment) and
  [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) `true`. `false` while the hand-over is retried, after a refusal, and for
  `tx_already_used` (followed all the same).

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/store.ts:275](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L275)

The payment's transaction, once Quasar has one.

***

### txKey

> **txKey**: `string` \| `null`

Defined in: [checkout/store.ts:214](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L214)

The transaction handed to Quasar: the hash or signature passed to [CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit), or the hash of a
relayed transfer when Quasar returns it. A relay Quasar answers with `sending` has none yet: read
[CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) to know that a payment is on its way.

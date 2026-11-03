# PaymentsModule

Defined in: [modules/payments/index.ts:82](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L82)

The Payments API (`/v1/payments`) of a Payments app, available as `quasar.payments` on a [Quasar](/packages/quasar-sdk/server/classes/Quasar.md) client.
Quasar issues numbered invoices with PDF (and, when on, e-invoice) documents, checks the on-chain payment, records
every step in a hash-chained ledger and sends `payments.v1` webhooks; money goes straight to your wallets. The app
must be a Payments app, and the Quasar node must run Payments.

Every method sends one request with the secret key in the `x-tuwa-secret-key` header.

## Example

```ts
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });
const { invoice, payUrl } = await quasar.payments.createInvoice(
  {
    currency: 'EUR',
    lineItems: [{ name: 'Pro plan, October', quantity: '1', unitPrice: '49.00', taxRate: '21' }],
    buyer: { email: 'buyer@example.com', externalId: 'user_42' },
  },
  { idempotencyKey: 'order_42' },
);
```

## Methods

### cancelInvoice()

> **cancelInvoice**(`invoiceId`, `params?`): `Promise`\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>

Defined in: [modules/payments/index.ts:192](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L192)

Cancels an open invoice (`POST /v1/payments/invoices/:id/cancel`): it stops being payable; its number stays
taken. A payment that arrives later is held for you.

#### Parameters

##### invoiceId

`string`

The invoice.

##### params?

`reason`, recorded in the ledger.

###### reason?

`string`

#### Returns

`Promise`\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>

The invoice.

#### Throws

`invoice_not_found` (404), an invoice that is not open (409), a timeout or a network
  error.

***

### cancelSubscription()

> **cancelSubscription**(`subscriptionId`, `params?`): `Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

Defined in: [modules/payments/index.ts:495](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L495)

Cancels a subscription now (its open invoices are cancelled) or when the running period ends
(`POST /v1/payments/subscriptions/:id/cancel`).

#### Parameters

##### subscriptionId

`string`

The subscription.

##### params?

[`CancelSubscriptionParams`](/packages/quasar-sdk/server/interfaces/CancelSubscriptionParams.md) = `{}`

`atPeriodEnd` and `reason`.

#### Returns

`Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

The subscription.

#### Throws

`subscription_not_found` (404), `subscription_not_active` (409), a timeout or a network
  error.

***

### correctInvoice()

> **correctInvoice**(`invoiceId`, `params`): `Promise`\<[`InvoiceCorrection`](/packages/quasar-sdk/server/interfaces/InvoiceCorrection.md)\>

Defined in: [modules/payments/index.ts:227](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L227)

Corrects the buyer details of an open or paid invoice (`POST /v1/payments/invoices/:id/correct`): a credit note
for it and a new invoice with the corrected details. A paid invoice's payment carries over to the new one.

#### Parameters

##### invoiceId

`string`

The invoice.

##### params

[`CorrectInvoiceParams`](/packages/quasar-sdk/server/interfaces/CorrectInvoiceParams.md)

The corrected buyer and the reason the credit note gives.

#### Returns

`Promise`\<[`InvoiceCorrection`](/packages/quasar-sdk/server/interfaces/InvoiceCorrection.md)\>

The new invoice (with its checkout while it is open) and the one it replaces.

#### Throws

`invalid_request` (400), `invoice_not_found` (404), an invoice that cannot be corrected
  (409), a timeout or a network error.

***

### createInvoice()

> **createInvoice**(`params`, `options?`): `Promise`\<[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md)\>

Defined in: [modules/payments/index.ts:102](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L102)

Issues an invoice (`POST /v1/payments/invoices`): numbered, with its PDF and, when the app has e-invoices on and
the buyer details allow, its UBL; the `invoice.issued` webhook follows.

#### Parameters

##### params

[`CreateInvoiceParams`](/packages/quasar-sdk/server/type-aliases/CreateInvoiceParams.md)

The lines (or a bare `amount`), the buyer and the terms. Dates go as ISO 8601.

##### options?

[`CreateOptions`](/packages/quasar-sdk/server/interfaces/CreateOptions.md)

`idempotencyKey`: a retry with the same key returns the invoice issued first, with the same link.

#### Returns

`Promise`\<[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md)\>

The invoice, its checkout token and its payment page (also in the invoice view while it can be paid).

#### Throws

`invalid_request` with `issues` (400), `seller_details_missing` and other issuer
  refusals (400), an app that is not a Payments app or a node without Payments (403), a timeout or a network
  error.

***

### createSubscription()

> **createSubscription**(`params`, `options?`): `Promise`\<[`SubscriptionStart`](/packages/quasar-sdk/server/interfaces/SubscriptionStart.md)\>

Defined in: [modules/payments/index.ts:412](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L412)

Starts a subscription (`POST /v1/payments/subscriptions`): each period is one invoice, issued ahead of the period
and paid like any invoice (`send_invoice`) or charged with the buyer's ERC-7715 permission (`auto_charge`).

#### Parameters

##### params

[`CreateSubscriptionParams`](/packages/quasar-sdk/server/type-aliases/CreateSubscriptionParams.md)

The plan, its interval and terms.

##### options?

[`CreateOptions`](/packages/quasar-sdk/server/interfaces/CreateOptions.md)

`idempotencyKey`: a retry with the same key returns the subscription started first.

#### Returns

`Promise`\<[`SubscriptionStart`](/packages/quasar-sdk/server/interfaces/SubscriptionStart.md)\>

The subscription and, without a trial, its first invoice with the payment page.

#### Throws

`invalid_request` (400), `subscriptions_disabled` (403), `auto_charge_unavailable` with
  `details.reason` (400), a timeout or a network error.

***

### getCreditNote()

> **getCreditNote**(`invoiceId`, `ref`, `format?`): `Promise`\<[`PaymentDocument`](/packages/quasar-sdk/server/interfaces/PaymentDocument.md)\>

Defined in: [modules/payments/index.ts:375](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L375)

Downloads a credit note of an invoice (`GET /v1/payments/invoices/:id/documents/credit-note/:ref`).

#### Parameters

##### invoiceId

`string`

The invoice.

##### ref

`string`

The refund it credits, or its number.

##### format?

`"pdf"` \| `"ubl"` = `'pdf'`

`pdf` (default) or `ubl`.

#### Returns

`Promise`\<[`PaymentDocument`](/packages/quasar-sdk/server/interfaces/PaymentDocument.md)\>

The bytes, media type and file name.

#### Throws

`invoice_not_found` or `document_not_found` (404), a timeout or a network error.

***

### getDocument()

> **getDocument**(`invoiceId`, `kind`): `Promise`\<[`PaymentDocument`](/packages/quasar-sdk/server/interfaces/PaymentDocument.md)\>

Defined in: [modules/payments/index.ts:362](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L362)

Downloads a stored document of an invoice byte for byte as issued
(`GET /v1/payments/invoices/:id/documents/:kind`).

#### Parameters

##### invoiceId

`string`

The invoice.

##### kind

[`PaymentDocumentKind`](/packages/quasar-sdk/server/type-aliases/PaymentDocumentKind.md)

`invoice` or `receipt` (PDF), or `invoice.xml` (UBL).

#### Returns

`Promise`\<[`PaymentDocument`](/packages/quasar-sdk/server/interfaces/PaymentDocument.md)\>

The bytes, media type and file name.

#### Throws

`invoice_not_found` or `document_not_found` (404), a timeout or a network error.

***

### getEvents()

> **getEvents**(`invoiceId`, `params?`): `Promise`\<[`InvoiceLedger`](/packages/quasar-sdk/server/interfaces/InvoiceLedger.md)\>

Defined in: [modules/payments/index.ts:261](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L261)

Reads a page of an invoice ledger, oldest first (`GET /v1/payments/invoices/:id/events`): up to 100 steps, with
how many the ledger has, who created the invoice and when its quote was locked and its receipt issued. Every
payment page a buyer opens locks a quote, so a ledger can be long.

#### Parameters

##### invoiceId

`string`

The invoice.

##### params?

[`GetEventsParams`](/packages/quasar-sdk/server/interfaces/GetEventsParams.md) = `{}`

`verify: true` adds the check of the whole hash chain; `limit` and `cursor` page it.

#### Returns

`Promise`\<[`InvoiceLedger`](/packages/quasar-sdk/server/interfaces/InvoiceLedger.md)\>

One page; pass `nextCursor` as `cursor` for the next.

#### Throws

`invoice_not_found` (404), `invalid_request` or `invalid_cursor` (400), a timeout or a
  network error.

***

### getInvoice()

> **getInvoice**(`invoiceId`): `Promise`\<[`InvoiceDetails`](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md)\>

Defined in: [modules/payments/index.ts:119](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L119)

Reads an invoice with its five newest refunds, every refund still under way, and how many refunds and credit
notes it has (`GET /v1/payments/invoices/:id`). The full lists are [PaymentsModule.listInvoiceRefunds](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicerefunds) and
[PaymentsModule.listInvoiceDocuments](/packages/quasar-sdk/server/classes/PaymentsModule.md#listinvoicedocuments).

#### Parameters

##### invoiceId

`string`

The invoice.

#### Returns

`Promise`\<[`InvoiceDetails`](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md)\>

The invoice.

#### Throws

`invoice_not_found` (404), a timeout or a network error.

***

### getRefund()

> **getRefund**(`refundId`): `Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

Defined in: [modules/payments/index.ts:292](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L292)

Reads a refund (`GET /v1/payments/refunds/:id`).

#### Parameters

##### refundId

`string`

The refund.

#### Returns

`Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

The refund.

#### Throws

`refund_not_found` (404), a timeout or a network error.

***

### getSubscription()

> **getSubscription**(`subscriptionId`): `Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

Defined in: [modules/payments/index.ts:443](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L443)

Reads a subscription (`GET /v1/payments/subscriptions/:id`). The invoices of its periods and its automatic
charges are lists of their own: [PaymentsModule.listSubscriptionInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptioninvoices) and
[PaymentsModule.listSubscriptionCharges](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptioncharges).

#### Parameters

##### subscriptionId

`string`

The subscription.

#### Returns

`Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

The subscription.

#### Throws

`subscription_not_found` (404), a timeout or a network error.

***

### listHeldTransfers()

> **listHeldTransfers**(`params?`): `Promise`\<[`HeldTransfer`](/packages/quasar-sdk/server/interfaces/HeldTransfer.md)[]\>

Defined in: [modules/payments/index.ts:322](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L322)

Lists held transfers, newest first (`GET /v1/payments/held-transfers`, or `GET /v1/payments/invoices/:id/held-transfers`
with `invoice`): transfers that reached your invoices without being tied to them by proof, to refund to their senders.

#### Parameters

##### params?

[`ListHeldTransfersParams`](/packages/quasar-sdk/server/interfaces/ListHeldTransfersParams.md) = `{}`

One invoice, one state (`held` for those still to refund), or neither.

#### Returns

`Promise`\<[`HeldTransfer`](/packages/quasar-sdk/server/interfaces/HeldTransfer.md)[]\>

The held transfers, at most 100.

#### Throws

a timeout or a network error.

***

### listInvoiceDocuments()

> **listInvoiceDocuments**(`invoiceId`, `params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`InvoiceDocumentRef`](/packages/quasar-sdk/server/interfaces/InvoiceDocumentRef.md)\>\>

Defined in: [modules/payments/index.ts:150](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L150)

Lists the documents issued for an invoice, newest first (`GET /v1/payments/invoices/:id/documents`): the invoice,
its receipt and its credit notes, as PDF and UBL. Download them with [PaymentsModule.getDocument](/packages/quasar-sdk/server/classes/PaymentsModule.md#getdocument) and
[PaymentsModule.getCreditNote](/packages/quasar-sdk/server/classes/PaymentsModule.md#getcreditnote).

#### Parameters

##### invoiceId

`string`

The invoice.

##### params?

[`ListInvoiceItemsParams`](/packages/quasar-sdk/server/interfaces/ListInvoiceItemsParams.md) = `{}`

Paging.

#### Returns

`Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`InvoiceDocumentRef`](/packages/quasar-sdk/server/interfaces/InvoiceDocumentRef.md)\>\>

One page; pass `nextCursor` as `cursor` for the next.

#### Throws

`invoice_not_found` (404), `invalid_request` or `invalid_cursor` (400), a timeout or a
  network error.

***

### listInvoiceRefunds()

> **listInvoiceRefunds**(`invoiceId`, `params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>\>

Defined in: [modules/payments/index.ts:132](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L132)

Lists the refunds of an invoice, newest first (`GET /v1/payments/invoices/:id/refunds`).

#### Parameters

##### invoiceId

`string`

The invoice.

##### params?

[`ListInvoiceItemsParams`](/packages/quasar-sdk/server/interfaces/ListInvoiceItemsParams.md) = `{}`

Paging.

#### Returns

`Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>\>

One page; pass `nextCursor` as `cursor` for the next.

#### Throws

`invoice_not_found` (404), `invalid_request` or `invalid_cursor` (400), a timeout or a
  network error.

***

### listInvoices()

> **listInvoices**(`params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>\>

Defined in: [modules/payments/index.ts:167](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L167)

Lists invoices, newest first (`GET /v1/payments/invoices`).

#### Parameters

##### params?

[`ListInvoicesParams`](/packages/quasar-sdk/server/interfaces/ListInvoicesParams.md) = `{}`

Filters and paging.

#### Returns

`Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>\>

One page; pass `nextCursor` as `cursor` for the next.

#### Throws

`invalid_request` or `invalid_cursor` (400), a timeout or a network error.

***

### listMethods()

> **listMethods**(): `Promise`\<\{ `data`: [`PaymentMethod`](/packages/quasar-sdk/server/interfaces/PaymentMethod.md)[]; `object`: `"list"`; \}\>

Defined in: [modules/payments/index.ts:398](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L398)

Lists the app's active payment methods, in their order (`GET /v1/payments/methods`).

#### Returns

`Promise`\<\{ `data`: [`PaymentMethod`](/packages/quasar-sdk/server/interfaces/PaymentMethod.md)[]; `object`: `"list"`; \}\>

The methods.

#### Throws

A timeout or a network error.

***

### listSubscriptionCharges()

> **listSubscriptionCharges**(`subscriptionId`, `params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`SubscriptionCharge`](/packages/quasar-sdk/server/interfaces/SubscriptionCharge.md)\>\>

Defined in: [modules/payments/index.ts:475](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L475)

Lists the automatic charges of a subscription, newest first (`GET /v1/payments/subscriptions/:id/charges`).

#### Parameters

##### subscriptionId

`string`

The subscription.

##### params?

[`ListSubscriptionItemsParams`](/packages/quasar-sdk/server/interfaces/ListSubscriptionItemsParams.md) = `{}`

Paging.

#### Returns

`Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`SubscriptionCharge`](/packages/quasar-sdk/server/interfaces/SubscriptionCharge.md)\>\>

One page; pass `nextCursor` as `cursor` for the next.

#### Throws

`subscription_not_found` (404), `invalid_request` or `invalid_cursor` (400), a timeout
  or a network error.

***

### listSubscriptionInvoices()

> **listSubscriptionInvoices**(`subscriptionId`, `params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>\>

Defined in: [modules/payments/index.ts:456](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L456)

Lists the invoices of a subscription's periods, newest first (`GET /v1/payments/subscriptions/:id/invoices`).

#### Parameters

##### subscriptionId

`string`

The subscription.

##### params?

[`ListSubscriptionItemsParams`](/packages/quasar-sdk/server/interfaces/ListSubscriptionItemsParams.md) = `{}`

Paging.

#### Returns

`Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>\>

One page; pass `nextCursor` as `cursor` for the next.

#### Throws

`subscription_not_found` (404), `invalid_request` or `invalid_cursor` (400), a timeout
  or a network error.

***

### listSubscriptions()

> **listSubscriptions**(`params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>\>

Defined in: [modules/payments/index.ts:427](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L427)

Lists subscriptions, newest first (`GET /v1/payments/subscriptions`).

#### Parameters

##### params?

[`ListSubscriptionsParams`](/packages/quasar-sdk/server/interfaces/ListSubscriptionsParams.md) = `{}`

Filters and paging.

#### Returns

`Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>\>

One page.

#### Throws

`invalid_request` or `invalid_cursor` (400), a timeout or a network error.

***

### pauseSubscription()

> **pauseSubscription**(`subscriptionId`): `Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

Defined in: [modules/payments/index.ts:527](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L527)

Pauses a subscription (`POST /v1/payments/subscriptions/:id/pause`): its open invoices are cancelled and no period
is billed until it resumes.

#### Parameters

##### subscriptionId

`string`

The subscription.

#### Returns

`Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

The subscription.

#### Throws

`subscription_not_found` (404), `subscription_not_active` (409), a timeout or a network
  error.

***

### quote()

> **quote**(`params`): `Promise`\<[`PaymentQuote`](/packages/quasar-sdk/server/interfaces/PaymentQuote.md)\>

Defined in: [modules/payments/index.ts:388](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L388)

Prices an amount in a payment method now (`POST /v1/payments/quotes`); nothing is locked.

#### Parameters

##### params

[`QuoteParams`](/packages/quasar-sdk/server/interfaces/QuoteParams.md)

Amount, currency and method.

#### Returns

`Promise`\<[`PaymentQuote`](/packages/quasar-sdk/server/interfaces/PaymentQuote.md)\>

The price.

#### Throws

`invalid_request` (400), `method_not_found` (404), no fresh price (503), a timeout or a
  network error.

***

### refund()

> **refund**(`invoiceId`, `params?`): `Promise`\<[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\>

Defined in: [modules/payments/index.ts:278](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L278)

Asks for a refund of a paid or held invoice (`POST /v1/payments/invoices/:id/refunds`). Send the returned amount
from your wallet to the payer, then pass the transaction to [PaymentsModule.submitRefund](/packages/quasar-sdk/server/classes/PaymentsModule.md#submitrefund).

#### Parameters

##### invoiceId

`string`

The invoice.

##### params?

[`RefundParams`](/packages/quasar-sdk/server/interfaces/RefundParams.md) = `{}`

Amount (everything left when omitted), mode and reason.

#### Returns

`Promise`\<[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\>

The refund and what to send where.

#### Throws

`invalid_request` (400), `invoice_not_found` (404), an invoice that cannot be refunded or
  an amount above what is left (409), a timeout or a network error.

***

### refundHeldTransfer()

> **refundHeldTransfer**(`heldTransferId`): `Promise`\<[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\>

Defined in: [modules/payments/index.ts:346](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L346)

Asks for the refund of a held transfer, the whole of it to the wallet that sent it
(`POST /v1/payments/held-transfers/:id/refund`): send it from your wallet, then hand the transaction over with
[PaymentsModule.submitRefund](/packages/quasar-sdk/server/classes/PaymentsModule.md#submitrefund). The refund's `heldTransfer` names the transfer, which becomes `refunding`, then
`refunded` once the refund is confirmed.

#### Parameters

##### heldTransferId

`string`

The held transfer.

#### Returns

`Promise`\<[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\>

The refund and what to send where.

#### Throws

`held_transfer_not_found` (404); `held_transfer_not_refundable` (it is not `held`) or
  `sender_blocked` (AML blocked the wallet that sent it) (409); a timeout or a network error.

***

### releaseInvoice()

> **releaseInvoice**(`invoiceId`, `params`): `Promise`\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>

Defined in: [modules/payments/index.ts:210](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L210)

Accepts a held payment (`POST /v1/payments/invoices/:id/release`): the invoice becomes paid and the buyer gets a
receipt. A transfer Quasar could tie to no invoice is never an invoice hold: it is a [HeldTransfer](/packages/quasar-sdk/server/interfaces/HeldTransfer.md) of its
own, refunded with [PaymentsModule.refundHeldTransfer](/packages/quasar-sdk/server/classes/PaymentsModule.md#refundheldtransfer).

#### Parameters

##### invoiceId

`string`

The invoice.

##### params

`reason`, required, recorded in the ledger.

###### reason

`string`

#### Returns

`Promise`\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>

The invoice.

#### Throws

`invoice_not_found` (404); `invoice_not_held` or `invoice_partly_refunded` (refund the rest)
  (409); a timeout or a network error.

***

### replacePayLink()

> **replacePayLink**(`invoiceId`): `Promise`\<[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md)\>

Defined in: [modules/payments/index.ts:243](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L243)

Gives an open invoice a new checkout token and payment page (`POST /v1/payments/invoices/:id/checkout`), for
example when its link leaked. The earlier link stops working, also in the emails already sent; the current link
needs no call: the invoice shows it (`payUrl`).

#### Parameters

##### invoiceId

`string`

The invoice.

#### Returns

`Promise`\<[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md)\>

The invoice with its new token and page.

#### Throws

`invoice_not_found` (404), `invoice_not_open` (409), a timeout or a network error.

***

### resumeSubscription()

> **resumeSubscription**(`subscriptionId`): `Promise`\<[`SubscriptionStart`](/packages/quasar-sdk/server/interfaces/SubscriptionStart.md)\>

Defined in: [modules/payments/index.ts:543](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L543)

Resumes a paused subscription (`POST /v1/payments/subscriptions/:id/resume`) with a new period that starts now
and is invoiced at once.

#### Parameters

##### subscriptionId

`string`

The subscription.

#### Returns

`Promise`\<[`SubscriptionStart`](/packages/quasar-sdk/server/interfaces/SubscriptionStart.md)\>

The subscription and the new period's invoice with its payment page.

#### Throws

`subscription_not_found` (404), `subscription_not_paused` or `subscription_over` (409),
  a timeout or a network error.

***

### submitRefund()

> **submitRefund**(`refundId`, `params`): `Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

Defined in: [modules/payments/index.ts:307](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L307)

Hands Quasar the refund transaction (`POST /v1/payments/refunds/:id/submit`); once it is final, the refund is
confirmed, a credit note issued and `refund.confirmed` sent.

#### Parameters

##### refundId

`string`

The refund.

##### params

[`SubmitRefundParams`](/packages/quasar-sdk/server/interfaces/SubmitRefundParams.md)

The transaction and your wallet it was sent from.

#### Returns

`Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

The refund, `submitted`.

#### Throws

`invalid_request` (400), `refund_not_found` (404), `refund_not_submittable` or
  `transaction_already_used` (409: a transaction an invoice credited as a payment; one handed over as a payment
  that paid nothing becomes the refund's), a timeout or a network error.

***

### undoSubscriptionCancel()

> **undoSubscriptionCancel**(`subscriptionId`): `Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

Defined in: [modules/payments/index.ts:511](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L511)

Takes back a cancellation scheduled for the period end (`POST /v1/payments/subscriptions/:id/cancel/undo`): the
subscription renews again (`subscription.cancel_unscheduled`). Nothing scheduled: nothing changes.

#### Parameters

##### subscriptionId

`string`

The subscription.

#### Returns

`Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

The subscription.

#### Throws

`subscription_not_found` (404), a canceled or ended subscription (409), a timeout or a
  network error.

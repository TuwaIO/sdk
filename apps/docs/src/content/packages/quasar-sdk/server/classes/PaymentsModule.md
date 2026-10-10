# PaymentsModule

Defined in: [modules/payments/index.ts:76](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L76)

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

Defined in: [modules/payments/index.ts:147](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L147)

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

Defined in: [modules/payments/index.ts:367](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L367)

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

Defined in: [modules/payments/index.ts:181](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L181)

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

Defined in: [modules/payments/index.ts:96](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L96)

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

Defined in: [modules/payments/index.ts:323](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L323)

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

Defined in: [modules/payments/index.ts:286](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L286)

Downloads a credit note of an invoice (`GET /v1/payments/invoices/:id/documents/credit-note/:ref`).

#### Parameters

##### invoiceId

`string`

The invoice.

##### ref

`string`

The refund it credits, or its number.

##### format?

`"pdf"` \| `"ubl"`

`pdf` (default) or `ubl`.

#### Returns

`Promise`\<[`PaymentDocument`](/packages/quasar-sdk/server/interfaces/PaymentDocument.md)\>

The bytes, media type and file name.

#### Throws

`invoice_not_found` or `document_not_found` (404), a timeout or a network error.

***

### getDocument()

> **getDocument**(`invoiceId`, `kind`): `Promise`\<[`PaymentDocument`](/packages/quasar-sdk/server/interfaces/PaymentDocument.md)\>

Defined in: [modules/payments/index.ts:273](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L273)

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

> **getEvents**(`invoiceId`, `options?`): `Promise`\<[`InvoiceLedger`](/packages/quasar-sdk/server/interfaces/InvoiceLedger.md)\>

Defined in: [modules/payments/index.ts:212](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L212)

Reads an invoice ledger, oldest first (`GET /v1/payments/invoices/:id/events`).

#### Parameters

##### invoiceId

`string`

The invoice.

##### options?

`verify: true` adds the check of its hash chain.

###### verify?

`boolean`

#### Returns

`Promise`\<[`InvoiceLedger`](/packages/quasar-sdk/server/interfaces/InvoiceLedger.md)\>

The ledger.

#### Throws

`invoice_not_found` (404), a timeout or a network error.

***

### getInvoice()

> **getInvoice**(`invoiceId`): `Promise`\<[`InvoiceDetails`](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md)\>

Defined in: [modules/payments/index.ts:111](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L111)

Reads an invoice with its refunds and credit notes (`GET /v1/payments/invoices/:id`).

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

Defined in: [modules/payments/index.ts:243](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L243)

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

> **getSubscription**(`subscriptionId`): `Promise`\<[`SubscriptionDetails`](/packages/quasar-sdk/server/interfaces/SubscriptionDetails.md)\>

Defined in: [modules/payments/index.ts:353](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L353)

Reads a subscription with the invoices of its periods and its automatic charges
(`GET /v1/payments/subscriptions/:id`).

#### Parameters

##### subscriptionId

`string`

The subscription.

#### Returns

`Promise`\<[`SubscriptionDetails`](/packages/quasar-sdk/server/interfaces/SubscriptionDetails.md)\>

The subscription.

#### Throws

`subscription_not_found` (404), a timeout or a network error.

***

### listInvoices()

> **listInvoices**(`params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>\>

Defined in: [modules/payments/index.ts:122](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L122)

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

Defined in: [modules/payments/index.ts:309](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L309)

Lists the app's active payment methods, in their order (`GET /v1/payments/methods`).

#### Returns

`Promise`\<\{ `data`: [`PaymentMethod`](/packages/quasar-sdk/server/interfaces/PaymentMethod.md)[]; `object`: `"list"`; \}\>

The methods.

#### Throws

A timeout or a network error.

***

### listSubscriptions()

> **listSubscriptions**(`params?`): `Promise`\<[`PaymentsList`](/packages/quasar-sdk/server/interfaces/PaymentsList.md)\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>\>

Defined in: [modules/payments/index.ts:338](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L338)

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

Defined in: [modules/payments/index.ts:399](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L399)

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

Defined in: [modules/payments/index.ts:299](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L299)

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

Defined in: [modules/payments/index.ts:229](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L229)

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

`invalid_request` (400), `invoice_not_found` (404), an invoice that cannot be refunded
  or an amount above what is left (409), a timeout or a network error.

***

### releaseInvoice()

> **releaseInvoice**(`invoiceId`, `params`): `Promise`\<[`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)\>

Defined in: [modules/payments/index.ts:164](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L164)

Accepts a held payment (`POST /v1/payments/invoices/:id/release`): the invoice becomes paid and the buyer gets a
receipt.

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

`invoice_not_found` (404), an invoice that is not held (409), a timeout or a network
  error.

***

### replacePayLink()

> **replacePayLink**(`invoiceId`): `Promise`\<[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md)\>

Defined in: [modules/payments/index.ts:197](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L197)

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

Defined in: [modules/payments/index.ts:415](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L415)

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

Defined in: [modules/payments/index.ts:257](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L257)

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
  `transaction_already_used` (409), a timeout or a network error.

***

### undoSubscriptionCancel()

> **undoSubscriptionCancel**(`subscriptionId`): `Promise`\<[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)\>

Defined in: [modules/payments/index.ts:383](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/index.ts#L383)

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

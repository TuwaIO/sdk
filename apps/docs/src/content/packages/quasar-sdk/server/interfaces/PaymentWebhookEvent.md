# PaymentWebhookEvent

Defined in: [webhooks.ts:113](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L113)

The body of a payment webhook (`payments.v1`). `id`, `type` and `createdAt` are those of the ledger event, so
deduplicate by `id`; `data.invoice` is the invoice when the delivery was sent, so a retry carries its current state.

## Properties

### apiVersion

> **apiVersion**: `"payments.v1"`

Defined in: [webhooks.ts:119](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L119)

Always `payments.v1`.

***

### createdAt

> **createdAt**: `string`

Defined in: [webhooks.ts:123](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L123)

When it happened (ISO 8601).

***

### data

> **data**: `object`

Defined in: [webhooks.ts:129](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L129)

What the event is about.

#### aml?

> `optional` **aml?**: `object`

Why AML held the payment, on a hold by AML.

##### aml.decision

> **decision**: `"block"`

##### aml.reasons

> **reasons**: `unknown`[]

#### heldTransfer?

> `optional` **heldTransfer?**: [`PaymentWebhookHeldTransfer`](/packages/quasar-sdk/server/interfaces/PaymentWebhookHeldTransfer.md) \| [`PaymentWebhookHeldTransferVoided`](/packages/quasar-sdk/server/interfaces/PaymentWebhookHeldTransferVoided.md)

The transfer of `invoice.transfer_held` and `invoice.transfer_hold_voided`. The refund of a held transfer names
it in `refund.heldTransfer`.

#### hold?

> `optional` **hold?**: [`PaymentWebhookHold`](/packages/quasar-sdk/server/interfaces/PaymentWebhookHold.md)

What `invoice.held` holds. Quasar versions before October 29, 2026 leave it out.

#### invoice?

> `optional` **invoice?**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

The invoice now (subscription events carry the invoice of their period, when there is one).

#### payments?

> `optional` **payments?**: [`InvoicePayment`](/packages/quasar-sdk/server/interfaces/InvoicePayment.md)[]

Every transfer credited to the invoice so far, on `invoice.paid`, `invoice.underpaid`, `invoice.held` and
`invoice.released`: an invoice paid in parts has several.

#### refund?

> `optional` **refund?**: [`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)

The refund of a refund event.

#### settlement?

> `optional` **settlement?**: [`InvoiceSettlement`](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md)

The payment, once the invoice has one.

#### subscription?

> `optional` **subscription?**: [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

The subscription of a subscription event.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [webhooks.ts:127](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L127)

Live or test.

***

### id

> **id**: `string`

Defined in: [webhooks.ts:115](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L115)

Event ID: the same for every delivery and retry of the event.

***

### object

> **object**: `"event"`

Defined in: [webhooks.ts:117](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L117)

Always `event`.

***

### sentAt

> **sentAt**: `string`

Defined in: [webhooks.ts:125](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L125)

When this delivery was sent; signed with the body, it lets [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md) refuse old replays.

***

### type

> **type**: [`PaymentWebhookEventType`](/packages/quasar-sdk/server/type-aliases/PaymentWebhookEventType.md)

Defined in: [webhooks.ts:121](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L121)

What happened.

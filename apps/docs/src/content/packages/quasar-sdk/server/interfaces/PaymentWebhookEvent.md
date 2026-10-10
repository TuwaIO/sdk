# PaymentWebhookEvent

Defined in: [webhooks.ts:47](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L47)

The body of a payment webhook (`payments.v1`). `id`, `type` and `createdAt` are those of the ledger event, so
deduplicate by `id`; `data.invoice` is the invoice when the delivery was sent, so a retry carries its current state.

## Properties

### apiVersion

> **apiVersion**: `"payments.v1"`

Defined in: [webhooks.ts:53](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L53)

Always `payments.v1`.

***

### createdAt

> **createdAt**: `string`

Defined in: [webhooks.ts:57](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L57)

When it happened (ISO 8601).

***

### data

> **data**: `object`

Defined in: [webhooks.ts:63](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L63)

What the event is about.

#### aml?

> `optional` **aml?**: `object`

Why AML held the payment, on a hold by AML.

##### aml.decision

> **decision**: `"block"`

##### aml.reasons

> **reasons**: `unknown`[]

#### invoice?

> `optional` **invoice?**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

The invoice now (subscription events carry the invoice of their period, when there is one).

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

Defined in: [webhooks.ts:61](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L61)

Live or test.

***

### id

> **id**: `string`

Defined in: [webhooks.ts:49](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L49)

Event ID: the same for every delivery and retry of the event.

***

### object

> **object**: `"event"`

Defined in: [webhooks.ts:51](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L51)

Always `event`.

***

### sentAt

> **sentAt**: `string`

Defined in: [webhooks.ts:59](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L59)

When this delivery was sent; signed with the body, it lets [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md) refuse old replays.

***

### type

> **type**: [`PaymentWebhookEventType`](/packages/quasar-sdk/server/type-aliases/PaymentWebhookEventType.md)

Defined in: [webhooks.ts:55](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L55)

What happened.

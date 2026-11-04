# PaymentWebhookHold

Defined in: [webhooks.ts:57](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L57)

What a hold is about (`data.hold` of `invoice.held`): an invoice paid in a way that waits for your decision. `reason`
(`late`, `aml`, `quote_expired`), its transaction (`txHash`), the wallets that sent it (`senders`) and whether it came
late (`late`). Release it with [PaymentsModule.releaseInvoice](/packages/quasar-sdk/server/classes/PaymentsModule.md#releaseinvoice) or refund it.

## Properties

### late?

> `optional` **late?**: `true`

Defined in: [webhooks.ts:65](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L65)

It arrived after the invoice expired or was cancelled, or was handed over after `dueAt`.

***

### reason

> **reason**: `"late"` \| `"aml"` \| `"quote_expired"` \| `null`

Defined in: [webhooks.ts:59](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L59)

Why the payment is held; `null` when Quasar did not record why.

***

### senders?

> `optional` **senders?**: `string`[]

Defined in: [webhooks.ts:63](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L63)

The wallets that sent it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:61](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L61)

The transaction of the held payment.

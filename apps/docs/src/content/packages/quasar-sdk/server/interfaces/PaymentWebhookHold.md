# PaymentWebhookHold

Defined in: [webhooks.ts:50](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L50)

What a hold is about (`data.hold` of `invoice.held`): an invoice paid in a way that waits for your decision. `reason`
(`late`, `aml`, `quote_expired`), its transaction (`txHash`), the wallets that sent it (`senders`) and whether it came
late (`late`). Release it with [PaymentsModule.releaseInvoice](/packages/quasar-sdk/server/classes/PaymentsModule.md#releaseinvoice) or refund it.

## Properties

### late?

> `optional` **late?**: `true`

Defined in: [webhooks.ts:58](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L58)

It arrived after the invoice expired or was cancelled, or was handed over after `dueAt`.

***

### reason

> **reason**: `"late"` \| `"aml"` \| `"quote_expired"` \| `null`

Defined in: [webhooks.ts:52](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L52)

Why the payment is held; `null` when Quasar did not record why.

***

### senders?

> `optional` **senders?**: `string`[]

Defined in: [webhooks.ts:56](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L56)

The wallets that sent it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:54](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L54)

The transaction of the held payment.

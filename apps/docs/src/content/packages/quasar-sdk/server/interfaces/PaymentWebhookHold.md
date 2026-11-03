# PaymentWebhookHold

Defined in: [webhooks.ts:51](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L51)

What a hold is about (`data.hold` of `invoice.held`): `reason` (`late`, `aml`, `quote_expired`, `payer_mismatch`),
whether you can only refund it (`refundOnly`: a transfer Quasar could tie to no invoice, from another wallet than the
quoted one or from one that never confirmed the invoice, `unconfirmed`; never release it, refund it to the wallet that
sent it), its transaction (`txHash`: a refund-only hold has no `settlement`), the wallets that sent it (`senders`) and
whether it came late (`late`).

## Properties

### late?

> `optional` **late?**: `true`

Defined in: [webhooks.ts:65](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L65)

It arrived after the invoice expired or was cancelled, or was handed over after `dueAt`.

***

### reason

> **reason**: `"late"` \| `"aml"` \| `"quote_expired"` \| `"payer_mismatch"` \| `null`

Defined in: [webhooks.ts:55](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L55)

Why the payment is held; `null` when Quasar did not record why.

***

### refundOnly

> **refundOnly**: `boolean`

Defined in: [webhooks.ts:57](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L57)

Whether you can only refund it to the wallet that sent it.

***

### senders?

> `optional` **senders?**: `string`[]

Defined in: [webhooks.ts:61](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L61)

The wallets that sent it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:59](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L59)

The transaction of the held payment.

***

### unconfirmed?

> `optional` **unconfirmed?**: `true`

Defined in: [webhooks.ts:63](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L63)

It came from the quoted wallet, which never confirmed the invoice.

***

### voided?

> `optional` **voided?**: `undefined`

Defined in: [webhooks.ts:53](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L53)

Not set: the hold stands.

# PaymentWebhookHoldVoided

Defined in: [webhooks.ts:73](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L73)

What Quasar undid (`data.hold` of `invoice.hold_voided`): a refund-only hold whose transfer paid another invoice of
yours since (`paidInvoice`, the one its wallet confirmed); the invoice went back to `status`, as before the hold, and
there is nothing to refund.

## Properties

### paidInvoice

> **paidInvoice**: `string` \| `null`

Defined in: [webhooks.ts:79](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L79)

The invoice the transaction paid instead.

***

### status

> **status**: `string` \| `null`

Defined in: [webhooks.ts:81](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L81)

The state the invoice went back to.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:77](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L77)

The transaction of the hold.

***

### voided

> **voided**: `true`

Defined in: [webhooks.ts:75](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L75)

Always `true`.

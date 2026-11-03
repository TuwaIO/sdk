# PaymentWebhookHeldTransferVoided

Defined in: [webhooks.ts:91](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L91)

A held transfer Quasar voided (`data.heldTransfer` of `invoice.transfer_hold_voided`): the same transaction was
proven to pay another invoice of yours since (`paidInvoice`), so there is nothing to refund.

## Properties

### id

> **id**: `string` \| `null`

Defined in: [webhooks.ts:93](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L93)

The held transfer.

***

### paidInvoice

> **paidInvoice**: `string` \| `null`

Defined in: [webhooks.ts:99](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L99)

The invoice the transaction paid instead.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:97](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L97)

Its transaction.

***

### voided

> **voided**: `true`

Defined in: [webhooks.ts:95](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L95)

Always `true`.

# PaymentWebhookHeldTransferVoided

Defined in: [webhooks.ts:98](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L98)

A held transfer Quasar voided (`data.heldTransfer` of `invoice.transfer_hold_voided`): the same transaction was
proven to pay another invoice of yours since (`paidInvoice`), so there is nothing to refund.

## Properties

### id

> **id**: `string` \| `null`

Defined in: [webhooks.ts:100](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L100)

The held transfer.

***

### paidInvoice

> **paidInvoice**: `string` \| `null`

Defined in: [webhooks.ts:106](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L106)

The invoice the transaction paid instead.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:104](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L104)

Its transaction.

***

### voided

> **voided**: `true`

Defined in: [webhooks.ts:102](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L102)

Always `true`.

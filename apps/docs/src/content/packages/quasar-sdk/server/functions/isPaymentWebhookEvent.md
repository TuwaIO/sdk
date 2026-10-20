# isPaymentWebhookEvent()

> **isPaymentWebhookEvent**(`event`): `event is PaymentWebhookEvent`

Defined in: [webhooks.ts:168](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L168)

Whether a verified webhook is a payment event (`apiVersion: 'payments.v1'`) rather than a transaction webhook.

## Parameters

### event

[`QuasarWebhook`](/packages/quasar-sdk/server/type-aliases/QuasarWebhook.md)

A body returned by [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md).

## Returns

`event is PaymentWebhookEvent`

`true` for a payment event.

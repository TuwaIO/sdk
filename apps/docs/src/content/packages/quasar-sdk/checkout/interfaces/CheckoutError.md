# CheckoutError

Defined in: [checkout/store.ts:71](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L71)

Why the last action failed: the Payments `code` (`payer_blocked`, `quote_required`, `invoice_expired`…), or
`method_required` (no method chosen), `consent_required` (the merchant's consent is not ticked), `payment_failed`
(the transaction can never pay the invoice: it reverted, carried a wrong amount…; pay again),
`payment_unconfirmed` (Quasar could not confirm the transaction, but it may still have gone through: check the
wallet before paying again) and `request_failed` (no answer).

## Properties

### code

> **code**: `string`

Defined in: [checkout/store.ts:73](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L73)

Stable code.

***

### issues?

> `optional` **issues?**: [`QuasarRequestIssue`](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)[]

Defined in: [checkout/store.ts:79](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L79)

The fields at fault of an invalid request.

***

### message

> **message**: `string`

Defined in: [checkout/store.ts:75](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L75)

What to show or log.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [checkout/store.ts:84](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L84)

Why Quasar rejected the payment, for `payment_failed` and `payment_unconfirmed`: a reason of
[CheckoutRejectedPayment](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md) (`reverted`, `not_found`, `timeout`…); left out when Quasar did not say.

***

### status?

> `optional` **status?**: `number`

Defined in: [checkout/store.ts:77](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L77)

HTTP status, when the API answered.

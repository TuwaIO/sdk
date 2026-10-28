# CheckoutError

Defined in: [checkout/store.ts:56](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L56)

Why the last action failed: the Payments `code` (`payer_blocked`, `quote_required`, `invoice_expired`…), or
`method_required` (no method chosen), `consent_required` (the merchant's consent is not ticked), `payment_failed`
(the transaction failed on-chain; pay again) and `request_failed` (no answer).

## Properties

### code

> **code**: `string`

Defined in: [checkout/store.ts:58](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L58)

Stable code.

***

### issues?

> `optional` **issues?**: [`QuasarRequestIssue`](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)[]

Defined in: [checkout/store.ts:64](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L64)

The fields at fault of an invalid request.

***

### message

> **message**: `string`

Defined in: [checkout/store.ts:60](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L60)

What to show or log.

***

### status?

> `optional` **status?**: `number`

Defined in: [checkout/store.ts:62](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L62)

HTTP status, when the API answered.

# CheckoutError

Defined in: checkout/store.ts:51

Why the last action failed: the Payments `code` (`payer_blocked`, `quote_required`, `invoice_expired`…), or
`method_required` (no method chosen), `payment_failed` (the transaction failed on-chain; pay again) and
`request_failed` (no answer).

## Properties

### code

> **code**: `string`

Defined in: checkout/store.ts:53

Stable code.

***

### issues?

> `optional` **issues?**: [`QuasarRequestIssue`](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)[]

Defined in: checkout/store.ts:59

The fields at fault of an invalid request.

***

### message

> **message**: `string`

Defined in: checkout/store.ts:55

What to show or log.

***

### status?

> `optional` **status?**: `number`

Defined in: checkout/store.ts:57

HTTP status, when the API answered.

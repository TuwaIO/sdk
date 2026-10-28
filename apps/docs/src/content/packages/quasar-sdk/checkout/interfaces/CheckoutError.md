# CheckoutError

Defined in: [checkout/store.ts:78](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L78)

Why the last action failed: the Payments `code` (`payer_blocked`, `quote_required`, `invoice_expired`…), or
`method_required` (no method chosen), `consent_required` (the merchant's consent is not ticked), `payment_failed`
(the transaction did not go through: it reverted, was cancelled, its Solana blockhash expired…; pay again),
`payment_mismatch` (the transaction succeeded on chain but does not pay the invoice: a wrong amount, asset or
recipient, no Solana Pay reference, sent before the quote, already used; it may have moved money, so never say that
nothing was charged: say that it does not pay the invoice and to contact the merchant if money left the wallet; the
buyer may pay again once it can never pay the invoice; one that may still pay it keeps `phase` `unconfirmed`, with no
plain second payment), `payment_unconfirmed` (Quasar could not confirm the transaction, or has not received it yet,
but it may still have gone through: check the wallet before paying again; `rechecked` says whether Quasar reads it
again) and `request_failed` (no answer).

## Properties

### code

> **code**: `string`

Defined in: [checkout/store.ts:80](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L80)

Stable code.

***

### issues?

> `optional` **issues?**: [`QuasarRequestIssue`](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)[]

Defined in: [checkout/store.ts:86](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L86)

The fields at fault of an invalid request.

***

### message

> **message**: `string`

Defined in: [checkout/store.ts:82](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L82)

What to show or log.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [checkout/store.ts:93](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L93)

Why Quasar rejected the payment, for `payment_failed`, `payment_mismatch` and `payment_unconfirmed`: a reason of
[CheckoutRejectedPayment](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md) (`reverted`, `no_matching_transfer`, `not_found`, `timeout`…), `submit_retrying`
while the store retries handing over a transaction Quasar has not received yet ([CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit)), or
`submit_failed` once it gave up after an hour; left out when Quasar did not say.

***

### rechecked?

> `optional` **rechecked?**: `true`

Defined in: [checkout/store.ts:102](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L102)

Set on `payment_unconfirmed` while Quasar still reads the payment again (for up to 24 hours after it learned of
it): the rejection is `rechecked` ([CheckoutRejectedPayment.rechecked](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md#rechecked)), or there is no rejection and Quasar
reports a payment that may still arrive (`unresolvedPayments` above `0`). Only then may the page promise that
Quasar checks the payment again. Left out otherwise (`user_operation_lost`, `transaction_failed`, `submit_failed`, a
Quasar that does not say): Quasar never reads that payment again, so the page asks the buyer to contact the
merchant with the transaction hash if money left the wallet.

***

### status?

> `optional` **status?**: `number`

Defined in: [checkout/store.ts:84](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L84)

HTTP status, when the API answered.

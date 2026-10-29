# CheckoutError

Defined in: [checkout/store.ts:93](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L93)

Why the last action failed: the Payments `code` (`payer_blocked`, `quote_required`, `invoice_expired`…), or
`method_required` (no method chosen), `consent_required` (the merchant's consent is not ticked),
`payer_proof_required` (the wallet has not confirmed the invoice yet: [CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer); also Quasar's
`409` to a quote), `payer_required` (no wallet to confirm), `payer_proof_declined` (the wallet did not sign the
confirmation; nothing was sent), the refusals of a confirmation (`payer_proof_invalid` with `reason`
`message_mismatch` or `signature_invalid`, `payer_proof_unavailable` with `reason` `rpc_failed` when the network of a
smart wallet cannot be asked now, `payer_chain_mismatch`, `origin_required`, `rate_limited`, `too_many_payers`),
`payment_failed`
(the transaction did not go through: it reverted, was cancelled, its Solana blockhash expired…; pay again),
`payment_mismatch` (the transaction succeeded on chain but does not pay the invoice: a wrong amount, asset or
recipient, no Solana Pay reference, sent before the quote, already used; it may have moved money, so never say that
nothing was charged: say that it does not pay the invoice and to contact the merchant if money left the wallet; the
buyer may pay again once it can never pay the invoice; one that may still pay it keeps `phase` `unconfirmed`, with no
plain second payment), `payment_unconfirmed` (Quasar could not confirm the transaction, or has not received it yet,
but it may still have gone through: check the wallet before paying again; `rechecked` says whether Quasar reads it
again; `reason` `tx_already_used` and `settlement_failed` say more, see [CheckoutError.reason](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md#reason)) and
`request_failed` (no answer).

## Properties

### code

> **code**: `string`

Defined in: [checkout/store.ts:95](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L95)

Stable code.

***

### issues?

> `optional` **issues?**: [`QuasarRequestIssue`](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)[]

Defined in: [checkout/store.ts:101](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L101)

The fields at fault of an invalid request.

***

### message

> **message**: `string`

Defined in: [checkout/store.ts:97](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L97)

What to show or log.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [checkout/store.ts:124](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L124)

Why Quasar refused an action, when it says (`details.reason` of the refusal: `signature_invalid` of
`payer_proof_invalid`, `feed_unavailable` of `price_unavailable`…). Why Quasar rejected the payment, for
`payment_failed`, `payment_mismatch` and `payment_unconfirmed`: a reason of
[CheckoutRejectedPayment](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md) (`reverted`, `no_matching_transfer`, `not_found`, `timeout`…), `submit_retrying`
while the store retries handing over a transaction Quasar has not received yet ([CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit)), or
`submit_failed` once it gave up after an hour; left out when Quasar did not say. Two reasons of
`payment_unconfirmed` are about a payment that left the wallet, and the page offers no payment for them:
- `tx_already_used` (with `status` `409`): Quasar tracks the transaction for another invoice whose page handed it
  over first (anyone who saw the hash may have done so). Quasar recorded this invoice's claim on it and credits it
  to the invoice the wallet that sent it confirmed ([CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer)): when that is this invoice,
  it becomes `processing` or `paid` and the error clears; when it is not, Quasar rejects it here with
  `tx_already_used` (`payment_mismatch`).
- `settlement_failed`: the network confirmed the transaction, but Quasar has not recorded it yet. The money reached
  the merchant's address: the buyer contacts the merchant with the transaction hash and does not pay again; never
  say that it does not pay the invoice or that nothing was charged. Quasar settles it again daily for 30 days after
  it learned of it, while `rechecked` is set; only then may the page say so.

`payment_mismatch` with `payer_mismatch` or `payer_unconfirmed`: the transfer came from another wallet than the
quoted one, or from one that never confirmed the invoice; it pays no invoice and the merchant returns it to the
wallet that sent it.

***

### rechecked?

> `optional` **rechecked?**: `true`

Defined in: [checkout/store.ts:134](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L134)

Set on `payment_unconfirmed` while Quasar still reads the payment again (for up to 24 hours after it learned of
it; a `settlement_failed` one daily for 30 days): the rejection is `rechecked`
([CheckoutRejectedPayment.rechecked](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md#rechecked)), or there is no rejection and Quasar reports a payment that may still
arrive (`unresolvedPayments` above `0`). Only then may the page promise that Quasar checks the payment again. Left
out otherwise (`user_operation_lost`, `transaction_failed`, `submit_failed`, a `settlement_failed` past its 30 days,
a Quasar that does not say): Quasar never reads that payment again, so the page asks the buyer to contact the
merchant with the transaction hash if money left the wallet.

***

### status?

> `optional` **status?**: `number`

Defined in: [checkout/store.ts:99](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L99)

HTTP status, when the API answered.

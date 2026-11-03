# CheckoutRejectedPayment

Defined in: [checkout/types.ts:134](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L134)

A payment of the invoice that failed, as the checkout lists it ([CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments)).

## Properties

### final

> **final**: `boolean`

Defined in: [checkout/types.ts:159](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L159)

Whether the transaction can never pay the invoice, so the buyer may pay again. When `false` (`not_found`,
`timeout`, `replaced`…) the money may still be on its way or already with the merchant: the buyer checks the wallet
before paying again. A final rejection may still have moved money: read `movedMoney`.

***

### held?

> `optional` **held?**: `true`

Defined in: [checkout/types.ts:191](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L191)

`true` when Quasar records the transfer as a held transfer, which the merchant returns to the wallet that sent it:
a `payer_mismatch` or `payer_unconfirmed` rejection (the invoice stays payable from the wallet that confirmed it),
or a `tx_already_used` one whose transfer is held at another invoice of the merchant (`otherInvoice`; say that it is
tied to another invoice, never that it pays one). Quasar versions before October 29, 2026 leave it out.

***

### movedMoney?

> `optional` **movedMoney?**: `true`

Defined in: [checkout/types.ts:173](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L173)

`true` when the transaction succeeded on chain without paying the invoice (`no_matching_transfer`,
`reference_missing`, `too_early`, `tx_already_used`, `payer_mismatch`, `payer_unconfirmed`,
`native_from_contract_unverifiable`, `invoice_not_payable`), or Quasar has not recorded it yet
(`settlement_failed`): it may have moved money. Never say that it did not go through or that nothing was charged:
say that it does not pay the invoice (for `settlement_failed`: that Quasar has not recorded it yet; for
`payer_mismatch` and `payer_unconfirmed`: promise a refund only on a held invoice), and whom to contact if money
left the wallet. Quasar versions before October 29, 2026 leave it out.

***

### original?

> `optional` **original?**: `string`

Defined in: [checkout/types.ts:163](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L163)

The transaction the checkout handed over, when this one replaced it (a payment sped up in the wallet).

***

### otherInvoice?

> `optional` **otherInvoice?**: `string`

Defined in: [checkout/types.ts:193](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L193)

The invoice of the merchant the transaction is credited to or held on, when Quasar names it.

***

### reason

> **reason**: `string`

Defined in: [checkout/types.ts:153](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L153)

Why: `reverted`, `cancelled`, `expired` (a Solana blockhash), `no_matching_transfer` (a wrong amount, asset or
recipient), `tx_already_used` (the transaction pays another invoice of the merchant: the one the wallet that sent
it confirmed, or whose mark it carries, also when this invoice's page handed it over first or claimed it; with
`held`, another invoice holds it for a refund only and it pays none),
`reference_missing`, `too_early`, `not_found` (the network never returned the transaction), `timeout` (no receipt
in time), `replaced`, `payer_mismatch` (a transfer from another wallet to an invoice paid or held already; one to a
payable invoice is held for a refund only: [CheckoutReview](/packages/quasar-sdk/checkout/type-aliases/CheckoutReview.md)), `payer_unconfirmed` (the same from a wallet that
never confirmed the invoice: it pays no invoice; final; a refund only when held, a transfer credited to another
invoice is `tx_already_used`), `native_from_contract_unverifiable`, `invoice_not_payable` (a transfer to an invoice paid, held or refunded
already), `settlement_failed` (the network confirmed the transaction, but Quasar has not recorded it yet: not final,
never a second payment, the buyer contacts the merchant; Quasar settles it again daily for 30 days after it learned
of it, while `rechecked`), `unresolved_after_24h` (no result seen on chain within 24 hours: only a transaction
Quasar read again after that day and the network does not have), a relay's reason (`user_operation_lost`…), or
`transaction_failed` when Quasar does not know.

***

### rechecked?

> `optional` **rechecked?**: `true`

Defined in: [checkout/types.ts:184](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L184)

`true` while Quasar still reads the transaction again: a rejection for `not_found`, `timeout` or `replaced` of a
payment Quasar learned of within the last 24 hours that nothing has resolved since (a payment still unresolved
after the 24 hours is closed with the final reason `unresolved_after_24h`), or a `settlement_failed` one Quasar
still settles again daily (for 30 days after it learned of the payment; Quasar versions before the payer proof,
October 29, 2026, never mark it). Only then may the page promise that Quasar checks the payment again. Any other
reason that is not `final` (a relay operation lost, `transaction_failed`, a transfer from another wallet…) is never
read again: if money left the wallet, the buyer contacts the merchant with the transaction hash. Quasar versions
before October 29, 2026 leave it out.

***

### txKey

> **txKey**: `string`

Defined in: [checkout/types.ts:136](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L136)

The transaction's `txKey`, or the `userOpHash` of a gasless relay that failed before it had a transaction.

***

### userOpHash?

> `optional` **userOpHash?**: `string`

Defined in: [checkout/types.ts:161](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L161)

The relay operation the transaction came from, which the page knows when the relay answered `sending`.

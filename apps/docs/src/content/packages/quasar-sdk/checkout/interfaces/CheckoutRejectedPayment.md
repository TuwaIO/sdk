# CheckoutRejectedPayment

Defined in: [checkout/types.ts:123](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L123)

A payment of the invoice that failed, as the checkout lists it ([CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments)).

## Properties

### final

> **final**: `boolean`

Defined in: [checkout/types.ts:145](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L145)

Whether the transaction can never pay the invoice, so the buyer may pay again. When `false` (`not_found`,
`timeout`, `replaced`…) the money may still be on its way or already with the merchant: the buyer checks the wallet
before paying again. A final rejection may still have moved money: read `movedMoney`.

***

### movedMoney?

> `optional` **movedMoney?**: `true`

Defined in: [checkout/types.ts:158](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L158)

`true` when the transaction succeeded on chain without paying the invoice (`no_matching_transfer`,
`reference_missing`, `too_early`, `tx_already_used`, `payer_mismatch`, `native_from_contract_unverifiable`,
`invoice_not_payable`), or Quasar has not recorded it yet (`settlement_failed`): it may have moved money. Never say
that it did not go through or that nothing was charged: say that it does not pay the invoice (for
`settlement_failed`: that Quasar has not recorded it yet), and whom to contact if money left the wallet. Quasar
versions before October 29, 2026 leave it out.

***

### original?

> `optional` **original?**: `string`

Defined in: [checkout/types.ts:149](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L149)

The transaction the checkout handed over, when this one replaced it (a payment sped up in the wallet).

***

### reason

> **reason**: `string`

Defined in: [checkout/types.ts:139](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L139)

Why: `reverted`, `cancelled`, `expired` (a Solana blockhash), `no_matching_transfer` (a wrong amount, asset or
recipient), `tx_already_used` (the transaction pays another invoice of the merchant: the one whose quoted wallet
sent it, also when this invoice's page handed it over first or claimed it), `reference_missing`, `too_early`,
`not_found` (the network never returned the transaction), `timeout` (no receipt in time), `replaced`,
`payer_mismatch` (a transfer from another wallet to an invoice paid or held already; one to a payable invoice is
held for the merchant, who refunds it to the wallet that sent it), `native_from_contract_unverifiable`,
`invoice_not_payable` (a transfer to an invoice paid, held or refunded already), `settlement_failed` (the network
confirmed the transaction, but Quasar has not recorded it yet and settles it again daily for 30 days: not final,
never a second payment, the buyer contacts the merchant), `unresolved_after_24h` (no result seen on chain within 24
hours: only a transaction Quasar read again after that day and the network does not have), a relay's reason
(`user_operation_lost`…), or `transaction_failed` when Quasar does not know.

***

### rechecked?

> `optional` **rechecked?**: `true`

Defined in: [checkout/types.ts:167](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L167)

`true` while Quasar still reads the transaction again: a rejection for `not_found`, `timeout` or `replaced` of a
payment Quasar learned of within the last 24 hours that nothing has resolved since. Only then may the page promise
that Quasar checks the payment again; a payment still unresolved after the 24 hours is closed with the final reason
`unresolved_after_24h`. Any other reason that is not `final` (a relay operation lost, `transaction_failed`, a
transfer from another wallet…) is never read again: if money left the wallet, the buyer contacts the merchant with
the transaction hash. Quasar versions before October 29, 2026 leave it out.

***

### txKey

> **txKey**: `string`

Defined in: [checkout/types.ts:125](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L125)

The transaction's `txKey`, or the `userOpHash` of a gasless relay that failed before it had a transaction.

***

### userOpHash?

> `optional` **userOpHash?**: `string`

Defined in: [checkout/types.ts:147](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L147)

The relay operation the transaction came from, which the page knows when the relay answered `sending`.

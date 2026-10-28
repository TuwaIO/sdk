# CheckoutRejectedPayment

Defined in: [checkout/types.ts:120](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L120)

A payment of the invoice that failed, as the checkout lists it ([CheckoutInvoice.rejectedPayments](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#rejectedpayments)).

## Properties

### final

> **final**: `boolean`

Defined in: [checkout/types.ts:135](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L135)

Whether the transaction can never pay the invoice, so the buyer may pay again. When `false` (`not_found`,
`timeout`, `replaced`…) the money may still be on its way or already with the merchant: the buyer checks the wallet
before paying again. A final rejection may still have moved money: read `movedMoney`.

***

### movedMoney?

> `optional` **movedMoney?**: `true`

Defined in: [checkout/types.ts:147](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L147)

`true` when the transaction succeeded on chain without paying the invoice (`no_matching_transfer`,
`reference_missing`, `too_early`, `tx_already_used`, `payer_mismatch`, `native_from_contract_unverifiable`,
`invoice_not_payable`): it may have moved money. Never say that it did not go through or that nothing was charged:
say that it does not pay the invoice, and whom to contact if money left the wallet. Quasar versions before October
29, 2026 leave it out.

***

### original?

> `optional` **original?**: `string`

Defined in: [checkout/types.ts:139](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L139)

The transaction the checkout handed over, when this one replaced it (a payment sped up in the wallet).

***

### reason

> **reason**: `string`

Defined in: [checkout/types.ts:129](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L129)

Why: `reverted`, `cancelled`, `expired` (a Solana blockhash), `no_matching_transfer` (a wrong amount, asset or
recipient), `tx_already_used`, `reference_missing`, `too_early`, `not_found` (the network never returned the
transaction), `timeout` (no receipt in time), `replaced`, `payer_mismatch`, `native_from_contract_unverifiable`,
`invoice_not_payable`, a relay's reason, or `transaction_failed` when Quasar does not know.

***

### txKey

> **txKey**: `string`

Defined in: [checkout/types.ts:122](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L122)

The transaction's `txKey`, or the `userOpHash` of a gasless relay that failed before it had a transaction.

***

### userOpHash?

> `optional` **userOpHash?**: `string`

Defined in: [checkout/types.ts:137](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L137)

The relay operation the transaction came from, which the page knows when the relay answered `sending`.

# CheckoutReview

> **CheckoutReview** = `object`

Defined in: [checkout/types.ts:141](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L141)

Why a payment of a `held` (or flagged) invoice waits for the seller, as [CheckoutInvoice.review](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#review) says it:

- `screening`: the sender did not pass the seller's AML check after paying; no details reach the buyer.
- `late`: it arrived after the invoice expired or was cancelled; the seller accepts or returns it.
- `overpaid`: more arrived than the invoice asks for, and the seller looks at it.
- `quote_expired`: it arrived after its locked quote expired, in an asset whose price moved; the seller accepts or
  returns it.

A transfer Quasar could tie to no invoice never holds the invoice: it is a rejected payment with `held`
([CheckoutRejectedPayment.held](/packages/quasar-sdk/checkout/interfaces/CheckoutRejectedPayment.md#held)), which the seller returns to the wallet that sent it.

## Properties

### reason

> **reason**: `"screening"` \| `"late"` \| `"overpaid"` \| `"quote_expired"`

Defined in: [checkout/types.ts:141](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L141)

# CheckoutReview

> **CheckoutReview** = \{ `reason`: `"screening"` \| `"late"` \| `"overpaid"` \| `"quote_expired"`; \} \| \{ `reason`: `"payer_mismatch"` \| `"payer_unconfirmed"`; `refundOnly`: `true`; \}

Defined in: [checkout/types.ts:140](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L140)

Why a payment of a `held` (or flagged) invoice waits for the seller, as [CheckoutInvoice.review](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md#review) says it:

- `screening`: the sender did not pass the seller's AML check after paying; no details reach the buyer.
- `late`: it arrived after the invoice expired or was cancelled; the seller accepts or returns it.
- `overpaid`: more arrived than the invoice asks for, and the seller looks at it.
- `quote_expired`: it arrived after its locked quote expired, in an asset whose price moved; the seller accepts or
  returns it.
- `payer_mismatch` and `payer_unconfirmed`, with `refundOnly: true`: Quasar could tie the transfer to no invoice
  (it came from another wallet than the one the quote was locked to, or from that wallet, which never confirmed the
  invoice with [CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer)). Anyone who saw its transaction could have handed it over, so the
  seller never accepts it for this invoice: it only returns it to the wallet that sent it. Say so, never "the seller
  checks your payment": for `payer_mismatch` "The payment came from another wallet than the one that confirmed this
  invoice. {merchant} returns it to the wallet that sent it. Pay from the confirmed wallet.", for
  `payer_unconfirmed` the same with "from a wallet that did not confirm this invoice". A held invoice takes no other
  payment: a payment from the confirmed wallet goes to an invoice that can be paid (a new one from the seller). A
  refund-only hold is undone when the same transfer pays another invoice of the seller (the one its wallet
  confirmed); the invoice then goes back to where it stood, which the page shows once it reads the checkout again.

Quasar versions before October 29, 2026 show a transfer from another wallet as `screening`.

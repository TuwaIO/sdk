# PayerProofStatus

> **PayerProofStatus** = `"not_needed"` \| `"required"` \| `"unless_relayed"` \| `"confirming"` \| `"confirmed"`

Defined in: [checkout/store.ts:173](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L173)

Whether the connected wallet must confirm the invoice before it pays (owner rule of October 29, 2026: a transfer is
credited only to an invoice it is tied to by proof):

- `not_needed`: no method chosen, a Solana method (the quote's reference ties the transfer), or a Quasar before payer
  proofs.
- `required`: an EVM payment the buyer's wallet sends (paying the gas, or a smart wallet with or without the
  merchant's paymaster): [CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer) before [CheckoutState.requestQuote](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#requestquote), which refuses
  with `payer_proof_required` until then. Also when Quasar refused a quote with `409 payer_proof_required`.
- `unless_relayed`: an EVM method the gasless relay may pay. The quote comes first; paying with
  [CheckoutState.relay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#relay) needs nothing more (the signed EIP-3009 authorization confirms the wallet), while a
  transfer from the wallet or a paymaster payment (`quote.gasless.paymaster`) needs
  [CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer) before the wallet sends it: Quasar credits a transfer of an unconfirmed wallet to
  no invoice and the merchant returns it.
- `confirming`: [CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer) is under way for a wallet that confirms before the price. A
  wallet the relay may confirm stays `unless_relayed` meanwhile, so a prompt that never answers blocks no new price.
- `confirmed`: the wallet confirmed the invoice: on any EVM network for an ordinary wallet (or through the relay's
  authorization), on the method's network for a smart wallet. One confirmation per invoice and wallet: a new quote,
  another token or network needs none, also on a reopened page (`checkout.payerProofs`).

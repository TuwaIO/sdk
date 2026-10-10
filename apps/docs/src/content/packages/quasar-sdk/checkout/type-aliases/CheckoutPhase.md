# CheckoutPhase

> **CheckoutPhase** = `"loading"` \| `"buyer"` \| `"selectMethod"` \| `"quoting"` \| `"awaitingPayment"` \| `"submitting"` \| `"confirming"` \| `"paid"` \| `"underpaid"` \| `"held"` \| `"refunded"` \| `"expired"` \| `"cancelled"` \| `"blocked"` \| `"error"`

Defined in: [checkout/store.ts:29](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L29)

Where the payment stands:

- `loading`: reading the checkout.
- `buyer`: the buyer details come first ([CheckoutState.setBuyer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#setbuyer)).
- `selectMethod`: choose a method and connect a wallet, then [CheckoutState.requestQuote](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#requestquote).
- `quoting`: Quasar screens the payer and locks the price.
- `awaitingPayment`: send `quote.instructions` from the wallet (or sign `quote.gasless`), then
  [CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit) or [CheckoutState.relay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#relay).
- `submitting`: handing the transaction to Quasar.
- `confirming`: Quasar follows the transaction until it is final.
- `paid`, `underpaid` (the buyer may top it up), `held` (the merchant looks at the payment), `refunded`, `expired`,
  `cancelled`: the invoice's outcome.
- `blocked`: AML screening refused the payer's wallet.
- `error`: the checkout could not be read (a wrong or retired link, the network).

# CheckoutPhase

> **CheckoutPhase** = `"loading"` \| `"buyer"` \| `"selectMethod"` \| `"quoting"` \| `"awaitingPayment"` \| `"submitting"` \| `"confirming"` \| `"unconfirmed"` \| `"paid"` \| `"underpaid"` \| `"held"` \| `"refunded"` \| `"expired"` \| `"cancelled"` \| `"blocked"` \| `"error"`

Defined in: [checkout/store.ts:53](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L53)

Where the payment stands:

- `loading`: reading the checkout.
- `buyer`: the buyer details come first ([CheckoutState.setBuyer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#setbuyer)).
- `selectMethod`: choose a method, connect a wallet and tick the merchant's consent when there is one, then
  [CheckoutState.requestQuote](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#requestquote).
- `quoting`: Quasar screens the payer and locks the price.
- `awaitingPayment`: send `quote.instructions` from the wallet (or sign `quote.gasless`), then
  [CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit) or [CheckoutState.relay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#relay).
- `submitting`: handing the transaction to Quasar.
- `confirming`: Quasar follows the transaction until it is final. Also while Quasar reports a payment of the
  invoice on its way that this store did not hand over ([CheckoutState.invoicePaymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentontheway): the page was
  reopened, or Quasar found a Solana Pay transfer): the page does not offer to pay meanwhile.
- `unconfirmed`: Quasar could not confirm the payment (the network never returned the transaction, no receipt in
  time…), but it may still have gone through: the page asks the buyer to check the wallet before paying again, and
  offers no payment; [CheckoutState.payAgain](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#payagain) goes back to it once the buyer did. `error` says why
  (`payment_unconfirmed`, with the `reason`). Also where a reopened page finds the latest payment of the invoice
  unconfirmed or still unresolved ([CheckoutState.invoicePaymentUnresolved](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentunresolved)), while the store retries
  handing over a transaction the wallet sent (`reason` `submit_retrying`, [CheckoutState.submit](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#submit)), while
  Quasar decides about a transaction another invoice handed over first (`reason` `tx_already_used`), and for a
  payment the network confirmed that Quasar has not recorded yet (`reason` `settlement_failed`); for these two
  [CheckoutState.payAgain](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#payagain) does nothing.
- `paid`, `underpaid` (the buyer may top it up), `held` (the merchant looks at the payment), `refunded`, `expired`,
  `cancelled`: the invoice's outcome. An invoice that expires or is cancelled while a payment is on its way (one this
  store handed over with `submit` or `relay`, or one Quasar reports) is not over: the payment may still arrive, and
  the invoice then becomes `paid` (Quasar lets a payment it learned of before `dueAt` confirm for up to 30 minutes)
  or `held` (a late payment, or one to a cancelled invoice, that the merchant accepts or returns). The store keeps
  following it while [CheckoutState.paymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#paymentontheway) or [CheckoutState.invoicePaymentOnTheWay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#invoicepaymentontheway) is
  `true`, for a limited time.
- `blocked`: AML screening refused the payer's wallet.
- `error`: the checkout could not be read (a wrong or retired link, the network).

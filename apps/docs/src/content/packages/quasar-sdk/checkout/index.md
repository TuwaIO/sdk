# checkout

The headless checkout of Quasar Payments, imported from `@tuwaio/quasar-sdk/checkout`, for the browser: a vanilla
Zustand store per invoice that the buyer pays, opened with its checkout token (no key), and a refund store for the
merchant's wallet, whose calls run on the app's server. It needs `zustand` (5.x); it sends no transaction itself
(Pulsar or the wallet does) and depends on no chain library. `@tuwaio/nova-payments` renders it.

## Interfaces

- [CheckoutApi](/packages/quasar-sdk/checkout/interfaces/CheckoutApi.md)
- [CheckoutError](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md)
- [CheckoutInvoice](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md)
- [CheckoutLine](/packages/quasar-sdk/checkout/interfaces/CheckoutLine.md)
- [CheckoutMerchant](/packages/quasar-sdk/checkout/interfaces/CheckoutMerchant.md)
- [CheckoutMethod](/packages/quasar-sdk/checkout/interfaces/CheckoutMethod.md)
- [CheckoutQuote](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md)
- [CheckoutState](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md)
- [CheckoutStatusEvent](/packages/quasar-sdk/checkout/interfaces/CheckoutStatusEvent.md)
- [CheckoutStoreOptions](/packages/quasar-sdk/checkout/interfaces/CheckoutStoreOptions.md)
- [CheckoutSubscription](/packages/quasar-sdk/checkout/interfaces/CheckoutSubscription.md)
- [CheckoutTheme](/packages/quasar-sdk/checkout/interfaces/CheckoutTheme.md)
- [CheckoutView](/packages/quasar-sdk/checkout/interfaces/CheckoutView.md)
- [EventSourceLike](/packages/quasar-sdk/checkout/interfaces/EventSourceLike.md)
- [GaslessOffer](/packages/quasar-sdk/checkout/interfaces/GaslessOffer.md)
- [GrantPermissionParams](/packages/quasar-sdk/checkout/interfaces/GrantPermissionParams.md)
- [PermissionRequest](/packages/quasar-sdk/checkout/interfaces/PermissionRequest.md)
- [RefundState](/packages/quasar-sdk/checkout/interfaces/RefundState.md)
- [RefundStoreOptions](/packages/quasar-sdk/checkout/interfaces/RefundStoreOptions.md)
- [TransferAuthorizationTypedData](/packages/quasar-sdk/checkout/interfaces/TransferAuthorizationTypedData.md)

## Type Aliases

- [AutoChargeOffer](/packages/quasar-sdk/checkout/type-aliases/AutoChargeOffer.md)
- [CheckoutPhase](/packages/quasar-sdk/checkout/type-aliases/CheckoutPhase.md)
- [CheckoutStore](/packages/quasar-sdk/checkout/type-aliases/CheckoutStore.md)
- [EventSourceConstructor](/packages/quasar-sdk/checkout/type-aliases/EventSourceConstructor.md)
- [PaymentInstructions](/packages/quasar-sdk/checkout/type-aliases/PaymentInstructions.md)
- [RefundPhase](/packages/quasar-sdk/checkout/type-aliases/RefundPhase.md)
- [RefundStore](/packages/quasar-sdk/checkout/type-aliases/RefundStore.md)

## Functions

- [createCheckoutStore](/packages/quasar-sdk/checkout/functions/createCheckoutStore.md)
- [createRefundStore](/packages/quasar-sdk/checkout/functions/createRefundStore.md)

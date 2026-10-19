# SubscriptionStart

Defined in: modules/payments/types.ts:745

A started or resumed subscription with the invoice of its period and that invoice's payment page.

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: modules/payments/types.ts:751

That invoice's checkout token.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md) \| `null`

Defined in: modules/payments/types.ts:749

The invoice of its first (or resumed) period; `null` during a trial.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: modules/payments/types.ts:753

That invoice's payment page.

***

### subscription

> **subscription**: [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

Defined in: modules/payments/types.ts:747

The subscription.

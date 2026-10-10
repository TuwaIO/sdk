# SubscriptionStart

Defined in: [modules/payments/types.ts:743](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L743)

A started or resumed subscription with the invoice of its period and that invoice's payment page.

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:749](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L749)

That invoice's checkout token.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md) \| `null`

Defined in: [modules/payments/types.ts:747](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L747)

The invoice of its first (or resumed) period; `null` during a trial.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:751](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L751)

That invoice's payment page.

***

### subscription

> **subscription**: [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

Defined in: [modules/payments/types.ts:745](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L745)

The subscription.

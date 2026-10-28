# SubscriptionStart

Defined in: [modules/payments/types.ts:781](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L781)

A started or resumed subscription with the invoice of its period and that invoice's payment page.

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:787](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L787)

That invoice's checkout token.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md) \| `null`

Defined in: [modules/payments/types.ts:785](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L785)

The invoice of its first (or resumed) period; `null` during a trial.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:789](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L789)

That invoice's payment page.

***

### subscription

> **subscription**: [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

Defined in: [modules/payments/types.ts:783](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L783)

The subscription.

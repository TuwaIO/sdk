# SubscriptionStart

Defined in: [modules/payments/types.ts:827](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L827)

A started or resumed subscription with the invoice of its period and that invoice's payment page.

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:833](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L833)

That invoice's checkout token.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md) \| `null`

Defined in: [modules/payments/types.ts:831](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L831)

The invoice of its first (or resumed) period; `null` during a trial.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:835](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L835)

That invoice's payment page.

***

### subscription

> **subscription**: [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

Defined in: [modules/payments/types.ts:829](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L829)

The subscription.

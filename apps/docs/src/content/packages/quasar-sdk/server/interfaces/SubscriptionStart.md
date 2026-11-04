# SubscriptionStart

Defined in: [modules/payments/types.ts:898](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L898)

A started or resumed subscription with the invoice of its period and that invoice's payment page.

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:904](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L904)

That invoice's checkout token.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md) \| `null`

Defined in: [modules/payments/types.ts:902](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L902)

The invoice of its first (or resumed) period; `null` during a trial.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:906](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L906)

That invoice's payment page.

***

### subscription

> **subscription**: [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

Defined in: [modules/payments/types.ts:900](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L900)

The subscription.

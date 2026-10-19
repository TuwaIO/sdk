# CheckoutSubscription

Defined in: checkout/types.ts:80

The subscription period an invoice bills, as the checkout shows it.

## Properties

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: checkout/types.ts:98

Whether it ends with the current period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: checkout/types.ts:94

How many periods the subscription runs; `null` until it is cancelled.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: checkout/types.ts:96

When it ends at the latest, if set.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: checkout/types.ts:84

Unit of a period.

***

### intervalCount

> **intervalCount**: `number`

Defined in: checkout/types.ts:86

Units in a period (`3` with `month` is a quarter).

***

### period

> **period**: `number`

Defined in: checkout/types.ts:88

The period this invoice bills, from 1.

***

### periodEnd

> **periodEnd**: `string`

Defined in: checkout/types.ts:92

When it ends, which is when the next one is billed.

***

### periodStart

> **periodStart**: `string`

Defined in: checkout/types.ts:90

When the period starts.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: checkout/types.ts:82

State of the subscription.

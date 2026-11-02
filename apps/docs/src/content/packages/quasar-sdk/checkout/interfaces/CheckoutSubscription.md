# CheckoutSubscription

Defined in: checkout/types.ts:81

The subscription period an invoice bills, as the checkout shows it.

## Properties

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: checkout/types.ts:99

Whether it ends with the current period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: checkout/types.ts:95

How many periods the subscription runs; `null` until it is cancelled.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: checkout/types.ts:97

When it ends at the latest, if set.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: checkout/types.ts:85

Unit of a period.

***

### intervalCount

> **intervalCount**: `number`

Defined in: checkout/types.ts:87

Units in a period (`3` with `month` is a quarter).

***

### period

> **period**: `number`

Defined in: checkout/types.ts:89

The period this invoice bills, from 1.

***

### periodEnd

> **periodEnd**: `string`

Defined in: checkout/types.ts:93

When it ends, which is when the next one is billed.

***

### periodStart

> **periodStart**: `string`

Defined in: checkout/types.ts:91

When the period starts.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: checkout/types.ts:83

State of the subscription.

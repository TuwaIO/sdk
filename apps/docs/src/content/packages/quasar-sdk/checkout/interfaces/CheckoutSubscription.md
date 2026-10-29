# CheckoutSubscription

Defined in: [checkout/types.ts:198](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L198)

The subscription period an invoice bills, as the checkout shows it.

## Properties

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [checkout/types.ts:216](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L216)

Whether it ends with the current period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [checkout/types.ts:212](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L212)

How many periods the subscription runs; `null` until it is cancelled.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [checkout/types.ts:214](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L214)

When it ends at the latest, if set.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [checkout/types.ts:202](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L202)

Unit of a period.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [checkout/types.ts:204](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L204)

Units in a period (`3` with `month` is a quarter).

***

### period

> **period**: `number`

Defined in: [checkout/types.ts:206](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L206)

The period this invoice bills, from 1.

***

### periodEnd

> **periodEnd**: `string`

Defined in: [checkout/types.ts:210](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L210)

When it ends, which is when the next one is billed.

***

### periodStart

> **periodStart**: `string`

Defined in: [checkout/types.ts:208](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L208)

When the period starts.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [checkout/types.ts:200](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L200)

State of the subscription.

# CheckoutSubscription

Defined in: [checkout/types.ts:163](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L163)

The subscription period an invoice bills, as the checkout shows it.

## Properties

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [checkout/types.ts:181](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L181)

Whether it ends with the current period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [checkout/types.ts:177](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L177)

How many periods the subscription runs; `null` until it is cancelled.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [checkout/types.ts:179](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L179)

When it ends at the latest, if set.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [checkout/types.ts:167](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L167)

Unit of a period.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [checkout/types.ts:169](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L169)

Units in a period (`3` with `month` is a quarter).

***

### period

> **period**: `number`

Defined in: [checkout/types.ts:171](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L171)

The period this invoice bills, from 1.

***

### periodEnd

> **periodEnd**: `string`

Defined in: [checkout/types.ts:175](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L175)

When it ends, which is when the next one is billed.

***

### periodStart

> **periodStart**: `string`

Defined in: [checkout/types.ts:173](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L173)

When the period starts.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [checkout/types.ts:165](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L165)

State of the subscription.

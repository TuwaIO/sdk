# CheckoutSubscription

Defined in: [checkout/types.ts:92](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L92)

The subscription period an invoice bills, as the checkout shows it.

## Properties

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [checkout/types.ts:110](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L110)

Whether it ends with the current period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [checkout/types.ts:106](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L106)

How many periods the subscription runs; `null` until it is cancelled.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [checkout/types.ts:108](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L108)

When it ends at the latest, if set.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [checkout/types.ts:96](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L96)

Unit of a period.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [checkout/types.ts:98](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L98)

Units in a period (`3` with `month` is a quarter).

***

### period

> **period**: `number`

Defined in: [checkout/types.ts:100](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L100)

The period this invoice bills, from 1.

***

### periodEnd

> **periodEnd**: `string`

Defined in: [checkout/types.ts:104](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L104)

When it ends, which is when the next one is billed.

***

### periodStart

> **periodStart**: `string`

Defined in: [checkout/types.ts:102](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L102)

When the period starts.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [checkout/types.ts:94](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L94)

State of the subscription.

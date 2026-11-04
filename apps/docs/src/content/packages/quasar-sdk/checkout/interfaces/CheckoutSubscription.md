# CheckoutSubscription

Defined in: [checkout/types.ts:203](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L203)

The subscription period an invoice bills, as the checkout shows it.

## Properties

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [checkout/types.ts:221](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L221)

Whether it ends with the current period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [checkout/types.ts:217](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L217)

How many periods the subscription runs; `null` until it is cancelled.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [checkout/types.ts:219](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L219)

When it ends at the latest, if set.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [checkout/types.ts:207](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L207)

Unit of a period.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [checkout/types.ts:209](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L209)

Units in a period (`3` with `month` is a quarter).

***

### period

> **period**: `number`

Defined in: [checkout/types.ts:211](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L211)

The period this invoice bills, from 1.

***

### periodEnd

> **periodEnd**: `string`

Defined in: [checkout/types.ts:215](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L215)

When it ends, which is when the next one is billed.

***

### periodStart

> **periodStart**: `string`

Defined in: [checkout/types.ts:213](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L213)

When the period starts.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [checkout/types.ts:205](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L205)

State of the subscription.

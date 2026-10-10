# Subscription

Defined in: [modules/payments/types.ts:642](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L642)

A subscription as the Payments API returns it.

## Extended by

- [`SubscriptionDetails`](/packages/quasar-sdk/server/interfaces/SubscriptionDetails.md)

## Properties

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) \| `null`

Defined in: [modules/payments/types.ts:652](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L652)

The buyer.

***

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [modules/payments/types.ts:684](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L684)

Whether it is canceled when the running period ends.

***

### canceledAt

> **canceledAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:686](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L686)

When it was canceled.

***

### cancellationReason

> **cancellationReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:688](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L688)

Why.

***

### collection

> **collection**: `"send_invoice"` \| `"auto_charge"`

Defined in: [modules/payments/types.ts:666](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L666)

How it is collected.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:696](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L696)

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:658](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L658)

Currency.

***

### currentPeriod

> **currentPeriod**: `number`

Defined in: [modules/payments/types.ts:674](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L674)

The running period, from 1 (0 during a trial).

***

### currentPeriodEnd

> **currentPeriodEnd**: `string` \| `null`

Defined in: [modules/payments/types.ts:678](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L678)

End of the running period.

***

### currentPeriodStart

> **currentPeriodStart**: `string` \| `null`

Defined in: [modules/payments/types.ts:676](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L676)

Start of the running period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [modules/payments/types.ts:680](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L680)

Periods bought.

***

### endedAt

> **endedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:692](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L692)

When it ended.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:682](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L682)

When it ends.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:650](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L650)

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:654](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L654)

The CAIP-10 account you expect to pay.

***

### graceDays

> **graceDays**: `number`

Defined in: [modules/payments/types.ts:672](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L672)

Grace days.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:644](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L644)

Subscription ID.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [modules/payments/types.ts:660](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L660)

Period unit.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [modules/payments/types.ts:662](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L662)

Units per period.

***

### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

Defined in: [modules/payments/types.ts:656](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L656)

The plan's lines, as you sent them.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:694](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L694)

Your data.

***

### object

> **object**: `"subscription"`

Defined in: [modules/payments/types.ts:646](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L646)

Always `subscription`.

***

### pausedAt

> **pausedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:690](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L690)

When it was paused.

***

### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

Defined in: [modules/payments/types.ts:670](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L670)

The automatic-charge permission, once granted.

***

### preferredMethodId

> **preferredMethodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:668](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L668)

The preferred payment method.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [modules/payments/types.ts:648](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L648)

State.

***

### trialDays

> **trialDays**: `number`

Defined in: [modules/payments/types.ts:664](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L664)

Trial days.

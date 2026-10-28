# Subscription

Defined in: [modules/payments/types.ts:680](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L680)

A subscription as the Payments API returns it.

## Extended by

- [`SubscriptionDetails`](/packages/quasar-sdk/server/interfaces/SubscriptionDetails.md)

## Properties

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) \| `null`

Defined in: [modules/payments/types.ts:690](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L690)

The buyer.

***

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [modules/payments/types.ts:722](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L722)

Whether it is canceled when the running period ends.

***

### canceledAt

> **canceledAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:724](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L724)

When it was canceled.

***

### cancellationReason

> **cancellationReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:726](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L726)

Why.

***

### collection

> **collection**: `"send_invoice"` \| `"auto_charge"`

Defined in: [modules/payments/types.ts:704](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L704)

How it is collected.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:734](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L734)

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:696](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L696)

Currency.

***

### currentPeriod

> **currentPeriod**: `number`

Defined in: [modules/payments/types.ts:712](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L712)

The running period, from 1 (0 during a trial).

***

### currentPeriodEnd

> **currentPeriodEnd**: `string` \| `null`

Defined in: [modules/payments/types.ts:716](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L716)

End of the running period.

***

### currentPeriodStart

> **currentPeriodStart**: `string` \| `null`

Defined in: [modules/payments/types.ts:714](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L714)

Start of the running period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [modules/payments/types.ts:718](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L718)

Periods bought.

***

### endedAt

> **endedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:730](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L730)

When it ended.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:720](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L720)

When it ends.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:688](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L688)

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:692](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L692)

The CAIP-10 account you expect to pay.

***

### graceDays

> **graceDays**: `number`

Defined in: [modules/payments/types.ts:710](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L710)

Grace days.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:682](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L682)

Subscription ID.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [modules/payments/types.ts:698](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L698)

Period unit.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [modules/payments/types.ts:700](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L700)

Units per period.

***

### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

Defined in: [modules/payments/types.ts:694](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L694)

The plan's lines, as you sent them.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:732](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L732)

Your data.

***

### object

> **object**: `"subscription"`

Defined in: [modules/payments/types.ts:684](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L684)

Always `subscription`.

***

### pausedAt

> **pausedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:728](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L728)

When it was paused.

***

### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

Defined in: [modules/payments/types.ts:708](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L708)

The automatic-charge permission, once granted.

***

### preferredMethodId

> **preferredMethodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:706](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L706)

The preferred payment method.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [modules/payments/types.ts:686](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L686)

State.

***

### trialDays

> **trialDays**: `number`

Defined in: [modules/payments/types.ts:702](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L702)

Trial days.

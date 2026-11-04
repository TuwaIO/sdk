# Subscription

Defined in: [modules/payments/types.ts:789](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L789)

A subscription as the Payments API returns it.

## Properties

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) \| `null`

Defined in: [modules/payments/types.ts:799](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L799)

The buyer.

***

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [modules/payments/types.ts:831](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L831)

Whether it is canceled when the running period ends.

***

### canceledAt

> **canceledAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:833](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L833)

When it was canceled.

***

### cancellationReason

> **cancellationReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:835](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L835)

Why.

***

### collection

> **collection**: `"send_invoice"` \| `"auto_charge"`

Defined in: [modules/payments/types.ts:813](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L813)

How it is collected.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:843](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L843)

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:805](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L805)

Currency.

***

### currentPeriod

> **currentPeriod**: `number`

Defined in: [modules/payments/types.ts:821](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L821)

The running period, from 1 (0 during a trial).

***

### currentPeriodEnd

> **currentPeriodEnd**: `string` \| `null`

Defined in: [modules/payments/types.ts:825](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L825)

End of the running period.

***

### currentPeriodStart

> **currentPeriodStart**: `string` \| `null`

Defined in: [modules/payments/types.ts:823](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L823)

Start of the running period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [modules/payments/types.ts:827](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L827)

Periods bought.

***

### endedAt

> **endedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:839](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L839)

When it ended.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:829](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L829)

When it ends.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:797](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L797)

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:801](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L801)

The CAIP-10 account you expect to pay.

***

### graceDays

> **graceDays**: `number`

Defined in: [modules/payments/types.ts:819](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L819)

Grace days.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:791](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L791)

Subscription ID.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [modules/payments/types.ts:807](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L807)

Period unit.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [modules/payments/types.ts:809](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L809)

Units per period.

***

### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

Defined in: [modules/payments/types.ts:803](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L803)

The plan's lines, as you sent them.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:841](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L841)

Your data.

***

### object

> **object**: `"subscription"`

Defined in: [modules/payments/types.ts:793](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L793)

Always `subscription`.

***

### pausedAt

> **pausedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:837](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L837)

When it was paused.

***

### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

Defined in: [modules/payments/types.ts:817](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L817)

The automatic-charge permission, once granted.

***

### preferredMethodId

> **preferredMethodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:815](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L815)

The preferred payment method.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [modules/payments/types.ts:795](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L795)

State.

***

### trialDays

> **trialDays**: `number`

Defined in: [modules/payments/types.ts:811](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L811)

Trial days.

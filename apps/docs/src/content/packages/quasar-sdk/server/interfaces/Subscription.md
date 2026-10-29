# Subscription

Defined in: [modules/payments/types.ts:718](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L718)

A subscription as the Payments API returns it.

## Properties

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) \| `null`

Defined in: [modules/payments/types.ts:728](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L728)

The buyer.

***

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [modules/payments/types.ts:760](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L760)

Whether it is canceled when the running period ends.

***

### canceledAt

> **canceledAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:762](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L762)

When it was canceled.

***

### cancellationReason

> **cancellationReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:764](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L764)

Why.

***

### collection

> **collection**: `"send_invoice"` \| `"auto_charge"`

Defined in: [modules/payments/types.ts:742](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L742)

How it is collected.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:772](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L772)

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:734](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L734)

Currency.

***

### currentPeriod

> **currentPeriod**: `number`

Defined in: [modules/payments/types.ts:750](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L750)

The running period, from 1 (0 during a trial).

***

### currentPeriodEnd

> **currentPeriodEnd**: `string` \| `null`

Defined in: [modules/payments/types.ts:754](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L754)

End of the running period.

***

### currentPeriodStart

> **currentPeriodStart**: `string` \| `null`

Defined in: [modules/payments/types.ts:752](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L752)

Start of the running period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [modules/payments/types.ts:756](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L756)

Periods bought.

***

### endedAt

> **endedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:768](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L768)

When it ended.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:758](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L758)

When it ends.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:726](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L726)

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:730](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L730)

The CAIP-10 account you expect to pay.

***

### graceDays

> **graceDays**: `number`

Defined in: [modules/payments/types.ts:748](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L748)

Grace days.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:720](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L720)

Subscription ID.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [modules/payments/types.ts:736](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L736)

Period unit.

***

### intervalCount

> **intervalCount**: `number`

Defined in: [modules/payments/types.ts:738](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L738)

Units per period.

***

### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

Defined in: [modules/payments/types.ts:732](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L732)

The plan's lines, as you sent them.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:770](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L770)

Your data.

***

### object

> **object**: `"subscription"`

Defined in: [modules/payments/types.ts:722](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L722)

Always `subscription`.

***

### pausedAt

> **pausedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:766](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L766)

When it was paused.

***

### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

Defined in: [modules/payments/types.ts:746](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L746)

The automatic-charge permission, once granted.

***

### preferredMethodId

> **preferredMethodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:744](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L744)

The preferred payment method.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [modules/payments/types.ts:724](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L724)

State.

***

### trialDays

> **trialDays**: `number`

Defined in: [modules/payments/types.ts:740](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L740)

Trial days.

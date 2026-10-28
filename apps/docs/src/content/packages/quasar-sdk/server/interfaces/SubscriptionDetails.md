# SubscriptionDetails

Defined in: [modules/payments/types.ts:773](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L773)

A subscription with the invoices of its periods and its automatic charges, oldest first.

## Extends

- [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

## Properties

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) \| `null`

Defined in: [modules/payments/types.ts:690](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L690)

The buyer.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`buyer`](/packages/quasar-sdk/server/interfaces/Subscription.md#buyer)

***

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [modules/payments/types.ts:722](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L722)

Whether it is canceled when the running period ends.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`cancelAtPeriodEnd`](/packages/quasar-sdk/server/interfaces/Subscription.md#cancelatperiodend)

***

### canceledAt

> **canceledAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:724](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L724)

When it was canceled.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`canceledAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#canceledat)

***

### cancellationReason

> **cancellationReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:726](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L726)

Why.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`cancellationReason`](/packages/quasar-sdk/server/interfaces/Subscription.md#cancellationreason)

***

### charges

> **charges**: [`SubscriptionCharge`](/packages/quasar-sdk/server/interfaces/SubscriptionCharge.md)[]

Defined in: [modules/payments/types.ts:777](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L777)

Its automatic charges.

***

### collection

> **collection**: `"send_invoice"` \| `"auto_charge"`

Defined in: [modules/payments/types.ts:704](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L704)

How it is collected.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`collection`](/packages/quasar-sdk/server/interfaces/Subscription.md#collection)

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:734](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L734)

When it was created.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`createdAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#createdat)

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:696](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L696)

Currency.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currency`](/packages/quasar-sdk/server/interfaces/Subscription.md#currency)

***

### currentPeriod

> **currentPeriod**: `number`

Defined in: [modules/payments/types.ts:712](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L712)

The running period, from 1 (0 during a trial).

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currentPeriod`](/packages/quasar-sdk/server/interfaces/Subscription.md#currentperiod)

***

### currentPeriodEnd

> **currentPeriodEnd**: `string` \| `null`

Defined in: [modules/payments/types.ts:716](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L716)

End of the running period.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currentPeriodEnd`](/packages/quasar-sdk/server/interfaces/Subscription.md#currentperiodend)

***

### currentPeriodStart

> **currentPeriodStart**: `string` \| `null`

Defined in: [modules/payments/types.ts:714](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L714)

Start of the running period.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currentPeriodStart`](/packages/quasar-sdk/server/interfaces/Subscription.md#currentperiodstart)

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [modules/payments/types.ts:718](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L718)

Periods bought.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`cycles`](/packages/quasar-sdk/server/interfaces/Subscription.md#cycles)

***

### endedAt

> **endedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:730](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L730)

When it ended.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`endedAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#endedat)

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:720](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L720)

When it ends.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`endsAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#endsat)

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:688](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L688)

Live or test.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`environment`](/packages/quasar-sdk/server/interfaces/Subscription.md#environment)

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:692](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L692)

The CAIP-10 account you expect to pay.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`expectedPayer`](/packages/quasar-sdk/server/interfaces/Subscription.md#expectedpayer)

***

### graceDays

> **graceDays**: `number`

Defined in: [modules/payments/types.ts:710](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L710)

Grace days.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`graceDays`](/packages/quasar-sdk/server/interfaces/Subscription.md#gracedays)

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:682](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L682)

Subscription ID.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`id`](/packages/quasar-sdk/server/interfaces/Subscription.md#id)

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [modules/payments/types.ts:698](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L698)

Period unit.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`interval`](/packages/quasar-sdk/server/interfaces/Subscription.md#interval)

***

### intervalCount

> **intervalCount**: `number`

Defined in: [modules/payments/types.ts:700](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L700)

Units per period.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`intervalCount`](/packages/quasar-sdk/server/interfaces/Subscription.md#intervalcount)

***

### invoices

> **invoices**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)[]

Defined in: [modules/payments/types.ts:775](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L775)

The invoices of its periods.

***

### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

Defined in: [modules/payments/types.ts:694](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L694)

The plan's lines, as you sent them.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`lineItems`](/packages/quasar-sdk/server/interfaces/Subscription.md#lineitems)

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:732](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L732)

Your data.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`metadata`](/packages/quasar-sdk/server/interfaces/Subscription.md#metadata)

***

### object

> **object**: `"subscription"`

Defined in: [modules/payments/types.ts:684](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L684)

Always `subscription`.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`object`](/packages/quasar-sdk/server/interfaces/Subscription.md#object)

***

### pausedAt

> **pausedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:728](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L728)

When it was paused.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`pausedAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#pausedat)

***

### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

Defined in: [modules/payments/types.ts:708](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L708)

The automatic-charge permission, once granted.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`permission`](/packages/quasar-sdk/server/interfaces/Subscription.md#permission)

***

### preferredMethodId

> **preferredMethodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:706](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L706)

The preferred payment method.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`preferredMethodId`](/packages/quasar-sdk/server/interfaces/Subscription.md#preferredmethodid)

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [modules/payments/types.ts:686](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L686)

State.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`status`](/packages/quasar-sdk/server/interfaces/Subscription.md#status)

***

### trialDays

> **trialDays**: `number`

Defined in: [modules/payments/types.ts:702](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L702)

Trial days.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`trialDays`](/packages/quasar-sdk/server/interfaces/Subscription.md#trialdays)

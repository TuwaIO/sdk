# SubscriptionDetails

Defined in: [modules/payments/types.ts:770](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L770)

A subscription with the invoices of its periods and its automatic charges, oldest first.

## Extends

- [`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md)

## Properties

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) \| `null`

Defined in: [modules/payments/types.ts:687](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L687)

The buyer.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`buyer`](/packages/quasar-sdk/server/interfaces/Subscription.md#buyer)

***

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: [modules/payments/types.ts:719](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L719)

Whether it is canceled when the running period ends.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`cancelAtPeriodEnd`](/packages/quasar-sdk/server/interfaces/Subscription.md#cancelatperiodend)

***

### canceledAt

> **canceledAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:721](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L721)

When it was canceled.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`canceledAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#canceledat)

***

### cancellationReason

> **cancellationReason**: `string` \| `null`

Defined in: [modules/payments/types.ts:723](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L723)

Why.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`cancellationReason`](/packages/quasar-sdk/server/interfaces/Subscription.md#cancellationreason)

***

### charges

> **charges**: [`SubscriptionCharge`](/packages/quasar-sdk/server/interfaces/SubscriptionCharge.md)[]

Defined in: [modules/payments/types.ts:774](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L774)

Its automatic charges.

***

### collection

> **collection**: `"send_invoice"` \| `"auto_charge"`

Defined in: [modules/payments/types.ts:701](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L701)

How it is collected.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`collection`](/packages/quasar-sdk/server/interfaces/Subscription.md#collection)

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:731](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L731)

When it was created.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`createdAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#createdat)

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:693](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L693)

Currency.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currency`](/packages/quasar-sdk/server/interfaces/Subscription.md#currency)

***

### currentPeriod

> **currentPeriod**: `number`

Defined in: [modules/payments/types.ts:709](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L709)

The running period, from 1 (0 during a trial).

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currentPeriod`](/packages/quasar-sdk/server/interfaces/Subscription.md#currentperiod)

***

### currentPeriodEnd

> **currentPeriodEnd**: `string` \| `null`

Defined in: [modules/payments/types.ts:713](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L713)

End of the running period.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currentPeriodEnd`](/packages/quasar-sdk/server/interfaces/Subscription.md#currentperiodend)

***

### currentPeriodStart

> **currentPeriodStart**: `string` \| `null`

Defined in: [modules/payments/types.ts:711](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L711)

Start of the running period.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`currentPeriodStart`](/packages/quasar-sdk/server/interfaces/Subscription.md#currentperiodstart)

***

### cycles

> **cycles**: `number` \| `null`

Defined in: [modules/payments/types.ts:715](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L715)

Periods bought.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`cycles`](/packages/quasar-sdk/server/interfaces/Subscription.md#cycles)

***

### endedAt

> **endedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:727](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L727)

When it ended.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`endedAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#endedat)

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:717](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L717)

When it ends.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`endsAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#endsat)

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: [modules/payments/types.ts:685](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L685)

Live or test.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`environment`](/packages/quasar-sdk/server/interfaces/Subscription.md#environment)

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: [modules/payments/types.ts:689](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L689)

The CAIP-10 account you expect to pay.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`expectedPayer`](/packages/quasar-sdk/server/interfaces/Subscription.md#expectedpayer)

***

### graceDays

> **graceDays**: `number`

Defined in: [modules/payments/types.ts:707](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L707)

Grace days.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`graceDays`](/packages/quasar-sdk/server/interfaces/Subscription.md#gracedays)

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:679](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L679)

Subscription ID.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`id`](/packages/quasar-sdk/server/interfaces/Subscription.md#id)

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: [modules/payments/types.ts:695](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L695)

Period unit.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`interval`](/packages/quasar-sdk/server/interfaces/Subscription.md#interval)

***

### intervalCount

> **intervalCount**: `number`

Defined in: [modules/payments/types.ts:697](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L697)

Units per period.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`intervalCount`](/packages/quasar-sdk/server/interfaces/Subscription.md#intervalcount)

***

### invoices

> **invoices**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)[]

Defined in: [modules/payments/types.ts:772](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L772)

The invoices of its periods.

***

### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

Defined in: [modules/payments/types.ts:691](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L691)

The plan's lines, as you sent them.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`lineItems`](/packages/quasar-sdk/server/interfaces/Subscription.md#lineitems)

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [modules/payments/types.ts:729](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L729)

Your data.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`metadata`](/packages/quasar-sdk/server/interfaces/Subscription.md#metadata)

***

### object

> **object**: `"subscription"`

Defined in: [modules/payments/types.ts:681](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L681)

Always `subscription`.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`object`](/packages/quasar-sdk/server/interfaces/Subscription.md#object)

***

### pausedAt

> **pausedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:725](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L725)

When it was paused.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`pausedAt`](/packages/quasar-sdk/server/interfaces/Subscription.md#pausedat)

***

### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

Defined in: [modules/payments/types.ts:705](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L705)

The automatic-charge permission, once granted.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`permission`](/packages/quasar-sdk/server/interfaces/Subscription.md#permission)

***

### preferredMethodId

> **preferredMethodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:703](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L703)

The preferred payment method.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`preferredMethodId`](/packages/quasar-sdk/server/interfaces/Subscription.md#preferredmethodid)

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: [modules/payments/types.ts:683](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L683)

State.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`status`](/packages/quasar-sdk/server/interfaces/Subscription.md#status)

***

### trialDays

> **trialDays**: `number`

Defined in: [modules/payments/types.ts:699](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L699)

Trial days.

#### Inherited from

[`Subscription`](/packages/quasar-sdk/server/interfaces/Subscription.md).[`trialDays`](/packages/quasar-sdk/server/interfaces/Subscription.md#trialdays)

# Subscription

Defined in: modules/payments/types.ts:644

A subscription as the Payments API returns it.

## Extended by

- [`SubscriptionDetails`](/packages/quasar-sdk/server/interfaces/SubscriptionDetails.md)

## Properties

### buyer

> **buyer**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md) \| `null`

Defined in: modules/payments/types.ts:654

The buyer.

***

### cancelAtPeriodEnd

> **cancelAtPeriodEnd**: `boolean`

Defined in: modules/payments/types.ts:686

Whether it is canceled when the running period ends.

***

### canceledAt

> **canceledAt**: `string` \| `null`

Defined in: modules/payments/types.ts:688

When it was canceled.

***

### cancellationReason

> **cancellationReason**: `string` \| `null`

Defined in: modules/payments/types.ts:690

Why.

***

### collection

> **collection**: `"send_invoice"` \| `"auto_charge"`

Defined in: modules/payments/types.ts:668

How it is collected.

***

### createdAt

> **createdAt**: `string`

Defined in: modules/payments/types.ts:698

When it was created.

***

### currency

> **currency**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: modules/payments/types.ts:660

Currency.

***

### currentPeriod

> **currentPeriod**: `number`

Defined in: modules/payments/types.ts:676

The running period, from 1 (0 during a trial).

***

### currentPeriodEnd

> **currentPeriodEnd**: `string` \| `null`

Defined in: modules/payments/types.ts:680

End of the running period.

***

### currentPeriodStart

> **currentPeriodStart**: `string` \| `null`

Defined in: modules/payments/types.ts:678

Start of the running period.

***

### cycles

> **cycles**: `number` \| `null`

Defined in: modules/payments/types.ts:682

Periods bought.

***

### endedAt

> **endedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:694

When it ended.

***

### endsAt

> **endsAt**: `string` \| `null`

Defined in: modules/payments/types.ts:684

When it ends.

***

### environment

> **environment**: [`PaymentsEnvironment`](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)

Defined in: modules/payments/types.ts:652

Live or test.

***

### expectedPayer

> **expectedPayer**: `string` \| `null`

Defined in: modules/payments/types.ts:656

The CAIP-10 account you expect to pay.

***

### graceDays

> **graceDays**: `number`

Defined in: modules/payments/types.ts:674

Grace days.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:646

Subscription ID.

***

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Defined in: modules/payments/types.ts:662

Period unit.

***

### intervalCount

> **intervalCount**: `number`

Defined in: modules/payments/types.ts:664

Units per period.

***

### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

Defined in: modules/payments/types.ts:658

The plan's lines, as you sent them.

***

### metadata

> **metadata**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: modules/payments/types.ts:696

Your data.

***

### object

> **object**: `"subscription"`

Defined in: modules/payments/types.ts:648

Always `subscription`.

***

### pausedAt

> **pausedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:692

When it was paused.

***

### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

Defined in: modules/payments/types.ts:672

The automatic-charge permission, once granted.

***

### preferredMethodId

> **preferredMethodId**: `string` \| `null`

Defined in: modules/payments/types.ts:670

The preferred payment method.

***

### status

> **status**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)

Defined in: modules/payments/types.ts:650

State.

***

### trialDays

> **trialDays**: `number`

Defined in: modules/payments/types.ts:666

Trial days.

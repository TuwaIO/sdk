# SubscriptionCharge

Defined in: [modules/payments/types.ts:738](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L738)

An automatic charge of a subscription period.

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [modules/payments/types.ts:757](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L757)

Amount in base units.

***

### attempts

> **attempts**: `number`

Defined in: [modules/payments/types.ts:755](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L755)

Attempts so far.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:759](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L759)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:769](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L769)

When it was scheduled.

***

### finishedAt

> **finishedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:767](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L767)

When it finished.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:740](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L740)

Charge ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:744](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L744)

The invoice it pays.

***

### notBefore

> **notBefore**: `string` \| `null`

Defined in: [modules/payments/types.ts:765](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L765)

Not before.

***

### object

> **object**: `"subscription_charge"`

Defined in: [modules/payments/types.ts:742](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L742)

Always `subscription_charge`.

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:746](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L746)

The period.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:753](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L753)

Why it failed (a stable code).

***

### status

> **status**: `"submitted"` \| `"failed"` \| `"canceled"` \| `"pending"` \| `"sending"`

Defined in: [modules/payments/types.ts:751](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L751)

`pending` (waits for its window or a retry), `sending`, `submitted` (its transaction settles the invoice like any
payment), `failed` or `canceled`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:763](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L763)

Its transaction.

***

### userOpHash

> **userOpHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:761](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L761)

The user operation.

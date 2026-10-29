# SubscriptionCharge

Defined in: [modules/payments/types.ts:776](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L776)

An automatic charge of a subscription period.

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [modules/payments/types.ts:795](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L795)

Amount in base units.

***

### attempts

> **attempts**: `number`

Defined in: [modules/payments/types.ts:793](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L793)

Attempts so far.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:797](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L797)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:807](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L807)

When it was scheduled.

***

### finishedAt

> **finishedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:805](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L805)

When it finished.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:778](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L778)

Charge ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:782](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L782)

The invoice it pays.

***

### notBefore

> **notBefore**: `string` \| `null`

Defined in: [modules/payments/types.ts:803](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L803)

Not before.

***

### object

> **object**: `"subscription_charge"`

Defined in: [modules/payments/types.ts:780](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L780)

Always `subscription_charge`.

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:784](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L784)

The period.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:791](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L791)

Why it failed (a stable code).

***

### status

> **status**: `"submitted"` \| `"failed"` \| `"canceled"` \| `"pending"` \| `"sending"`

Defined in: [modules/payments/types.ts:789](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L789)

`pending` (waits for its window or a retry), `sending`, `submitted` (its transaction settles the invoice like any
payment), `failed` or `canceled`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:801](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L801)

Its transaction.

***

### userOpHash

> **userOpHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:799](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L799)

The user operation.

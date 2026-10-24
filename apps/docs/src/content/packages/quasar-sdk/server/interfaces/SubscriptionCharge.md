# SubscriptionCharge

Defined in: [modules/payments/types.ts:735](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L735)

An automatic charge of a subscription period.

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [modules/payments/types.ts:754](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L754)

Amount in base units.

***

### attempts

> **attempts**: `number`

Defined in: [modules/payments/types.ts:752](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L752)

Attempts so far.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:756](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L756)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:766](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L766)

When it was scheduled.

***

### finishedAt

> **finishedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:764](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L764)

When it finished.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:737](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L737)

Charge ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:741](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L741)

The invoice it pays.

***

### notBefore

> **notBefore**: `string` \| `null`

Defined in: [modules/payments/types.ts:762](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L762)

Not before.

***

### object

> **object**: `"subscription_charge"`

Defined in: [modules/payments/types.ts:739](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L739)

Always `subscription_charge`.

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:743](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L743)

The period.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:750](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L750)

Why it failed (a stable code).

***

### status

> **status**: `"submitted"` \| `"failed"` \| `"canceled"` \| `"pending"` \| `"sending"`

Defined in: [modules/payments/types.ts:748](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L748)

`pending` (waits for its window or a retry), `sending`, `submitted` (its transaction settles the invoice like any
payment), `failed` or `canceled`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:760](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L760)

Its transaction.

***

### userOpHash

> **userOpHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:758](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L758)

The user operation.

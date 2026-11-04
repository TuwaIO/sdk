# SubscriptionCharge

Defined in: [modules/payments/types.ts:847](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L847)

An automatic charge of a subscription period.

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [modules/payments/types.ts:866](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L866)

Amount in base units.

***

### attempts

> **attempts**: `number`

Defined in: [modules/payments/types.ts:864](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L864)

Attempts so far.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:868](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L868)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:878](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L878)

When it was scheduled.

***

### finishedAt

> **finishedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:876](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L876)

When it finished.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:849](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L849)

Charge ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:853](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L853)

The invoice it pays.

***

### notBefore

> **notBefore**: `string` \| `null`

Defined in: [modules/payments/types.ts:874](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L874)

Not before.

***

### object

> **object**: `"subscription_charge"`

Defined in: [modules/payments/types.ts:851](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L851)

Always `subscription_charge`.

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:855](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L855)

The period.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:862](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L862)

Why it failed (a stable code).

***

### status

> **status**: `"submitted"` \| `"failed"` \| `"canceled"` \| `"pending"` \| `"sending"`

Defined in: [modules/payments/types.ts:860](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L860)

`pending` (waits for its window or a retry), `sending`, `submitted` (its transaction settles the invoice like any
payment), `failed` or `canceled`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:872](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L872)

Its transaction.

***

### userOpHash

> **userOpHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:870](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L870)

The user operation.

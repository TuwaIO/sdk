# SubscriptionCharge

Defined in: [modules/payments/types.ts:842](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L842)

An automatic charge of a subscription period.

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [modules/payments/types.ts:861](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L861)

Amount in base units.

***

### attempts

> **attempts**: `number`

Defined in: [modules/payments/types.ts:859](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L859)

Attempts so far.

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:863](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L863)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:873](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L873)

When it was scheduled.

***

### finishedAt

> **finishedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:871](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L871)

When it finished.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:844](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L844)

Charge ID.

***

### invoiceId

> **invoiceId**: `string`

Defined in: [modules/payments/types.ts:848](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L848)

The invoice it pays.

***

### notBefore

> **notBefore**: `string` \| `null`

Defined in: [modules/payments/types.ts:869](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L869)

Not before.

***

### object

> **object**: `"subscription_charge"`

Defined in: [modules/payments/types.ts:846](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L846)

Always `subscription_charge`.

***

### period

> **period**: `number` \| `null`

Defined in: [modules/payments/types.ts:850](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L850)

The period.

***

### reason

> **reason**: `string` \| `null`

Defined in: [modules/payments/types.ts:857](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L857)

Why it failed (a stable code).

***

### status

> **status**: `"submitted"` \| `"failed"` \| `"canceled"` \| `"pending"` \| `"sending"`

Defined in: [modules/payments/types.ts:855](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L855)

`pending` (waits for its window or a retry), `sending`, `submitted` (its transaction settles the invoice like any
payment), `failed` or `canceled`.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:867](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L867)

Its transaction.

***

### userOpHash

> **userOpHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:865](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L865)

The user operation.

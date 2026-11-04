# SubscriptionPermission

Defined in: [modules/payments/types.ts:763](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L763)

The automatic-charge permission a buyer granted (ERC-7715), without its context.

## Properties

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:767](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L767)

CAIP-2 chain.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:781](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L781)

When it expires.

***

### grantedAt

> **grantedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:783](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L783)

When it was granted.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:769](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L769)

The payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: [modules/payments/types.ts:771](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L771)

The buyer's CAIP-10 account.

***

### periodAmount

> **periodAmount**: `string` \| `null`

Defined in: [modules/payments/types.ts:775](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L775)

Amount per window, in base units.

***

### periodSeconds

> **periodSeconds**: `number`

Defined in: [modules/payments/types.ts:777](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L777)

Window length.

***

### revokedAt

> **revokedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:785](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L785)

When it was revoked.

***

### startsAt

> **startsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:779](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L779)

When the first window starts.

***

### status

> **status**: `"expired"` \| `"active"` \| `"revoked"`

Defined in: [modules/payments/types.ts:765](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L765)

Whether it can still be charged.

***

### tokenAddress

> **tokenAddress**: `string` \| `null`

Defined in: [modules/payments/types.ts:773](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L773)

The token.

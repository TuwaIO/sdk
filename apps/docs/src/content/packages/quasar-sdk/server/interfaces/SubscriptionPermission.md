# SubscriptionPermission

Defined in: [modules/payments/types.ts:651](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L651)

The automatic-charge permission a buyer granted (ERC-7715), without its context.

## Properties

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:655](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L655)

CAIP-2 chain.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:669](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L669)

When it expires.

***

### grantedAt

> **grantedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:671](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L671)

When it was granted.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:657](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L657)

The payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: [modules/payments/types.ts:659](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L659)

The buyer's CAIP-10 account.

***

### periodAmount

> **periodAmount**: `string` \| `null`

Defined in: [modules/payments/types.ts:663](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L663)

Amount per window, in base units.

***

### periodSeconds

> **periodSeconds**: `number`

Defined in: [modules/payments/types.ts:665](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L665)

Window length.

***

### revokedAt

> **revokedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:673](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L673)

When it was revoked.

***

### startsAt

> **startsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:667](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L667)

When the first window starts.

***

### status

> **status**: `"expired"` \| `"active"` \| `"revoked"`

Defined in: [modules/payments/types.ts:653](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L653)

Whether it can still be charged.

***

### tokenAddress

> **tokenAddress**: `string` \| `null`

Defined in: [modules/payments/types.ts:661](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L661)

The token.

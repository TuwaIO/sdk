# SubscriptionPermission

Defined in: [modules/payments/types.ts:654](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L654)

The automatic-charge permission a buyer granted (ERC-7715), without its context.

## Properties

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:658](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L658)

CAIP-2 chain.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:672](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L672)

When it expires.

***

### grantedAt

> **grantedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:674](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L674)

When it was granted.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:660](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L660)

The payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: [modules/payments/types.ts:662](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L662)

The buyer's CAIP-10 account.

***

### periodAmount

> **periodAmount**: `string` \| `null`

Defined in: [modules/payments/types.ts:666](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L666)

Amount per window, in base units.

***

### periodSeconds

> **periodSeconds**: `number`

Defined in: [modules/payments/types.ts:668](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L668)

Window length.

***

### revokedAt

> **revokedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:676](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L676)

When it was revoked.

***

### startsAt

> **startsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:670](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L670)

When the first window starts.

***

### status

> **status**: `"expired"` \| `"active"` \| `"revoked"`

Defined in: [modules/payments/types.ts:656](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L656)

Whether it can still be charged.

***

### tokenAddress

> **tokenAddress**: `string` \| `null`

Defined in: [modules/payments/types.ts:664](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L664)

The token.

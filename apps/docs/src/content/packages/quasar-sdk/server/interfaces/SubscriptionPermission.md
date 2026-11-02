# SubscriptionPermission

Defined in: modules/payments/types.ts:654

The automatic-charge permission a buyer granted (ERC-7715), without its context.

## Properties

### chainId

> **chainId**: `string` \| `null`

Defined in: modules/payments/types.ts:658

CAIP-2 chain.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: modules/payments/types.ts:672

When it expires.

***

### grantedAt

> **grantedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:674

When it was granted.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: modules/payments/types.ts:660

The payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: modules/payments/types.ts:662

The buyer's CAIP-10 account.

***

### periodAmount

> **periodAmount**: `string` \| `null`

Defined in: modules/payments/types.ts:666

Amount per window, in base units.

***

### periodSeconds

> **periodSeconds**: `number`

Defined in: modules/payments/types.ts:668

Window length.

***

### revokedAt

> **revokedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:676

When it was revoked.

***

### startsAt

> **startsAt**: `string` \| `null`

Defined in: modules/payments/types.ts:670

When the first window starts.

***

### status

> **status**: `"expired"` \| `"active"` \| `"revoked"`

Defined in: modules/payments/types.ts:656

Whether it can still be charged.

***

### tokenAddress

> **tokenAddress**: `string` \| `null`

Defined in: modules/payments/types.ts:664

The token.

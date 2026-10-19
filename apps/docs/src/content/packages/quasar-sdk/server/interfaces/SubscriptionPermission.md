# SubscriptionPermission

Defined in: modules/payments/types.ts:618

The automatic-charge permission a buyer granted (ERC-7715), without its context.

## Properties

### chainId

> **chainId**: `string` \| `null`

Defined in: modules/payments/types.ts:622

CAIP-2 chain.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: modules/payments/types.ts:636

When it expires.

***

### grantedAt

> **grantedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:638

When it was granted.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: modules/payments/types.ts:624

The payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: modules/payments/types.ts:626

The buyer's CAIP-10 account.

***

### periodAmount

> **periodAmount**: `string` \| `null`

Defined in: modules/payments/types.ts:630

Amount per window, in base units.

***

### periodSeconds

> **periodSeconds**: `number`

Defined in: modules/payments/types.ts:632

Window length.

***

### revokedAt

> **revokedAt**: `string` \| `null`

Defined in: modules/payments/types.ts:640

When it was revoked.

***

### startsAt

> **startsAt**: `string` \| `null`

Defined in: modules/payments/types.ts:634

When the first window starts.

***

### status

> **status**: `"expired"` \| `"active"` \| `"revoked"`

Defined in: modules/payments/types.ts:620

Whether it can still be charged.

***

### tokenAddress

> **tokenAddress**: `string` \| `null`

Defined in: modules/payments/types.ts:628

The token.

# SubscriptionPermission

Defined in: [modules/payments/types.ts:616](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L616)

The automatic-charge permission a buyer granted (ERC-7715), without its context.

## Properties

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:620](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L620)

CAIP-2 chain.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:634](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L634)

When it expires.

***

### grantedAt

> **grantedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:636](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L636)

When it was granted.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:622](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L622)

The payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: [modules/payments/types.ts:624](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L624)

The buyer's CAIP-10 account.

***

### periodAmount

> **periodAmount**: `string` \| `null`

Defined in: [modules/payments/types.ts:628](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L628)

Amount per window, in base units.

***

### periodSeconds

> **periodSeconds**: `number`

Defined in: [modules/payments/types.ts:630](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L630)

Window length.

***

### revokedAt

> **revokedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:638](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L638)

When it was revoked.

***

### startsAt

> **startsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:632](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L632)

When the first window starts.

***

### status

> **status**: `"expired"` \| `"active"` \| `"revoked"`

Defined in: [modules/payments/types.ts:618](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L618)

Whether it can still be charged.

***

### tokenAddress

> **tokenAddress**: `string` \| `null`

Defined in: [modules/payments/types.ts:626](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L626)

The token.

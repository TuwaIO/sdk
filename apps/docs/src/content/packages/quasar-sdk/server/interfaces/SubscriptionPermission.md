# SubscriptionPermission

Defined in: [modules/payments/types.ts:857](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L857)

The automatic-charge permission a buyer granted (ERC-7715), without its context.

## Properties

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:861](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L861)

CAIP-2 chain.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:875](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L875)

When it expires.

***

### grantedAt

> **grantedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:877](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L877)

When it was granted.

***

### methodId

> **methodId**: `string` \| `null`

Defined in: [modules/payments/types.ts:863](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L863)

The payment method.

***

### payer

> **payer**: `string` \| `null`

Defined in: [modules/payments/types.ts:865](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L865)

The buyer's CAIP-10 account.

***

### periodAmount

> **periodAmount**: `string` \| `null`

Defined in: [modules/payments/types.ts:869](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L869)

Amount per window, in base units.

***

### periodSeconds

> **periodSeconds**: `number`

Defined in: [modules/payments/types.ts:871](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L871)

Window length.

***

### revokedAt

> **revokedAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:879](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L879)

When it was revoked.

***

### startsAt

> **startsAt**: `string` \| `null`

Defined in: [modules/payments/types.ts:873](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L873)

When the first window starts.

***

### status

> **status**: `"expired"` \| `"active"` \| `"revoked"`

Defined in: [modules/payments/types.ts:859](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L859)

Whether it can still be charged.

***

### tokenAddress

> **tokenAddress**: `string` \| `null`

Defined in: [modules/payments/types.ts:867](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L867)

The token.

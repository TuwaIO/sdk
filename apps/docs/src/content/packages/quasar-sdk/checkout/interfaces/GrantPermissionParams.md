# GrantPermissionParams

Defined in: checkout/types.ts:356

The answer of the wallet to `wallet_grantPermissions`, as [CheckoutState.grantPermission](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#grantpermission) takes it.

## Properties

### context

> **context**: `string`

Defined in: checkout/types.ts:360

The permission context the wallet returned.

***

### delegationManager

> **delegationManager**: `string`

Defined in: checkout/types.ts:362

The delegation manager it names.

***

### dependencies?

> `optional` **dependencies?**: `object`[]

Defined in: checkout/types.ts:364

Account deployments the delegator needs first (ERC-7715 `dependencies`).

#### factory

> **factory**: `string`

#### factoryData

> **factoryData**: `string`

***

### payer

> **payer**: `string`

Defined in: checkout/types.ts:358

CAIP-10 account that granted it, on the method's chain.

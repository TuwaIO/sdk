# GrantPermissionParams

Defined in: [checkout/types.ts:457](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L457)

The answer of the wallet to `wallet_grantPermissions`, as [CheckoutState.grantPermission](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#grantpermission) takes it.

## Properties

### context

> **context**: `string`

Defined in: [checkout/types.ts:461](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L461)

The permission context the wallet returned.

***

### delegationManager

> **delegationManager**: `string`

Defined in: [checkout/types.ts:463](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L463)

The delegation manager it names.

***

### dependencies?

> `optional` **dependencies?**: `object`[]

Defined in: [checkout/types.ts:465](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L465)

Account deployments the delegator needs first (ERC-7715 `dependencies`).

#### factory

> **factory**: `string`

#### factoryData

> **factoryData**: `string`

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:459](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L459)

CAIP-10 account that granted it, on the method's chain.

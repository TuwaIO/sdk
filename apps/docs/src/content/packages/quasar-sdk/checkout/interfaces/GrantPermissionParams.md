# GrantPermissionParams

Defined in: [checkout/types.ts:350](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L350)

The answer of the wallet to `wallet_grantPermissions`, as [CheckoutState.grantPermission](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#grantpermission) takes it.

## Properties

### context

> **context**: `string`

Defined in: [checkout/types.ts:354](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L354)

The permission context the wallet returned.

***

### delegationManager

> **delegationManager**: `string`

Defined in: [checkout/types.ts:356](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L356)

The delegation manager it names.

***

### dependencies?

> `optional` **dependencies?**: `object`[]

Defined in: [checkout/types.ts:358](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L358)

Account deployments the delegator needs first (ERC-7715 `dependencies`).

#### factory

> **factory**: `string`

#### factoryData

> **factoryData**: `string`

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:352](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L352)

CAIP-10 account that granted it, on the method's chain.

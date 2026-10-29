# GrantPermissionParams

Defined in: [checkout/types.ts:586](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L586)

The answer of the wallet to `wallet_grantPermissions`, as [CheckoutState.grantPermission](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#grantpermission) takes it.

## Properties

### context

> **context**: `string`

Defined in: [checkout/types.ts:590](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L590)

The permission context the wallet returned.

***

### delegationManager

> **delegationManager**: `string`

Defined in: [checkout/types.ts:592](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L592)

The delegation manager it names.

***

### dependencies?

> `optional` **dependencies?**: `object`[]

Defined in: [checkout/types.ts:594](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L594)

Account deployments the delegator needs first (ERC-7715 `dependencies`).

#### factory

> **factory**: `string`

#### factoryData

> **factoryData**: `string`

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:588](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L588)

CAIP-10 account that granted it, on the method's chain.

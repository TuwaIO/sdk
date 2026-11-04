# GrantPermissionParams

Defined in: [checkout/types.ts:596](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L596)

The answer of the wallet to `wallet_grantPermissions`, as [CheckoutState.grantPermission](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#grantpermission) takes it.

## Properties

### context

> **context**: `string`

Defined in: [checkout/types.ts:600](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L600)

The permission context the wallet returned.

***

### delegationManager

> **delegationManager**: `string`

Defined in: [checkout/types.ts:602](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L602)

The delegation manager it names.

***

### dependencies?

> `optional` **dependencies?**: `object`[]

Defined in: [checkout/types.ts:604](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L604)

Account deployments the delegator needs first (ERC-7715 `dependencies`).

#### factory

> **factory**: `string`

#### factoryData

> **factoryData**: `string`

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:598](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L598)

CAIP-10 account that granted it, on the method's chain.

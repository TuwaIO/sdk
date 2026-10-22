# GrantPermissionParams

Defined in: [checkout/types.ts:369](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L369)

The answer of the wallet to `wallet_grantPermissions`, as [CheckoutState.grantPermission](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#grantpermission) takes it.

## Properties

### context

> **context**: `string`

Defined in: [checkout/types.ts:373](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L373)

The permission context the wallet returned.

***

### delegationManager

> **delegationManager**: `string`

Defined in: [checkout/types.ts:375](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L375)

The delegation manager it names.

***

### dependencies?

> `optional` **dependencies?**: `object`[]

Defined in: [checkout/types.ts:377](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L377)

Account deployments the delegator needs first (ERC-7715 `dependencies`).

#### factory

> **factory**: `string`

#### factoryData

> **factoryData**: `string`

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:371](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L371)

CAIP-10 account that granted it, on the method's chain.

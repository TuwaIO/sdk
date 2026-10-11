# PermissionRequest

Defined in: [checkout/types.ts:254](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L254)

The ERC-7715 `wallet_grantPermissions` request of a subscription with automatic charges.

## Properties

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:256](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L256)

Chain as hex.

***

### permission

> **permission**: `object`

Defined in: [checkout/types.ts:260](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L260)

A periodic ERC-20 allowance.

#### data

> **data**: `object`

##### data.justification

> **justification**: `string`

##### data.periodAmount

> **periodAmount**: `string`

##### data.periodDuration

> **periodDuration**: `number`

##### data.startTime

> **startTime**: `number`

##### data.tokenAddress

> **tokenAddress**: `string`

#### isAdjustmentAllowed

> **isAdjustmentAllowed**: `boolean`

#### type

> **type**: `"erc20-token-periodic"`

***

### rules

> **rules**: `object`[]

Defined in: [checkout/types.ts:272](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L272)

Expiry, payee and redeemer rules.

#### data

> **data**: `unknown`

#### type

> **type**: `string`

***

### to

> **to**: `string`

Defined in: [checkout/types.ts:258](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L258)

The app's collector account, which redeems the permission.

# AutoChargeOffer

> **AutoChargeOffer** = \{ `methodId`: `string`; `request`: [`PermissionRequest`](/packages/quasar-sdk/checkout/interfaces/PermissionRequest.md); `status`: `"available"`; \} \| \{ `permission`: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`; `status`: `"active"`; \} \| \{ `reason`: `string`; `status`: `"unavailable"`; \}

Defined in: [checkout/types.ts:280](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L280)

For a subscription with automatic charges: whether the page should ask the wallet for the permission.

## Union Members

### Type Literal

\{ `methodId`: `string`; `request`: [`PermissionRequest`](/packages/quasar-sdk/checkout/interfaces/PermissionRequest.md); `status`: `"available"`; \}

#### methodId

> **methodId**: `string`

The method the charges use.

#### request

> **request**: [`PermissionRequest`](/packages/quasar-sdk/checkout/interfaces/PermissionRequest.md)

The request for `wallet_grantPermissions`.

#### status

> **status**: `"available"`

Ask the wallet with `request`, then pass its answer to [CheckoutState.grantPermission](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#grantpermission).

***

### Type Literal

\{ `permission`: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`; `status`: `"active"`; \}

#### permission

> **permission**: [`SubscriptionPermission`](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md) \| `null`

The permission.

#### status

> **status**: `"active"`

Already granted.

***

### Type Literal

\{ `reason`: `string`; `status`: `"unavailable"`; \}

#### reason

> **reason**: `string`

Why, as a stable code.

#### status

> **status**: `"unavailable"`

Not possible now; the buyer pays each invoice.

# ListSubscriptionsParams

Defined in: modules/payments/types.ts:793

Filters and paging of [PaymentsModule.listSubscriptions](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptions).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: modules/payments/types.ts:799

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: modules/payments/types.ts:797

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md) \| [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)[]

Defined in: modules/payments/types.ts:795

One status or several.

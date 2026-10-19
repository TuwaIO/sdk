# ListSubscriptionsParams

Defined in: modules/payments/types.ts:757

Filters and paging of [PaymentsModule.listSubscriptions](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptions).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: modules/payments/types.ts:763

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: modules/payments/types.ts:761

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md) \| [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)[]

Defined in: modules/payments/types.ts:759

One status or several.

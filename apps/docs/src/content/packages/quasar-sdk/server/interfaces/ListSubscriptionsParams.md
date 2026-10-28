# ListSubscriptionsParams

Defined in: [modules/payments/types.ts:793](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L793)

Filters and paging of [PaymentsModule.listSubscriptions](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptions).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:799](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L799)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:797](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L797)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md) \| [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)[]

Defined in: [modules/payments/types.ts:795](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L795)

One status or several.

# ListSubscriptionsParams

Defined in: [modules/payments/types.ts:1002](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L1002)

Filters and paging of [PaymentsModule.listSubscriptions](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptions).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:1008](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L1008)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:1006](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L1006)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md) \| [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)[]

Defined in: [modules/payments/types.ts:1004](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L1004)

One status or several.

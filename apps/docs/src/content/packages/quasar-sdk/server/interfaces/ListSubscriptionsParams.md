# ListSubscriptionsParams

Defined in: [modules/payments/types.ts:905](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L905)

Filters and paging of [PaymentsModule.listSubscriptions](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptions).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:911](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L911)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:909](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L909)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md) \| [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)[]

Defined in: [modules/payments/types.ts:907](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L907)

One status or several.

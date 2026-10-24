# ListSubscriptionsParams

Defined in: [modules/payments/types.ts:790](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L790)

Filters and paging of [PaymentsModule.listSubscriptions](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptions).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:796](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L796)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:794](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L794)

Page size, 1 to 100. Defaults to `20`.

***

### status?

> `optional` **status?**: [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md) \| [`SubscriptionStatus`](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)[]

Defined in: [modules/payments/types.ts:792](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L792)

One status or several.

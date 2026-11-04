# ListSubscriptionItemsParams

Defined in: [modules/payments/types.ts:976](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L976)

Paging of [PaymentsModule.listSubscriptionInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptioninvoices) and [PaymentsModule.listSubscriptionCharges](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptioncharges).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:980](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L980)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:978](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L978)

Page size, 1 to 100. Defaults to `20`.

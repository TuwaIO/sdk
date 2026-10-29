# ListSubscriptionItemsParams

Defined in: [modules/payments/types.ts:799](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L799)

Paging of [PaymentsModule.listSubscriptionInvoices](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptioninvoices) and [PaymentsModule.listSubscriptionCharges](/packages/quasar-sdk/server/classes/PaymentsModule.md#listsubscriptioncharges).

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:803](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L803)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:801](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L801)

Page size, 1 to 100. Defaults to `20`.

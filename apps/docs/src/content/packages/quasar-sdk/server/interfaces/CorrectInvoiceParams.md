# CorrectInvoiceParams

Defined in: [modules/payments/types.ts:339](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L339)

What [PaymentsModule.correctInvoice](/packages/quasar-sdk/server/classes/PaymentsModule.md#correctinvoice) takes.

## Properties

### buyer?

> `optional` **buyer?**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md)

Defined in: [modules/payments/types.ts:341](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L341)

The corrected buyer; the buyer of the invoice stays when omitted.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [modules/payments/types.ts:343](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L343)

The reason the credit note gives.

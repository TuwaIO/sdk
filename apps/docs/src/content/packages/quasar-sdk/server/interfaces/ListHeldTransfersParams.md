# ListHeldTransfersParams

Defined in: [modules/payments/types.ts:599](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L599)

What [PaymentsModule.listHeldTransfers](/packages/quasar-sdk/server/classes/PaymentsModule.md#listheldtransfers) takes.

## Properties

### invoice?

> `optional` **invoice?**: `string`

Defined in: [modules/payments/types.ts:601](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L601)

Only the held transfers of one invoice.

***

### status?

> `optional` **status?**: [`HeldTransferStatus`](/packages/quasar-sdk/server/type-aliases/HeldTransferStatus.md)

Defined in: [modules/payments/types.ts:603](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L603)

Only those in one state; `held` for those still to refund.

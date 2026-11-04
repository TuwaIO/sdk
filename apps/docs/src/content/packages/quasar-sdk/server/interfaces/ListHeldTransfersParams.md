# ListHeldTransfersParams

Defined in: [modules/payments/types.ts:677](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L677)

What [PaymentsModule.listHeldTransfers](/packages/quasar-sdk/server/classes/PaymentsModule.md#listheldtransfers) takes.

## Properties

### invoice?

> `optional` **invoice?**: `string`

Defined in: [modules/payments/types.ts:679](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L679)

Only the held transfers of one invoice.

***

### status?

> `optional` **status?**: [`HeldTransferStatus`](/packages/quasar-sdk/server/type-aliases/HeldTransferStatus.md)

Defined in: [modules/payments/types.ts:681](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L681)

Only those in one state; `held` for those still to refund.

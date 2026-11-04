# ListHeldTransfersParams

Defined in: [modules/payments/types.ts:607](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L607)

What [PaymentsModule.listHeldTransfers](/packages/quasar-sdk/server/classes/PaymentsModule.md#listheldtransfers) takes.

## Properties

### invoice?

> `optional` **invoice?**: `string`

Defined in: [modules/payments/types.ts:609](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L609)

Only the held transfers of one invoice.

***

### status?

> `optional` **status?**: [`HeldTransferStatus`](/packages/quasar-sdk/server/type-aliases/HeldTransferStatus.md)

Defined in: [modules/payments/types.ts:611](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L611)

Only those in one state; `held` for those still to refund.

# ListHeldTransfersParams

Defined in: [modules/payments/types.ts:602](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L602)

What [PaymentsModule.listHeldTransfers](/packages/quasar-sdk/server/classes/PaymentsModule.md#listheldtransfers) takes.

## Properties

### invoice?

> `optional` **invoice?**: `string`

Defined in: [modules/payments/types.ts:604](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L604)

Only the held transfers of one invoice.

***

### status?

> `optional` **status?**: [`HeldTransferStatus`](/packages/quasar-sdk/server/type-aliases/HeldTransferStatus.md)

Defined in: [modules/payments/types.ts:606](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L606)

Only those in one state; `held` for those still to refund.

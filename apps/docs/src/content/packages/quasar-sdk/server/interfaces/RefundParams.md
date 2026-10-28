# RefundParams

Defined in: [modules/payments/types.ts:456](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L456)

What [PaymentsModule.refund](/packages/quasar-sdk/server/classes/PaymentsModule.md#refund) takes.

## Properties

### amount?

> `optional` **amount?**: `string`

Defined in: [modules/payments/types.ts:458](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L458)

Amount in the invoice currency; everything left when omitted. Leave it out with `exact_received`.

***

### mode?

> `optional` **mode?**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:460](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L460)

`fiat_value` (default) or `exact_received`.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [modules/payments/types.ts:462](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L462)

Why; printed on the credit note.

# RefundParams

Defined in: [modules/payments/types.ts:453](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L453)

What [PaymentsModule.refund](/packages/quasar-sdk/server/classes/PaymentsModule.md#refund) takes.

## Properties

### amount?

> `optional` **amount?**: `string`

Defined in: [modules/payments/types.ts:455](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L455)

Amount in the invoice currency; everything left when omitted. Leave it out with `exact_received`.

***

### mode?

> `optional` **mode?**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:457](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L457)

`fiat_value` (default) or `exact_received`.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [modules/payments/types.ts:459](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L459)

Why; printed on the credit note.

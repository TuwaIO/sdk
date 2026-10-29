# RefundParams

Defined in: [modules/payments/types.ts:482](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L482)

What [PaymentsModule.refund](/packages/quasar-sdk/server/classes/PaymentsModule.md#refund) takes.

## Properties

### amount?

> `optional` **amount?**: `string`

Defined in: [modules/payments/types.ts:484](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L484)

Amount in the invoice currency; everything left when omitted. Leave it out with `exact_received`.

***

### mode?

> `optional` **mode?**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:486](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L486)

`fiat_value` (default) or `exact_received`.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [modules/payments/types.ts:488](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L488)

Why; printed on the credit note.

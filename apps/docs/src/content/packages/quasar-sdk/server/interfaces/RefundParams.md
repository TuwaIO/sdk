# RefundParams

Defined in: [modules/payments/types.ts:494](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L494)

What [PaymentsModule.refund](/packages/quasar-sdk/server/classes/PaymentsModule.md#refund) takes.

## Properties

### amount?

> `optional` **amount?**: `string`

Defined in: [modules/payments/types.ts:496](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L496)

Amount in the invoice currency; everything left when omitted. Leave it out with `exact_received`.

***

### mode?

> `optional` **mode?**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:498](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L498)

`fiat_value` (default) or `exact_received`.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [modules/payments/types.ts:500](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L500)

Why; printed on the credit note.

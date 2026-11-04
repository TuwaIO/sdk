# RefundParams

Defined in: [modules/payments/types.ts:504](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L504)

What [PaymentsModule.refund](/packages/quasar-sdk/server/classes/PaymentsModule.md#refund) takes.

## Properties

### amount?

> `optional` **amount?**: `string`

Defined in: [modules/payments/types.ts:506](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L506)

Amount in the invoice currency; everything left when omitted. Leave it out with `exact_received`.

***

### mode?

> `optional` **mode?**: [`RefundMode`](/packages/quasar-sdk/server/type-aliases/RefundMode.md)

Defined in: [modules/payments/types.ts:508](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L508)

`fiat_value` (default) or `exact_received`.

***

### reason?

> `optional` **reason?**: `string`

Defined in: [modules/payments/types.ts:510](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L510)

Why; printed on the credit note.

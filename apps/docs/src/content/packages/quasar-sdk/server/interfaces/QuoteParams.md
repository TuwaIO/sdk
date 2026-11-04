# QuoteParams

Defined in: [modules/payments/types.ts:751](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L751)

What [PaymentsModule.quote](/packages/quasar-sdk/server/classes/PaymentsModule.md#quote) takes.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:753](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L753)

Amount with up to two decimals (`'49.00'`).

***

### currency?

> `optional` **currency?**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:755](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L755)

Currency. Defaults to `USD`.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:757](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L757)

The payment method.

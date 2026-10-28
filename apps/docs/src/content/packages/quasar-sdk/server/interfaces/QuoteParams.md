# QuoteParams

Defined in: [modules/payments/types.ts:548](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L548)

What [PaymentsModule.quote](/packages/quasar-sdk/server/classes/PaymentsModule.md#quote) takes.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:550](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L550)

Amount with up to two decimals (`'49.00'`).

***

### currency?

> `optional` **currency?**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:552](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L552)

Currency. Defaults to `USD`.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:554](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L554)

The payment method.

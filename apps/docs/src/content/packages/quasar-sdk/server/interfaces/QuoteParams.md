# QuoteParams

Defined in: [modules/payments/types.ts:586](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L586)

What [PaymentsModule.quote](/packages/quasar-sdk/server/classes/PaymentsModule.md#quote) takes.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:588](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L588)

Amount with up to two decimals (`'49.00'`).

***

### currency?

> `optional` **currency?**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:590](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L590)

Currency. Defaults to `USD`.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:592](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L592)

The payment method.

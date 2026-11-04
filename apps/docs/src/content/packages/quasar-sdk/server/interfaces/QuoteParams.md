# QuoteParams

Defined in: [modules/payments/types.ts:657](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L657)

What [PaymentsModule.quote](/packages/quasar-sdk/server/classes/PaymentsModule.md#quote) takes.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:659](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L659)

Amount with up to two decimals (`'49.00'`).

***

### currency?

> `optional` **currency?**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:661](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L661)

Currency. Defaults to `USD`.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:663](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L663)

The payment method.

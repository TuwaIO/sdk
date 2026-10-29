# QuoteParams

Defined in: [modules/payments/types.ts:574](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L574)

What [PaymentsModule.quote](/packages/quasar-sdk/server/classes/PaymentsModule.md#quote) takes.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:576](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L576)

Amount with up to two decimals (`'49.00'`).

***

### currency?

> `optional` **currency?**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: [modules/payments/types.ts:578](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L578)

Currency. Defaults to `USD`.

***

### methodId

> **methodId**: `string`

Defined in: [modules/payments/types.ts:580](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L580)

The payment method.

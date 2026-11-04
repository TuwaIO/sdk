# RefundPreview

Defined in: [modules/payments/types.ts:710](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L710)

What a refund would send, as [PaymentsModule.previewRefund](/packages/quasar-sdk/server/classes/PaymentsModule.md#previewrefund) returns it. A requested refund holds its amount until
it is sent, so look before asking: the same amount in the invoice currency sends a different number of tokens once a
volatile asset has moved.

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:712](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L712)

The amount in the invoice currency.

***

### atPaymentRate

> **atPaymentRate**: `string` \| `null`

Defined in: [modules/payments/types.ts:724](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L724)

What this amount was worth in tokens at the rate of the payment, in base units; `null` for `exact_received`.

***

### cryptoAmount

> **cryptoAmount**: `string`

Defined in: [modules/payments/types.ts:716](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L716)

What the refund would send now, in base units.

***

### currency

> **currency**: `string`

Defined in: [modules/payments/types.ts:714](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L714)

The invoice currency.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:720](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L720)

Decimals of the token.

***

### received

> **received**: `string` \| `null`

Defined in: [modules/payments/types.ts:722](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L722)

What the payment brought, in base units.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:718](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L718)

Symbol of the token.

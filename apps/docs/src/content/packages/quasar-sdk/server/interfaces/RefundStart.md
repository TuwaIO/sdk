# RefundStart

Defined in: [modules/payments/types.ts:685](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L685)

The answer of [PaymentsModule.refund](/packages/quasar-sdk/server/classes/PaymentsModule.md#refund): the refund and what to send where.

## Properties

### instructions

> **instructions**: `object`

Defined in: [modules/payments/types.ts:689](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L689)

The transfer to make from your wallet, then pass its hash to [PaymentsModule.submitRefund](/packages/quasar-sdk/server/classes/PaymentsModule.md#submitrefund).

#### amount

> **amount**: `string`

Amount in base units.

#### assetId

> **assetId**: `string`

CAIP-19 asset.

#### chainId

> **chainId**: `string`

CAIP-2 chain.

#### decimals

> **decimals**: `number`

Decimals of the token.

#### symbol

> **symbol**: `string`

Symbol of the token.

#### to

> **to**: `string` \| `null`

Recipient: the payer.

***

### refund

> **refund**: [`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)

Defined in: [modules/payments/types.ts:687](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L687)

The refund, `requested`.

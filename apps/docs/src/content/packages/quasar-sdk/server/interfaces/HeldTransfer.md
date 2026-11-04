# HeldTransfer

Defined in: [modules/payments/types.ts:562](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L562)

A transfer that reached the address of one of your invoices without being tied to it by proof: from another wallet
than the one the quote was for (`payer_mismatch`), or from the quoted wallet that never confirmed the invoice
(`payer_unconfirmed`). It paid nothing and the invoice stays as it was; refund it as a whole to the wallet that sent
it with [PaymentsModule.refundHeldTransfer](/packages/quasar-sdk/server/classes/PaymentsModule.md#refundheldtransfer). When the same transaction is proven to pay an invoice, Quasar
voids the record (`voided`, `voidedBy`).

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:584](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L584)

What it carried, in base units.

***

### assetId

> **assetId**: `string`

Defined in: [modules/payments/types.ts:576](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L576)

CAIP-19 asset it carried.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:574](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L574)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:598](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L598)

When Quasar recorded it.

***

### currency

> **currency**: `string` \| `null`

Defined in: [modules/payments/types.ts:588](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L588)

Currency of `valueMinor`.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:580](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L580)

Decimals of the token.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:564](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L564)

Held transfer ID.

***

### invoice

> **invoice**: `string`

Defined in: [modules/payments/types.ts:566](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L566)

The invoice whose address it reached.

***

### late

> **late**: `boolean`

Defined in: [modules/payments/types.ts:572](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L572)

Whether it arrived after the invoice expired or was cancelled.

***

### reason

> **reason**: `"payer_mismatch"` \| `"payer_unconfirmed"`

Defined in: [modules/payments/types.ts:570](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L570)

Why it is tied to no invoice.

***

### screening

> **screening**: `string` \| `null`

Defined in: [modules/payments/types.ts:594](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L594)

The sanctions screening of the sender: `blocked` gets no refund.

***

### sender

> **sender**: `string`

Defined in: [modules/payments/types.ts:590](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L590)

The wallet it came from (CAIP-10): the refund goes back to it.

***

### senders

> **senders**: `string`[]

Defined in: [modules/payments/types.ts:592](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L592)

Every wallet that sent it.

***

### status

> **status**: [`HeldTransferStatus`](/packages/quasar-sdk/server/type-aliases/HeldTransferStatus.md)

Defined in: [modules/payments/types.ts:568](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L568)

Where it is.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:578](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L578)

Symbol of the token.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:582](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L582)

Its transaction.

***

### updatedAt

> **updatedAt**: `string`

Defined in: [modules/payments/types.ts:600](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L600)

When it last changed.

***

### valueMinor

> **valueMinor**: `string` \| `null`

Defined in: [modules/payments/types.ts:586](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L586)

Its value at the rate of the invoice's quote, in minor units of `currency`.

***

### voidedBy

> **voidedBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:596](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L596)

The invoice it paid, once voided.

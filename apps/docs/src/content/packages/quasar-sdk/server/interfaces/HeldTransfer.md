# HeldTransfer

Defined in: [modules/payments/types.ts:635](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L635)

A transfer that reached the address of one of your invoices without being tied to it by proof: from another wallet
than the one the quote was for (`payer_mismatch`), or from the quoted wallet that never confirmed the invoice
(`payer_unconfirmed`). It paid nothing and the invoice stays as it was; refund it as a whole to the wallet that sent
it with [PaymentsModule.refundHeldTransfer](/packages/quasar-sdk/server/classes/PaymentsModule.md#refundheldtransfer). When the same transaction is proven to pay an invoice, Quasar
voids the record (`voided`, `voidedBy`).

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:657](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L657)

What it carried, in base units.

***

### assetId

> **assetId**: `string`

Defined in: [modules/payments/types.ts:649](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L649)

CAIP-19 asset it carried.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:647](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L647)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:671](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L671)

When Quasar recorded it.

***

### currency

> **currency**: `string` \| `null`

Defined in: [modules/payments/types.ts:661](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L661)

Currency of `valueMinor`.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:653](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L653)

Decimals of the token.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:637](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L637)

Held transfer ID.

***

### invoice

> **invoice**: `string`

Defined in: [modules/payments/types.ts:639](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L639)

The invoice whose address it reached.

***

### late

> **late**: `boolean`

Defined in: [modules/payments/types.ts:645](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L645)

Whether it arrived after the invoice expired or was cancelled.

***

### reason

> **reason**: `"payer_mismatch"` \| `"payer_unconfirmed"`

Defined in: [modules/payments/types.ts:643](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L643)

Why it is tied to no invoice.

***

### screening

> **screening**: `string` \| `null`

Defined in: [modules/payments/types.ts:667](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L667)

The sanctions screening of the sender: `blocked` gets no refund.

***

### sender

> **sender**: `string`

Defined in: [modules/payments/types.ts:663](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L663)

The wallet it came from (CAIP-10): the refund goes back to it.

***

### senders

> **senders**: `string`[]

Defined in: [modules/payments/types.ts:665](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L665)

Every wallet that sent it.

***

### status

> **status**: [`HeldTransferStatus`](/packages/quasar-sdk/server/type-aliases/HeldTransferStatus.md)

Defined in: [modules/payments/types.ts:641](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L641)

Where it is.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:651](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L651)

Symbol of the token.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:655](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L655)

Its transaction.

***

### updatedAt

> **updatedAt**: `string`

Defined in: [modules/payments/types.ts:673](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L673)

When it last changed.

***

### valueMinor

> **valueMinor**: `string` \| `null`

Defined in: [modules/payments/types.ts:659](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L659)

Its value at the rate of the invoice's quote, in minor units of `currency`.

***

### voidedBy

> **voidedBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:669](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L669)

The invoice it paid, once voided.

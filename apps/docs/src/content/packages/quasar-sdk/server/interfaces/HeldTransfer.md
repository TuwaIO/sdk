# HeldTransfer

Defined in: [modules/payments/types.ts:557](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L557)

A transfer that reached the address of one of your invoices without being tied to it by proof: from another wallet
than the one the quote was for (`payer_mismatch`), or from the quoted wallet that never confirmed the invoice
(`payer_unconfirmed`). It paid nothing and the invoice stays as it was; refund it as a whole to the wallet that sent
it with [PaymentsModule.refundHeldTransfer](/packages/quasar-sdk/server/classes/PaymentsModule.md#refundheldtransfer). When the same transaction is proven to pay an invoice, Quasar
voids the record (`voided`, `voidedBy`).

## Properties

### amount

> **amount**: `string`

Defined in: [modules/payments/types.ts:579](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L579)

What it carried, in base units.

***

### assetId

> **assetId**: `string`

Defined in: [modules/payments/types.ts:571](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L571)

CAIP-19 asset it carried.

***

### chainId

> **chainId**: `string`

Defined in: [modules/payments/types.ts:569](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L569)

CAIP-2 chain.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:593](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L593)

When Quasar recorded it.

***

### currency

> **currency**: `string` \| `null`

Defined in: [modules/payments/types.ts:583](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L583)

Currency of `valueMinor`.

***

### decimals

> **decimals**: `number`

Defined in: [modules/payments/types.ts:575](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L575)

Decimals of the token.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:559](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L559)

Held transfer ID.

***

### invoice

> **invoice**: `string`

Defined in: [modules/payments/types.ts:561](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L561)

The invoice whose address it reached.

***

### late

> **late**: `boolean`

Defined in: [modules/payments/types.ts:567](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L567)

Whether it arrived after the invoice expired or was cancelled.

***

### reason

> **reason**: `"payer_mismatch"` \| `"payer_unconfirmed"`

Defined in: [modules/payments/types.ts:565](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L565)

Why it is tied to no invoice.

***

### screening

> **screening**: `string` \| `null`

Defined in: [modules/payments/types.ts:589](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L589)

The sanctions screening of the sender: `blocked` gets no refund.

***

### sender

> **sender**: `string`

Defined in: [modules/payments/types.ts:585](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L585)

The wallet it came from (CAIP-10): the refund goes back to it.

***

### senders

> **senders**: `string`[]

Defined in: [modules/payments/types.ts:587](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L587)

Every wallet that sent it.

***

### status

> **status**: [`HeldTransferStatus`](/packages/quasar-sdk/server/type-aliases/HeldTransferStatus.md)

Defined in: [modules/payments/types.ts:563](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L563)

Where it is.

***

### symbol

> **symbol**: `string`

Defined in: [modules/payments/types.ts:573](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L573)

Symbol of the token.

***

### txHash

> **txHash**: `string`

Defined in: [modules/payments/types.ts:577](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L577)

Its transaction.

***

### updatedAt

> **updatedAt**: `string`

Defined in: [modules/payments/types.ts:595](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L595)

When it last changed.

***

### valueMinor

> **valueMinor**: `string` \| `null`

Defined in: [modules/payments/types.ts:581](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L581)

Its value at the rate of the invoice's quote, in minor units of `currency`.

***

### voidedBy

> **voidedBy**: `string` \| `null`

Defined in: [modules/payments/types.ts:591](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L591)

The invoice it paid, once voided.

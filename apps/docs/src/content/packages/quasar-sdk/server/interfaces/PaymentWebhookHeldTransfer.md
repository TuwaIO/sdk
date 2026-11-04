# PaymentWebhookHeldTransfer

Defined in: [webhooks.ts:75](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L75)

A transfer that reached the invoice's address without being tied to it by proof (`data.heldTransfer` of
`invoice.transfer_held`): it paid nothing and the invoice stays as it was. It is a record of its own, which you
refund as a whole to the wallet that sent it ([PaymentsModule.refundHeldTransfer](/packages/quasar-sdk/server/classes/PaymentsModule.md#refundheldtransfer)): `reason` is
`payer_mismatch` (another wallet than the one the quote was for) or `payer_unconfirmed` (the quoted wallet never
confirmed the invoice).

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [webhooks.ts:83](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L83)

What it carried, in base units of its token.

***

### id

> **id**: `string` \| `null`

Defined in: [webhooks.ts:79](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L79)

The held transfer ([HeldTransfer](/packages/quasar-sdk/server/interfaces/HeldTransfer.md)).

***

### late?

> `optional` **late?**: `true`

Defined in: [webhooks.ts:89](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L89)

It arrived after the invoice expired or was cancelled.

***

### reason

> **reason**: `"payer_mismatch"` \| `"payer_unconfirmed"` \| `"already_paid"` \| `"quote_changed"` \| `null`

Defined in: [webhooks.ts:87](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L87)

Why it is tied to no invoice.

***

### screening?

> `optional` **screening?**: `object`

Defined in: [webhooks.ts:91](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L91)

Set when AML blocked its sender: Quasar refunds it to no one.

#### reasons

> **reasons**: `unknown`[]

#### status

> **status**: `"blocked"`

***

### senders

> **senders**: `string`[]

Defined in: [webhooks.ts:85](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L85)

The wallets that sent it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:81](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L81)

Its transaction.

***

### voided?

> `optional` **voided?**: `undefined`

Defined in: [webhooks.ts:77](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L77)

Not set: the transfer is held.

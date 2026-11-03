# PaymentWebhookHeldTransfer

Defined in: [webhooks.ts:68](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L68)

A transfer that reached the invoice's address without being tied to it by proof (`data.heldTransfer` of
`invoice.transfer_held`): it paid nothing and the invoice stays as it was. It is a record of its own, which you
refund as a whole to the wallet that sent it ([PaymentsModule.refundHeldTransfer](/packages/quasar-sdk/server/classes/PaymentsModule.md#refundheldtransfer)): `reason` is
`payer_mismatch` (another wallet than the one the quote was for) or `payer_unconfirmed` (the quoted wallet never
confirmed the invoice).

## Properties

### amount

> **amount**: `string` \| `null`

Defined in: [webhooks.ts:76](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L76)

What it carried, in base units of its token.

***

### id

> **id**: `string` \| `null`

Defined in: [webhooks.ts:72](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L72)

The held transfer ([HeldTransfer](/packages/quasar-sdk/server/interfaces/HeldTransfer.md)).

***

### late?

> `optional` **late?**: `true`

Defined in: [webhooks.ts:82](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L82)

It arrived after the invoice expired or was cancelled.

***

### reason

> **reason**: `"payer_mismatch"` \| `"payer_unconfirmed"` \| `null`

Defined in: [webhooks.ts:80](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L80)

Why it is tied to no invoice.

***

### screening?

> `optional` **screening?**: `object`

Defined in: [webhooks.ts:84](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L84)

Set when AML blocked its sender: Quasar refunds it to no one.

#### reasons

> **reasons**: `unknown`[]

#### status

> **status**: `"blocked"`

***

### senders

> **senders**: `string`[]

Defined in: [webhooks.ts:78](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L78)

The wallets that sent it.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [webhooks.ts:74](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L74)

Its transaction.

***

### voided?

> `optional` **voided?**: `undefined`

Defined in: [webhooks.ts:70](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L70)

Not set: the transfer is held.

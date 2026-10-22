# CheckoutStatusEvent

Defined in: [checkout/types.ts:381](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L381)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:389](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L389)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:385](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L385)

Number of ledger steps so far.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:391](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L391)

When the locked quote expires.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:383](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L383)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:387](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L387)

The payment transaction, once there is one.

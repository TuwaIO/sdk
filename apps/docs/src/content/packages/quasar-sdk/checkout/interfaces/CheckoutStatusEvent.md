# CheckoutStatusEvent

Defined in: [checkout/types.ts:362](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L362)

One `status` event of the checkout's event stream.

## Properties

### amountPaid

> **amountPaid**: `string` \| `null`

Defined in: [checkout/types.ts:370](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L370)

Amount received, in base units.

***

### ledgerSeq

> **ledgerSeq**: `number`

Defined in: [checkout/types.ts:366](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L366)

Number of ledger steps so far.

***

### quoteExpiresAt

> **quoteExpiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:372](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L372)

When the locked quote expires.

***

### status

> **status**: [`InvoiceStatus`](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)

Defined in: [checkout/types.ts:364](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L364)

State of the invoice.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [checkout/types.ts:368](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L368)

The payment transaction, once there is one.

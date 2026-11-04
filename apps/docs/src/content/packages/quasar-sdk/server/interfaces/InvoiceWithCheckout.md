# InvoiceWithCheckout

Defined in: [modules/payments/types.ts:378](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L378)

An invoice with its checkout token and payment page.

## Extended by

- [`InvoiceCorrection`](/packages/quasar-sdk/server/interfaces/InvoiceCorrection.md)

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:382](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L382)

The checkout token, `null` when the invoice can no longer be paid.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

Defined in: [modules/payments/types.ts:380](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L380)

The invoice.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:384](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L384)

The payment page, `null` without a token or when the node has no dashboard URL.

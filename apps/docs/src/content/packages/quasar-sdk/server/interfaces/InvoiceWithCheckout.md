# InvoiceWithCheckout

Defined in: [modules/payments/types.ts:359](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L359)

An invoice with its checkout token and payment page.

## Extended by

- [`InvoiceCorrection`](/packages/quasar-sdk/server/interfaces/InvoiceCorrection.md)

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:363](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L363)

The checkout token, `null` when the invoice can no longer be paid.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

Defined in: [modules/payments/types.ts:361](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L361)

The invoice.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:365](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L365)

The payment page, `null` without a token or when the node has no dashboard URL.

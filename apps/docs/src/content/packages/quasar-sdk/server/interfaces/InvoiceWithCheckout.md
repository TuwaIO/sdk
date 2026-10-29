# InvoiceWithCheckout

Defined in: [modules/payments/types.ts:373](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L373)

An invoice with its checkout token and payment page.

## Extended by

- [`InvoiceCorrection`](/packages/quasar-sdk/server/interfaces/InvoiceCorrection.md)

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:377](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L377)

The checkout token, `null` when the invoice can no longer be paid.

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

Defined in: [modules/payments/types.ts:375](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L375)

The invoice.

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:379](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L379)

The payment page, `null` without a token or when the node has no dashboard URL.

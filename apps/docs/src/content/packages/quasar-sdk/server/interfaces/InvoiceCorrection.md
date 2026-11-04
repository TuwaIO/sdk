# InvoiceCorrection

Defined in: [modules/payments/types.ts:390](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L390)

The answer of [PaymentsModule.correctInvoice](/packages/quasar-sdk/server/classes/PaymentsModule.md#correctinvoice): the corrected invoice and the one it replaces.

## Extends

- [`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md)

## Properties

### checkoutToken

> **checkoutToken**: `string` \| `null`

Defined in: [modules/payments/types.ts:384](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L384)

The checkout token, `null` when the invoice can no longer be paid.

#### Inherited from

[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md).[`checkoutToken`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md#checkouttoken)

***

### invoice

> **invoice**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

Defined in: [modules/payments/types.ts:382](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L382)

The invoice.

#### Inherited from

[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md).[`invoice`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md#invoice)

***

### payUrl

> **payUrl**: `string` \| `null`

Defined in: [modules/payments/types.ts:386](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L386)

The payment page, `null` without a token or when the node has no dashboard URL.

#### Inherited from

[`InvoiceWithCheckout`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md).[`payUrl`](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md#payurl)

***

### replaced

> **replaced**: [`Invoice`](/packages/quasar-sdk/server/interfaces/Invoice.md)

Defined in: [modules/payments/types.ts:392](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L392)

The invoice it replaces, now credited.

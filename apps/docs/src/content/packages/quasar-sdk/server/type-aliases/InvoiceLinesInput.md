# InvoiceLinesInput

> **InvoiceLinesInput** = \{ `amount?`: `never`; `description?`: `never`; `lineItems`: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]; \} \| \{ `amount`: `string`; `description?`: `string`; `lineItems?`: `never`; \}

Defined in: [modules/payments/types.ts:78](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L78)

The lines of an invoice: give either `lineItems` or a bare `amount`.

## Union Members

### Type Literal

\{ `amount?`: `never`; `description?`: `never`; `lineItems`: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]; \}

#### amount?

> `optional` **amount?**: `never`

#### description?

> `optional` **description?**: `never`

#### lineItems

> **lineItems**: [`InvoiceLineInput`](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)[]

The lines, 1 to 100.

***

### Type Literal

\{ `amount`: `string`; `description?`: `string`; `lineItems?`: `never`; \}

#### amount

> **amount**: `string`

A total as one line, as a decimal string (`'49.00'`).

#### description?

> `optional` **description?**: `string`

Name of that one line. Defaults to `Payment` (`Subscription` for a plan).

#### lineItems?

> `optional` **lineItems?**: `never`

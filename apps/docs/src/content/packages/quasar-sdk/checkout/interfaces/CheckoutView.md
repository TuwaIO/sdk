# CheckoutView

Defined in: checkout/types.ts:303

What the checkout token opens, as [CheckoutState.checkout](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#checkout) holds it.

## Properties

### autoCharge

> **autoCharge**: [`AutoChargeOffer`](/packages/quasar-sdk/checkout/type-aliases/AutoChargeOffer.md) \| `null`

Defined in: checkout/types.ts:324

The automatic-charge offer of a subscription invoice; `null` otherwise.

***

### buyer

> **buyer**: `object`

Defined in: checkout/types.ts:316

Whether the page collects the buyer: `collect` is `off`, `email` or `full`; `required` while the invoice document
waits for them; `companyInvoice` when the page may offer an invoice for a company.

#### collect

> **collect**: `"off"` \| `"email"` \| `"full"`

#### companyInvoice

> **companyInvoice**: `boolean`

#### required

> **required**: `boolean`

***

### invoice

> **invoice**: [`CheckoutInvoice`](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md)

Defined in: checkout/types.ts:311

The invoice.

***

### merchant

> **merchant**: [`CheckoutMerchant`](/packages/quasar-sdk/checkout/interfaces/CheckoutMerchant.md)

Defined in: checkout/types.ts:307

Who is paid and on what terms.

***

### methods

> **methods**: [`CheckoutMethod`](/packages/quasar-sdk/checkout/interfaces/CheckoutMethod.md)[]

Defined in: checkout/types.ts:318

The methods that take this invoice.

***

### object

> **object**: `"checkout"`

Defined in: checkout/types.ts:305

Always `checkout`.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: checkout/types.ts:322

The locked quote, if any.

***

### quoteTtlSeconds

> **quoteTtlSeconds**: `number`

Defined in: checkout/types.ts:320

How long a quote holds once locked, in seconds (never past the invoice deadline).

***

### theme

> **theme**: [`CheckoutTheme`](/packages/quasar-sdk/checkout/interfaces/CheckoutTheme.md)

Defined in: checkout/types.ts:309

The look the merchant chose.

# CheckoutView

Defined in: [checkout/types.ts:314](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L314)

What the checkout token opens, as [CheckoutState.checkout](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#checkout) holds it.

## Properties

### autoCharge

> **autoCharge**: [`AutoChargeOffer`](/packages/quasar-sdk/checkout/type-aliases/AutoChargeOffer.md) \| `null`

Defined in: [checkout/types.ts:337](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L337)

The automatic-charge offer of a subscription invoice; `null` otherwise.

***

### buyer

> **buyer**: `object`

Defined in: [checkout/types.ts:327](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L327)

Whether the page collects the buyer: `collect` is `off`, `email` or `full`; `required` while the invoice document
waits for them; `companyInvoice` when the page may offer an invoice for a company.

#### collect

> **collect**: `"off"` \| `"email"` \| `"full"`

#### companyInvoice

> **companyInvoice**: `boolean`

#### required

> **required**: `boolean`

***

### consent

> **consent**: [`CheckoutConsent`](/packages/quasar-sdk/checkout/interfaces/CheckoutConsent.md) \| `null`

Defined in: [checkout/types.ts:329](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L329)

The line the buyer ticks before paying; `null` when the merchant asks none.

***

### invoice

> **invoice**: [`CheckoutInvoice`](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md)

Defined in: [checkout/types.ts:322](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L322)

The invoice.

***

### merchant

> **merchant**: [`CheckoutMerchant`](/packages/quasar-sdk/checkout/interfaces/CheckoutMerchant.md)

Defined in: [checkout/types.ts:318](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L318)

Who is paid and on what terms.

***

### methods

> **methods**: [`CheckoutMethod`](/packages/quasar-sdk/checkout/interfaces/CheckoutMethod.md)[]

Defined in: [checkout/types.ts:331](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L331)

The methods that take this invoice.

***

### object

> **object**: `"checkout"`

Defined in: [checkout/types.ts:316](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L316)

Always `checkout`.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/types.ts:335](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L335)

The locked quote, if any.

***

### quoteTtlSeconds

> **quoteTtlSeconds**: `number`

Defined in: [checkout/types.ts:333](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L333)

How long a quote holds once locked, in seconds (never past the invoice deadline).

***

### theme

> **theme**: [`CheckoutTheme`](/packages/quasar-sdk/checkout/interfaces/CheckoutTheme.md)

Defined in: [checkout/types.ts:320](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L320)

The look the merchant chose.

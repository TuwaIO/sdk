# CheckoutView

Defined in: [checkout/types.ts:523](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L523)

What the checkout token opens, as [CheckoutState.checkout](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#checkout) holds it.

## Properties

### amlScreening

> **amlScreening**: `boolean`

Defined in: [checkout/types.ts:543](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L543)

`true` when the merchant checks paying wallets before payment (its AML mode is `block` or `flag`); the checkout
says so to the buyer only then.

***

### autoCharge

> **autoCharge**: [`AutoChargeOffer`](/packages/quasar-sdk/checkout/type-aliases/AutoChargeOffer.md) \| `null`

Defined in: [checkout/types.ts:556](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L556)

The automatic-charge offer of a subscription invoice; `null` otherwise.

***

### buyer

> **buyer**: `object`

Defined in: [checkout/types.ts:536](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L536)

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

Defined in: [checkout/types.ts:538](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L538)

The line the buyer ticks before paying; `null` when the merchant asks none.

***

### invoice

> **invoice**: [`CheckoutInvoice`](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md)

Defined in: [checkout/types.ts:531](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L531)

The invoice.

***

### merchant

> **merchant**: [`CheckoutMerchant`](/packages/quasar-sdk/checkout/interfaces/CheckoutMerchant.md)

Defined in: [checkout/types.ts:527](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L527)

Who is paid and on what terms.

***

### methods

> **methods**: [`CheckoutMethod`](/packages/quasar-sdk/checkout/interfaces/CheckoutMethod.md)[]

Defined in: [checkout/types.ts:545](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L545)

The methods that take this invoice.

***

### object

> **object**: `"checkout"`

Defined in: [checkout/types.ts:525](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L525)

Always `checkout`.

***

### payerProofs?

> `optional` **payerProofs?**: [`CheckoutPayerProof`](/packages/quasar-sdk/checkout/interfaces/CheckoutPayerProof.md)[]

Defined in: [checkout/types.ts:550](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L550)

The wallets that confirmed this invoice ([CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer)), oldest first: a page reopened with
one of them asks for no new signature. Quasar versions before October 29, 2026 leave it out.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/types.ts:554](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L554)

The locked quote, if any.

***

### quoteTtlSeconds

> **quoteTtlSeconds**: `number`

Defined in: [checkout/types.ts:552](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L552)

How long a quote holds once locked, in seconds (never past the invoice deadline).

***

### theme

> **theme**: [`CheckoutTheme`](/packages/quasar-sdk/checkout/interfaces/CheckoutTheme.md)

Defined in: [checkout/types.ts:529](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L529)

The look the merchant chose.

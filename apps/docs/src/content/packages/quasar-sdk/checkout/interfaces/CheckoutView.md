# CheckoutView

Defined in: [checkout/types.ts:524](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L524)

What the checkout token opens, as [CheckoutState.checkout](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#checkout) holds it.

## Properties

### amlScreening

> **amlScreening**: `boolean`

Defined in: [checkout/types.ts:544](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L544)

`true` when the merchant checks paying wallets before payment (its AML mode is `block` or `flag`); the checkout
says so to the buyer only then.

***

### autoCharge

> **autoCharge**: [`AutoChargeOffer`](/packages/quasar-sdk/checkout/type-aliases/AutoChargeOffer.md) \| `null`

Defined in: [checkout/types.ts:557](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L557)

The automatic-charge offer of a subscription invoice; `null` otherwise.

***

### buyer

> **buyer**: `object`

Defined in: [checkout/types.ts:537](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L537)

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

Defined in: [checkout/types.ts:539](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L539)

The line the buyer ticks before paying; `null` when the merchant asks none.

***

### invoice

> **invoice**: [`CheckoutInvoice`](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md)

Defined in: [checkout/types.ts:532](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L532)

The invoice.

***

### merchant

> **merchant**: [`CheckoutMerchant`](/packages/quasar-sdk/checkout/interfaces/CheckoutMerchant.md)

Defined in: [checkout/types.ts:528](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L528)

Who is paid and on what terms.

***

### methods

> **methods**: [`CheckoutMethod`](/packages/quasar-sdk/checkout/interfaces/CheckoutMethod.md)[]

Defined in: [checkout/types.ts:546](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L546)

The methods that take this invoice.

***

### object

> **object**: `"checkout"`

Defined in: [checkout/types.ts:526](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L526)

Always `checkout`.

***

### payerProofs?

> `optional` **payerProofs?**: [`CheckoutPayerProof`](/packages/quasar-sdk/checkout/interfaces/CheckoutPayerProof.md)[]

Defined in: [checkout/types.ts:551](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L551)

The wallets that confirmed this invoice ([CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer)), oldest first: a page reopened with
one of them asks for no new signature. Quasar versions before October 29, 2026 leave it out.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/types.ts:555](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L555)

The locked quote, if any.

***

### quoteTtlSeconds

> **quoteTtlSeconds**: `number`

Defined in: [checkout/types.ts:553](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L553)

How long a quote holds once locked, in seconds (never past the invoice deadline).

***

### theme

> **theme**: [`CheckoutTheme`](/packages/quasar-sdk/checkout/interfaces/CheckoutTheme.md)

Defined in: [checkout/types.ts:530](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L530)

The look the merchant chose.

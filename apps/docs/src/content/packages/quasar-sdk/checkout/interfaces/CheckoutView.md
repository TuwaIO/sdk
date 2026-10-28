# CheckoutView

Defined in: [checkout/types.ts:397](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L397)

What the checkout token opens, as [CheckoutState.checkout](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#checkout) holds it.

## Properties

### amlScreening

> **amlScreening**: `boolean`

Defined in: [checkout/types.ts:417](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L417)

`true` when the merchant checks paying wallets before payment (its AML mode is `block` or `flag`); the checkout
says so to the buyer only then.

***

### autoCharge

> **autoCharge**: [`AutoChargeOffer`](/packages/quasar-sdk/checkout/type-aliases/AutoChargeOffer.md) \| `null`

Defined in: [checkout/types.ts:425](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L425)

The automatic-charge offer of a subscription invoice; `null` otherwise.

***

### buyer

> **buyer**: `object`

Defined in: [checkout/types.ts:410](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L410)

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

Defined in: [checkout/types.ts:412](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L412)

The line the buyer ticks before paying; `null` when the merchant asks none.

***

### invoice

> **invoice**: [`CheckoutInvoice`](/packages/quasar-sdk/checkout/interfaces/CheckoutInvoice.md)

Defined in: [checkout/types.ts:405](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L405)

The invoice.

***

### merchant

> **merchant**: [`CheckoutMerchant`](/packages/quasar-sdk/checkout/interfaces/CheckoutMerchant.md)

Defined in: [checkout/types.ts:401](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L401)

Who is paid and on what terms.

***

### methods

> **methods**: [`CheckoutMethod`](/packages/quasar-sdk/checkout/interfaces/CheckoutMethod.md)[]

Defined in: [checkout/types.ts:419](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L419)

The methods that take this invoice.

***

### object

> **object**: `"checkout"`

Defined in: [checkout/types.ts:399](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L399)

Always `checkout`.

***

### quote

> **quote**: [`CheckoutQuote`](/packages/quasar-sdk/checkout/interfaces/CheckoutQuote.md) \| `null`

Defined in: [checkout/types.ts:423](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L423)

The locked quote, if any.

***

### quoteTtlSeconds

> **quoteTtlSeconds**: `number`

Defined in: [checkout/types.ts:421](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L421)

How long a quote holds once locked, in seconds (never past the invoice deadline).

***

### theme

> **theme**: [`CheckoutTheme`](/packages/quasar-sdk/checkout/interfaces/CheckoutTheme.md)

Defined in: [checkout/types.ts:403](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L403)

The look the merchant chose.

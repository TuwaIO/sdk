# CheckoutMerchant

Defined in: checkout/types.ts:102

Who is paid and on what terms, as the checkout shows it.

## Properties

### fundingUrl

> **fundingUrl**: `string` \| `null`

Defined in: checkout/types.ts:123

A page where buyers get the token to pay, shown when the wallet has too little.

***

### links

> **links**: `object`

Defined in: checkout/types.ts:121

The merchant's terms, refund policy and privacy notice (http(s) links only).

#### privacy

> **privacy**: `string` \| `null`

#### refundPolicy

> **refundPolicy**: `string` \| `null`

#### terms

> **terms**: `string` \| `null`

***

### logo

> **logo**: `boolean`

Defined in: checkout/types.ts:110

Whether the merchant has a logo: read it from the `logo` route ([CheckoutState.logoUrl](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#logourl)).

***

### name

> **name**: `string`

Defined in: checkout/types.ts:104

The name buyers know.

***

### seller

> **seller**: \{ `address`: `string` \| `null`; `country`: `string` \| `null`; `legalName`: `string` \| `null`; `registrationNumber`: `string` \| `null`; `taxId`: `string` \| `null`; `tradingName`: `string` \| `null`; \} \| `null`

Defined in: checkout/types.ts:112

The seller as the invoice document names them.

***

### supportEmail

> **supportEmail**: `string` \| `null`

Defined in: checkout/types.ts:108

Where buyers ask for help.

***

### website

> **website**: `string` \| `null`

Defined in: checkout/types.ts:106

Website, as an http(s) link.

# CheckoutMerchant

Defined in: [checkout/types.ts:225](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L225)

Who is paid and on what terms, as the checkout shows it.

## Properties

### fundingUrl

> **fundingUrl**: `string` \| `null`

Defined in: [checkout/types.ts:246](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L246)

A page where buyers get the token to pay, shown when the wallet has too little.

***

### links

> **links**: `object`

Defined in: [checkout/types.ts:244](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L244)

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

Defined in: [checkout/types.ts:233](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L233)

Whether the merchant has a logo: read it from the `logo` route ([CheckoutState.logoUrl](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#logourl)).

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:227](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L227)

The name buyers know.

***

### seller

> **seller**: \{ `address`: `string` \| `null`; `country`: `string` \| `null`; `legalName`: `string` \| `null`; `registrationNumber`: `string` \| `null`; `taxId`: `string` \| `null`; `tradingName`: `string` \| `null`; \} \| `null`

Defined in: [checkout/types.ts:235](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L235)

The seller as the invoice document names them.

***

### supportEmail

> **supportEmail**: `string` \| `null`

Defined in: [checkout/types.ts:231](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L231)

Where buyers ask for help.

***

### website

> **website**: `string` \| `null`

Defined in: [checkout/types.ts:229](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L229)

Website, as an http(s) link.

# CheckoutMerchant

Defined in: [checkout/types.ts:102](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L102)

Who is paid and on what terms, as the checkout shows it.

## Properties

### fundingUrl

> **fundingUrl**: `string` \| `null`

Defined in: [checkout/types.ts:123](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L123)

A page where buyers get the token to pay, shown when the wallet has too little.

***

### links

> **links**: `object`

Defined in: [checkout/types.ts:121](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L121)

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

Defined in: [checkout/types.ts:110](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L110)

Whether the merchant has a logo: read it from the `logo` route ([CheckoutState.logoUrl](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#logourl)).

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:104](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L104)

The name buyers know.

***

### seller

> **seller**: \{ `address`: `string` \| `null`; `country`: `string` \| `null`; `legalName`: `string` \| `null`; `registrationNumber`: `string` \| `null`; `taxId`: `string` \| `null`; `tradingName`: `string` \| `null`; \} \| `null`

Defined in: [checkout/types.ts:112](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L112)

The seller as the invoice document names them.

***

### supportEmail

> **supportEmail**: `string` \| `null`

Defined in: [checkout/types.ts:108](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L108)

Where buyers ask for help.

***

### website

> **website**: `string` \| `null`

Defined in: [checkout/types.ts:106](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L106)

Website, as an http(s) link.

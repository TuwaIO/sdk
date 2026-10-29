# CheckoutMerchant

Defined in: [checkout/types.ts:220](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L220)

Who is paid and on what terms, as the checkout shows it.

## Properties

### fundingUrl

> **fundingUrl**: `string` \| `null`

Defined in: [checkout/types.ts:241](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L241)

A page where buyers get the token to pay, shown when the wallet has too little.

***

### links

> **links**: `object`

Defined in: [checkout/types.ts:239](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L239)

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

Defined in: [checkout/types.ts:228](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L228)

Whether the merchant has a logo: read it from the `logo` route ([CheckoutState.logoUrl](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#logourl)).

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:222](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L222)

The name buyers know.

***

### seller

> **seller**: \{ `address`: `string` \| `null`; `country`: `string` \| `null`; `legalName`: `string` \| `null`; `registrationNumber`: `string` \| `null`; `taxId`: `string` \| `null`; `tradingName`: `string` \| `null`; \} \| `null`

Defined in: [checkout/types.ts:230](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L230)

The seller as the invoice document names them.

***

### supportEmail

> **supportEmail**: `string` \| `null`

Defined in: [checkout/types.ts:226](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L226)

Where buyers ask for help.

***

### website

> **website**: `string` \| `null`

Defined in: [checkout/types.ts:224](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L224)

Website, as an http(s) link.

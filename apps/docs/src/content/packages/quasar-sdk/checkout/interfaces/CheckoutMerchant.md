# CheckoutMerchant

Defined in: [checkout/types.ts:185](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L185)

Who is paid and on what terms, as the checkout shows it.

## Properties

### fundingUrl

> **fundingUrl**: `string` \| `null`

Defined in: [checkout/types.ts:206](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L206)

A page where buyers get the token to pay, shown when the wallet has too little.

***

### links

> **links**: `object`

Defined in: [checkout/types.ts:204](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L204)

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

Defined in: [checkout/types.ts:193](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L193)

Whether the merchant has a logo: read it from the `logo` route ([CheckoutState.logoUrl](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#logourl)).

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:187](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L187)

The name buyers know.

***

### seller

> **seller**: \{ `address`: `string` \| `null`; `country`: `string` \| `null`; `legalName`: `string` \| `null`; `registrationNumber`: `string` \| `null`; `taxId`: `string` \| `null`; `tradingName`: `string` \| `null`; \} \| `null`

Defined in: [checkout/types.ts:195](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L195)

The seller as the invoice document names them.

***

### supportEmail

> **supportEmail**: `string` \| `null`

Defined in: [checkout/types.ts:191](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L191)

Where buyers ask for help.

***

### website

> **website**: `string` \| `null`

Defined in: [checkout/types.ts:189](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L189)

Website, as an http(s) link.

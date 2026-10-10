# PaymentDocument

Defined in: [modules/payments/types.ts:502](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L502)

A downloaded document, byte for byte as issued.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [modules/payments/types.ts:504](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L504)

The file.

***

### contentType

> **contentType**: `string` \| `null`

Defined in: [modules/payments/types.ts:506](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L506)

Its media type, for example `application/pdf`.

***

### filename

> **filename**: `string` \| `null`

Defined in: [modules/payments/types.ts:508](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L508)

Its file name, from `Content-Disposition`.

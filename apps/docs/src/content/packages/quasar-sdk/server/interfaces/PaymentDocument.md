# PaymentDocument

Defined in: [modules/payments/types.ts:647](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L647)

A downloaded document, byte for byte as issued.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [modules/payments/types.ts:649](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L649)

The file.

***

### contentType

> **contentType**: `string` \| `null`

Defined in: [modules/payments/types.ts:651](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L651)

Its media type, for example `application/pdf`.

***

### filename

> **filename**: `string` \| `null`

Defined in: [modules/payments/types.ts:653](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L653)

Its file name, from `Content-Disposition`.

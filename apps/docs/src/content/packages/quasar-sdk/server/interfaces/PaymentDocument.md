# PaymentDocument

Defined in: [modules/payments/types.ts:538](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L538)

A downloaded document, byte for byte as issued.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [modules/payments/types.ts:540](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L540)

The file.

***

### contentType

> **contentType**: `string` \| `null`

Defined in: [modules/payments/types.ts:542](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L542)

Its media type, for example `application/pdf`.

***

### filename

> **filename**: `string` \| `null`

Defined in: [modules/payments/types.ts:544](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L544)

Its file name, from `Content-Disposition`.

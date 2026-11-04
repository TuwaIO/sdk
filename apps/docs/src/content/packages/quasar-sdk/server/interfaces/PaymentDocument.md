# PaymentDocument

Defined in: [modules/payments/types.ts:741](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L741)

A downloaded document, byte for byte as issued.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [modules/payments/types.ts:743](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L743)

The file.

***

### contentType

> **contentType**: `string` \| `null`

Defined in: [modules/payments/types.ts:745](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L745)

Its media type, for example `application/pdf`.

***

### filename

> **filename**: `string` \| `null`

Defined in: [modules/payments/types.ts:747](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L747)

Its file name, from `Content-Disposition`.

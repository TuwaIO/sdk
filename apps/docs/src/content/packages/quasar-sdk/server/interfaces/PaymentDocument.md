# PaymentDocument

Defined in: [modules/payments/types.ts:642](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L642)

A downloaded document, byte for byte as issued.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [modules/payments/types.ts:644](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L644)

The file.

***

### contentType

> **contentType**: `string` \| `null`

Defined in: [modules/payments/types.ts:646](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L646)

Its media type, for example `application/pdf`.

***

### filename

> **filename**: `string` \| `null`

Defined in: [modules/payments/types.ts:648](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L648)

Its file name, from `Content-Disposition`.

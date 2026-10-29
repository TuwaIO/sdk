# TransferAuthorizationTypedData

Defined in: [checkout/types.ts:402](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L402)

EIP-712 typed data of an EIP-3009 transfer authorization, ready for `eth_signTypedData_v4`.

## Properties

### domain

> **domain**: `Record`\<`string`, `unknown`\>

Defined in: [checkout/types.ts:404](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L404)

The token's EIP-712 domain.

***

### message

> **message**: `Record`\<`string`, `string`\>

Defined in: [checkout/types.ts:410](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L410)

The authorization: from the payer to the merchant, the quoted amount, a validity window and a nonce.

***

### primaryType

> **primaryType**: `string`

Defined in: [checkout/types.ts:408](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L408)

`TransferWithAuthorization`.

***

### types

> **types**: `Record`\<`string`, `object`[]\>

Defined in: [checkout/types.ts:406](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L406)

The types, with `EIP712Domain`.

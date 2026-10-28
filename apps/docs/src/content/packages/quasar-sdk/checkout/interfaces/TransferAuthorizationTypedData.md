# TransferAuthorizationTypedData

Defined in: [checkout/types.ts:292](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L292)

EIP-712 typed data of an EIP-3009 transfer authorization, ready for `eth_signTypedData_v4`.

## Properties

### domain

> **domain**: `Record`\<`string`, `unknown`\>

Defined in: [checkout/types.ts:294](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L294)

The token's EIP-712 domain.

***

### message

> **message**: `Record`\<`string`, `string`\>

Defined in: [checkout/types.ts:300](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L300)

The authorization: from the payer to the merchant, the quoted amount, a validity window and a nonce.

***

### primaryType

> **primaryType**: `string`

Defined in: [checkout/types.ts:298](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L298)

`TransferWithAuthorization`.

***

### types

> **types**: `Record`\<`string`, `object`[]\>

Defined in: [checkout/types.ts:296](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L296)

The types, with `EIP712Domain`.

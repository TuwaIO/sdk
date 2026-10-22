# TransferAuthorizationTypedData

Defined in: [checkout/types.ts:209](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L209)

EIP-712 typed data of an EIP-3009 transfer authorization, ready for `eth_signTypedData_v4`.

## Properties

### domain

> **domain**: `Record`\<`string`, `unknown`\>

Defined in: [checkout/types.ts:211](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L211)

The token's EIP-712 domain.

***

### message

> **message**: `Record`\<`string`, `string`\>

Defined in: [checkout/types.ts:217](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L217)

The authorization: from the payer to the merchant, the quoted amount, a validity window and a nonce.

***

### primaryType

> **primaryType**: `string`

Defined in: [checkout/types.ts:215](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L215)

`TransferWithAuthorization`.

***

### types

> **types**: `Record`\<`string`, `object`[]\>

Defined in: [checkout/types.ts:213](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L213)

The types, with `EIP712Domain`.

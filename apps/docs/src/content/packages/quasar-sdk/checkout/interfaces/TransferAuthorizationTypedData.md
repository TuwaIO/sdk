# TransferAuthorizationTypedData

Defined in: checkout/types.ts:198

EIP-712 typed data of an EIP-3009 transfer authorization, ready for `eth_signTypedData_v4`.

## Properties

### domain

> **domain**: `Record`\<`string`, `unknown`\>

Defined in: checkout/types.ts:200

The token's EIP-712 domain.

***

### message

> **message**: `Record`\<`string`, `string`\>

Defined in: checkout/types.ts:206

The authorization: from the payer to the merchant, the quoted amount, a validity window and a nonce.

***

### primaryType

> **primaryType**: `string`

Defined in: checkout/types.ts:204

`TransferWithAuthorization`.

***

### types

> **types**: `Record`\<`string`, `object`[]\>

Defined in: checkout/types.ts:202

The types, with `EIP712Domain`.

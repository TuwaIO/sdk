[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:130](https://github.com/TuwaIO/sdk/blob/7b4fa2d828783f8e5a64b9061a463e1a36db4ee9/packages/quasar-sdk/src/utils/auth.ts#L130)

Verifies a Mini-Session signature to protect API quota from unauthorized access.

This utility performs three checks:
1. Timestamp freshness (rejects if older than 5 minutes or in the future).
2. Cryptographic validity (checks if the signature matches the wallet address and message).
3. Ecosystem-specific logic (EVM via `viem`, Solana via `gill`).

## Parameters

### params

[`VerifySessionParams`](../interfaces/VerifySessionParams.md)

The verification parameters including address, signature, and timestamp.

## Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` if the signature is valid and fresh.

## Throws

If the required peer dependencies (`viem` or `gill`) are missing.

## Throws

If the timestamp is invalid or expired.

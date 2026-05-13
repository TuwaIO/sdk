[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:124](https://github.com/TuwaIO/sdk/blob/494fbc95844351c2656d7f175f4f1af1877ba7dc/packages/quasar-sdk/src/utils/auth.ts#L124)

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

[**@tuwaio/quasar-sdk**](../README.md)

***

# verifyMiniSession()

> **verifyMiniSession**(`params`): `Promise`\<`boolean`\>

Defined in: [packages/quasar-sdk/src/utils/auth.ts:180](https://github.com/TuwaIO/sdk/blob/908b7c04af95e7c3cc2d623fe77e4ed458145298/packages/quasar-sdk/src/utils/auth.ts#L180)

Verifies a Mini-Session signature to protect API quota from unauthorized access.

This utility performs three checks:
1. Timestamp freshness (rejects if older than 5 minutes or in the future).
2. Cryptographic validity (checks if the signature matches the wallet address and message).
3. ecosystem-specific logic (EVM via `viem`, Solana via `gill`).

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

## Example

```typescript
const isValid = await verifyMiniSession({
  walletAddress: '0x...',
  timestamp: '2026-05-13T10:00:00.000Z',
  signature: '0x...',
  chainType: 'evm',
});
```

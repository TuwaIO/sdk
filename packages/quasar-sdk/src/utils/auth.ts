/**
 * @module utils/auth
 * @description Security utilities for Mini-Session signature verification.
 */

import { ChainType, SignSessionParams, VerifySessionParams } from '../types';

/**
 * Default maximum allowed age for a signature (5 minutes).
 * @internal
 */
const DEFAULT_MAX_AGE = 5 * 60 * 1000;

/**
 * Allowed clock drift for future timestamps (1 minute).
 * @internal
 */
const CLOCK_DRIFT = 60 * 1000;

/**
 * Standardizes the message format for Mini-Session login.
 * Both frontend and backend must use this exact template.
 *
 * @param timestamp - ISO string timestamp (e.g., `new Date().toISOString()`).
 * @returns The formatted message string to be signed.
 *
 * @example
 * ```typescript
 * const msg = createMiniSessionMessage(new Date().toISOString());
 * // msg -> "Mini-Session Login: 2026-05-13T10:00:00.000Z"
 * ```
 */
export function createMiniSessionMessage(timestamp: string): string {
  return `Mini-Session Login: ${timestamp}`;
}

/**
 * Result of a mini-session signing operation.
 */
export interface SignSessionResult {
  /** The cryptographic signature. */
  signature: string;
  /** The ISO timestamp used to generate the message. */
  timestamp: string;
}

/**
 * Triggers a signature request in the connected wallet to create a Mini-Session.
 *
 * This is a frontend-friendly helper that:
 * 1. Generates a fresh ISO timestamp.
 * 2. Formats the standard login message.
 * 3. Triggers the wallet's signMessage method.
 * 4. Returns the signature and timestamp for verification on the backend.
 *
 * @param params - The signing parameters including the signer and ecosystem type.
 * @returns A promise that resolves to the signature and timestamp.
 * @throws {Error} If the required peer dependencies are missing or signing fails.
 */
export async function signMiniSession(params: SignSessionParams): Promise<SignSessionResult> {
  const timestamp = new Date().toISOString();
  const message = createMiniSessionMessage(timestamp);

  // 1. EVM Signing
  if (params.chainType === ChainType.EVM) {
    if (!params.walletAddress) {
      throw new Error('[SDK] walletAddress is required for EVM signing.');
    }

    try {
      // We assume the signer has a signMessage method (standard for viem WalletClient)
      const signature = await params.signer.signMessage({
        account: params.walletAddress as `0x${string}`,
        message,
      });
      return { signature, timestamp };
    } catch (err) {
      throw new Error(`[SDK] EVM signing failed: ${(err as Error).message}`, { cause: err });
    }
  }

  // 2. Solana Signing
  if (params.chainType === ChainType.SOLANA) {
    let gill;
    try {
      gill = await import('gill');
    } catch (e) {
      throw new Error('[SDK] Peer dependency "gill" is required for Solana signing.', { cause: e });
    }

    try {
      // Prepare message as bytes using gill's encoder
      const encoder = gill.getUtf8Encoder();
      const messageBytes = encoder.encode(message);

      // Sign the message (returns SignMessagesOutput[])
      const [output] = await params.signer.signMessages([messageBytes]);

      if (!output || !output.signature) {
        throw new Error('[SDK] Wallet returned invalid signature output.', { cause: output });
      }

      // Convert bytes to base58 string for the API
      // We cast to any to satisfy the branded type requirement of gill (Solana Web3 v2)
      const signature = gill.getSignatureFromBytes(output.signature as any);

      return { signature, timestamp };
    } catch (err) {
      throw new Error(`[SDK] Solana signing failed: ${(err as Error).message}`, { cause: err });
    }
  }

  throw new Error(`[SDK] Unsupported chain type: ${params.chainType}`);
}

/**
 * Verifies a Mini-Session signature to protect API quota from unauthorized access.
 *
 * This utility performs three checks:
 * 1. Timestamp freshness (rejects if older than 5 minutes or in the future).
 * 2. Cryptographic validity (checks if the signature matches the wallet address and message).
 * 3. Ecosystem-specific logic (EVM via `viem`, Solana via `gill`).
 *
 * @param params - The verification parameters including address, signature, and timestamp.
 * @returns A promise that resolves to `true` if the signature is valid and fresh.
 * @throws {Error} If the required peer dependencies (`viem` or `gill`) are missing.
 * @throws {Error} If the timestamp is invalid or expired.
 */
export async function verifyMiniSession(params: VerifySessionParams): Promise<boolean> {
  const requestTime = new Date(params.timestamp).getTime();
  const now = Date.now();

  // 1. Replay & Freshness Protection
  if (isNaN(requestTime)) {
    throw new Error('[SDK] Invalid timestamp format. Use ISO string.');
  }

  const allowedAge = params.maxAge ?? DEFAULT_MAX_AGE;
  if (now - requestTime > allowedAge) {
    throw new Error('[SDK] Signature expired. Please sign a fresh message.');
  }

  if (requestTime > now + CLOCK_DRIFT) {
    throw new Error('[SDK] Timestamp is in the future. Check your system clock.');
  }

  const message = createMiniSessionMessage(params.timestamp);

  // 2. EVM Verification
  if (params.chainType === ChainType.EVM) {
    let viem;
    try {
      viem = await import('viem');
    } catch (e) {
      throw new Error('[SDK] Peer dependency "viem" is required for EVM verification.', { cause: e });
    }

    return await viem.verifyMessage({
      address: params.walletAddress as `0x${string}`,
      message,
      signature: params.signature as `0x${string}`,
    });
  }

  // 3. Solana Verification
  if (params.chainType === ChainType.SOLANA) {
    let gill;
    try {
      gill = await import('gill');
    } catch (e) {
      throw new Error('[SDK] Peer dependency "gill" is required for Solana verification.', { cause: e });
    }

    try {
      // gill's verifySignatureForAddress is a high-level helper that handles
      // address (string), signature (base58 string), and message (string) directly.
      return await gill.verifySignatureForAddress(gill.address(params.walletAddress), params.signature, message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Return false for malformed signatures or invalid addresses
      return false;
    }
  }

  return false;
}

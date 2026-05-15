/**
 * @module utils/auth
 * @description Security utilities for Mini-Session signature creation and verification.
 * Supports dual-ecosystem (EVM & Solana) authentication flows with strict type safety.
 */

import {
  ChainType,
  EvmSigner,
  SignSessionParams,
  SignSessionResult,
  SolanaSigner,
  VerifySessionParams,
} from '../types';

/**
 * Default maximum allowed age for a signature (5 minutes).
 * Prevents replay attacks using stale signatures.
 * @internal
 */
export const DEFAULT_MAX_AGE = 5 * 60 * 1000;

/**
 * Allowed clock drift for future timestamps (1 minute).
 * Accounts for slight synchronization issues between client and server.
 * @internal
 */
const CLOCK_DRIFT = 60 * 1000;

/**
 * Safety buffer subtracted from DEFAULT_MAX_AGE during cache validation.
 * Ensures the session is refreshed before it expires on the server,
 * accounting for network round-trip latency between client cache check
 * and server-side verifyMiniSession call.
 * @public
 */
export const NETWORK_SAFETY_BUFFER = 30 * 1000;

/**
 * Standardizes the message format for Mini-Session authentication.
 * Both frontend and backend MUST use this exact template for verification to pass.
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
 * Triggers a signature request in the connected wallet to create a Mini-Session.
 *
 * This function detects the signer's capabilities and uses the most appropriate
 * signing method available (e.g., Web3 v2, Standard, or Legacy).
 *
 * @param params - Parameters containing the signer and target ecosystem.
 * @returns A promise resolving to the signature and timestamp.
 * @throws {Error} If signing fails or the signer lacks required methods.
 *
 * @public
 */
export async function signMiniSession(params: SignSessionParams): Promise<SignSessionResult> {
  const timestamp = new Date().toISOString();
  const message = createMiniSessionMessage(timestamp);

  // 1. EVM Implementation
  if (params.chainType === ChainType.EVM) {
    const evmSigner = params.signer as EvmSigner;
    try {
      const signature = await evmSigner.signMessage({
        account: params.walletAddress as `0x${string}`,
        message,
      });
      return { signature, timestamp };
    } catch (err) {
      throw new Error(`[SDK] EVM signing failed: ${(err as Error).message}`, { cause: err });
    }
  }

  // 2. Solana Implementation
  if (params.chainType === ChainType.SOLANA) {
    const solanaSigner = params.signer as SolanaSigner;
    let gill: typeof import('gill');
    try {
      gill = await import('gill');
    } catch (e) {
      throw new Error('[SDK] Peer dependency "gill" is required for Solana signing.', { cause: e });
    }

    try {
      const encoder = gill.getUtf8Encoder();
      const messageBytes = encoder.encode(message) as unknown as Uint8Array;

      let signatureBytes: Uint8Array;

      // Case A: Modern Web3 v2 (MessageModifyingSigner)
      if (solanaSigner.modifyAndSignMessages) {
        const signableMessage = gill.createSignableMessage(
          messageBytes as unknown as Parameters<typeof gill.createSignableMessage>[0],
        );
        const [signedMessage] = await solanaSigner.modifyAndSignMessages([signableMessage]);
        const signature = signedMessage.signatures[solanaSigner.address];
        if (!signature) {
          throw new Error(`[SDK] Signature missing for address: ${solanaSigner.address}`);
        }
        // Modern signatures are often ReadonlyUint8Array, we cast to mutable Uint8Array for helper compatibility
        signatureBytes = signature as unknown as Uint8Array;
      }
      // Case B: Wallet Standard (signMessages)
      else if (solanaSigner.signMessages) {
        const [output] = await solanaSigner.signMessages([messageBytes as unknown as Uint8Array]);
        if (!output?.signature) {
          throw new Error('[SDK] Wallet returned invalid signMessages output.');
        }
        signatureBytes = output.signature as unknown as Uint8Array;
      }
      // Case C: Legacy (signMessage)
      else if (solanaSigner.signMessage) {
        signatureBytes = (await solanaSigner.signMessage(
          messageBytes as unknown as Uint8Array,
        )) as unknown as Uint8Array;
      } else {
        throw new Error('[SDK] Signer lacks message signing capabilities.');
      }

      // Convert to base58 using gill's standard conversion logic.
      const signature = gill.getSignatureFromBytes(
        signatureBytes as unknown as Parameters<typeof gill.getSignatureFromBytes>[0],
      );

      return { signature, timestamp };
    } catch (err) {
      throw new Error(`[SDK] Solana signing failed: ${(err as Error).message}`, { cause: err });
    }
  }

  throw new Error(`[SDK] Unsupported chain type: ${params.chainType}`);
}

/**
 * Verifies a Mini-Session signature for authenticity and freshness.
 *
 * Performs cryptographic verification against the provided wallet address and
 * ensures the signature hasn't expired according to the `maxAge` parameter.
 *
 * @param params - Verification data including signature and timestamp.
 * @returns A promise resolving to true if the session is valid.
 *
 * @public
 */
export async function verifyMiniSession(params: VerifySessionParams): Promise<boolean> {
  const requestTime = new Date(params.timestamp).getTime();
  const now = Date.now();

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

  // 1. EVM Verification
  if (params.chainType === ChainType.EVM) {
    let viem: typeof import('viem');
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

  // 2. Solana Verification
  if (params.chainType === ChainType.SOLANA) {
    let gill: typeof import('gill');
    try {
      gill = await import('gill');
    } catch (e) {
      throw new Error('[SDK] Peer dependency "gill" is required for Solana verification.', { cause: e });
    }

    try {
      const solanaAddress = gill.address(params.walletAddress);
      return await gill.verifySignatureForAddress(solanaAddress, params.signature, message);
    } catch {
      return false;
    }
  }

  return false;
}

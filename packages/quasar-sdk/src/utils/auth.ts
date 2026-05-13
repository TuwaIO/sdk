/**
 * @module utils/auth
 * @description Security utilities for Mini-Session signature verification.
 */

/**
 * Parameters for verifying a mini-session signature.
 */
export interface VerifySessionParams {
  /** The wallet address that allegedly signed the message. */
  walletAddress: string;
  /** ISO string timestamp matching the one used in the message. */
  timestamp: string;
  /** The cryptographic signature (hex for EVM, base58 for Solana). */
  signature: string;
  /** The blockchain ecosystem type. */
  chainType: 'evm' | 'solana';
  /** 
   * Maximum allowed age for the signature in milliseconds.
   * Default: 5 minutes (300,000ms).
   */
  maxAge?: number;
}

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
 * Standardizes the message format for Quasar Mini-Session login.
 * Both frontend and backend must use this exact template.
 *
 * @param timestamp - ISO string timestamp (e.g., `new Date().toISOString()`).
 * @returns The formatted message string to be signed.
 *
 * @example
 * ```typescript
 * const msg = createMiniSessionMessage(new Date().toISOString());
 * // msg -> "Quasar Login: 2026-05-13T10:00:00.000Z"
 * ```
 */
export function createMiniSessionMessage(timestamp: string): string {
  return `Quasar Login: ${timestamp}`;
}

/**
 * Parameters for signing a mini-session message.
 */
export interface SignSessionParams {
  /** The signer object. For EVM, a `WalletClient`. For Solana, a `KeyPairSigner` or `TransactionSendingSigner`. */
  signer: any;
  /** The wallet address to sign with (required for EVM). */
  walletAddress?: string;
  /** The blockchain ecosystem type. */
  chainType: 'evm' | 'solana';
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
 * 2. Formats the standard Quasar login message.
 * 3. Triggers the wallet's signMessage method.
 * 4. Returns the signature and timestamp for verification on the backend.
 *
 * @param params - The signing parameters including the signer and ecosystem type.
 * @returns A promise that resolves to the signature and timestamp.
 * @throws {Error} If the required peer dependencies are missing or signing fails.
 *
 * @example
 * ```typescript
 * // EVM (viem)
 * const { signature, timestamp } = await signMiniSession({
 *   signer: walletClient,
 *   walletAddress: '0x...',
 *   chainType: 'evm',
 * });
 *
 * // Solana (gill)
 * const { signature, timestamp } = await signMiniSession({
 *   signer: keypairSigner,
 *   chainType: 'solana',
 * });
 * ```
 */
export async function signMiniSession(params: SignSessionParams): Promise<SignSessionResult> {
  const timestamp = new Date().toISOString();
  const message = createMiniSessionMessage(timestamp);

  // 1. EVM Signing
  if (params.chainType === 'evm') {
    if (!params.walletAddress) {
      throw new Error('[Quasar SDK] walletAddress is required for EVM signing.');
    }

    try {
      // We assume the signer has a signMessage method (standard for viem WalletClient)
      const signature = await params.signer.signMessage({
        account: params.walletAddress as `0x${string}`,
        message,
      });
      return { signature, timestamp };
    } catch (err) {
      throw new Error(`[Quasar SDK] EVM signing failed: ${(err as Error).message}`, { cause: err });
    }
  }

  // 2. Solana Signing
  if (params.chainType === 'solana') {
    let gill;
    try {
      gill = await import('gill');
    } catch (e) {
      throw new Error('[Quasar SDK] Peer dependency "gill" is required for Solana signing.', { cause: e });
    }

    try {
      // Prepare message as bytes using gill's encoder
      const encoder = gill.getUtf8Encoder();
      const messageBytes = encoder.encode(message);

      // Sign the message (returns SignatureBytes[])
      const [signatureBytes] = await params.signer.signMessages([messageBytes]);

      // Convert bytes to base58 string for the API
      const signature = gill.getSignatureFromBytes(signatureBytes);

      return { signature, timestamp };
    } catch (err) {
      throw new Error(`[Quasar SDK] Solana signing failed: ${(err as Error).message}`, { cause: err });
    }
  }

  throw new Error(`[Quasar SDK] Unsupported chain type: ${params.chainType}`);
}

/**
 * Verifies a Mini-Session signature to protect API quota from unauthorized access.
 *
 * This utility performs three checks:
 * 1. Timestamp freshness (rejects if older than 5 minutes or in the future).
 * 2. Cryptographic validity (checks if the signature matches the wallet address and message).
 * 3. ecosystem-specific logic (EVM via `viem`, Solana via `gill`).
 *
 * @param params - The verification parameters including address, signature, and timestamp.
 * @returns A promise that resolves to `true` if the signature is valid and fresh.
 * @throws {Error} If the required peer dependencies (`viem` or `gill`) are missing.
 * @throws {Error} If the timestamp is invalid or expired.
 *
 * @example
 * ```typescript
 * const isValid = await verifyMiniSession({
 *   walletAddress: '0x...',
 *   timestamp: '2026-05-13T10:00:00.000Z',
 *   signature: '0x...',
 *   chainType: 'evm',
 * });
 * ```
 */
export async function verifyMiniSession(params: VerifySessionParams): Promise<boolean> {
  const requestTime = new Date(params.timestamp).getTime();
  const now = Date.now();

  // 1. Replay & Freshness Protection
  if (isNaN(requestTime)) {
    throw new Error('[Quasar SDK] Invalid timestamp format. Use ISO string.');
  }

  const allowedAge = params.maxAge ?? DEFAULT_MAX_AGE;
  if (now - requestTime > allowedAge) {
    throw new Error('[Quasar SDK] Signature expired. Please sign a fresh message.');
  }

  if (requestTime > now + CLOCK_DRIFT) {
    throw new Error('[Quasar SDK] Timestamp is in the future. Check your system clock.');
  }

  const message = createMiniSessionMessage(params.timestamp);

  // 2. EVM Verification
  if (params.chainType === 'evm') {
    let viem;
    try {
      viem = await import('viem');
    } catch (e) {
      throw new Error('[Quasar SDK] Peer dependency "viem" is required for EVM verification.', { cause: e });
    }

    return await viem.verifyMessage({
      address: params.walletAddress as `0x${string}`,
      message,
      signature: params.signature as `0x${string}`,
    });
  }

  // 3. Solana Verification
  if (params.chainType === 'solana') {
    let gill;
    try {
      gill = await import('gill');
    } catch (e) {
      throw new Error('[Quasar SDK] Peer dependency "gill" is required for Solana verification.', { cause: e });
    }

    try {
      // gill's verifySignatureForAddress is a high-level helper that handles
      // address (string), signature (base58 string), and message (string) directly.
      // It uses the modern @solana/kit v2 infrastructure internally.
      return await gill.verifySignatureForAddress(gill.address(params.walletAddress), params.signature, message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Return false for malformed signatures or invalid addresses
      return false;
    }
  }

  return false;
}

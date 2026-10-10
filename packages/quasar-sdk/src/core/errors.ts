/**
 * @file Errors of the Quasar SDK: the error a failed request throws, and how an `ofetch` error becomes one.
 */

import type { FetchError } from 'ofetch';

/** A field of a request the API refused, and why: `path` names it with dots (`buyer.country`). */
export interface QuasarRequestIssue {
  /** The field, for example `buyer.country`. */
  path: string;
  /** Why it was refused. */
  message: string;
}

/**
 * Error thrown by the methods of the {@link Quasar} client when a request fails: an HTTP error status, a timeout or a
 * network error. The Payments API also names the refusal with a stable `code` and, for an invalid request, the fields
 * at fault (`issues`).
 *
 * @example
 * ```typescript
 * try {
 *   await quasar.pulsar.getHistory();
 * } catch (err) {
 *   if (err instanceof QuasarSDKError) {
 *     console.error(err.status);        // e.g. 401
 *     console.error(err.message);       // "[Quasar SDK] Request Failed (401): <error of the API>"
 *     console.error(err.originalError); // FetchError from ofetch
 *   }
 * }
 * ```
 */
export class QuasarSDKError extends Error {
  /** HTTP status code of the response, or `undefined` when no response was received. */
  public readonly status: number | undefined;

  /** The error thrown by `ofetch`. */
  public readonly originalError: Error;

  /** Stable code of the refusal, for example `invoice_not_found`; `undefined` when the API gave none. */
  public readonly code: string | undefined;

  /** The fields of an invalid request and why each was refused (code `invalid_request`). */
  public readonly issues: QuasarRequestIssue[] | undefined;

  /** Further fields of the refusal (for example `reason` of `auto_charge_unavailable`). */
  public readonly details: Record<string, unknown> | undefined;

  /**
   * Creates the error.
   *
   * @param message - Message: `[Quasar SDK] Request Failed (<status>): <error>`, where `<error>` is the `error` field of
   *   the response body or the message of the fetch error.
   * @param status - HTTP status code, or `undefined` when no response was received.
   * @param originalError - The error thrown by `ofetch`.
   * @param refusal - The code, issues and further fields of the refusal, when the API named them.
   */
  constructor(
    message: string,
    status: number | undefined,
    originalError: Error,
    refusal: { code?: string; issues?: QuasarRequestIssue[]; details?: Record<string, unknown> } = {},
  ) {
    super(message);
    this.name = 'QuasarSDKError';
    this.status = status;
    this.originalError = originalError;
    this.code = refusal.code;
    this.issues = refusal.issues;
    this.details = refusal.details;
  }
}

/**
 * Wraps an `ofetch` error in a {@link QuasarSDKError}. Reads the error bodies of the API: `{ error: '…' }`, the
 * Payments API's `{ error: { code, message, issues?, … } }` (also from a download, whose body arrives as bytes) and
 * the engine's `{ statusCode, message }` (for example the rate limit, 429).
 * Side effect: logs a `console.error` on a 401 or 403 status without a Payments `code` (the key was refused).
 *
 * @param error - The error thrown by `ofetch`.
 * @returns The wrapped error.
 * @internal
 */
export function toQuasarSDKError(error: unknown): QuasarSDKError {
  const fetchError = error as FetchError;

  const status = fetchError.statusCode ?? fetchError.response?.status;
  const data = bodyOf(fetchError.data ?? fetchError.response?._data);
  const refusal = data?.error;
  let message = fetchError.message ?? 'Unknown Error';
  let details: { code?: string; issues?: QuasarRequestIssue[]; details?: Record<string, unknown> } = {};
  if (typeof refusal === 'string') {
    message = refusal;
  } else if (typeof refusal === 'object' && refusal !== null) {
    const { code, message: text, issues, ...rest } = refusal as Record<string, unknown>;
    if (typeof text === 'string') message = text;
    details = {
      code: typeof code === 'string' ? code : undefined,
      issues: Array.isArray(issues) ? (issues as QuasarRequestIssue[]) : undefined,
      details: Object.keys(rest).length > 0 ? rest : undefined,
    };
  } else if (typeof data?.message === 'string') {
    // The engine's own refusals (rate limit, authentication): `{ statusCode, message }`
    message = data.message;
  }

  // A Payments refusal names itself (`payer_blocked`, `origin_not_allowed`…); only the key check has no code
  if ((status === 401 || status === 403) && !details.code) {
    console.error('🚨 [Quasar SDK] Auth Error. Check your Secret Key and scopes.');
  }

  return new QuasarSDKError(`[Quasar SDK] Request Failed (${status}): ${message}`, status, fetchError, details);
}

/** An error body as an object: parsed JSON, or the bytes of a download decoded and parsed; `undefined` otherwise. */
function bodyOf(data: unknown): Record<string, unknown> | undefined {
  let value = data;
  if (value instanceof ArrayBuffer || value instanceof Uint8Array) {
    try {
      value = JSON.parse(new TextDecoder().decode(value));
    } catch {
      return undefined;
    }
  }
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : undefined;
}

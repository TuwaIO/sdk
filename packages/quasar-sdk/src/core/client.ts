/**
 * @module core/client
 * @description Core HTTP client for the Quasar SDK.
 * Handles authenticated requests through the Iron Dome security perimeter
 * and provides structured error handling for all API interactions.
 */

import { type FetchError, type FetchOptions, ofetch } from 'ofetch';

import { BASE_API_URL } from '../constants';
import { QuasarConfig } from '../types';

/**
 * Custom error class for all Quasar SDK API failures.
 *
 * Wraps the underlying HTTP error with a structured format including
 * status code, human-readable message, and the original error reference.
 *
 * @example
 * ```typescript
 * try {
 *   await quasar.pulsar.getHistory();
 * } catch (err) {
 *   if (err instanceof QuasarSDKError) {
 *     console.error(err.status);        // e.g. 401
 *     console.error(err.message);       // "[Quasar SDK] Request Failed (401): Unauthorized"
 *     console.error(err.originalError); // Raw FetchError from ofetch
 *   }
 * }
 * ```
 */
export class QuasarSDKError extends Error {
  /** HTTP status code returned by the API, if available. */
  public readonly status: number | undefined;

  /** The original error thrown by the HTTP client. */
  public readonly originalError: Error;

  /**
   * Creates a new QuasarSDKError instance.
   *
   * @param message - Formatted error message with SDK prefix and status.
   * @param status - HTTP status code, or `undefined` if unavailable.
   * @param originalError - The raw error from the HTTP layer.
   */
  constructor(message: string, status: number | undefined, originalError: Error) {
    super(message);
    this.name = 'QuasarSDKError';
    this.status = status;
    this.originalError = originalError;
  }
}

/**
 * Internal HTTP client for the Quasar Cloud API.
 *
 * Manages authenticated requests by injecting the `x-tuwa-secret-key` header
 * into every outgoing request. Uses `ofetch` as the transport layer.
 *
 * @remarks
 * This class is not exported from the public API surface.
 * Consumers interact with it indirectly through the {@link Quasar} entry point.
 *
 * @internal
 */
export class QuasarClient {
  /** The secret API key used for authentication. */
  private readonly secretKey: string;

  /** The base URL for all API requests. */
  private readonly baseUrl: string;

  /** Request timeout in milliseconds. */
  private readonly timeout: number;

  /**
   * Creates a new QuasarClient instance.
   *
   * @param config - SDK configuration containing the secret key and optional overrides.
   * @throws {Error} If `config.secretKey` is missing or empty.
   */
  constructor(config: QuasarConfig) {
    if (!config.secretKey) {
      throw new Error('[Quasar SDK] Missing API Key. Provide a secretKey starting with sk_live_.');
    }
    this.secretKey = config.secretKey;
    this.baseUrl = config.baseUrl || BASE_API_URL;
    this.timeout = config.timeout || 10000;
  }

  /**
   * Sends an authenticated request to the Quasar Cloud API.
   *
   * Automatically injects Iron Dome headers (`x-tuwa-secret-key`, `Content-Type`)
   * and wraps all transport errors into {@link QuasarSDKError}.
   *
   * @typeParam T - Expected response body type.
   * @param path - API endpoint path (e.g. `/api/v1/engine/tx-sync`).
   * @param options - Fetch options (method, body, query, headers, etc.).
   *                  `baseURL` and `timeout` are managed internally and cannot be overridden.
   * @returns The parsed JSON response body typed as `T`.
   * @throws {QuasarSDKError} On any HTTP or network error.
   */
  public async request<T>(path: string, options: Omit<FetchOptions<'json'>, 'baseURL' | 'timeout'> = {}): Promise<T> {
    try {
      return await ofetch<T>(path, {
        baseURL: this.baseUrl,
        timeout: this.timeout,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'x-tuwa-secret-key': this.secretKey,
          ...options.headers,
        },
      });
    } catch (error) {
      throw this.buildError(error);
    }
  }

  /**
   * Transforms a raw fetch error into a structured {@link QuasarSDKError}.
   *
   * Extracts status code and error message from the response body or fallback fields.
   * Logs a console warning for authentication failures (401/403).
   *
   * @param error - The raw error caught from `ofetch`.
   * @returns A formatted QuasarSDKError instance.
   */
  private buildError(error: unknown): QuasarSDKError {
    const fetchError = error as FetchError;

    const status = fetchError.statusCode ?? fetchError.response?.status;
    const data = fetchError.data ?? fetchError.response?._data;
    const message = (data as Record<string, string> | undefined)?.error ?? fetchError.message ?? 'Unknown Error';

    if (status === 401 || status === 403) {
      console.error('🚨 [Quasar SDK] Auth Error. Check your Secret Key and scopes.');
    }

    return new QuasarSDKError(`[Quasar SDK] Request Failed (${status}): ${message}`, status, fetchError);
  }
}

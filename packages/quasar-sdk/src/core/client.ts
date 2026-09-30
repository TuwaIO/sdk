/**
 * @file HTTP client of the Quasar SDK: authentication headers, timeout and errors.
 */

import { type FetchError, type FetchOptions, ofetch } from 'ofetch';

import { BASE_API_URL } from '../constants';
import type { QuasarConfig } from '../types';

/**
 * Error thrown by the methods of the {@link Quasar} client when a request fails: an HTTP error status, a timeout or a
 * network error.
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

  /**
   * Creates the error.
   *
   * @param message - Message: `[Quasar SDK] Request Failed (<status>): <error>`, where `<error>` is the `error` field of
   *   the response body or the message of the fetch error.
   * @param status - HTTP status code, or `undefined` when no response was received.
   * @param originalError - The error thrown by `ofetch`.
   */
  constructor(message: string, status: number | undefined, originalError: Error) {
    super(message);
    this.name = 'QuasarSDKError';
    this.status = status;
    this.originalError = originalError;
  }
}

/**
 * HTTP client shared by the modules of the {@link Quasar} client. Sends every request with the `x-tuwa-secret-key`
 * header (and `x-internal-secret` when configured) through `ofetch`.
 *
 * @internal
 */
export class QuasarClient {
  /** The secret API key used for authentication. */
  private readonly secretKey: string;

  /** Optional internal secret sent as `x-internal-secret` when provided. */
  private readonly internalSecret?: string;

  /** The base URL for all API requests. */
  private readonly baseUrl: string;

  /** Request timeout in milliseconds. */
  private readonly timeout: number;

  /**
   * Creates the client.
   *
   * @param config - Secret key and optional overrides.
   * @throws {Error} If `config.secretKey` is empty.
   */
  constructor(config: QuasarConfig) {
    if (!config.secretKey) {
      throw new Error('[Quasar SDK] Missing API Key. Provide the secretKey of your Quasar app (sk_live_ or sk_test_).');
    }

    this.secretKey = config.secretKey;
    this.internalSecret = config.internalSecret;
    this.baseUrl = config.baseUrl || BASE_API_URL;
    this.timeout = config.timeout || 10000;
  }

  /**
   * Sends a request with the `Content-Type: application/json` and `x-tuwa-secret-key` headers (and
   * `x-internal-secret` when configured).
   *
   * @typeParam T - Type of the response body.
   * @param path - Endpoint path, for example `/v1/engine/pulsar/sync`.
   * @param options - `ofetch` options (method, body, query, headers). `baseURL` and `timeout` come from the config.
   * @returns The parsed JSON response body.
   * @throws {QuasarSDKError} On an HTTP error status, a timeout or a network error.
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
          ...(this.internalSecret ? { 'x-internal-secret': this.internalSecret } : {}),
          ...options.headers,
        },
      });
    } catch (error) {
      throw this.buildError(error);
    }
  }

  /**
   * Wraps an `ofetch` error in a {@link QuasarSDKError}. Side effect: logs a `console.error` on a 401 or 403 status.
   *
   * @param error - The error thrown by `ofetch`.
   * @returns The wrapped error.
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

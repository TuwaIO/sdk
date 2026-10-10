/**
 * @file HTTP client of the Quasar SDK: authentication headers, timeout and errors.
 */

import { type FetchError, type FetchOptions, ofetch } from 'ofetch';

import { BASE_API_URL } from '../constants';
import type { QuasarConfig } from '../types';

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
   * Downloads a file: its bytes, media type and the file name of its `Content-Disposition` header. Sends the same
   * headers as {@link QuasarClient.request}.
   *
   * @param path - Endpoint path.
   * @returns The bytes, `Content-Type` and file name (`null` when the response names none).
   * @throws {QuasarSDKError} On an HTTP error status, a timeout or a network error.
   */
  public async requestFile(
    path: string,
  ): Promise<{ bytes: Uint8Array; contentType: string | null; filename: string | null }> {
    try {
      const response = await ofetch.raw(path, {
        baseURL: this.baseUrl,
        timeout: this.timeout,
        method: 'GET',
        responseType: 'arrayBuffer',
        headers: {
          'x-tuwa-secret-key': this.secretKey,
          ...(this.internalSecret ? { 'x-internal-secret': this.internalSecret } : {}),
        },
      });
      const disposition = response.headers.get('content-disposition') ?? '';
      return {
        bytes: new Uint8Array(response._data ?? new ArrayBuffer(0)),
        contentType: response.headers.get('content-type'),
        filename: /filename="([^"]*)"/.exec(disposition)?.[1] ?? null,
      };
    } catch (error) {
      throw this.buildError(error);
    }
  }

  /**
   * Wraps an `ofetch` error in a {@link QuasarSDKError}. Reads the error bodies of the API: `{ error: '…' }`, the
   * Payments API's `{ error: { code, message, issues?, … } }` (also from a download, whose body arrives as bytes) and
   * the engine's `{ statusCode, message }` (for example the rate limit, 429).
   * Side effect: logs a `console.error` on a 401 or 403 status.
   *
   * @param error - The error thrown by `ofetch`.
   * @returns The wrapped error.
   */
  private buildError(error: unknown): QuasarSDKError {
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

    if (status === 401 || status === 403) {
      console.error('🚨 [Quasar SDK] Auth Error. Check your Secret Key and scopes.');
    }

    return new QuasarSDKError(`[Quasar SDK] Request Failed (${status}): ${message}`, status, fetchError, details);
  }
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

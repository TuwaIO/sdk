/**
 * @file HTTP client of the Quasar SDK: authentication headers and timeout; failures become `QuasarSDKError`.
 */

import { type FetchOptions, ofetch } from 'ofetch';

import { BASE_API_URL } from '../constants';
import type { QuasarConfig } from '../types';
import { toQuasarSDKError } from './errors';

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
      throw toQuasarSDKError(error);
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
      throw toQuasarSDKError(error);
    }
  }
}

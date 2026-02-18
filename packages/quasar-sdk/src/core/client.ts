import { type FetchError, type FetchOptions, ofetch } from 'ofetch';

import { QuasarConfig } from '../types';

export class QuasarSDKError extends Error {
  public readonly status: number | undefined;
  public readonly originalError: Error;

  constructor(message: string, status: number | undefined, originalError: Error) {
    super(message);
    this.name = 'QuasarSDKError';
    this.status = status;
    this.originalError = originalError;
  }
}

export class QuasarClient {
  private readonly secretKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(config: QuasarConfig) {
    if (!config.secretKey) {
      throw new Error('[Quasar SDK] Missing API Key. Provide a secretKey starting with sk_live_.');
    }
    this.secretKey = config.secretKey;
    this.baseUrl = config.baseUrl || 'https://api.tuwa.io';
    this.timeout = config.timeout || 10000;
  }

  /**
   * Unified request method handling Iron Dome headers and errors.
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

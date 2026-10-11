/**
 * @file HTTP client of the checkout API: the buyer's browser calls it with the checkout token, never with a key.
 */

import { ofetch } from 'ofetch';

import { BASE_API_URL } from '../constants';
import { toQuasarSDKError } from '../core/errors';
import type { Buyer, InvoiceLocale } from '../modules/payments/types';
import type { CheckoutApi, CheckoutQuote, CheckoutView, GrantPermissionParams } from './types';

/** Path of a checkout route: `/v1/payments/checkout/:token` and below. */
export const checkoutPath = (token: string, route = '') =>
  `/v1/payments/checkout/${encodeURIComponent(token)}${route ? `/${route}` : ''}`;

/**
 * The checkout routes of one checkout token. Every call throws `QuasarSDKError` (with the Payments `code`) on a refusal.
 *
 * @param token - The checkout token.
 * @param baseUrl - The Quasar API.
 * @returns The calls.
 * @internal
 */
export function checkoutApi(token: string, baseUrl: string = BASE_API_URL): CheckoutApi {
  const call = async <T>(route: string, body?: object): Promise<T> => {
    try {
      return await ofetch<T>(checkoutPath(token, route), {
        baseURL: baseUrl,
        method: body ? 'POST' : 'GET',
        ...(body ? { body } : {}),
      });
    } catch (error) {
      throw toQuasarSDKError(error);
    }
  };
  return {
    view: () => call<CheckoutView>(''),
    quote: (body: { methodId: string; payer?: string }) => call<CheckoutQuote>('quote', body),
    buyer: (body: { buyer: Buyer; company?: boolean }) => call<CheckoutView>('buyer', body),
    locale: (locale: InvoiceLocale) => call<{ locale: InvoiceLocale }>('locale', { locale }),
    submit: (body: { txKey: string; from?: string; connectorType?: string }) =>
      call<{ txKey: string; status: string }>('submit', body),
    relay: (signature: string) =>
      call<{ status: 'submitted' | 'sending'; userOpHash?: string; txHash?: string }>('relay', { signature }),
    permission: (body: GrantPermissionParams) => call<{ permission: unknown }>('permission', body),
    url: (route: string) => `${baseUrl.replace(/\/+$/, '')}${checkoutPath(token, route)}`,
  };
}

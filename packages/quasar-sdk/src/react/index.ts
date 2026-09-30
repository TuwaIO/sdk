/**
 * The browser helper for React apps that sign users in with SIWX, imported from `@tuwaio/quasar-sdk/react`. This entry
 * point needs `@tuwaio/siwx-react` (an optional peer dependency of the package); the root entry point does not.
 *
 * @module react
 */

import { useSiwxSessionStore } from '@tuwaio/siwx-react';

import { BASE_API_URL } from '../constants';

/** Path of the public health endpoint of the Quasar API. */
const HEALTH_ENDPOINT = '/v1/engine/monitoring/health';

/**
 * Checks, before a transaction starts, that the user is signed in with SIWX and that the Quasar API responds. Use it
 * as the `beforeTxProcess` callback of `createPulsarStore` from `@tuwaio/pulsar-core`: with the default
 * `abortOnTxError: true`, an error aborts the transaction before the wallet is asked to sign it.
 *
 * The session check reads the client state of `useSiwxSessionStore` from `@tuwaio/siwx-react`. It is not proof of
 * identity: the server that syncs the transaction must verify the session itself (for example with
 * `getSiwxServerSession` from `@tuwaio/siwx-server`).
 *
 * Side effects: reads `useSiwxSessionStore` and sends `GET <apiUrl>/v1/engine/monitoring/health` without credentials
 * and without the HTTP cache.
 *
 * @param customApiUrl - Base URL of the Quasar API. Defaults to {@link BASE_API_URL}.
 * @returns Resolves when a session exists and the API answers with a 2xx status.
 * @throws {Error} `[QuasarSDK] No SIWX Session found. User must be signed in.` when the store has no session.
 * @throws {Error} `[QuasarSDK] Quasar Cloud Engine is currently unreachable.` when the request fails (network error,
 *   CORS); the original error is its `cause`.
 * @throws {Error} `[QuasarSDK] API Health check failed with status: <status>` when the API answers with another status.
 */
export async function preFlightTxCheck(customApiUrl?: string): Promise<void> {
  const session = useSiwxSessionStore.getState().session;
  if (!session) {
    throw new Error('[QuasarSDK] No SIWX Session found. User must be signed in.');
  }

  const apiUrl = (customApiUrl || BASE_API_URL).replace(/\/+$/, '');

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${HEALTH_ENDPOINT}`, {
      method: 'GET',
      cache: 'no-store',
    });
  } catch (error) {
    throw new Error('[QuasarSDK] Quasar Cloud Engine is currently unreachable.', { cause: error });
  }

  if (!response.ok) {
    throw new Error(`[QuasarSDK] API Health check failed with status: ${response.status}`);
  }
}

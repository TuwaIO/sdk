/**
 * @file Default URL and endpoint paths of the Quasar API.
 */

/** Base URL of Quasar Cloud, the default `baseUrl` of the `Quasar` client. */
export const BASE_API_URL = 'https://api.tuwa.io';

/** Path of the endpoint that `PulsarModule.syncCreate` calls (`POST`). */
export const PULSAR_SYNC_ENDPOINT = '/v1/engine/pulsar/sync';

/** Path of the endpoint that `PulsarModule.getHistory` calls (`GET`). */
export const PULSAR_HISTORY_ENDPOINT = '/v1/engine/pulsar/history';

/**
 * Path of the endpoint that `PulsarModule.syncHash` calls (`POST`) for the EIP-5792 batch with this `txKey`.
 *
 * @param txKey - The batch ID, the `txKey` of the transaction.
 * @returns The path, with the batch ID URL-encoded.
 */
export const pulsarSyncHashEndpoint = (txKey: string): string =>
  `${PULSAR_SYNC_ENDPOINT}/${encodeURIComponent(txKey)}/hash`;

/** Path prefix of the Payments API, which `PaymentsModule` calls. */
export const PAYMENTS_ENDPOINT = '/v1/payments';

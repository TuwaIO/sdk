/**
 * @file Default URL and endpoint paths of the Quasar API.
 */

/** Base URL of Quasar Cloud, the default `baseUrl` of the `Quasar` client. */
export const BASE_API_URL = 'https://api.tuwa.io';

/** Path of the endpoint that `PulsarModule.syncCreate` calls (`POST`). */
export const PULSAR_SYNC_ENDPOINT = '/v1/engine/pulsar/sync';

/** Path of the endpoint that `PulsarModule.getHistory` calls (`GET`). */
export const PULSAR_HISTORY_ENDPOINT = '/v1/engine/pulsar/history';

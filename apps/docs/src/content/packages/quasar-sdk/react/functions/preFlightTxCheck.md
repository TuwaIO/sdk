# preFlightTxCheck()

> **preFlightTxCheck**(`customApiUrl?`): `Promise`\<`void`\>

Defined in: [react/index.ts:34](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/react/index.ts#L34)

Checks, before a transaction starts, that the user is signed in with SIWX and that the Quasar API responds. Use it
as the `beforeTxProcess` callback of `createPulsarStore` from `@tuwaio/pulsar-core`: with the default
`abortOnTxError: true`, an error aborts the transaction before the wallet is asked to sign it.

The session check reads the client state of `useSiwxSessionStore` from `@tuwaio/siwx-react`. It is not proof of
identity: the server that syncs the transaction must verify the session itself (for example with
`getSiwxServerSession` from `@tuwaio/siwx-server`).

Side effects: reads `useSiwxSessionStore` and sends `GET <apiUrl>/v1/engine/monitoring/health` without credentials
and without the HTTP cache.

## Parameters

### customApiUrl?

`string`

Base URL of the Quasar API. Defaults to [BASE\_API\_URL](/packages/quasar-sdk/server/variables/BASE_API_URL.md).

## Returns

`Promise`\<`void`\>

Resolves when a session exists and the API answers with a 2xx status.

## Throws

`[QuasarSDK] No SIWX Session found. User must be signed in.` when the store has no session.

## Throws

`[QuasarSDK] Quasar Cloud Engine is currently unreachable.` when the request fails (network error,
  CORS); the original error is its `cause`.

## Throws

`[QuasarSDK] API Health check failed with status: <status>` when the API answers with another status.

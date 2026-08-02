[**@tuwaio/quasar-sdk**](../README.md)

***

# NETWORK\_SAFETY\_BUFFER

> `const` **NETWORK\_SAFETY\_BUFFER**: `number`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:37](https://github.com/TuwaIO/sdk/blob/c3b3fedb1fd51716c9b397e4cf78d8cd632c5196/packages/quasar-sdk/src/utils/auth.ts#L37)

Safety buffer subtracted from DEFAULT_MAX_AGE during cache validation.
Ensures the session is refreshed before it expires on the server,
accounting for network round-trip latency between client cache check
and server-side verifyMiniSession call.

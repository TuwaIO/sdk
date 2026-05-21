[**@tuwaio/quasar-sdk**](../README.md)

***

# NETWORK\_SAFETY\_BUFFER

> `const` **NETWORK\_SAFETY\_BUFFER**: `number`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:37](https://github.com/TuwaIO/sdk/blob/d96af45cd4a786670c62b88065c8a4c12b36d113/packages/quasar-sdk/src/utils/auth.ts#L37)

Safety buffer subtracted from DEFAULT_MAX_AGE during cache validation.
Ensures the session is refreshed before it expires on the server,
accounting for network round-trip latency between client cache check
and server-side verifyMiniSession call.

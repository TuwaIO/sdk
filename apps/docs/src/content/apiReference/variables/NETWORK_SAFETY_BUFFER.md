[**@tuwaio/quasar-sdk**](../README.md)

***

# NETWORK\_SAFETY\_BUFFER

> `const` **NETWORK\_SAFETY\_BUFFER**: `number`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:37](https://github.com/TuwaIO/sdk/blob/3e5eee8ab131badede1ebf7e297595b678303856/packages/quasar-sdk/src/utils/auth.ts#L37)

Safety buffer subtracted from DEFAULT_MAX_AGE during cache validation.
Ensures the session is refreshed before it expires on the server,
accounting for network round-trip latency between client cache check
and server-side verifyMiniSession call.

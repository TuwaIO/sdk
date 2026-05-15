[**@tuwaio/quasar-sdk**](../README.md)

***

# NETWORK\_SAFETY\_BUFFER

> `const` **NETWORK\_SAFETY\_BUFFER**: `number`

Defined in: [packages/quasar-sdk/src/utils/auth.ts:37](https://github.com/TuwaIO/sdk/blob/ad96ef0019f28a19fc06ee40597f0d1a3e2b1f66/packages/quasar-sdk/src/utils/auth.ts#L37)

Safety buffer subtracted from DEFAULT_MAX_AGE during cache validation.
Ensures the session is refreshed before it expires on the server,
accounting for network round-trip latency between client cache check
and server-side verifyMiniSession call.

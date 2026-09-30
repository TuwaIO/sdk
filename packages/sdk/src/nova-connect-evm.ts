// The EVM entry point of Nova Connect, re-exported for `@tuwaio/evm-sdk/nova-connect`. `@tuwaio/evm-sdk` imports it
// through this package, so the chain registration and the type augmentation reach the same copy of
// `@tuwaio/nova-connect` and `@tuwaio/satellite-react` that the other subpaths of `@tuwaio/sdk` re-export. Never mark
// the package `"sideEffects": false`: bundlers would drop the registration.
export * from '@tuwaio/nova-connect/evm';

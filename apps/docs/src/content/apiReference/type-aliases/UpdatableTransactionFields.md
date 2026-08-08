[**@tuwaio/quasar-sdk**](../README.md)

***

# UpdatableTransactionFields

> **UpdatableTransactionFields** = `Partial`\<`Pick`\<`EvmTransaction`, `"to"` \| `"nonce"` \| `"txKey"` \| `"pending"` \| `"hash"` \| `"status"` \| `"replacedTxHash"` \| `"error"` \| `"finishedTimestamp"` \| `"isTrackedModalOpen"` \| `"isError"` \| `"maxPriorityFeePerGas"` \| `"maxFeePerGas"` \| `"input"` \| `"value"` \| `"confirmations"` \| `"requiredConfirmations"`\>\> & `Partial`\<`Pick`\<`SolanaTransaction`, `"slot"` \| `"confirmations"` \| `"fee"` \| `"instructions"` \| `"recentBlockhash"` \| `"rpcUrl"`\>\>

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@1.0.0-fix-docs-alpha.3.3dc4a6c\_@tuwaio+orbit-core@0.2.15\_dayjs@1.11\_294c8e9d098c6fac1877797e63f0faee/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:333

A utility type that creates a union of all fields that can be safely updated
on a transaction object via the `updateTxParams` action. This ensures type safety
and prevents accidental modification of immutable properties.

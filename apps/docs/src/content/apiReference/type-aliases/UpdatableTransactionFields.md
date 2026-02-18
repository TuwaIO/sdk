[**@tuwaio/quasar-sdk**](../README.md)

***

# UpdatableTransactionFields

> **UpdatableTransactionFields** = `Partial`\<`Pick`\<`EvmTransaction`, `"to"` \| `"nonce"` \| `"txKey"` \| `"pending"` \| `"hash"` \| `"status"` \| `"replacedTxHash"` \| `"error"` \| `"finishedTimestamp"` \| `"isTrackedModalOpen"` \| `"isError"` \| `"maxPriorityFeePerGas"` \| `"maxFeePerGas"` \| `"input"` \| `"value"`\>\> & `Partial`\<`Pick`\<`SolanaTransaction`, `"slot"` \| `"confirmations"` \| `"fee"` \| `"instructions"` \| `"recentBlockhash"` \| `"rpcUrl"`\>\>

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@1.0.0-fix-remote-alpha.2.3ed5f1e\_@tuwaio+orbit-core@0.2.7\_dayjs@1.1\_8f521a036cdf3ab96181c9cc3d5f916b/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:317

A utility type that creates a union of all fields that can be safely updated
on a transaction object via the `updateTxParams` action. This ensures type safety
and prevents accidental modification of immutable properties.

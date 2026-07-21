[**@tuwaio/quasar-sdk**](../README.md)

***

# UpdatableTransactionFields

> **UpdatableTransactionFields** = `Partial`\<`Pick`\<`EvmTransaction`, `"to"` \| `"nonce"` \| `"txKey"` \| `"pending"` \| `"hash"` \| `"status"` \| `"replacedTxHash"` \| `"error"` \| `"finishedTimestamp"` \| `"isTrackedModalOpen"` \| `"isError"` \| `"maxPriorityFeePerGas"` \| `"maxFeePerGas"` \| `"input"` \| `"value"` \| `"confirmations"` \| `"requiredConfirmations"`\>\> & `Partial`\<`Pick`\<`SolanaTransaction`, `"slot"` \| `"confirmations"` \| `"fee"` \| `"instructions"` \| `"recentBlockhash"` \| `"rpcUrl"`\>\>

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.6.7\_@tuwaio+orbit-core@0.2.13\_dayjs@1.11.21\_immer@11.1.15\_zustand\_a4ccf9e59c0ed6dfac55b0952b2c6fff/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:331

A utility type that creates a union of all fields that can be safely updated
on a transaction object via the `updateTxParams` action. This ensures type safety
and prevents accidental modification of immutable properties.

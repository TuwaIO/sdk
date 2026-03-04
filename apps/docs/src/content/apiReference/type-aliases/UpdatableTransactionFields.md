[**@tuwaio/quasar-sdk**](../README.md)

***

# UpdatableTransactionFields

> **UpdatableTransactionFields** = `Partial`\<`Pick`\<`EvmTransaction`, `"to"` \| `"nonce"` \| `"txKey"` \| `"pending"` \| `"hash"` \| `"status"` \| `"replacedTxHash"` \| `"error"` \| `"finishedTimestamp"` \| `"isTrackedModalOpen"` \| `"isError"` \| `"maxPriorityFeePerGas"` \| `"maxFeePerGas"` \| `"input"` \| `"value"`\>\> & `Partial`\<`Pick`\<`SolanaTransaction`, `"slot"` \| `"confirmations"` \| `"fee"` \| `"instructions"` \| `"recentBlockhash"` \| `"rpcUrl"`\>\>

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.5.1\_@tuwaio+orbit-core@0.2.7\_dayjs@1.11.19\_immer@11.1.4\_zustand@5\_6800d95eeb506589d04e5b855a7f01f3/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:321

A utility type that creates a union of all fields that can be safely updated
on a transaction object via the `updateTxParams` action. This ensures type safety
and prevents accidental modification of immutable properties.

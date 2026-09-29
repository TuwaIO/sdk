[**@tuwaio/quasar-sdk**](../README.md)

***

# TransactionTracker

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:22

Tracking strategy of a transaction. The chain adapter picks it after the action returns (see
`TxAdapter.checkTransactionsTracker`) and routes the transaction to the matching tracker.

## Enumeration Members

### ERC4337

> **ERC4337**: `"erc4337"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:35

An ERC-4337 UserOperation, tracked by its `userOpHash` through a bundler RPC and then on-chain.

***

### Ethereum

> **Ethereum**: `"ethereum"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:24

A standard EVM transaction, tracked by its hash through RPC (`@tuwaio/pulsar-evm`).

***

### ~~Gelato~~

> **Gelato**: `"gelato"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:31

A meta-transaction relayed by Gelato, tracked by its task ID through the Gelato API.

#### Deprecated

Gelato relay is deprecated. Use `TransactionTracker.ERC4337` instead.

***

### Safe

> **Safe**: `"safe"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:26

A Safe multisig transaction, tracked by its `safeTxHash` through the Safe Transaction Service API.

***

### Solana

> **Solana**: `"solana"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:33

A Solana transaction, tracked by its signature through RPC (`@tuwaio/pulsar-solana`).

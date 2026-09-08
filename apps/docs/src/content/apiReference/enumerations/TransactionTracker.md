[**@tuwaio/quasar-sdk**](../README.md)

***

# TransactionTracker

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:16

Enum representing the different tracking strategies available for transactions.
Each tracker corresponds to a specific method of monitoring a transaction's lifecycle.

## Enumeration Members

### ERC4337

> **ERC4337**: `"erc4337"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:29

For native ERC-4337 UserOperation transactions tracked via bundler RPC.

***

### Ethereum

> **Ethereum**: `"ethereum"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:18

For standard on-chain EVM transactions tracked by their hash.

***

### ~~Gelato~~

> **Gelato**: `"gelato"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:25

For meta-transactions relayed and executed by the Gelato Network.

#### Deprecated

Gelato gasless relay is deprecated. Use TransactionTracker.ERC4337 instead.

***

### Safe

> **Safe**: `"safe"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:20

For multi-signature transactions managed and executed via a Safe contract.

***

### Solana

> **Solana**: `"solana"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:27

The tracker for monitoring standard Solana transaction signatures.

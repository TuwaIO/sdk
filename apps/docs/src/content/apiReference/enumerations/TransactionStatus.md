[**@tuwaio/quasar-sdk**](../README.md)

***

# TransactionStatus

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:34

Represents the terminal status of a transaction after it has been processed.

## Enumeration Members

### Failed

> **Failed**: `"Failed"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:36

The transaction failed to execute due to an on-chain error or rejection.

***

### Replaced

> **Replaced**: `"Replaced"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:40

The transaction was replaced by another with the same nonce (e.g., a speed-up or cancel).

***

### Success

> **Success**: `"Success"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.7.0\_@tuwaio+orbit-core@0.3.0\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_b94ade1941b5512b5a8689165845619f/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:38

The transaction was successfully mined and included in a block.

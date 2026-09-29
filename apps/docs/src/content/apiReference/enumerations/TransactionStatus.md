[**@tuwaio/quasar-sdk**](../README.md)

***

# TransactionStatus

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:40

Terminal status of a transaction. Trackers set it together with `pending: false`.

## Enumeration Members

### Failed

> **Failed**: `"Failed"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:42

The transaction reverted, was rejected, or tracking failed (for example, it was not found in time).

***

### Replaced

> **Replaced**: `"Replaced"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:46

Another transaction with the same nonce was mined instead (a wallet speed-up or cancel).

***

### Success

> **Success**: `"Success"`

Defined in: node\_modules/.pnpm/@tuwaio+pulsar-core@0.8.0\_@tuwaio+orbit-core@0.3.1\_dayjs@1.11.23\_immer@11.1.18\_zustand@\_85e7674b971640b29eedb130dab5d2c0/node\_modules/@tuwaio/pulsar-core/dist/index.d.ts:44

The transaction was included on-chain and executed successfully.

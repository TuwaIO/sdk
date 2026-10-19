# HistoryQuery

Defined in: types.ts:29

Filters and pagination of [PulsarModule.getHistory](/packages/quasar-sdk/server/classes/PulsarModule.md#gethistory). Every filter is optional; the API returns the
transactions of your app that match all given filters.

## Properties

### appName?

> `optional` **appName?**: `string`

Defined in: types.ts:46

Application name that was passed to [PulsarModule.syncCreate](/packages/quasar-sdk/server/classes/PulsarModule.md#synccreate).

***

### chainId?

> `optional` **chainId?**: `string` \| `number`

Defined in: types.ts:40

Chain of the transactions: an EVM chain ID (`1`), or a Solana chain ID — the CAIP-2 chain ID with the genesis hash
that Pulsar 0.9 saves (`'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'`, `SOLANA_CHAIN_IDS.mainnet` of
`@tuwaio/orbit-core`) or `'solana:mainnet'`. The API matches a Solana cluster under both forms, so transactions
synced by older Pulsar versions are found too.

***

### limit?

> `optional` **limit?**: `number`

Defined in: types.ts:33

Number of transactions per page. Defaults to `10`.

***

### page?

> `optional` **page?**: `number`

Defined in: types.ts:31

Page number, starting at 1. Defaults to `1`.

***

### status?

> `optional` **status?**: `string`

Defined in: types.ts:42

Final status of the transactions (`'Success'`, `'Failed'` or `'Replaced'`, see `TransactionStatus`).

***

### txKey?

> `optional` **txKey?**: `string`

Defined in: types.ts:44

Key of one transaction (`txKey` of the Pulsar transaction).

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: types.ts:48

Address of the wallet that sent the transactions. EVM addresses match in any letter case, Solana addresses exactly.

# HistoryQuery

Defined in: [types.ts:29](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L29)

Filters and pagination of [PulsarModule.getHistory](/packages/quasar-sdk/server/classes/PulsarModule.md#gethistory). Every filter is optional; the API returns the
transactions of your app that match all given filters.

## Properties

### appName?

> `optional` **appName?**: `string`

Defined in: [types.ts:41](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L41)

Application name that was passed to [PulsarModule.syncCreate](/packages/quasar-sdk/server/classes/PulsarModule.md#synccreate).

***

### chainId?

> `optional` **chainId?**: `string` \| `number`

Defined in: [types.ts:35](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L35)

Chain of the transactions: an EVM chain ID (`1`) or a Solana cluster (`'mainnet'`).

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types.ts:33](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L33)

Number of transactions per page. Defaults to `10`.

***

### page?

> `optional` **page?**: `number`

Defined in: [types.ts:31](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L31)

Page number, starting at 1. Defaults to `1`.

***

### status?

> `optional` **status?**: `string`

Defined in: [types.ts:37](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L37)

Final status of the transactions (`'Success'`, `'Failed'` or `'Replaced'`, see `TransactionStatus`).

***

### txKey?

> `optional` **txKey?**: `string`

Defined in: [types.ts:39](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L39)

Key of one transaction (`txKey` of the Pulsar transaction).

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: [types.ts:43](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/types.ts#L43)

Address of the wallet that sent the transactions.

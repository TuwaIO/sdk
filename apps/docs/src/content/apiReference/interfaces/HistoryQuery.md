[**@tuwaio/quasar-sdk**](../README.md)

***

# HistoryQuery

Defined in: [packages/quasar-sdk/src/types.ts:30](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L30)

Query parameters for filtering and paginating transaction history.

## Properties

### appName?

> `optional` **appName?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:42](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L42)

Filter by the application name.

***

### chainId?

> `optional` **chainId?**: `string` \| `number`

Defined in: [packages/quasar-sdk/src/types.ts:36](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L36)

Filter by blockchain chain ID (e.g., 1, 'solana').

***

### limit?

> `optional` **limit?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:34](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L34)

Maximum number of results to return per page.

***

### page?

> `optional` **page?**: `number`

Defined in: [packages/quasar-sdk/src/types.ts:32](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L32)

Page number for pagination (1-indexed).

***

### status?

> `optional` **status?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:38](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L38)

Filter by transaction status (e.g., 'Success', 'Failed').

***

### txKey?

> `optional` **txKey?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:40](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L40)

Filter by a specific Quasar transaction key.

***

### walletAddress?

> `optional` **walletAddress?**: `string`

Defined in: [packages/quasar-sdk/src/types.ts:44](https://github.com/TuwaIO/sdk/blob/b3e13e6b5604c513924a366fe6d9bf57c0a0cb79/packages/quasar-sdk/src/types.ts#L44)

Filter by the sender's wallet address.

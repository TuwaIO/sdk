**@tuwaio/quasar-sdk**

***

# @tuwaio/quasar-sdk

## Example

```typescript
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: 'sk_live_...' });
const history = await quasar.pulsar.getHistory({ chainId: 1 });
```

## Enumerations

- [ChainType](enumerations/ChainType.md)

## Classes

- [PulsarModule](classes/PulsarModule.md)
- [Quasar](classes/Quasar.md)
- [QuasarSDKError](classes/QuasarSDKError.md)

## Interfaces

- [ConnectionData](interfaces/ConnectionData.md)
- [HistoryQuery](interfaces/HistoryQuery.md)
- [MiniSessionAuth](interfaces/MiniSessionAuth.md)
- [MiniSessionStore](interfaces/MiniSessionStore.md)
- [PaginatedResult](interfaces/PaginatedResult.md)
- [QuasarConfig](interfaces/QuasarConfig.md)
- [SignSessionParams](interfaces/SignSessionParams.md)
- [SignSessionResult](interfaces/SignSessionResult.md)
- [VerifySessionParams](interfaces/VerifySessionParams.md)

## Type Aliases

- [Transaction](type-aliases/Transaction.md)
- [UpdatableTransactionFields](type-aliases/UpdatableTransactionFields.md)

## Variables

- [BASE\_API\_URL](variables/BASE_API_URL.md)
- [PULSAR\_HISTORY\_ENDPOINT](variables/PULSAR_HISTORY_ENDPOINT.md)
- [PULSAR\_SYNC\_ENDPOINT](variables/PULSAR_SYNC_ENDPOINT.md)
- [utils](variables/utils.md)

## Functions

- [createMiniSessionMessage](functions/createMiniSessionMessage.md)
- [createMiniSessionStore](functions/createMiniSessionStore.md)
- [getMiniSessionAuth](functions/getMiniSessionAuth.md)
- [signMiniSession](functions/signMiniSession.md)
- [verifyMiniSession](functions/verifyMiniSession.md)

**@tuwaio/quasar-sdk**

***

# @tuwaio/quasar-sdk

## Example

```typescript
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: 'sk_live_...' });
const history = await quasar.pulsar.getHistory({ chainId: 1 });
```

## Classes

- [PulsarModule](classes/PulsarModule.md)
- [Quasar](classes/Quasar.md)
- [QuasarSDKError](classes/QuasarSDKError.md)

## Interfaces

- [HistoryQuery](interfaces/HistoryQuery.md)
- [PaginatedResult](interfaces/PaginatedResult.md)
- [QuasarConfig](interfaces/QuasarConfig.md)

## Type Aliases

- [Transaction](type-aliases/Transaction.md)
- [UpdatableTransactionFields](type-aliases/UpdatableTransactionFields.md)

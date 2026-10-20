# createRefundStore()

> **createRefundStore**(`options`): [`RefundStore`](/packages/quasar-sdk/checkout/type-aliases/RefundStore.md)

Defined in: [checkout/refundStore.ts:101](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L101)

Creates the headless refund of a payment from the merchant's connected wallet: ask for the refund, send its
`instructions` with the wallet (Pulsar or the wallet itself; the store sends nothing on-chain), hand over the
transaction, then follow the refund until Quasar confirms it and issues the credit note. The secret key never
reaches the browser: the store calls `request`, `submit` and `get`, which the app runs on its server (Server
Actions or its own routes calling `quasar.payments`).

Side effects: the calls the app supplies; while `confirming`, `get` every `pollMs` until the refund is final or
`reset` is called.

## Parameters

### options

[`RefundStoreOptions`](/packages/quasar-sdk/checkout/interfaces/RefundStoreOptions.md)

The three calls and the poll interval.

## Returns

[`RefundStore`](/packages/quasar-sdk/checkout/type-aliases/RefundStore.md)

The store.

## Example

```ts
import { createRefundStore } from '@tuwaio/quasar-sdk/checkout';

// refundInvoice, submitRefund and getRefund are Server Actions calling quasar.payments
const refunds = createRefundStore({ request: refundInvoice, submit: submitRefund, get: getRefund });
await refunds.getState().start(invoiceId, { reason: 'Order cancelled' });
// Send refunds.getState().instructions with the wallet, then:
await refunds.getState().submit({ txHash, from: address });
```

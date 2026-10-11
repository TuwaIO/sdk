# createCheckoutStore()

> **createCheckoutStore**(`options`): [`CheckoutStore`](/packages/quasar-sdk/checkout/type-aliases/CheckoutStore.md)

Defined in: [checkout/store.ts:272](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L272)

Creates the headless checkout of one invoice for the buyer's browser: a vanilla Zustand store with the invoice,
its methods, the locked quote and where the payment stands, and the actions that move it on. The wallet is the
app's: the store never sends a transaction, it returns `quote.instructions` (and `quote.gasless`) for Pulsar or the
wallet to execute, and takes the result with `submit` or `relay`. It needs no key: the checkout token opens this
invoice only. `@tuwaio/nova-payments` renders it.

Side effects: requests to `<baseUrl>/v1/payments/checkout/<token>` (the page's origin must be one of the app's
domains, when it lists any); after `load`, an `EventSource` on its `events` route (or a `GET` every `pollMs`) until
the invoice reaches a final state or `destroy` is called. Nothing is stored in the browser.

## Parameters

### options

[`CheckoutStoreOptions`](/packages/quasar-sdk/checkout/interfaces/CheckoutStoreOptions.md)

The checkout token and optional overrides.

## Returns

[`CheckoutStore`](/packages/quasar-sdk/checkout/type-aliases/CheckoutStore.md)

The store; call `load()` first.

## Example

```ts
import { createCheckoutStore } from '@tuwaio/quasar-sdk/checkout';

const checkout = createCheckoutStore({ token });
await checkout.getState().load();
checkout.getState().selectMethod(checkout.getState().checkout!.methods[0].id);
checkout.getState().setPayer(`eip155:8453:${address}`);
const quote = await checkout.getState().requestQuote();
// Send quote.instructions with the wallet, then:
await checkout.getState().submit({ txKey: hash });
```

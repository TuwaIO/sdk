# @tuwaio/quasar-sdk

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/quasar-sdk.svg)](https://www.npmjs.com/package/@tuwaio/quasar-sdk)
[![License](https://img.shields.io/npm/l/@tuwaio/quasar-sdk.svg)](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/LICENSE)

`@tuwaio/quasar-sdk` is the Layer 5 (L5) package of the **TUWA SDK**: the client of the API of **Quasar**, the TUWA backend that tracks the transactions of your app on the server, keeps their history and, for a Payments app, issues invoices paid in crypto straight to your wallets. It works with Quasar Cloud (`https://api.tuwa.io`) and with a self-hosted Quasar server. It has four parts: the `Quasar` client for your server (with webhook verification), the headless checkout for the browser (`@tuwaio/quasar-sdk/checkout`), a check for the browser (`@tuwaio/quasar-sdk/react`), and the `quasar-sdk` CLI that relays webhooks to `localhost`.

---

## 🏛️ Core Capabilities

- **Transaction sync:** `quasar.pulsar.syncCreate` sends a transaction created by Pulsar to Quasar, which tracks it until it reaches a final status (so the status survives a closed tab) and sends your webhooks.
- **History:** `quasar.pulsar.getHistory` returns the transactions of your app, newest first, filtered by wallet address, chain, status, transaction key or application name.
- **EIP-5792 batches:** a batch sent with `wallet_sendCalls` is synced by its batch ID; `watchBatchHashes` reads the hash of its transaction from the Pulsar store in the browser, and `quasar.pulsar.syncHash` sends it to Quasar from the server.
- **Payments:** `quasar.payments` issues invoices (with their PDF and e-invoice documents and a payment page), lists and reads them with their hash-chained ledger, cancels, releases and corrects them, refunds payments, prices amounts, and runs subscriptions billed every period.
- **Headless checkout:** `createCheckoutStore` from `@tuwaio/quasar-sdk/checkout` follows the payment of one invoice in the buyer's browser (methods, AML-screened quote, buyer details, language, the transaction or gasless signature, live status) with its checkout token and no key; `createRefundStore` refunds a payment from the merchant's wallet through calls the app runs on its server. Neither sends a transaction: Pulsar or the wallet does.
- **Webhook verification:** `verifyWebhook` checks the signature of a webhook (and, for a payment event, the time it was sent) and returns its typed body.
- **Errors:** every failed request throws a `QuasarSDKError` with the HTTP `status` and, from the Payments API, a stable `code` and the fields at fault (`issues`).
- **Pre-flight check:** `preFlightTxCheck` from `@tuwaio/quasar-sdk/react` stops a Pulsar transaction in the browser when the user is not signed in with SIWX or the Quasar API does not respond.
- **Webhook relay:** `npx @tuwaio/quasar-sdk listen` receives the deliveries of a webhook endpoint with a `localhost` URL and posts them to your local app, without a tunnel.

---

## 💾 Installation

```bash
pnpm add @tuwaio/quasar-sdk @tuwaio/pulsar-core
```

| Import path                   | Provides                                                                                                                            | Peer dependencies                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `@tuwaio/quasar-sdk`          | `Quasar`, `PulsarModule`, `PaymentsModule`, `verifyWebhook`, `watchBatchHashes`, `QuasarSDKError`, the endpoint constants and types | `@tuwaio/pulsar-core` (>=0.10), for the transaction types |
| `@tuwaio/quasar-sdk/checkout` | `createCheckoutStore`, `createRefundStore` and their types                                                                          | Also `zustand` (5.x, optional for the other entries)      |
| `@tuwaio/quasar-sdk/react`    | `preFlightTxCheck`                                                                                                                  | Also `@tuwaio/siwx-react` (>=0.5, optional for the root)  |

The root entry point imports neither React, SIWX nor `zustand`, so it runs in Node.js, Next.js Server Actions and route handlers, and Edge runtimes. Its HTTP client, `ofetch`, is a dependency.

---

## 🚀 Usage

Create the client on the server with the secret key of your Quasar app (`sk_live_...` or `sk_test_...`, from the dashboard). Never create it in the browser: the key authorizes writes to your app.

```ts
'use server';

import { Quasar, type Transaction } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });

export async function syncTransaction(tx: Transaction) {
  const { txKey } = await quasar.pulsar.syncCreate(tx, 'my-app');
  return txKey;
}

export async function getHistory(walletAddress: string, page = 1) {
  return quasar.pulsar.getHistory({ walletAddress, page, limit: 10, appName: 'my-app' });
}
```

Before calling Quasar for a user, check on the server that the user owns the wallet (for example with `getSiwxServerSession` and `isSessionMatchingTarget` from `@tuwaio/siwx-server`), so nobody can sync or read the transactions of another address. The complete flow — SIWX sessions, the Pulsar callbacks `onRemoteCreate` and `beforeTxProcess`, the history in Nova Transactions — is the **[Quasar transaction sync guide](https://docs.tuwa.io/guides/quasar-transaction-sync)**; Quasar itself (apps and keys, quotas, webhooks, self-hosting) is described in the **[Quasar docs](https://docs.tuwa.io/quasar)**.

### Payments

A Payments app (chosen when the app is created, on a node that runs Payments) issues invoices that buyers pay in crypto on its payment page; Quasar checks the payment on-chain, issues the receipt and sends `payments.v1` webhooks.

```ts
import { Quasar } from '@tuwaio/quasar-sdk';

const quasar = new Quasar({ secretKey: process.env.QUASAR_SECRET_KEY ?? '' });

export async function checkout(orderId: string, email: string) {
  const { payUrl } = await quasar.payments.createInvoice(
    {
      currency: 'EUR',
      lineItems: [{ name: 'Pro plan, October', quantity: '1', unitPrice: '49.00', taxRate: '21' }],
      buyer: { email },
      metadata: { orderId },
    },
    { idempotencyKey: `order_${orderId}` },
  );
  return payUrl;
}
```

Verify every webhook before acting on it, with the raw body as received:

```ts
import { isPaymentWebhookEvent, verifyWebhook } from '@tuwaio/quasar-sdk';

export async function POST(request: Request) {
  try {
    const event = await verifyWebhook({
      body: await request.text(),
      signature: request.headers.get('x-quasar-signature'),
      secret: process.env.QUASAR_WEBHOOK_SECRET ?? '',
    });
    if (isPaymentWebhookEvent(event) && event.type === 'invoice.paid') {
      console.log('Paid', event.data.invoice?.number); // fulfil the order; deduplicate by event.id
    }
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
```

### Checkout in the browser

The payment page of an invoice is its `payUrl`; to embed the checkout in your own page instead, pass its `checkoutToken` to the checkout store. The store holds where the payment stands; the wallet sends the transaction (with Pulsar, or `@tuwaio/nova-payments`, which renders the store).

```ts
import { createCheckoutStore } from '@tuwaio/quasar-sdk/checkout';

const checkout = createCheckoutStore({ token: checkoutToken });
await checkout.getState().load();

const { checkout: view } = checkout.getState();
checkout.getState().selectMethod(view?.methods[0]?.id ?? '');
checkout.getState().setPayer('eip155:8453:0x1111111111111111111111111111111111111111');
const quote = await checkout.getState().requestQuote();
// Send quote.instructions (the amount in base units to `to`) with the wallet, then hand over its hash:
await checkout.getState().submit({ txKey: '0x…' });
checkout.subscribe(({ phase }) => console.log(phase)); // confirming, then paid
```

The page's origin must be one of the domains of your Quasar app, when the app lists any.

### Webhook relay

Add a webhook endpoint with a `localhost` URL in the Quasar dashboard, put its signing secret in `.env.local` and start the relay next to your dev server:

```bash
# .env.local: QUASAR_WEBHOOK_SECRET=whsec_...
npx @tuwaio/quasar-sdk listen --forward-to http://localhost:3000/api/webhooks/quasar
```

| Flag           | Short | Default                                                                           |
| -------------- | ----- | --------------------------------------------------------------------------------- |
| `--secret`     | `-s`  | `QUASAR_WEBHOOK_SECRET` from the environment or the `.env` file                   |
| `--forward-to` | `-f`  | `QUASAR_WEBHOOK_FORWARD_TO`, else `http://localhost:3000/api/webhooks/quasar`     |
| `--api-url`    | `-a`  | `NEXT_PUBLIC_QUASAR_BASE_URL` or `QUASAR_BASE_URL`, else `https://api.tuwa.io`    |
| `--env-file`   | `-e`  | The first of `.env.local`, `.env.development` and `.env` in the working directory |
| `--help`       | `-h`  |                                                                                   |
| `--version`    | `-v`  |                                                                                   |

The relay posts each delivery with the `x-quasar-signature`, `x-quasar-event` and `x-quasar-delivery-id` headers and the same body as a direct delivery, so your endpoint verifies the signature the same way. It reconnects with a backoff of up to 15 seconds and stops on a `401` (wrong secret) or `404` (no endpoint with that secret).

---

## 🗄️ Browser Storage

Nothing is written. The checkout and refund stores keep their state in memory only. `preFlightTxCheck` reads the SIWX session from the store of `@tuwaio/siwx-react`, which keeps it in `localStorage` under `siwx-react:session`.

## 🌐 External Services

| Part                | Host                                                             | Request                                                                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Quasar` client     | `baseUrl` (default `https://api.tuwa.io`)                        | `POST /v1/engine/pulsar/sync`, `POST /v1/engine/pulsar/sync/:txKey/hash`, `GET /v1/engine/pulsar/history` and the Payments API under `/v1/payments`, with the secret key in the `x-tuwa-secret-key` header |
| Checkout stores     | `baseUrl` (default `https://api.tuwa.io`)                        | The checkout routes `/v1/payments/checkout/:token` and their `events` stream, with the token in the path and no key; the refund store calls only the functions you pass                                    |
| `preFlightTxCheck`  | Its `customApiUrl` (default `https://api.tuwa.io`)               | `GET /v1/engine/monitoring/health`, without credentials                                                                                                                                                    |
| `quasar-sdk listen` | `--api-url` (default `https://api.tuwa.io`), then `--forward-to` | A Server-Sent Events stream from `/v1/engine/webhooks/listen` with the signing secret in the `x-webhook-secret` header; a `POST` to the local URL for each delivery                                        |

The transactions you sync, with their `payload`, are stored by Quasar, and so are the invoices you issue with their buyer details. `verifyWebhook` and `watchBatchHashes` send no requests.

---

## 📚 API Reference

Every export, with signatures and types generated from the source, is documented at **[sdk.docs.tuwa.io/packages/quasar-sdk](https://sdk.docs.tuwa.io/packages/quasar-sdk)**. The HTTP API is described in the **[Quasar API reference](https://docs.tuwa.io/quasar/api)**.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/LICENSE) file for details.

# LedgerEvent

Defined in: [modules/payments/types.ts:434](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L434)

One step of an invoice ledger. Each step's `hash` covers the step and `prevHash`.

## Properties

### actor

> **actor**: `string`

Defined in: [modules/payments/types.ts:444](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L444)

Who acted: `merchant_api`, `system`, `checkout`, `dashboard:<userId>`, `admin:<userId>`…

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:446](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L446)

Chain of an on-chain step.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:450](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L450)

When.

***

### data

> **data**: `unknown`

Defined in: [modules/payments/types.ts:442](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L442)

Details of the step.

***

### hash

> **hash**: `string`

Defined in: [modules/payments/types.ts:454](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L454)

Hash of this step.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:436](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L436)

Event ID; webhooks of this step carry it as their `id`.

***

### prevHash

> **prevHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:452](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L452)

Hash of the previous step.

***

### seq

> **seq**: `number`

Defined in: [modules/payments/types.ts:438](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L438)

Position in the ledger, from 1.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:448](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L448)

Transaction of an on-chain step.

***

### type

> **type**: `string`

Defined in: [modules/payments/types.ts:440](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L440)

What happened, for example `invoice.issued`, `quote.locked`, `invoice.paid`.

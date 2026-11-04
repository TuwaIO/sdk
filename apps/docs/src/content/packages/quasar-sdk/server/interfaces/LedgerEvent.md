# LedgerEvent

Defined in: [modules/payments/types.ts:509](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L509)

One step of an invoice ledger. Each step's `hash` covers the step and `prevHash`.

## Properties

### actor

> **actor**: `string`

Defined in: [modules/payments/types.ts:519](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L519)

Who acted: `merchant_api`, `system`, `checkout`, `dashboard:<userId>`, `admin:<userId>`…

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:521](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L521)

Chain of an on-chain step.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:525](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L525)

When.

***

### data

> **data**: `unknown`

Defined in: [modules/payments/types.ts:517](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L517)

Details of the step.

***

### hash

> **hash**: `string`

Defined in: [modules/payments/types.ts:529](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L529)

Hash of this step.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:511](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L511)

Event ID; webhooks of this step carry it as their `id`.

***

### prevHash

> **prevHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:527](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L527)

Hash of the previous step.

***

### seq

> **seq**: `number`

Defined in: [modules/payments/types.ts:513](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L513)

Position in the ledger, from 1.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:523](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L523)

Transaction of an on-chain step.

***

### type

> **type**: `string`

Defined in: [modules/payments/types.ts:515](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L515)

What happened, for example `invoice.issued`, `quote.locked`, `invoice.paid`.

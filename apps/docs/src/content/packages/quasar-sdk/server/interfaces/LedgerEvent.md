# LedgerEvent

Defined in: [modules/payments/types.ts:412](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L412)

One step of an invoice ledger. Each step's `hash` covers the step and `prevHash`.

## Properties

### actor

> **actor**: `string`

Defined in: [modules/payments/types.ts:422](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L422)

Who acted: `merchant_api`, `system`, `checkout`, `dashboard:<userId>`, `admin:<userId>`…

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:424](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L424)

Chain of an on-chain step.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:428](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L428)

When.

***

### data

> **data**: `unknown`

Defined in: [modules/payments/types.ts:420](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L420)

Details of the step.

***

### hash

> **hash**: `string`

Defined in: [modules/payments/types.ts:432](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L432)

Hash of this step.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:414](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L414)

Event ID; webhooks of this step carry it as their `id`.

***

### prevHash

> **prevHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:430](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L430)

Hash of the previous step.

***

### seq

> **seq**: `number`

Defined in: [modules/payments/types.ts:416](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L416)

Position in the ledger, from 1.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:426](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L426)

Transaction of an on-chain step.

***

### type

> **type**: `string`

Defined in: [modules/payments/types.ts:418](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L418)

What happened, for example `invoice.issued`, `quote.locked`, `invoice.paid`.

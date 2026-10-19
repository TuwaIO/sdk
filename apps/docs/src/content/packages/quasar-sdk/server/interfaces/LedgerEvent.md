# LedgerEvent

Defined in: modules/payments/types.ts:379

One step of an invoice ledger. Each step's `hash` covers the step and `prevHash`.

## Properties

### actor

> **actor**: `string`

Defined in: modules/payments/types.ts:389

Who acted: `merchant_api`, `system`, `checkout`, `dashboard:<userId>`, `admin:<userId>`…

***

### chainId

> **chainId**: `string` \| `null`

Defined in: modules/payments/types.ts:391

Chain of an on-chain step.

***

### createdAt

> **createdAt**: `string`

Defined in: modules/payments/types.ts:395

When.

***

### data

> **data**: `unknown`

Defined in: modules/payments/types.ts:387

Details of the step.

***

### hash

> **hash**: `string`

Defined in: modules/payments/types.ts:399

Hash of this step.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:381

Event ID; webhooks of this step carry it as their `id`.

***

### prevHash

> **prevHash**: `string` \| `null`

Defined in: modules/payments/types.ts:397

Hash of the previous step.

***

### seq

> **seq**: `number`

Defined in: modules/payments/types.ts:383

Position in the ledger, from 1.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: modules/payments/types.ts:393

Transaction of an on-chain step.

***

### type

> **type**: `string`

Defined in: modules/payments/types.ts:385

What happened, for example `invoice.issued`, `quote.locked`, `invoice.paid`.

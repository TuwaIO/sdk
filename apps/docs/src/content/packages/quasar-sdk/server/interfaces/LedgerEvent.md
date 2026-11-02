# LedgerEvent

Defined in: modules/payments/types.ts:415

One step of an invoice ledger. Each step's `hash` covers the step and `prevHash`.

## Properties

### actor

> **actor**: `string`

Defined in: modules/payments/types.ts:425

Who acted: `merchant_api`, `system`, `checkout`, `dashboard:<userId>`, `admin:<userId>`…

***

### chainId

> **chainId**: `string` \| `null`

Defined in: modules/payments/types.ts:427

Chain of an on-chain step.

***

### createdAt

> **createdAt**: `string`

Defined in: modules/payments/types.ts:431

When.

***

### data

> **data**: `unknown`

Defined in: modules/payments/types.ts:423

Details of the step.

***

### hash

> **hash**: `string`

Defined in: modules/payments/types.ts:435

Hash of this step.

***

### id

> **id**: `string`

Defined in: modules/payments/types.ts:417

Event ID; webhooks of this step carry it as their `id`.

***

### prevHash

> **prevHash**: `string` \| `null`

Defined in: modules/payments/types.ts:433

Hash of the previous step.

***

### seq

> **seq**: `number`

Defined in: modules/payments/types.ts:419

Position in the ledger, from 1.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: modules/payments/types.ts:429

Transaction of an on-chain step.

***

### type

> **type**: `string`

Defined in: modules/payments/types.ts:421

What happened, for example `invoice.issued`, `quote.locked`, `invoice.paid`.

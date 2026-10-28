# LedgerEvent

Defined in: [modules/payments/types.ts:415](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L415)

One step of an invoice ledger. Each step's `hash` covers the step and `prevHash`.

## Properties

### actor

> **actor**: `string`

Defined in: [modules/payments/types.ts:425](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L425)

Who acted: `merchant_api`, `system`, `checkout`, `dashboard:<userId>`, `admin:<userId>`…

***

### chainId

> **chainId**: `string` \| `null`

Defined in: [modules/payments/types.ts:427](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L427)

Chain of an on-chain step.

***

### createdAt

> **createdAt**: `string`

Defined in: [modules/payments/types.ts:431](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L431)

When.

***

### data

> **data**: `unknown`

Defined in: [modules/payments/types.ts:423](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L423)

Details of the step.

***

### hash

> **hash**: `string`

Defined in: [modules/payments/types.ts:435](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L435)

Hash of this step.

***

### id

> **id**: `string`

Defined in: [modules/payments/types.ts:417](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L417)

Event ID; webhooks of this step carry it as their `id`.

***

### prevHash

> **prevHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:433](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L433)

Hash of the previous step.

***

### seq

> **seq**: `number`

Defined in: [modules/payments/types.ts:419](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L419)

Position in the ledger, from 1.

***

### txHash

> **txHash**: `string` \| `null`

Defined in: [modules/payments/types.ts:429](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L429)

Transaction of an on-chain step.

***

### type

> **type**: `string`

Defined in: [modules/payments/types.ts:421](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L421)

What happened, for example `invoice.issued`, `quote.locked`, `invoice.paid`.

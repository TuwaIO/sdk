# PayerProofMessage

Defined in: [checkout/types.ts:325](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L325)

What `POST payer-proof/message` answers: the exact EIP-4361 (Sign-In with Ethereum) message the wallet signs, for
free and without moving funds, to confirm that it pays this invoice. Quasar builds it from the page's site (its
`Origin`), the wallet, the invoice number, the seller and the total, the network, a nonce derived from the invoice and
the wallet, the invoice's creation (`Issued At`) and due date (`Expiration Time`); asked twice, it is the same.

## Properties

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:337](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L337)

The CAIP-2 network of the wallet.

***

### domain

> **domain**: `string`

Defined in: [checkout/types.ts:335](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L335)

The site the message names: the host of the page that asked.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:343](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L343)

The invoice's due date (`Expiration Time`), `null` without one.

***

### issuedAt

> **issuedAt**: `string`

Defined in: [checkout/types.ts:341](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L341)

When the invoice was created (`Issued At`).

***

### message

> **message**: `string`

Defined in: [checkout/types.ts:333](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L333)

The message to sign as it is, with `personal_sign` (EIP-191).

***

### nonce

> **nonce**: `string`

Defined in: [checkout/types.ts:339](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L339)

The nonce of the message.

***

### object

> **object**: `"payer_proof_message"`

Defined in: [checkout/types.ts:327](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L327)

Always `payer_proof_message`.

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:329](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L329)

The wallet, as a CAIP-10 account (the EVM address checksummed).

***

### proven

> **proven**: `boolean`

Defined in: [checkout/types.ts:331](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L331)

`true` when the wallet confirmed this invoice already (on this network, for a smart wallet): nothing to sign.

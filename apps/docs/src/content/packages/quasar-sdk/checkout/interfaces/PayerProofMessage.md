# PayerProofMessage

Defined in: [checkout/types.ts:324](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L324)

What `POST payer-proof/message` answers: the exact EIP-4361 (Sign-In with Ethereum) message the wallet signs, for
free and without moving funds, to confirm that it pays this invoice. Quasar builds it from the page's site (its
`Origin`), the wallet, the invoice number, the seller and the total, the network, a nonce derived from the invoice and
the wallet, the invoice's creation (`Issued At`) and due date (`Expiration Time`); asked twice, it is the same.

## Properties

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:336](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L336)

The CAIP-2 network of the wallet.

***

### domain

> **domain**: `string`

Defined in: [checkout/types.ts:334](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L334)

The site the message names: the host of the page that asked.

***

### expiresAt

> **expiresAt**: `string` \| `null`

Defined in: [checkout/types.ts:342](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L342)

The invoice's due date (`Expiration Time`), `null` without one.

***

### issuedAt

> **issuedAt**: `string`

Defined in: [checkout/types.ts:340](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L340)

When the invoice was created (`Issued At`).

***

### message

> **message**: `string`

Defined in: [checkout/types.ts:332](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L332)

The message to sign as it is, with `personal_sign` (EIP-191).

***

### nonce

> **nonce**: `string`

Defined in: [checkout/types.ts:338](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L338)

The nonce of the message.

***

### object

> **object**: `"payer_proof_message"`

Defined in: [checkout/types.ts:326](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L326)

Always `payer_proof_message`.

***

### payer

> **payer**: `string`

Defined in: [checkout/types.ts:328](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L328)

The wallet, as a CAIP-10 account (the EVM address checksummed).

***

### proven

> **proven**: `boolean`

Defined in: [checkout/types.ts:330](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L330)

`true` when the wallet confirmed this invoice already (on this network, for a smart wallet): nothing to sign.

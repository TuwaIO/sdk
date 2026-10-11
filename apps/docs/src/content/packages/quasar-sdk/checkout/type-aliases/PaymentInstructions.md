# PaymentInstructions

> **PaymentInstructions** = \{ `amount`: `string`; `chainId`: `number`; `decimals`: `number`; `family`: `"eip155"`; `symbol`: `string`; `to`: `string`; `token`: `string`; \} \| \{ `amount`: `string`; `chainId`: `string`; `decimals`: `number`; `family`: `"solana"`; `reference`: `string`; `solanaPayUrl`: `string`; `symbol`: `string`; `to`: `string`; `token`: `string`; \}

Defined in: [checkout/types.ts:155](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L155)

What a wallet needs to pay a locked quote: the exact amount in base units, never rounded again.

## Union Members

### Type Literal

\{ `amount`: `string`; `chainId`: `number`; `decimals`: `number`; `family`: `"eip155"`; `symbol`: `string`; `to`: `string`; `token`: `string`; \}

#### amount

> **amount**: `string`

Amount to send, in base units.

#### chainId

> **chainId**: `number`

EVM chain ID.

#### decimals

> **decimals**: `number`

Decimals of the token.

#### family

> **family**: `"eip155"`

An EVM chain.

#### symbol

> **symbol**: `string`

Token symbol.

#### to

> **to**: `string`

The merchant's wallet.

#### token

> **token**: `string`

The token contract, or `native`.

***

### Type Literal

\{ `amount`: `string`; `chainId`: `string`; `decimals`: `number`; `family`: `"solana"`; `reference`: `string`; `solanaPayUrl`: `string`; `symbol`: `string`; `to`: `string`; `token`: `string`; \}

#### amount

> **amount**: `string`

Amount to send, in base units.

#### chainId

> **chainId**: `string`

CAIP-2 chain ID.

#### decimals

> **decimals**: `number`

Decimals of the token.

#### family

> **family**: `"solana"`

Solana.

#### reference

> **reference**: `string`

The Solana Pay reference key of the quote: the transfer must carry it.

#### solanaPayUrl

> **solanaPayUrl**: `string`

A Solana Pay transfer request, for a QR code a mobile wallet scans.

#### symbol

> **symbol**: `string`

Token symbol.

#### to

> **to**: `string`

The merchant's wallet.

#### token

> **token**: `string`

The mint, or `native` for SOL.

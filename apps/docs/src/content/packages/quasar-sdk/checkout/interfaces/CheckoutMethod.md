# CheckoutMethod

Defined in: [checkout/types.ts:264](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L264)

A payment method the invoice can be paid with.

## Properties

### assetId

> **assetId**: `string` \| `null`

Defined in: [checkout/types.ts:274](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L274)

CAIP-19 asset.

***

### chainId

> **chainId**: `string`

Defined in: [checkout/types.ts:272](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L272)

CAIP-2 chain (`eip155:8453`, `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`).

***

### decimals

> **decimals**: `number`

Defined in: [checkout/types.ts:276](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L276)

Decimals of the token.

***

### discountBps

> **discountBps**: `number`

Defined in: [checkout/types.ts:284](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L284)

How much less the method costs than the invoice total, in basis points.

***

### featured

> **featured**: `boolean`

Defined in: [checkout/types.ts:280](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L280)

Marked "Popular" by the merchant.

***

### gasless

> **gasless**: `string` \| `null`

Defined in: [checkout/types.ts:278](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L278)

`auto` when the merchant may sponsor the gas, `off` otherwise.

***

### id

> **id**: `string`

Defined in: [checkout/types.ts:266](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L266)

Method ID, for [CheckoutState.selectMethod](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#selectmethod).

***

### markupBps

> **markupBps**: `number`

Defined in: [checkout/types.ts:282](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L282)

How much more the method costs than the invoice total, in basis points (`150` is 1.5 %).

***

### name

> **name**: `string`

Defined in: [checkout/types.ts:268](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L268)

Its name.

***

### payerProof?

> `optional` **payerProof?**: [`PayerProofNeed`](/packages/quasar-sdk/checkout/type-aliases/PayerProofNeed.md)

Defined in: [checkout/types.ts:293](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L293)

When a payment with the method needs the paying wallet's confirmation of the invoice
([CheckoutState.confirmPayer](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#confirmpayer)): `before_quote` (an EVM method: before the price; the quote answers
`409 payer_proof_required` without it), `unless_relayed` (an EVM method the gasless relay may pay: the price comes
first, the relay's EIP-3009 authorization confirms the wallet, and a transfer or a paymaster payment of it needs
the confirmation first), `none` (Solana: the quote's reference ties the transfer to the invoice). Quasar versions
before October 29, 2026 leave it out: no confirmation.

***

### symbol

> **symbol**: `string`

Defined in: [checkout/types.ts:270](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L270)

Token symbol.

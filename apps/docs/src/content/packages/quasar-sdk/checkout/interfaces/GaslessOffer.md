# GaslessOffer

Defined in: checkout/types.ts:214

What the merchant sponsors for a quote: `relay`, an EIP-3009 authorization any wallet signs (Quasar sends the
transfer), and `paymaster`, the calls a smart wallet sends with the checkout's ERC-7677 paymaster
(`paymasterUrl` of the store).

## Properties

### paymaster?

> `optional` **paymaster?**: `object`

Defined in: checkout/types.ts:218

Send these calls with `wallet_sendCalls` and the `paymasterService` capability set to the paymaster URL.

#### calls

> **calls**: `object`[]

***

### relay?

> `optional` **relay?**: `object`

Defined in: checkout/types.ts:216

Sign `typedData` and pass the signature to [CheckoutState.relay](/packages/quasar-sdk/checkout/interfaces/CheckoutState.md#relay).

#### typedData

> **typedData**: [`TransferAuthorizationTypedData`](/packages/quasar-sdk/checkout/interfaces/TransferAuthorizationTypedData.md)

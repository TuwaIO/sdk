# PayerProofSigner

> **PayerProofSigner** = (`message`, `request`) => `Promise`\<`string`\>

Defined in: [checkout/store.ts:184](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/store.ts#L184)

Signs the message of a payer proof with the connected wallet: `personal_sign` (EIP-191) of `message` exactly as it
is, from `request.payer` (a smart wallet signs it through its own flow, ERC-1271 or ERC-6492). Rejects when the buyer
refuses or the wallet cannot sign.

## Parameters

### message

`string`

The EIP-4361 message to sign.

### request

[`PayerProofMessage`](/packages/quasar-sdk/checkout/interfaces/PayerProofMessage.md)

What Quasar answered: the message with its site, network, nonce and dates.

## Returns

`Promise`\<`string`\>

The signature, as hex.

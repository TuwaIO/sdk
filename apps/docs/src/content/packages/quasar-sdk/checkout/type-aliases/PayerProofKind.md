# PayerProofKind

> **PayerProofKind** = `"eoa"` \| `"eip1271"` \| `"eip6492"` \| `"authorization"`

Defined in: [checkout/types.ts:310](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L310)

How a wallet confirmed the invoice: `eoa` (an EIP-191 signature of Quasar's message, which counts on every EVM
network), `eip1271` and `eip6492` (a smart wallet's signature its contract accepted, deployed or not yet, which
counts on that network only), `authorization` (the EIP-3009 authorization of the invoice's gasless relay, on every
EVM network).

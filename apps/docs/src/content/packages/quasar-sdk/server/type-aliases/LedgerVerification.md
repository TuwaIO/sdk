# LedgerVerification

> **LedgerVerification** = \{ `events`: `number`; `valid`: `true`; \} \| \{ `reason`: `"sequence"` \| `"link"` \| `"hash"` \| `"head"`; `seq`: `number`; `valid`: `false`; \}

Defined in: [modules/payments/types.ts:525](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L525)

The result of checking a ledger's hash chain: intact, or where and why it breaks.

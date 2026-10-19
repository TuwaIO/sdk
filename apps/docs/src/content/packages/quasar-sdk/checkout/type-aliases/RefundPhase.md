# RefundPhase

> **RefundPhase** = `"idle"` \| `"requesting"` \| `"awaitingTransfer"` \| `"submitting"` \| `"confirming"` \| `"confirmed"` \| `"failed"`

Defined in: checkout/refundStore.ts:16

Where a refund stands: `idle`; `requesting` (Quasar prices it); `awaitingTransfer` (send `instructions` from the
merchant's wallet, then [RefundState.submit](/packages/quasar-sdk/checkout/interfaces/RefundState.md#submit)); `submitting`; `confirming` (Quasar follows the transaction);
`confirmed` (the credit note is issued) or `failed`.

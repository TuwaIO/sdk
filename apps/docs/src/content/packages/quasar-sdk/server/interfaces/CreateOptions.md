# CreateOptions

Defined in: modules/payments/types.ts:135

Options of a call that creates something.

## Properties

### idempotencyKey?

> `optional` **idempotencyKey?**: `string`

Defined in: modules/payments/types.ts:140

Sent as the `Idempotency-Key` header (1–255 characters): a retry with the same key returns what the first call
created, with the same payment link, instead of creating it twice.

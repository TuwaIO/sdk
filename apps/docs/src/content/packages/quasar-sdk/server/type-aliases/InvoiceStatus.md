# InvoiceStatus

> **InvoiceStatus** = `"open"` \| `"processing"` \| `"paid"` \| `"underpaid"` \| `"held"` \| `"partially_refunded"` \| `"refunded"` \| `"expired"` \| `"cancelled"`

Defined in: modules/payments/types.ts:24

State of an invoice: `open` until paid, `processing` while a payment is being confirmed, then `paid`, `underpaid`
(the buyer may top it up), `held` (the merchant releases or refunds it), `partially_refunded`, `refunded`, or
`expired`/`cancelled` without a payment.

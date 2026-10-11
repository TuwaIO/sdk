# CreateSubscriptionParams

> **CreateSubscriptionParams** = [`InvoiceLinesInput`](/packages/quasar-sdk/server/type-aliases/InvoiceLinesInput.md) & [`InvoiceTermsInput`](/packages/quasar-sdk/server/interfaces/InvoiceTermsInput.md) & `object`

Defined in: [modules/payments/types.ts:597](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L597)

What [PaymentsModule.createSubscription](/packages/quasar-sdk/server/classes/PaymentsModule.md#createsubscription) takes: a plan, billed every period as one invoice.

## Type Declaration

### collection?

> `optional` **collection?**: `"send_invoice"` \| `"auto_charge"`

`send_invoice` (default: the buyer pays each invoice) or `auto_charge` (an ERC-7715 permission).

### cycles?

> `optional` **cycles?**: `number`

Periods to bill, then it ends; give it or `endsAt`.

### endsAt?

> `optional` **endsAt?**: `Date` \| `string`

When it ends.

### graceDays?

> `optional` **graceDays?**: `number`

Days an invoice stays payable after its period starts.

### interval

> **interval**: [`SubscriptionInterval`](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)

Period unit.

### intervalCount?

> `optional` **intervalCount?**: `number`

Units per period; a period is at most one year. Defaults to `1`.

### preferredMethodId?

> `optional` **preferredMethodId?**: `string`

The payment method to charge or offer first.

### trialDays?

> `optional` **trialDays?**: `number`

Days before the first period starts.

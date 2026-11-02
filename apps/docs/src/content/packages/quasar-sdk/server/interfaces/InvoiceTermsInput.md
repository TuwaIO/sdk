# InvoiceTermsInput

Defined in: modules/payments/types.ts:94

Terms that an invoice and a subscription plan share.

## Properties

### buyer?

> `optional` **buyer?**: [`Buyer`](/packages/quasar-sdk/server/interfaces/Buyer.md)

Defined in: modules/payments/types.ts:100

The buyer.

***

### buyerReference?

> `optional` **buyerReference?**: `string`

Defined in: modules/payments/types.ts:104

BT-10, the reference the buyer asked for.

***

### cancelUrl?

> `optional` **cancelUrl?**: `string`

Defined in: modules/payments/types.ts:112

Where the checkout sends a buyer who gives up.

***

### currency?

> `optional` **currency?**: [`PaymentsCurrency`](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)

Defined in: modules/payments/types.ts:96

Currency. Defaults to `USD`.

***

### expectedPayer?

> `optional` **expectedPayer?**: `string`

Defined in: modules/payments/types.ts:102

The CAIP-10 account you expect to pay (`eip155:8453:0x…`, `solana:<genesis hash>:<address>`).

***

### locale?

> `optional` **locale?**: [`InvoiceLocale`](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md)

Defined in: modules/payments/types.ts:98

Language of the documents and emails. Defaults to `en`.

***

### metadata?

> `optional` **metadata?**: `Record`\<`string`, `unknown`\>

Defined in: modules/payments/types.ts:108

Your data, returned with the invoice and its webhooks; at most 8 KiB as JSON.

***

### notes?

> `optional` **notes?**: `string`

Defined in: modules/payments/types.ts:114

A note printed on the invoice.

***

### orderReference?

> `optional` **orderReference?**: `string`

Defined in: modules/payments/types.ts:106

BT-13, the buyer's purchase order.

***

### pricesIncludeTax?

> `optional` **pricesIncludeTax?**: `boolean`

Defined in: modules/payments/types.ts:116

Whether unit prices include VAT; defaults to the app's document settings.

***

### reverseCharge?

> `optional` **reverseCharge?**: `boolean`

Defined in: modules/payments/types.ts:118

A reverse-charge invoice (needs `buyer.taxId`).

***

### successUrl?

> `optional` **successUrl?**: `string`

Defined in: modules/payments/types.ts:110

Where the checkout sends the buyer after paying.

***

### taxExemptionReason?

> `optional` **taxExemptionReason?**: `string`

Defined in: modules/payments/types.ts:120

Why the lines are exempt (needed for category `E`).

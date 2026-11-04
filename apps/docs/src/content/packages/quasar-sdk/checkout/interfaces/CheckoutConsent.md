# CheckoutConsent

Defined in: [checkout/types.ts:253](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L253)

A line the merchant asks the buyer to tick before paying, such as a request to start a service at once. The quote
records the tick in the invoice's ledger and the receipt email repeats the text.

## Properties

### required

> **required**: `boolean`

Defined in: [checkout/types.ts:257](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L257)

Whether the buyer cannot pay without ticking it: Quasar refuses the quote with `consent_required`.

***

### text

> **text**: `string`

Defined in: [checkout/types.ts:255](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L255)

The merchant's words, up to 500 characters, shown as they are.

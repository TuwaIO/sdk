# CheckoutConsent

Defined in: [checkout/types.ts:131](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L131)

A line the merchant asks the buyer to tick before paying, such as a request to start a service at once. The quote
records the tick in the invoice's ledger and the receipt email repeats the text.

## Properties

### required

> **required**: `boolean`

Defined in: [checkout/types.ts:135](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L135)

Whether the buyer cannot pay without ticking it: Quasar refuses the quote with `consent_required`.

***

### text

> **text**: `string`

Defined in: [checkout/types.ts:133](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/types.ts#L133)

The merchant's words, up to 500 characters, shown as they are.

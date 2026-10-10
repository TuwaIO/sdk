# RefundState

Defined in: [checkout/refundStore.ts:20](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L20)

The state and actions of [createRefundStore](/packages/quasar-sdk/checkout/functions/createRefundStore.md).

## Properties

### error

> **error**: [`CheckoutError`](/packages/quasar-sdk/checkout/interfaces/CheckoutError.md) \| `null`

Defined in: [checkout/refundStore.ts:28](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L28)

Why the last action failed; cleared by the next one.

***

### instructions

> **instructions**: [`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\[`"instructions"`\] \| `null`

Defined in: [checkout/refundStore.ts:26](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L26)

What to send where: chain, asset, recipient (the payer) and amount in base units.

***

### phase

> **phase**: [`RefundPhase`](/packages/quasar-sdk/checkout/type-aliases/RefundPhase.md)

Defined in: [checkout/refundStore.ts:22](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L22)

Where the refund stands.

***

### refund

> **refund**: [`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md) \| `null`

Defined in: [checkout/refundStore.ts:24](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L24)

The refund, once asked for.

***

### reset

> **reset**: () => `void`

Defined in: [checkout/refundStore.ts:52](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L52)

Stops following and returns to `idle`.

#### Returns

`void`

***

### resume

> **resume**: (`refund`, `instructions`) => `void`

Defined in: [checkout/refundStore.ts:43](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L43)

Continues a refund that waits for its transaction (asked for earlier, or through the API).

#### Parameters

##### refund

[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)

The refund, `requested`.

##### instructions

[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\[`"instructions"`\]

What to send, as `request` returned it.

#### Returns

`void`

***

### start

> **start**: (`invoiceId`, `params?`) => `Promise`\<`boolean`\>

Defined in: [checkout/refundStore.ts:36](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L36)

Asks for a refund of an invoice through `request`.

#### Parameters

##### invoiceId

`string`

The paid or held invoice.

##### params?

[`RefundParams`](/packages/quasar-sdk/server/interfaces/RefundParams.md)

Amount (everything left when omitted), mode and reason.

#### Returns

`Promise`\<`boolean`\>

Whether it was asked for; `phase` is then `awaitingTransfer`.

***

### submit

> **submit**: (`params`) => `Promise`\<`boolean`\>

Defined in: [checkout/refundStore.ts:50](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L50)

Hands over the refund transaction through `submit`, then follows the refund through `get` until it is final.

#### Parameters

##### params

[`SubmitRefundParams`](/packages/quasar-sdk/server/interfaces/SubmitRefundParams.md)

The transaction and the merchant wallet it was sent from.

#### Returns

`Promise`\<`boolean`\>

Whether it was taken; `phase` is then `confirming`.

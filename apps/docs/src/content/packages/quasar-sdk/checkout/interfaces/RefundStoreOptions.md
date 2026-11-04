# RefundStoreOptions

Defined in: [checkout/refundStore.ts:64](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L64)

Options of [createRefundStore](/packages/quasar-sdk/checkout/functions/createRefundStore.md): the three calls, which the app runs on its server with the secret key.

## Properties

### get

> **get**: (`refundId`) => `Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

Defined in: [checkout/refundStore.ts:72](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L72)

Reads the refund, for example through `quasar.payments.getRefund`.

#### Parameters

##### refundId

`string`

#### Returns

`Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

***

### pollMs?

> `optional` **pollMs?**: `number`

Defined in: [checkout/refundStore.ts:74](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L74)

How often to read a refund being confirmed, in milliseconds. Defaults to `5000`.

***

### preview?

> `optional` **preview?**: (`invoiceId`, `params`) => `Promise`\<[`RefundPreview`](/packages/quasar-sdk/server/interfaces/RefundPreview.md)\>

Defined in: [checkout/refundStore.ts:68](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L68)

Shows what a refund would send, for example through `quasar.payments.previewRefund`. Optional.

#### Parameters

##### invoiceId

`string`

##### params

[`RefundParams`](/packages/quasar-sdk/server/interfaces/RefundParams.md)

#### Returns

`Promise`\<[`RefundPreview`](/packages/quasar-sdk/server/interfaces/RefundPreview.md)\>

***

### request

> **request**: (`invoiceId`, `params`) => `Promise`\<[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\>

Defined in: [checkout/refundStore.ts:66](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L66)

Asks for the refund, for example a Server Action that calls `quasar.payments.refund`.

#### Parameters

##### invoiceId

`string`

##### params

[`RefundParams`](/packages/quasar-sdk/server/interfaces/RefundParams.md)

#### Returns

`Promise`\<[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\>

***

### submit

> **submit**: (`refundId`, `params`) => `Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

Defined in: [checkout/refundStore.ts:70](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L70)

Hands over its transaction, for example through `quasar.payments.submitRefund`.

#### Parameters

##### refundId

`string`

##### params

[`SubmitRefundParams`](/packages/quasar-sdk/server/interfaces/SubmitRefundParams.md)

#### Returns

`Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

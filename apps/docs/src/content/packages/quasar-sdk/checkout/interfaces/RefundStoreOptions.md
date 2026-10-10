# RefundStoreOptions

Defined in: [checkout/refundStore.ts:56](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L56)

Options of [createRefundStore](/packages/quasar-sdk/checkout/functions/createRefundStore.md): the three calls, which the app runs on its server with the secret key.

## Properties

### get

> **get**: (`refundId`) => `Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

Defined in: [checkout/refundStore.ts:62](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L62)

Reads the refund, for example through `quasar.payments.getRefund`.

#### Parameters

##### refundId

`string`

#### Returns

`Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

***

### pollMs?

> `optional` **pollMs?**: `number`

Defined in: [checkout/refundStore.ts:64](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L64)

How often to read a refund being confirmed, in milliseconds. Defaults to `5000`.

***

### request

> **request**: (`invoiceId`, `params`) => `Promise`\<[`RefundStart`](/packages/quasar-sdk/server/interfaces/RefundStart.md)\>

Defined in: [checkout/refundStore.ts:58](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L58)

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

Defined in: [checkout/refundStore.ts:60](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/checkout/refundStore.ts#L60)

Hands over its transaction, for example through `quasar.payments.submitRefund`.

#### Parameters

##### refundId

`string`

##### params

[`SubmitRefundParams`](/packages/quasar-sdk/server/interfaces/SubmitRefundParams.md)

#### Returns

`Promise`\<[`Refund`](/packages/quasar-sdk/server/interfaces/Refund.md)\>

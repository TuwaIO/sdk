# QuasarWebhookError

Defined in: [webhooks.ts:156](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L156)

Error thrown by [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md): answer the delivery with 400 (or 401) and do not act on it.

## Extends

- `Error`

## Constructors

### Constructor

> **new QuasarWebhookError**(`code`, `message`): `QuasarWebhookError`

Defined in: [webhooks.ts:166](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L166)

Creates the error.

#### Parameters

##### code

[`QuasarWebhookErrorCode`](/packages/quasar-sdk/server/type-aliases/QuasarWebhookErrorCode.md)

Why the delivery was refused.

##### message

`string`

What to log.

#### Returns

`QuasarWebhookError`

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: [`QuasarWebhookErrorCode`](/packages/quasar-sdk/server/type-aliases/QuasarWebhookErrorCode.md)

Defined in: [webhooks.ts:158](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L158)

Why the delivery was refused.

# QuasarWebhookError

Defined in: [webhooks.ts:176](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L176)

Error thrown by [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md): answer the delivery with 400 (or 401) and do not act on it.

## Extends

- `Error`

## Constructors

### Constructor

> **new QuasarWebhookError**(`code`, `message`): `QuasarWebhookError`

Defined in: [webhooks.ts:186](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L186)

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

Defined in: [webhooks.ts:178](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L178)

Why the delivery was refused.

# WEBHOOK\_SIGNATURE\_HEADER

> `const` **WEBHOOK\_SIGNATURE\_HEADER**: `"x-quasar-signature"` = `'x-quasar-signature'`

Defined in: [webhooks.ts:9](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/webhooks.ts#L9)

The header that carries the signature of a webhook: the hex HMAC-SHA256 of the raw body, keyed with the secret.

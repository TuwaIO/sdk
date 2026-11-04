# GetEventsParams

Defined in: [modules/payments/types.ts:486](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L486)

What [PaymentsModule.getEvents](/packages/quasar-sdk/server/classes/PaymentsModule.md#getevents) takes.

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:492](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L492)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:490](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L490)

Page size, 1 to 100. Defaults to `100`.

***

### verify?

> `optional` **verify?**: `boolean`

Defined in: [modules/payments/types.ts:488](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L488)

`true` adds the check of the whole hash chain, whatever the page.

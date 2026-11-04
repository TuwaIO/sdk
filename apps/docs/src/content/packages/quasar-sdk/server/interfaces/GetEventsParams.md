# GetEventsParams

Defined in: [modules/payments/types.ts:491](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L491)

What [PaymentsModule.getEvents](/packages/quasar-sdk/server/classes/PaymentsModule.md#getevents) takes.

## Properties

### cursor?

> `optional` **cursor?**: `string`

Defined in: [modules/payments/types.ts:497](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L497)

`nextCursor` of the previous page.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [modules/payments/types.ts:495](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L495)

Page size, 1 to 100. Defaults to `100`.

***

### verify?

> `optional` **verify?**: `boolean`

Defined in: [modules/payments/types.ts:493](https://github.com/TuwaIO/sdk/blob/main/packages/quasar-sdk/src/modules/payments/types.ts#L493)

`true` adds the check of the whole hash chain, whatever the page.

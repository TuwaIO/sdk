/**
 * The headless checkout of Quasar Payments, imported from `@tuwaio/quasar-sdk/checkout`, for the browser: a vanilla
 * Zustand store per invoice that the buyer pays, opened with its checkout token (no key), and a refund store for the
 * merchant's wallet, whose calls run on the app's server. It needs `zustand` (5.x); it sends no transaction itself
 * (Pulsar or the wallet does) and depends on no chain library. `@tuwaio/nova-payments` renders it.
 *
 * @module checkout
 */

export * from './refundStore';
export * from './store';
export type * from './types';

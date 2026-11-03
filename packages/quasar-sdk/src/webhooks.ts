/**
 * @file Verification of Quasar webhooks: the HMAC-SHA256 signature of the raw body and the time deliveries were sent;
 * and the types of their bodies.
 */

import type { Invoice, InvoiceSettlement, PaymentsEnvironment, Refund, Subscription } from './modules/payments/types';

/** The header that carries the signature of a webhook: the hex HMAC-SHA256 of the raw body, keyed with the secret. */
export const WEBHOOK_SIGNATURE_HEADER = 'x-quasar-signature';

/** `apiVersion` of payment webhook bodies. */
export const PAYMENT_WEBHOOK_VERSION = 'payments.v1';

/** Types of payment webhook events. */
export type PaymentWebhookEventType =
  | 'invoice.issued'
  | 'invoice.processing'
  | 'invoice.paid'
  | 'invoice.underpaid'
  | 'invoice.held'
  | 'invoice.transfer_held'
  | 'invoice.transfer_hold_voided'
  | 'invoice.released'
  | 'invoice.expired'
  | 'invoice.cancelled'
  | 'invoice.refunded'
  | 'invoice.partially_refunded'
  | 'invoice.replaced'
  | 'refund.confirmed'
  | 'refund.failed'
  | 'payment.reverted'
  | 'subscription.created'
  | 'subscription.renewed'
  | 'subscription.past_due'
  | 'subscription.paused'
  | 'subscription.resumed'
  | 'subscription.cancel_scheduled'
  | 'subscription.cancel_unscheduled'
  | 'subscription.canceled'
  | 'subscription.ended'
  | 'subscription.permission_granted'
  | 'subscription.charge_failed'
  | 'subscription.permission_revoked';

/**
 * What a hold is about (`data.hold` of `invoice.held`): an invoice paid in a way that waits for your decision. `reason`
 * (`late`, `aml`, `quote_expired`), its transaction (`txHash`), the wallets that sent it (`senders`) and whether it came
 * late (`late`). Release it with {@link PaymentsModule.releaseInvoice} or refund it.
 */
export interface PaymentWebhookHold {
  /** Why the payment is held; `null` when Quasar did not record why. */
  reason: 'late' | 'aml' | 'quote_expired' | null;
  /** The transaction of the held payment. */
  txHash: string | null;
  /** The wallets that sent it. */
  senders?: string[];
  /** It arrived after the invoice expired or was cancelled, or was handed over after `dueAt`. */
  late?: true;
}

/**
 * A transfer that reached the invoice's address without being tied to it by proof (`data.heldTransfer` of
 * `invoice.transfer_held`): it paid nothing and the invoice stays as it was. It is a record of its own, which you
 * refund as a whole to the wallet that sent it ({@link PaymentsModule.refundHeldTransfer}): `reason` is
 * `payer_mismatch` (another wallet than the one the quote was for) or `payer_unconfirmed` (the quoted wallet never
 * confirmed the invoice).
 */
export interface PaymentWebhookHeldTransfer {
  /** Not set: the transfer is held. */
  voided?: undefined;
  /** The held transfer ({@link HeldTransfer}). */
  id: string | null;
  /** Its transaction. */
  txHash: string | null;
  /** What it carried, in base units of its token. */
  amount: string | null;
  /** The wallets that sent it. */
  senders: string[];
  /** Why it is tied to no invoice. */
  reason: 'payer_mismatch' | 'payer_unconfirmed' | null;
  /** It arrived after the invoice expired or was cancelled. */
  late?: true;
  /** Set when AML blocked its sender: Quasar refunds it to no one. */
  screening?: { status: 'blocked'; reasons: unknown[] };
}

/**
 * A held transfer Quasar voided (`data.heldTransfer` of `invoice.transfer_hold_voided`): the same transaction was
 * proven to pay another invoice of yours since (`paidInvoice`), so there is nothing to refund.
 */
export interface PaymentWebhookHeldTransferVoided {
  /** The held transfer. */
  id: string | null;
  /** Always `true`. */
  voided: true;
  /** Its transaction. */
  txHash: string | null;
  /** The invoice the transaction paid instead. */
  paidInvoice: string | null;
}

/**
 * The body of a payment webhook (`payments.v1`). `id`, `type` and `createdAt` are those of the ledger event, so
 * deduplicate by `id`; `data.invoice` is the invoice when the delivery was sent, so a retry carries its current state.
 */
export interface PaymentWebhookEvent {
  /** Event ID: the same for every delivery and retry of the event. */
  id: string;
  /** Always `event`. */
  object: 'event';
  /** Always `payments.v1`. */
  apiVersion: typeof PAYMENT_WEBHOOK_VERSION;
  /** What happened. */
  type: PaymentWebhookEventType;
  /** When it happened (ISO 8601). */
  createdAt: string;
  /** When this delivery was sent; signed with the body, it lets {@link verifyWebhook} refuse old replays. */
  sentAt: string;
  /** Live or test. */
  environment: PaymentsEnvironment;
  /** What the event is about. */
  data: {
    /** The invoice now (subscription events carry the invoice of their period, when there is one). */
    invoice?: Invoice;
    /** The payment, once the invoice has one. */
    settlement?: InvoiceSettlement;
    /** The refund of a refund event. */
    refund?: Refund;
    /** Why AML held the payment, on a hold by AML. */
    aml?: { decision: 'block'; reasons: unknown[] };
    /** What `invoice.held` holds. Quasar versions before October 29, 2026 leave it out. */
    hold?: PaymentWebhookHold;
    /**
     * The transfer of `invoice.transfer_held` and `invoice.transfer_hold_voided`. The refund of a held transfer names
     * it in `refund.heldTransfer`.
     */
    heldTransfer?: PaymentWebhookHeldTransfer | PaymentWebhookHeldTransferVoided;
    /** The subscription of a subscription event. */
    subscription?: Subscription;
  };
}

/** The body of a transaction webhook: a synced Pulsar transaction reached a final status. */
export interface TransactionWebhookEvent {
  /** Key of the Pulsar transaction. */
  txKey: string;
  /** Its on-chain hash, when it has one. */
  hash?: string;
  /** Final status: `Success`, `Failed` or `Replaced`. */
  status: string;
  /** The same as `status`; also sent in the `x-quasar-event` header. */
  action: string;
  /** The `type` of the Pulsar transaction. */
  txType?: string;
  /** Its chain: the EVM chain ID (`"1"`) or the Solana CAIP-2 chain ID. */
  chainId: string;
  /** Unix time in seconds when the webhook was created. */
  timestamp: number;
  /**
   * When this delivery attempt was sent (ISO 8601), signed with the body. Quasar engines released before Payments omit
   * it; {@link verifyWebhook} then checks `timestamp`.
   */
  sentAt?: string;
  /** The `payload` of the Pulsar transaction. */
  metadata?: unknown;
}

/** A verified webhook body: a payment event or a transaction webhook. Tell them apart with {@link isPaymentWebhookEvent}. */
export type QuasarWebhook = PaymentWebhookEvent | TransactionWebhookEvent;

/** Why {@link verifyWebhook} refused a delivery. */
export type QuasarWebhookErrorCode =
  'missing_secret' | 'missing_signature' | 'invalid_signature' | 'invalid_body' | 'invalid_options' | 'stale';

/** Error thrown by {@link verifyWebhook}: answer the delivery with 400 (or 401) and do not act on it. */
export class QuasarWebhookError extends Error {
  /** Why the delivery was refused. */
  public readonly code: QuasarWebhookErrorCode;

  /**
   * Creates the error.
   *
   * @param code - Why the delivery was refused.
   * @param message - What to log.
   */
  constructor(code: QuasarWebhookErrorCode, message: string) {
    super(message);
    this.name = 'QuasarWebhookError';
    this.code = code;
  }
}

/** What {@link verifyWebhook} takes. */
export interface VerifyWebhookParams {
  /** The request body exactly as received, before any parsing: a string or its bytes. */
  body: string | Uint8Array;
  /** The value of the `x-quasar-signature` header. */
  signature: string | null | undefined;
  /** The signing secret of the webhook endpoint. */
  secret: string;
  /**
   * How far the send time may be from now, in seconds: a finite number above 0, or `false` to turn the check off
   * (`0`, a negative number, `NaN` or `Infinity` throw `invalid_options`). Defaults to `300`. The send time is
   * `sentAt`; a transaction webhook of an engine that sends no `sentAt` is checked by its `timestamp`, the time it was
   * created, which its retries reuse, so a retry later than the tolerance is refused.
   */
  toleranceSeconds?: number | false;
  /** The current time, for tests. Defaults to now. */
  now?: Date;
}

const DEFAULT_TOLERANCE_SECONDS = 300;

/** The hex HMAC-SHA256 of the bytes, with Web Crypto (Node.js 20+, edge runtimes, browsers). */
async function hmacHex(secret: string, bytes: Uint8Array): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, bytes as BufferSource));
  return Array.from(mac, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Compares two strings in time that depends only on their length. */
function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

/**
 * When a delivery was sent, in milliseconds (`NaN` when the body has no valid time), and the field it was read from:
 * `sentAt`, set on every attempt; a transaction webhook of an engine that sends no `sentAt` has only `timestamp`, in
 * seconds, set when the webhook was created and reused by its retries.
 */
function sendTime(event: QuasarWebhook): { field: 'sentAt' | 'timestamp'; time: number } {
  if (isPaymentWebhookEvent(event) || event.sentAt != null) {
    return { field: 'sentAt', time: typeof event.sentAt === 'string' ? Date.parse(event.sentAt) : NaN };
  }
  const { timestamp } = event;
  return {
    field: 'timestamp',
    time: typeof timestamp === 'number' && Number.isFinite(timestamp) ? timestamp * 1000 : NaN,
  };
}

/**
 * Whether a verified webhook is a payment event (`apiVersion: 'payments.v1'`) rather than a transaction webhook.
 *
 * @param event - A body returned by {@link verifyWebhook}.
 * @returns `true` for a payment event.
 */
export function isPaymentWebhookEvent(event: QuasarWebhook): event is PaymentWebhookEvent {
  return (event as PaymentWebhookEvent).apiVersion === PAYMENT_WEBHOOK_VERSION;
}

/**
 * Verifies a Quasar webhook and returns its body. Checks the signature (`x-quasar-signature`, the hex HMAC-SHA256 of
 * the raw body keyed with the endpoint's signing secret) in constant time, parses the body and refuses a delivery
 * whose send time (`sentAt`, falling back to `timestamp` for older transaction webhooks) is further from now than
 * `toleranceSeconds` (a replay of an old delivery). Uses Web Crypto, so it runs in Node.js 20+, edge runtimes and
 * Workers. Payment events are delivered at least once: deduplicate them by `id`.
 *
 * @param params - The raw body, the signature header, the secret and the tolerance.
 * @returns The body: a {@link PaymentWebhookEvent} or a {@link TransactionWebhookEvent}.
 * @throws {QuasarWebhookError} `missing_secret`, `missing_signature`, `invalid_signature`, `invalid_body` (not a
 *   JSON object), `invalid_options` (an invalid `toleranceSeconds`) or `stale` (an event outside the tolerance or
 *   missing its send time).
 *
 * @example
 * ```ts
 * import { isPaymentWebhookEvent, verifyWebhook } from '@tuwaio/quasar-sdk';
 *
 * export async function POST(request: Request) {
 *   try {
 *     const event = await verifyWebhook({
 *       body: await request.text(),
 *       signature: request.headers.get('x-quasar-signature'),
 *       secret: process.env.QUASAR_WEBHOOK_SECRET ?? '',
 *     });
 *     if (isPaymentWebhookEvent(event) && event.type === 'invoice.paid') {
 *       await fulfil(event.data.invoice?.metadata?.orderId);
 *     }
 *     return new Response(null, { status: 204 });
 *   } catch {
 *     return new Response(null, { status: 400 });
 *   }
 * }
 * ```
 */
export async function verifyWebhook(params: VerifyWebhookParams): Promise<QuasarWebhook> {
  const { body, signature, secret, toleranceSeconds = DEFAULT_TOLERANCE_SECONDS, now = new Date() } = params;
  if (
    toleranceSeconds !== false &&
    (typeof toleranceSeconds !== 'number' || !Number.isFinite(toleranceSeconds) || toleranceSeconds <= 0)
  ) {
    throw new QuasarWebhookError('invalid_options', 'toleranceSeconds must be a finite number above 0, or false');
  }
  if (!secret) throw new QuasarWebhookError('missing_secret', 'No signing secret to verify the webhook with');
  if (!signature)
    throw new QuasarWebhookError('missing_signature', `The ${WEBHOOK_SIGNATURE_HEADER} header is missing`);

  const bytes = typeof body === 'string' ? new TextEncoder().encode(body) : body;
  const expected = await hmacHex(secret, bytes);
  if (!sameText(signature.trim().toLowerCase(), expected)) {
    throw new QuasarWebhookError('invalid_signature', 'The signature does not match the body');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(typeof body === 'string' ? body : new TextDecoder().decode(body));
  } catch {
    throw new QuasarWebhookError('invalid_body', 'The body is not JSON');
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new QuasarWebhookError('invalid_body', 'The body is not a webhook');
  }

  const event = parsed as QuasarWebhook;
  if (toleranceSeconds !== false) {
    const { field, time } = sendTime(event);
    if (Number.isNaN(time)) throw new QuasarWebhookError('stale', `The event carries no valid send time (${field})`);
    if (Math.abs(now.getTime() - time) > toleranceSeconds * 1000) {
      throw new QuasarWebhookError(
        'stale',
        `The event was sent outside the ${toleranceSeconds} s tolerance (${field})`,
      );
    }
  }
  return event;
}

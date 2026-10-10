# server

The Quasar API client, imported from `@tuwaio/quasar-sdk`. Use it on the server (Node.js, Next.js Server Actions and
route handlers, Edge runtimes): it authenticates with the secret key of a Quasar app. It needs no React and no SIWX
package; the browser helper for React apps is in `@tuwaio/quasar-sdk/react`.

## Classes

- [PaymentsModule](/packages/quasar-sdk/server/classes/PaymentsModule.md)
- [PulsarModule](/packages/quasar-sdk/server/classes/PulsarModule.md)
- [Quasar](/packages/quasar-sdk/server/classes/Quasar.md)
- [QuasarSDKError](/packages/quasar-sdk/server/classes/QuasarSDKError.md)
- [QuasarWebhookError](/packages/quasar-sdk/server/classes/QuasarWebhookError.md)

## Interfaces

- [Buyer](/packages/quasar-sdk/server/interfaces/Buyer.md)
- [CancelSubscriptionParams](/packages/quasar-sdk/server/interfaces/CancelSubscriptionParams.md)
- [CorrectInvoiceParams](/packages/quasar-sdk/server/interfaces/CorrectInvoiceParams.md)
- [CreateOptions](/packages/quasar-sdk/server/interfaces/CreateOptions.md)
- [CreditNoteRef](/packages/quasar-sdk/server/interfaces/CreditNoteRef.md)
- [HistoryQuery](/packages/quasar-sdk/server/interfaces/HistoryQuery.md)
- [Invoice](/packages/quasar-sdk/server/interfaces/Invoice.md)
- [InvoiceAml](/packages/quasar-sdk/server/interfaces/InvoiceAml.md)
- [InvoiceCorrection](/packages/quasar-sdk/server/interfaces/InvoiceCorrection.md)
- [InvoiceDetails](/packages/quasar-sdk/server/interfaces/InvoiceDetails.md)
- [InvoiceLedger](/packages/quasar-sdk/server/interfaces/InvoiceLedger.md)
- [InvoiceLine](/packages/quasar-sdk/server/interfaces/InvoiceLine.md)
- [InvoiceLineInput](/packages/quasar-sdk/server/interfaces/InvoiceLineInput.md)
- [InvoiceQuote](/packages/quasar-sdk/server/interfaces/InvoiceQuote.md)
- [InvoiceSettlement](/packages/quasar-sdk/server/interfaces/InvoiceSettlement.md)
- [InvoiceTermsInput](/packages/quasar-sdk/server/interfaces/InvoiceTermsInput.md)
- [InvoiceWithCheckout](/packages/quasar-sdk/server/interfaces/InvoiceWithCheckout.md)
- [LedgerEvent](/packages/quasar-sdk/server/interfaces/LedgerEvent.md)
- [ListInvoicesParams](/packages/quasar-sdk/server/interfaces/ListInvoicesParams.md)
- [ListSubscriptionsParams](/packages/quasar-sdk/server/interfaces/ListSubscriptionsParams.md)
- [PaginatedResult](/packages/quasar-sdk/server/interfaces/PaginatedResult.md)
- [PaymentDocument](/packages/quasar-sdk/server/interfaces/PaymentDocument.md)
- [PaymentMethod](/packages/quasar-sdk/server/interfaces/PaymentMethod.md)
- [PaymentQuote](/packages/quasar-sdk/server/interfaces/PaymentQuote.md)
- [PaymentsList](/packages/quasar-sdk/server/interfaces/PaymentsList.md)
- [PaymentWebhookEvent](/packages/quasar-sdk/server/interfaces/PaymentWebhookEvent.md)
- [PulsarPoolStore](/packages/quasar-sdk/server/interfaces/PulsarPoolStore.md)
- [QuasarConfig](/packages/quasar-sdk/server/interfaces/QuasarConfig.md)
- [QuasarRequestIssue](/packages/quasar-sdk/server/interfaces/QuasarRequestIssue.md)
- [QuoteParams](/packages/quasar-sdk/server/interfaces/QuoteParams.md)
- [Refund](/packages/quasar-sdk/server/interfaces/Refund.md)
- [RefundParams](/packages/quasar-sdk/server/interfaces/RefundParams.md)
- [RefundStart](/packages/quasar-sdk/server/interfaces/RefundStart.md)
- [SubmitRefundParams](/packages/quasar-sdk/server/interfaces/SubmitRefundParams.md)
- [Subscription](/packages/quasar-sdk/server/interfaces/Subscription.md)
- [SubscriptionCharge](/packages/quasar-sdk/server/interfaces/SubscriptionCharge.md)
- [SubscriptionDetails](/packages/quasar-sdk/server/interfaces/SubscriptionDetails.md)
- [SubscriptionPermission](/packages/quasar-sdk/server/interfaces/SubscriptionPermission.md)
- [SubscriptionStart](/packages/quasar-sdk/server/interfaces/SubscriptionStart.md)
- [TransactionWebhookEvent](/packages/quasar-sdk/server/interfaces/TransactionWebhookEvent.md)
- [VerifyWebhookParams](/packages/quasar-sdk/server/interfaces/VerifyWebhookParams.md)

## Type Aliases

- [CreateInvoiceParams](/packages/quasar-sdk/server/type-aliases/CreateInvoiceParams.md)
- [CreateSubscriptionParams](/packages/quasar-sdk/server/type-aliases/CreateSubscriptionParams.md)
- [InvoiceLinesInput](/packages/quasar-sdk/server/type-aliases/InvoiceLinesInput.md)
- [InvoiceLocale](/packages/quasar-sdk/server/type-aliases/InvoiceLocale.md)
- [InvoiceStatus](/packages/quasar-sdk/server/type-aliases/InvoiceStatus.md)
- [LedgerVerification](/packages/quasar-sdk/server/type-aliases/LedgerVerification.md)
- [PaymentDocumentKind](/packages/quasar-sdk/server/type-aliases/PaymentDocumentKind.md)
- [PaymentsCurrency](/packages/quasar-sdk/server/type-aliases/PaymentsCurrency.md)
- [PaymentsEnvironment](/packages/quasar-sdk/server/type-aliases/PaymentsEnvironment.md)
- [PaymentWebhookEventType](/packages/quasar-sdk/server/type-aliases/PaymentWebhookEventType.md)
- [QuasarWebhook](/packages/quasar-sdk/server/type-aliases/QuasarWebhook.md)
- [QuasarWebhookErrorCode](/packages/quasar-sdk/server/type-aliases/QuasarWebhookErrorCode.md)
- [RefundMode](/packages/quasar-sdk/server/type-aliases/RefundMode.md)
- [SubscriptionInterval](/packages/quasar-sdk/server/type-aliases/SubscriptionInterval.md)
- [SubscriptionStatus](/packages/quasar-sdk/server/type-aliases/SubscriptionStatus.md)
- [TaxCategory](/packages/quasar-sdk/server/type-aliases/TaxCategory.md)

## Variables

- [BASE\_API\_URL](/packages/quasar-sdk/server/variables/BASE_API_URL.md)
- [PAYMENT\_WEBHOOK\_VERSION](/packages/quasar-sdk/server/variables/PAYMENT_WEBHOOK_VERSION.md)
- [PAYMENTS\_ENDPOINT](/packages/quasar-sdk/server/variables/PAYMENTS_ENDPOINT.md)
- [PULSAR\_HISTORY\_ENDPOINT](/packages/quasar-sdk/server/variables/PULSAR_HISTORY_ENDPOINT.md)
- [PULSAR\_SYNC\_ENDPOINT](/packages/quasar-sdk/server/variables/PULSAR_SYNC_ENDPOINT.md)
- [WEBHOOK\_SIGNATURE\_HEADER](/packages/quasar-sdk/server/variables/WEBHOOK_SIGNATURE_HEADER.md)

## Functions

- [isPaymentWebhookEvent](/packages/quasar-sdk/server/functions/isPaymentWebhookEvent.md)
- [pulsarSyncHashEndpoint](/packages/quasar-sdk/server/functions/pulsarSyncHashEndpoint.md)
- [verifyWebhook](/packages/quasar-sdk/server/functions/verifyWebhook.md)
- [watchBatchHashes](/packages/quasar-sdk/server/functions/watchBatchHashes.md)

/**
 * @module scripts/generate-openapi
 *
 * Generates the OpenAPI v3.1 specification for the Quasar Cloud API.
 * Uses Zod schemas mirroring @tuwaio/quasar-sdk types and
 * @asteasolutions/zod-to-openapi for spec generation.
 *
 * Output: apps/docs/public/openapi.yaml
 * Run: pnpm generate:docs
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { extendZodWithOpenApi, OpenApiGeneratorV31, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { OrbitAdapter, TuwaErrorState } from '@tuwaio/orbit-core';
import type {
  BaseTransaction,
  EvmTransaction,
  SolanaTransaction,
  StarknetTransaction,
  Transaction,
} from '@tuwaio/pulsar-core';
import { TransactionStatus, TransactionTracker, UpdatableTransactionFields } from '@tuwaio/pulsar-core';
import * as YAML from 'yaml';
import { z } from 'zod';

import { BASE_API_URL, PULSAR_HISTORY_ENDPOINT, PULSAR_SYNC_ENDPOINT } from '../packages/quasar-sdk/src';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Bootstrap: extend Zod with .openapi() method
// ---------------------------------------------------------------------------
extendZodWithOpenApi(z);

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
const registry = new OpenAPIRegistry();

// ---------------------------------------------------------------------------
// Security: Iron Dome Auth
// ---------------------------------------------------------------------------
const ironDomeAuth = registry.registerComponent('securitySchemes', 'IronDomeAuth', {
  type: 'apiKey',
  in: 'header',
  name: 'x-tuwa-secret-key',
  description: 'Server-side secret key starting with `sk_live_`. Passed through the Iron Dome security perimeter.',
});

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

// --- Enums ---
const TransactionTrackerSchema: z.ZodType<TransactionTracker> = z
  .enum([TransactionTracker.Ethereum, TransactionTracker.Safe, TransactionTracker.Gelato, TransactionTracker.Solana])
  .openapi('TransactionTracker', { description: 'The tracking strategy used for monitoring the transaction.' });

const TransactionStatusSchema: z.ZodType<TransactionStatus> = z
  .enum([TransactionStatus.Failed, TransactionStatus.Success, TransactionStatus.Replaced])
  .openapi('TransactionStatus', { description: 'Terminal status of a processed transaction.' });

// --- Error State ---
const ErrorStateSchema: z.ZodType<TuwaErrorState> = z
  .object({
    message: z.string(),
    raw: z.record(z.string(), z.unknown()),
  })
  .openapi('TuwaErrorState', { description: 'Error details if the transaction failed.' });

const HexStringSchema = z
  .string()
  .startsWith('0x', { message: 'String must start with 0x' })
  .regex(/^0x[a-fA-F0-9]*$/, { message: 'Must be a valid hex string' }) as unknown as z.ZodType<`0x${string}`>;

// --- Base Transaction ---
const BaseTransactionSchema = z.object({
  appName: z.string().optional(),
  chainId: z
    .union([z.number(), z.string()])
    .openapi({ description: 'Chain identifier (e.g. 1 for Ethereum Mainnet, "SN_MAIN" for Starknet).' }),
  description: z
    .union([z.string(), z.tuple([z.string(), z.string(), z.string(), z.string()])])
    .optional()
    .openapi({ description: 'User-facing description. Single string or [pending, success, error, replaced].' }),
  error: ErrorStateSchema.optional(),
  finishedTimestamp: z.number().optional().openapi({ description: 'On-chain timestamp (seconds) when finalized.' }),
  from: z.string().openapi({ description: "Sender's wallet address." }),
  isError: z.boolean().optional().openapi({ description: 'Whether the transaction is in a failed state.' }),
  isTrackedModalOpen: z.boolean().optional(),
  localTimestamp: z.number().openapi({ description: 'Local timestamp (seconds) when initiated by user.' }),
  payload: (z.record(z.string(), z.unknown()) as unknown as z.ZodType<object>)
    .optional()
    .openapi({ description: 'Arbitrary custom data associated with the transaction.' }),
  pending: z.boolean().openapi({ description: 'Whether the transaction is awaiting on-chain confirmation.' }),
  status: TransactionStatusSchema.optional(),
  title: z
    .union([z.string(), z.tuple([z.string(), z.string(), z.string(), z.string()])])
    .optional()
    .openapi({ description: 'User-facing title. Single string or [pending, success, error, replaced].' }),
  tracker: TransactionTrackerSchema,
  txKey: z.string().openapi({ description: 'Unique transaction identifier assigned by Quasar.' }),
  type: z.string().openapi({ description: 'Application-specific transaction category (e.g. "SWAP", "APPROVE").' }),
  connectorType: z
    .string()
    .openapi({ description: 'Connector used to sign the transaction (e.g. "injected", "walletConnect").' }),
  requiredConfirmations: z.number().optional().openapi({ description: 'Number of confirmations required.' }),
  confirmations: z
    .union([z.number(), z.string(), z.null()])
    .optional()
    .openapi({ description: 'Number of confirmations or finality status.' }),
  rpcUrl: z.string().optional().openapi({ description: 'RPC URL used for submission.' }),
});

// PHANTOM TYPE CHECK: Enforces 1:1 alignment with pulsar-core BaseTransaction
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkBaseTx: z.ZodType<BaseTransaction> = BaseTransactionSchema;

// --- EVM Transaction ---
const EvmTransactionSchema = BaseTransactionSchema.extend({
  adapter: z.literal(OrbitAdapter.EVM),
  hash: HexStringSchema.optional().openapi({ description: 'On-chain transaction hash (0x-prefixed).' }),
  input: HexStringSchema.optional().openapi({ description: 'Contract interaction data payload (0x-prefixed).' }),
  maxFeePerGas: z.string().optional().openapi({ description: 'EIP-1559 max fee per gas (wei).' }),
  maxPriorityFeePerGas: z.string().optional().openapi({ description: 'EIP-1559 max priority fee per gas (wei).' }),
  nonce: z.number().optional().openapi({ description: 'Transaction nonce.' }),
  replacedTxHash: HexStringSchema.optional().openapi({ description: 'Hash of the transaction this one replaced.' }),
  to: HexStringSchema.optional().openapi({ description: "Recipient's address or contract address." }),
  value: z.string().optional().openapi({ description: 'Native currency amount in wei.' }),
}).openapi('EvmTransaction');

// PHANTOM TYPE CHECK: Enforces 1:1 alignment with pulsar-core EvmTransaction
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkEvmTx: z.ZodType<EvmTransaction> = EvmTransactionSchema;

// --- Solana Transaction ---
const SolanaTransactionSchema = BaseTransactionSchema.extend({
  adapter: z.literal(OrbitAdapter.SOLANA),
  fee: z.number().optional().openapi({ description: 'Transaction fee in lamports.' }),
  instructions: z.array(z.unknown()).optional().openapi({ description: 'Transaction instructions.' }),
  recentBlockhash: z.string().optional().openapi({ description: 'Recent blockhash used.' }),
  slot: z.number().optional().openapi({ description: 'Slot in which the transaction was processed.' }),
}).openapi('SolanaTransaction');

// PHANTOM TYPE CHECK: Enforces 1:1 alignment with pulsar-core SolanaTransaction
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkSolanaTx: z.ZodType<SolanaTransaction> = SolanaTransactionSchema;

// --- Starknet Transaction ---
const StarknetTransactionSchema = BaseTransactionSchema.extend({
  adapter: z.literal(OrbitAdapter.Starknet),
  actualFee: z
    .object({ amount: z.string(), unit: z.string() })
    .optional()
    .openapi({ description: 'Actual fee paid for the transaction.' }),
  contractAddress: z.string().optional().openapi({ description: 'Contract address interacted with.' }),
}).openapi('StarknetTransaction');

// PHANTOM TYPE CHECK: Enforces 1:1 alignment with pulsar-core StarknetTransaction
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkStarknetTx: z.ZodType<StarknetTransaction> = StarknetTransactionSchema;

// --- Unified Transaction (discriminated union) ---
const TransactionSchema = z
  .discriminatedUnion('adapter', [EvmTransactionSchema, SolanaTransactionSchema, StarknetTransactionSchema])
  .openapi('Transaction', {
    description: 'A blockchain transaction tracked by Pulsar. Discriminated by `adapter` field.',
  });

// PHANTOM TYPE CHECK: Enforces 1:1 alignment with pulsar-core Transaction union
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkTx: z.ZodType<Transaction> = TransactionSchema;

registry.register('Transaction', TransactionSchema);

// --- Request schemas ---
const CreateTransactionRequestSchema = TransactionSchema.openapi('CreateTransactionRequest', {
  description: 'Request body for syncing a new pending transaction to the cloud.',
});
registry.register('CreateTransactionRequest', CreateTransactionRequestSchema);

const UpdateTransactionRequestSchema: z.ZodType<UpdatableTransactionFields> = z
  .object({
    txKey: z.string().openapi({ description: 'The unique transaction key to update.' }),
    // Updatable EVM fields
    to: HexStringSchema.optional(),
    nonce: z.number().optional(),
    pending: z.boolean().optional(),
    hash: HexStringSchema.optional(),
    status: TransactionStatusSchema.optional(),
    replacedTxHash: HexStringSchema.optional(),
    error: ErrorStateSchema.optional(),
    finishedTimestamp: z.number().optional(),
    isTrackedModalOpen: z.boolean().optional(),
    isError: z.boolean().optional(),
    maxPriorityFeePerGas: z.string().optional(),
    maxFeePerGas: z.string().optional(),
    input: HexStringSchema.optional(),
    value: z.string().optional(),
    confirmations: z.union([z.number(), z.string(), z.null()]).optional(),
    requiredConfirmations: z.number().optional(),
    // Updatable Solana fields
    slot: z.number().optional(),
    fee: z.number().optional(),
    instructions: z.array(z.unknown()).optional(),
    recentBlockhash: z.string().optional(),
    rpcUrl: z.string().optional(),
  })
  .openapi('UpdateTransactionRequest', {
    description:
      'Request body for updating an existing transaction. Only `txKey` is required; all other fields are optional patches.',
  });
registry.register('UpdateTransactionRequest', UpdateTransactionRequestSchema);

// --- Response schemas ---
const SuccessCreateResponseSchema = z
  .object({
    success: z.literal(true),
    txKey: z.string().openapi({ description: 'The unique key assigned to the synced transaction.' }),
  })
  .openapi('SuccessCreateResponse');
registry.register('SuccessCreateResponse', SuccessCreateResponseSchema);

const SuccessResponseSchema = z
  .object({
    success: z.literal(true),
  })
  .openapi('SuccessResponse');
registry.register('SuccessResponse', SuccessResponseSchema);

const PaginatedHistoryResponseSchema = z
  .object({
    docs: z.array(TransactionSchema).openapi({ description: 'Array of transaction documents for the current page.' }),
    totalDocs: z.number().openapi({ description: 'Total matching documents across all pages.' }),
    totalPages: z.number().openapi({ description: 'Total number of pages.' }),
    page: z.number().openapi({ description: 'Current page number (1-indexed).' }),
    hasNextPage: z.boolean().openapi({ description: 'Whether a next page exists.' }),
    hasPrevPage: z.boolean().openapi({ description: 'Whether a previous page exists.' }),
  })
  .openapi('PaginatedHistoryResponse', {
    description: 'Paginated response containing transaction history.',
  });
registry.register('PaginatedHistoryResponse', PaginatedHistoryResponseSchema);

const ErrorResponseSchema = z
  .object({
    error: z.string().openapi({ description: 'Human-readable error message.' }),
  })
  .openapi('ErrorResponse');
registry.register('ErrorResponse', ErrorResponseSchema);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

registry.registerPath({
  method: 'post',
  path: PULSAR_SYNC_ENDPOINT,
  summary: 'Sync a new pending transaction',
  description: 'Creates a new transaction entry in the Quasar Cloud. The full transaction object is required.',
  tags: ['Pulsar Engine'],
  security: [{ [ironDomeAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateTransactionRequestSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Transaction synced successfully.',
      content: { 'application/json': { schema: SuccessCreateResponseSchema } },
    },
    401: {
      description: 'Authentication failed — invalid or missing secret key.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    403: {
      description: 'Forbidden — key lacks required scope.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    422: {
      description: 'Validation error — malformed request body.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: PULSAR_HISTORY_ENDPOINT,
  summary: 'Retrieve transaction history',
  description:
    'Returns paginated transaction history with optional filters for chain, status, and specific transaction key.',
  tags: ['Pulsar Engine'],
  security: [{ [ironDomeAuth.name]: [] }],
  request: {
    query: z.object({
      page: z.coerce.number().optional().default(1).openapi({ description: 'Page number (1-indexed).', example: 1 }),
      limit: z.coerce.number().optional().default(10).openapi({ description: 'Results per page.', example: 10 }),
      chainId: z.string().optional().openapi({ description: 'Filter by chain ID.', example: '1' }),
      status: z.string().optional().openapi({ description: 'Filter by transaction status.', example: 'Success' }),
      txKey: z.string().optional().openapi({ description: 'Filter by specific transaction key.' }),
    }),
  },
  responses: {
    200: {
      description: 'Paginated transaction history.',
      content: { 'application/json': { schema: PaginatedHistoryResponseSchema } },
    },
    401: {
      description: 'Authentication failed.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
  },
});

// ---------------------------------------------------------------------------
// Generate & Write
// ---------------------------------------------------------------------------
const generator = new OpenApiGeneratorV31(registry.definitions);

const document = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    title: 'Quasar Cloud API',
    version: '1.0.0',
    description:
      'The Quasar Cloud API powers the TUWA SDK, providing endpoints for blockchain transaction lifecycle management — syncing, updating, and querying transactions across EVM, Solana, and Starknet chains. All requests are authenticated through the Iron Dome security perimeter.',
    contact: {
      name: 'TUWA Team',
      url: 'https://github.com/TuwaIO',
    },
    license: {
      name: 'Apache-2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0',
    },
  },
  servers: [
    {
      url: BASE_API_URL,
      description: 'Production',
    },
  ],
  tags: [
    {
      name: 'Pulsar Engine',
      description: 'Transaction sync and history endpoints.',
    },
  ],
});

const yamlOutput = YAML.stringify(document, { lineWidth: 120 });
const outputPath = path.resolve(__dirname, '..', 'apps', 'docs', 'public', 'openapi.yaml');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, yamlOutput, 'utf-8');

console.log(`✅ OpenAPI spec generated → ${path.relative(process.cwd(), outputPath)}`);

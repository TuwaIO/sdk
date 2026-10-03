/**
 * @file Generates the OpenAPI 3.1 description of the endpoints of the Quasar API that `@tuwaio/quasar-sdk` calls, from
 * Zod schemas checked against the Pulsar transaction types, with `@asteasolutions/zod-to-openapi`.
 *
 * Output: `quasar-openapi.yaml` in the public folder of the docs hub checkout next to this repository
 * (`../docs/apps/docs-hub/public/`), served at `docs.tuwa.io/quasar/api`. Pass another path as the first argument.
 * Run: `pnpm openapi:gen`
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
import { TransactionStatus, TransactionTracker } from '@tuwaio/pulsar-core';
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
// Security: secret key of a Quasar app
// ---------------------------------------------------------------------------
const secretKeyAuth = registry.registerComponent('securitySchemes', 'SecretKey', {
  type: 'apiKey',
  in: 'header',
  name: 'x-tuwa-secret-key',
  description:
    'Secret key of the Quasar app (`sk_live_...` for a live app, `sk_test_...` for a test app). Send it from your server only.',
});

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

// --- Enums ---
const TransactionTrackerSchema: z.ZodType<TransactionTracker> = z
  .enum([
    TransactionTracker.Ethereum,
    TransactionTracker.Safe,
    TransactionTracker.Gelato,
    TransactionTracker.Solana,
    TransactionTracker.ERC4337,
  ])
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
  chainId: z.union([z.number(), z.string()]).openapi({
    description:
      'EVM chain ID (1), or for Solana the CAIP-2 chain ID with the genesis hash ("solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", Pulsar 0.9 and later); transactions synced by older Pulsar versions carry "solana:mainnet".',
  }),
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
  payload: (
    z.record(z.string(), z.union([z.string(), z.number()])) as unknown as z.ZodType<Record<string, string | number>>
  )
    .optional()
    .openapi({ description: 'Arbitrary custom data associated with the transaction.' }),
  pending: z.boolean().openapi({ description: 'Whether the transaction is awaiting on-chain confirmation.' }),
  status: TransactionStatusSchema.optional(),
  title: z
    .union([z.string(), z.tuple([z.string(), z.string(), z.string(), z.string()])])
    .optional()
    .openapi({ description: 'User-facing title. Single string or [pending, success, error, replaced].' }),
  tracker: TransactionTrackerSchema,
  txKey: z
    .string()
    .openapi({ description: 'Unique key of the transaction, set by Pulsar (for example the transaction hash).' }),
  type: z.string().openapi({ description: 'Application-specific transaction category (e.g. "SWAP", "APPROVE").' }),
  connectorType: z.string().openapi({ description: 'Connector type of the wallet, e.g. "evm:metamask".' }),
  requiredConfirmations: z.number().optional().openapi({ description: 'Number of confirmations required.' }),
  confirmations: z
    .union([z.number(), z.string(), z.null()])
    .optional()
    .openapi({ description: 'Number of confirmations or finality status.' }),
  rpcUrl: z.string().optional().openapi({ description: 'RPC URL used for submission.' }),
  syncStatus: z
    .enum(['synced', 'pending-sync'])
    .optional()
    .openapi({ description: 'Status of cloud synchronization.' }),
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
  bundlerUrl: z
    .string()
    .optional()
    .openapi({ description: 'Custom bundler RPC URL for ERC-4337 UserOperation tracking.' }),
  pimlicoApiKey: z.string().optional().openapi({ description: 'Pimlico API key for ERC-4337 UserOperation tracking.' }),
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

// --- Starknet Transaction (reserved in pulsar-core; Quasar has no Starknet tracker) ---
const StarknetTransactionSchema = BaseTransactionSchema.extend({
  adapter: z.literal(OrbitAdapter.Starknet),
  actualFee: z
    .object({ amount: z.string(), unit: z.string() })
    .optional()
    .openapi({ description: 'Actual fee paid for the transaction.' }),
  contractAddress: z.string().optional().openapi({ description: 'Contract address interacted with.' }),
}).openapi('StarknetTransaction', {
  description:
    'Reserved by the Pulsar types for a Starknet adapter. Neither Pulsar nor Quasar tracks Starknet transactions.',
});

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

// --- Response schemas ---
const SuccessCreateResponseSchema = z
  .object({
    success: z.literal(true),
    txKey: z.string().openapi({ description: 'Key of the synced transaction.' }),
    mode: z.enum(['fast', 'lazy']).openapi({
      description:
        '`fast`: tracking starts right away. `lazy`: queued, because the quota of the organization is used up.',
    }),
    duplicate: z.literal(true).optional().openapi({ description: 'Quasar already had this `txKey`; no new record.' }),
  })
  .openapi('SuccessCreateResponse');
registry.register('SuccessCreateResponse', SuccessCreateResponseSchema);

const HealthResponseSchema = z
  .object({
    success: z.boolean(),
    status: z.string().openapi({ description: '`operational`, or `degraded_replica` when the read replica is down.' }),
    database: z.string(),
    readReplica: z.string(),
    redis: z.string(),
    workers: z.string(),
    workerBacklog: z.number(),
    latency: z.string(),
    timestamp: z.string(),
  })
  .openapi('HealthResponse');
registry.register('HealthResponse', HealthResponseSchema);

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
    error: z.string().optional().openapi({ description: 'Error message.' }),
    message: z.string().optional().openapi({ description: 'Error message (NestJS errors).' }),
  })
  .openapi('ErrorResponse');
registry.register('ErrorResponse', ErrorResponseSchema);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

registry.registerPath({
  method: 'post',
  path: PULSAR_SYNC_ENDPOINT,
  summary: 'Sync a transaction',
  description:
    'Sends a transaction created by Pulsar to Quasar, which tracks it on the server until it reaches a final status and then sends the webhooks of the app. Used by `quasar.pulsar.syncCreate`.',
  tags: ['Pulsar'],
  security: [{ [secretKeyAuth.name]: [] }],
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
      description: 'Synced; tracking started (`mode: fast`).',
      content: { 'application/json': { schema: SuccessCreateResponseSchema } },
    },
    202: {
      description: 'Synced; tracking queued (`mode: lazy`).',
      content: { 'application/json': { schema: SuccessCreateResponseSchema } },
    },
    400: {
      description: 'The body is not a valid transaction or exceeds the safety limits.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    401: {
      description: 'Missing or invalid key.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    403: {
      description: 'Public key (read-only), disabled app, or IP address or origin not allowed by the app settings.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    429: {
      description: 'Too many requests per second for the app.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: PULSAR_HISTORY_ENDPOINT,
  summary: 'Read the transaction history',
  description:
    'Returns the transactions of the app, newest first, filtered by every given filter. Used by `quasar.pulsar.getHistory`.',
  tags: ['Pulsar'],
  security: [{ [secretKeyAuth.name]: [] }],
  request: {
    query: z.object({
      page: z.coerce.number().optional().default(1).openapi({ description: 'Page number (1-indexed).', example: 1 }),
      limit: z.coerce
        .number()
        .optional()
        .default(10)
        .openapi({ description: 'Transactions per page, at most 100.', example: 10 }),
      walletAddress: z
        .string()
        .optional()
        .openapi({ description: 'Sender address. EVM addresses match in any letter case, Solana addresses exactly.' }),
      chainId: z.string().optional().openapi({
        description:
          'Chain of the transactions: an EVM chain ID, or a Solana chain ID in either form ("solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" or "solana:mainnet"), which match the same cluster.',
        example: '1',
      }),
      status: z
        .string()
        .optional()
        .openapi({ description: 'Final status: `Success`, `Failed` or `Replaced`.', example: 'Success' }),
      txKey: z.string().optional().openapi({ description: 'Key of one transaction.' }),
      appName: z
        .string()
        .optional()
        .openapi({ description: 'Application name passed when the transaction was synced.' }),
    }),
  },
  responses: {
    200: {
      description: 'Paginated transaction history.',
      content: { 'application/json': { schema: PaginatedHistoryResponseSchema } },
    },
    401: {
      description: 'Missing or invalid key.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    402: {
      description: 'The quota of the organization is used up.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    429: {
      description: 'Too many requests per second for the app.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/v1/engine/monitoring/health',
  summary: 'Check the health of the API',
  description: 'Public, without a key. Used by `preFlightTxCheck` from `@tuwaio/quasar-sdk/react`.',
  tags: ['Monitoring'],
  responses: {
    200: {
      description: 'The database and Redis respond.',
      content: { 'application/json': { schema: HealthResponseSchema } },
    },
    503: {
      description: 'The primary database or Redis does not respond.',
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
    title: 'Quasar API',
    version: '1.0.0',
    description:
      'The endpoints of the Quasar API that `@tuwaio/quasar-sdk` calls: syncing Pulsar transactions (EVM and Solana), which Quasar then tracks on the server, and reading their history. Quasar Cloud serves it at `https://api.tuwa.io`; a self-hosted Quasar server serves the same endpoints at its own URL.',
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
      description: 'Quasar Cloud',
    },
  ],
  tags: [
    {
      name: 'Pulsar',
      description: 'Transaction sync and history.',
    },
    {
      name: 'Monitoring',
      description: 'Health of the API.',
    },
  ],
});

const yamlOutput = YAML.stringify(document, { lineWidth: 120 });
const outputPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, '..', '..', 'docs', 'apps', 'docs-hub', 'public', 'quasar-openapi.yaml');

if (!fs.existsSync(path.dirname(outputPath))) {
  console.error(
    `✖ ${path.dirname(outputPath)} does not exist. Clone TuwaIO/docs next to this repository or pass a path.`,
  );
  process.exit(1);
}
fs.writeFileSync(outputPath, yamlOutput, 'utf-8');

console.log(`✅ OpenAPI spec generated → ${path.relative(process.cwd(), outputPath)}`);

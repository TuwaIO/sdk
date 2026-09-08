# 🤖 Agent Context: TUWA SDKs

## 1. Project Philosophy & Goal

- **What is this?** A monorepo for **TUWA SDKs** — Layer 8 (L8 - Metapackages) & Layer 9 (L9 - Network Adapters) of the TUWA Ecosystem. It packages and orchestrates the modular TUWA stack into streamlined, ready-to-use developer kits.
- **Role in TUWA:** Developer Experience & Integration Layer. It aggregates `orbit` (transports), `pulsar` (lifecycle tracking), `satellite` (wallet connection), `nova-uikit` (components), `siwx` (CAIP-122 auth), and `quasar` (cloud backend client) into unified entry points.
- **Philosophy:** "Pure Web3", Headless-First, Modular, Zero Bloat, Type-Safe. Self-custody and sovereign individual values with zero reliance on centralized WaaS lock-in.

## 2. Tech Stack (Verified)

- **Core:** TypeScript v6.0+, Node.js (v20-v24), pnpm v11+ (Workspace).
- **Testing:** `vitest` v5.x (Workspace configuration across packages).
- **Web3 (EVM):** `viem` v2.x, `@wagmi/core` v3.x, `@tuwaio/orbit-evm`, `@tuwaio/pulsar-evm`.
- **Web3 (Solana):** `@solana/kit` v8.x, `@wallet-standard/*`, `@tuwaio/orbit-solana`, `@tuwaio/pulsar-solana`.
- **Frameworks:**
  - `apps/docs`: Next.js v16, Nextra v4, Tailwind CSS v4.
  - `packages/*`: Framework Agnostic (React / Vanilla JS / Node.js).
- **Build/Monorepo:**
  - `tsup`: Bundler for `packages/*` (ESM/CJS/DTS).
  - `typedoc` + `typedoc-plugin-markdown`: API documentation generation.
  - OpenAPI v3.1: Specification generation for Quasar SDK.

## 3. Architecture & Directory Structure

```
sdk/
├── apps/
│   └── docs/                   # Documentation site (Next.js 16 + Nextra 4)
│       ├── public/             # Static assets (openapi.yaml, etc.)
│       └── src/content/        # MDX documentation & auto-generated API Reference
├── packages/
│   ├── quasar-sdk/             # Layer 8 (L8). Headless HTTP client for TUWA Quasar backend.
│   │   ├── src/client/         # QuasarClient class & API methods
│   │   └── src/types.ts        # Quasar DTOs, Enums, and Pulsar re-exports
│   ├── sdk/                    # Layer 8 (L8). Full-stack Metapackage aggregating all TUWA layers.
│   │   └── src/                # Re-exports: orbit, pulsar, satellite, nova, siwx, quasar
│   ├── evm-sdk/                # Layer 9 (L9). EVM Network Adapter bundle.
│   │   └── src/                # Re-exports: orbit-evm, pulsar-evm, satellite-evm, nova-connect/evm, siwx-evm
│   └── solana-sdk/             # Layer 9 (L9). Solana Network Adapter bundle.
│       └── src/                # Re-exports: orbit-solana, pulsar-solana, satellite-solana, nova-connect/solana, siwx-solana
├── scripts/                    # OpenAPI generator & tooling scripts
├── package.json                # Root checks & scripts
└── pnpm-workspace.yaml         # Workspace definition
```

### Module Breakdown

- **`@tuwaio/quasar-sdk` (L8)**: Pure TypeScript client for interacting with Quasar SaaS & Cloud APIs (transaction tracking, indexing, webhooks, AML screening). Zero Web3/blockchain dependencies.
- **`@tuwaio/sdk` (L8)**: The all-in-one developer bundle. Re-exports core modules from Orbit, Pulsar, Satellite, Nova UIKit, SIWX, and Quasar with full tree-shaking support.
- **`@tuwaio/evm-sdk` (L9)**: Pre-bundled EVM stack combining Viem transports, Wagmi connectors, ERC-4337 bundler utilities, EVM transaction tracking, and EIP-191/1271 SIWX verification.
- **`@tuwaio/solana-sdk` (L9)**: Pre-bundled Solana stack combining `@solana/kit` RPCs, Wallet Standard connectors, Solana signature transaction tracking, and Ed25519 SIWX verification.

## 4. Coding Standards (STRICT)

- **Language:** English ONLY (Code, Comments, Commits).
- **Style:** Functional programming preferred. Clean re-exports and high-cohesion wrappers.
- **Types:** Strict TypeScript. **NO `any`**. Usage of `ts-expect-error` must be justified.
- **Comments:** JSDoc required for **all** exported functions, classes, and types.
  - Must explain _inputs_, _outputs_, and _side effects_.
- **Naming:**
  - Files: `camelCase.ts` (utils, helpers), `PascalCase.tsx` (components).
  - Variables/Functions: `camelCase`.
  - Types/Interfaces/Classes: `PascalCase`.

## 5. Key Workflows

- **Build:** `pnpm build` (Builds all packages via `tsup` and processes styles).
- **Test:** `pnpm test` (Runs `vitest run` across all packages in workspace).
- **Lint/Format:** `pnpm lint` (ESLint) / `pnpm format` (Prettier).
- **Docs:** `pnpm docs:gen` (Generates TypeDoc API reference) and `pnpm generate:docs` (Generates OpenAPI spec).
- **Clean:** `pnpm clean` (Nukes `node_modules` and `dist` dirs).

## 6. AI Agent Behavior (Mandatory)

- **Post-Work Routine:** After generating or modifying code, you **MUST** run `pnpm lint:fix` (and `pnpm format`) to ensure code quality.
- **Dependency Rule:** Never install new packages without explicit user permission.
- **Hallucination Check:**
  - Do **NOT** import `ethers.js` (We use `viem`).
  - Do **NOT** import `gill` (Eradicated; we use `@solana/kit` and `@wallet-standard/*`).
  - Do **NOT** import legacy `@solana/web3.js` methods.
  - Do **NOT** break parity with the 5 core TUWA repos (`orbit`, `siwx`, `satellite-connect`, `pulsar-core`, `nova-uikit`).

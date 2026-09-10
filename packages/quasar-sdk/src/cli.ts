#!/usr/bin/env node

/**
 * @module cli
 * @description Quasar SDK CLI - Native Webhook Local Dev Relay.
 * Enables local dApp development against Quasar Cloud webhooks without third-party tunnels.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import pkg from '../package.json';

interface CliOptions {
  command?: string;
  secret?: string;
  forwardTo?: string;
  apiUrl?: string;
  envFile?: string;
  help?: boolean;
  version?: boolean;
}

export interface WebhookRelayMessage {
  deliveryId: string;
  event: string;
  timestamp: number;
  data: unknown;
  signature: string;
}

export const DEFAULT_FORWARD_URL = 'http://localhost:3000/api/webhooks/quasar';
export const DEFAULT_API_URL = 'https://api.tuwa.io';
export const CLI_VERSION = pkg.version || '0.0.0';

/**
 * Parse simple .env file content without external dependencies.
 */
export function parseEnvFile(content: string): Record<string, string> {
  const env: Record<string, string> = {};
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const equalsIdx = trimmed.indexOf('=');
    if (equalsIdx <= 0) continue;

    const key = trimmed.slice(0, equalsIdx).trim();
    let val = trimmed.slice(equalsIdx + 1).trim();

    // Strip wrapping quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    env[key] = val;
  }

  return env;
}

/**
 * Load .env from disk prioritizing .env.local, .env.development, then .env.
 */
export function loadEnv(customPath?: string): Record<string, string> {
  const cwd = process.cwd();

  if (customPath) {
    const fullPath = path.isAbsolute(customPath) ? customPath : path.join(cwd, customPath);
    if (fs.existsSync(fullPath)) {
      return parseEnvFile(fs.readFileSync(fullPath, 'utf8'));
    }
    console.warn(`\x1b[33m[warn]\x1b[0m Specified env file not found: ${customPath}`);
    return {};
  }

  const candidates = ['.env.local', '.env.development', '.env'];
  for (const candidate of candidates) {
    const filePath = path.join(cwd, candidate);
    if (fs.existsSync(filePath)) {
      return parseEnvFile(fs.readFileSync(filePath, 'utf8'));
    }
  }

  return {};
}

/**
 * Parse CLI command-line arguments.
 */
export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {};
  const cleanArgs = [...args];

  if (cleanArgs.length > 0 && !cleanArgs[0].startsWith('-')) {
    options.command = cleanArgs.shift();
  }

  for (let i = 0; i < cleanArgs.length; i++) {
    const arg = cleanArgs[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--version' || arg === '-v') {
      options.version = true;
    } else if (arg === '--secret' || arg === '-s') {
      options.secret = cleanArgs[++i];
    } else if (arg === '--forward-to' || arg === '-f') {
      options.forwardTo = cleanArgs[++i];
    } else if (arg === '--api-url' || arg === '-a') {
      options.apiUrl = cleanArgs[++i];
    } else if (arg === '--env-file' || arg === '-e') {
      options.envFile = cleanArgs[++i];
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
\x1b[1m\x1b[36m⚡ Quasar Webhook Local Dev Relay\x1b[0m
Stream production Quasar Cloud webhooks directly to your local dev machine.
Zero tunnels, zero third-party proxies, zero friction.

\x1b[1mUSAGE\x1b[0m
  $ npx @tuwaio/quasar-sdk listen [options]

\x1b[1mCOMMANDS\x1b[0m
  listen                     Connect to Quasar Cloud SSE and forward events locally

\x1b[1mOPTIONS\x1b[0m
  -s, --secret <secret>      Webhook signing secret (whsec_...) [or QUASAR_WEBHOOK_SECRET]
  -f, --forward-to <url>     Local endpoint to forward to (default: ${DEFAULT_FORWARD_URL})
  -a, --api-url <url>        Quasar Cloud API base URL (default: ${DEFAULT_API_URL})
  -e, --env-file <path>      Custom path to .env file
  -v, --version              Show version number
  -h, --help                 Show help details

\x1b[1mZERO-CONFIG SETUP\x1b[0m
  Add to your local .env or .env.local:
    QUASAR_WEBHOOK_SECRET=whsec_...
    NEXT_PUBLIC_QUASAR_BASE_URL=https://api.tuwa.io  # (optional)

  Then simply run:
    $ npx @tuwaio/quasar-sdk listen
`);
}

/**
 * Connect to SSE and stream webhook events to local endpoint.
 */
async function runListen(options: { secret: string; forwardTo: string; apiUrl: string }): Promise<void> {
  const { secret, forwardTo, apiUrl } = options;
  const cleanApiUrl = apiUrl.replace(/\/+$/, '');
  const listenUrl = `${cleanApiUrl}/v1/engine/webhooks/listen?secret=${encodeURIComponent(secret)}`;

  console.log(`
\x1b[36m┌──────────────────────────────────────────────────────────────┐\x1b[0m
\x1b[36m│\x1b[0m  \x1b[1m\x1b[36m⚡ Quasar Webhook Local Dev Relay\x1b[0m                           \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m  Forwarding to: \x1b[32m${forwardTo.padEnd(44)}\x1b[0m\x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m  Quasar Cloud:  \x1b[34m${cleanApiUrl.padEnd(44)}\x1b[0m\x1b[36m│\x1b[0m
\x1b[36m└──────────────────────────────────────────────────────────────┘\x1b[0m
`);

  let reconnectDelay = 1000;
  let isShuttingDown = false;
  let activeAbortController: AbortController | null = null;

  const cleanup = () => {
    isShuttingDown = true;
    if (activeAbortController) {
      activeAbortController.abort();
    }
    console.log('\n\x1b[33m[relay]\x1b[0m Disconnected. Bye!');
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  while (!isShuttingDown) {
    try {
      activeAbortController = new AbortController();
      console.log(`\x1b[90mConnecting to Quasar Cloud SSE stream...\x1b[0m`);

      const response = await fetch(listenUrl, {
        method: 'GET',
        headers: {
          Accept: 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
        signal: activeAbortController.signal,
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error(
            `\x1b[31m✖ Unauthorized (401):\x1b[0m Invalid webhook signing secret. Check your QUASAR_WEBHOOK_SECRET.`,
          );
          process.exit(1);
        }
        if (response.status === 404) {
          console.error(
            `\x1b[31m✖ Endpoint Not Found (404):\x1b[0m No webhook endpoint found matching this signing secret.`,
          );
          process.exit(1);
        }
        const errText = await response.text();
        throw new Error(`HTTP ${response.status} ${response.statusText}: ${errText}`);
      }

      if (!response.body) {
        throw new Error('No readable stream returned by server.');
      }

      console.log(`\x1b[32m✔ Connected!\x1b[0m Ready and listening for events...`);
      reconnectDelay = 1000; // Reset backoff on successful connection

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (!isShuttingDown) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        let currentEvent = 'message';
        let currentData = '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) {
            // Empty line marks end of an SSE message block
            if (currentData) {
              await handleSseMessage(currentEvent, currentData, forwardTo);
              currentEvent = 'message';
              currentData = '';
            }
            continue;
          }

          if (trimmed.startsWith('event:')) {
            currentEvent = trimmed.slice(6).trim();
          } else if (trimmed.startsWith('data:')) {
            const dataLine = trimmed.slice(5).trim();
            currentData = currentData ? `${currentData}\n${dataLine}` : dataLine;
          }
        }
      }
    } catch (err: unknown) {
      if (isShuttingDown) break;

      const message = err instanceof Error ? err.message : String(err);
      console.warn(`\x1b[33m[warn]\x1b[0m Connection lost (${message}). Reconnecting in ${reconnectDelay}ms...`);

      await new Promise((resolve) => setTimeout(resolve, reconnectDelay));
      reconnectDelay = Math.min(reconnectDelay * 2, 15000);
    }
  }
}

/**
 * Handle a single SSE message block and forward payload if relevant.
 */
export async function handleSseMessage(event: string, rawData: string, forwardTo: string): Promise<void> {
  // Ignore keepalive pings and greetings
  if (event === 'ping' || rawData === ':keepalive' || rawData.startsWith(':')) {
    return;
  }

  try {
    const payload = JSON.parse(rawData);

    // Initial greeting from relay server
    if (event === 'connected') {
      return;
    }

    if (event === 'payload' || event === 'webhook' || event === 'message') {
      const dataObj = payload as Record<string, unknown>;
      const deliveryId = (dataObj.deliveryId as string) || (dataObj.id as string) || '';
      const eventType =
        (dataObj.event as string) || (dataObj.eventType as string) || (dataObj.action as string) || 'webhook';
      const forwardedData =
        dataObj.data !== undefined ? dataObj.data : dataObj.payload !== undefined ? dataObj.payload : dataObj;
      const signature = (dataObj.signature as string) || '';
      const startTime = Date.now();

      const timeStr = new Date().toLocaleTimeString();

      try {
        const res = await fetch(forwardTo, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-quasar-signature': signature,
            'x-quasar-event': eventType,
            'x-quasar-delivery-id': deliveryId,
          },
          body: JSON.stringify(forwardedData),
        });

        const duration = Date.now() - startTime;
        if (res.ok) {
          console.log(
            `\x1b[90m${timeStr}\x1b[0m \x1b[32m[${res.status} OK]\x1b[0m \x1b[1m${eventType}\x1b[0m ➔ ${forwardTo} \x1b[90m(${duration}ms)\x1b[0m`,
          );
        } else {
          console.warn(
            `\x1b[90m${timeStr}\x1b[0m \x1b[31m[${res.status} ${res.statusText}]\x1b[0m \x1b[1m${eventType}\x1b[0m ➔ ${forwardTo} \x1b[90m(${duration}ms)\x1b[0m`,
          );
        }
      } catch (postErr: unknown) {
        const errMsg = postErr instanceof Error ? postErr.message : String(postErr);
        console.error(
          `\x1b[90m${timeStr}\x1b[0m \x1b[31m[FAIL]\x1b[0m \x1b[1m${eventType}\x1b[0m ➔ Could not reach ${forwardTo}: ${errMsg}`,
        );
        console.error(`       \x1b[33mTip: Make sure your local application is running on ${forwardTo}\x1b[0m`);
      }
    }
  } catch {
    // Malformed JSON, ignore
  }
}

/**
 * Main entry point.
 */
export async function main(): Promise<void> {
  const rawArgs = process.argv.slice(2);
  const options = parseArgs(rawArgs);

  if (options.help || (rawArgs.length === 0 && !options.version)) {
    printHelp();
    return;
  }

  if (options.version) {
    console.log(`@tuwaio/quasar-sdk v${CLI_VERSION}`);
    return;
  }

  if (options.command !== 'listen') {
    console.error(`\x1b[31m✖ Unknown command:\x1b[0m "${options.command}". Did you mean "listen"?`);
    console.log(`Run \x1b[1mnpx @tuwaio/quasar-sdk --help\x1b[0m for available commands.`);
    process.exit(1);
  }

  // Load environment variables for zero-config discovery
  const env = loadEnv(options.envFile);

  const secret = options.secret || process.env.QUASAR_WEBHOOK_SECRET || env.QUASAR_WEBHOOK_SECRET;
  const forwardTo =
    options.forwardTo || process.env.QUASAR_WEBHOOK_FORWARD_TO || env.QUASAR_WEBHOOK_FORWARD_TO || DEFAULT_FORWARD_URL;
  const apiUrl =
    options.apiUrl ||
    process.env.NEXT_PUBLIC_QUASAR_BASE_URL ||
    env.NEXT_PUBLIC_QUASAR_BASE_URL ||
    process.env.QUASAR_BASE_URL ||
    env.QUASAR_BASE_URL ||
    DEFAULT_API_URL;

  if (!secret) {
    console.error(`
\x1b[31m✖ Missing Webhook Signing Secret\x1b[0m
  The local relay requires your webhook endpoint signing secret (starting with whsec_).

\x1b[1mHow to fix:\x1b[0m
  1. Provide via command-line argument:
     $ npx @tuwaio/quasar-sdk listen --secret whsec_...

  2. Or add to your local .env / .env.local file:
     QUASAR_WEBHOOK_SECRET=whsec_...
`);
    process.exit(1);
  }

  await runListen({
    secret,
    forwardTo,
    apiUrl,
  });
}

// Auto-run when executed directly (not in vitest)
if (!process.env.VITEST) {
  void main().catch((err) => {
    console.error('\x1b[31mFatal error:\x1b[0m', err);
    process.exit(1);
  });
}

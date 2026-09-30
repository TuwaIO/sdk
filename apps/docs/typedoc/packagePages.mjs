// @ts-check
/**
 * @file Writes the pages of `/packages` that TypeDoc does not generate.
 *
 * TypeDoc documents only `@tuwaio/quasar-sdk` (into `packages/quasar-sdk`). `@tuwaio/sdk`, `@tuwaio/evm-sdk` and
 * `@tuwaio/solana-sdk` only re-export other TUWA packages, whose references live on the sites of those projects, so
 * their page is their README. This script writes the overview page and copies the three READMEs. Side effect: writes
 * files under `apps/docs/src/content/packages`.
 */

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const out = join(root, 'apps/docs/src/content/packages');

mkdirSync(out, { recursive: true });
copyFileSync(join(root, 'apps/docs/typedoc/packages-overview.md'), join(out, 'index.md'));

for (const name of ['sdk', 'evm-sdk', 'solana-sdk']) {
  mkdirSync(join(out, name), { recursive: true });
  copyFileSync(join(root, 'packages', name, 'README.md'), join(out, name, 'index.md'));
}

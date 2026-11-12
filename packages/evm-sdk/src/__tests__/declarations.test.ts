import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = path.resolve(packageRoot, '..', '..', 'scripts', 'clean-declarations.mjs');

// The declaration build merges entries that only re-export into the first of them, which then imports the modules of
// all the others (`scripts/clean-declarations.mjs`): an app that imports one entry would load the types of every other
describe('the declarations of @tuwaio/evm-sdk', () => {
  it('name only the modules their sources name', () => {
    // Throws, with the files and the modules, when a declaration imports a module its source does not
    execFileSync(process.execPath, [script, '--check'], { cwd: packageRoot, encoding: 'utf8', stdio: 'pipe' });
  });
});

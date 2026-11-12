/**
 * @file Removes from the declaration files of a package the imports their sources do not have. Run in the folder of
 * a package after its build (`tsup && node ../../scripts/clean-declarations.mjs`); with `--check` it changes nothing
 * and fails when there is something to remove.
 *
 * Why: every entry of the SDK packages only re-exports other packages (`export * from '@tuwaio/nova-connect/evm'`).
 * tsup builds the declarations with Rollup, and Rollup merges chunks that hold no code of their own into the first of
 * them (its `experimentalMinChunkSize`, which tsup gives no way to set). The declaration of that first entry then
 * imports the modules of every other entry: `dist/nova-connect-components.d.ts` held `import
 * '@tuwaio/nova-connect/evm'` and `import '@tuwaio/nova-connect/solana'` beside its own line. For JavaScript such an
 * import does nothing; for types it loads the module, with what it adds to the types of other modules. An app that
 * imported the components of Nova Connect got the types of both networks: `appChains` and `solanaRPCUrls` typed for
 * networks it had not imported, and the connections of a network whose packages it had not installed.
 *
 * A declaration is cleaned against the source of the same name (`dist/name.d.ts`, `dist/name.d.cts` and `src/name.ts`):
 * an import of a module for its effect alone (`import 'module';`) stays only when the source names that module. A file
 * of the build without a source of its name, a shared chunk, is left as it is.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const DECLARATION = /\.d\.(ts|cts|mts)$/;
const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.mts', '.cts'];
/** An import of a module for its effect alone, on a line of its own. */
const BARE_IMPORT = /^[ \t]*import[ \t]*(['"])([^'"\n]+)\1[ \t]*;?[ \t]*(\r?\n|$)/gm;

/**
 * The modules a file names: in its imports, its re-exports and its `import()` types. Comments do not count.
 *
 * @param {string} code - The text of a source or of a declaration.
 * @returns {Set<string>} The module specifiers.
 */
function modulesOf(code) {
  const text = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');
  const modules = new Set();
  for (const match of text.matchAll(/\b(?:from|import)\s*\(?\s*(['"])([^'"\n]+)\1/g)) modules.add(match[2]);
  return modules;
}

/**
 * The source an entry declaration was built from: the file of the same name under `src`.
 *
 * @param {string} root - The folder of the package.
 * @param {string} declaration - The path of the declaration inside `dist`.
 * @returns {string | undefined} The path of the source, or `undefined` for a file that is not an entry.
 */
function sourceOf(root, declaration) {
  const name = declaration.replace(DECLARATION, '');
  return SOURCE_EXTENSIONS.map((extension) => path.join(root, 'src', name + extension)).find((file) =>
    existsSync(file),
  );
}

/**
 * Cleans the declarations of the package in a folder, or only reports what it would remove.
 *
 * @param {string} root - The folder of the package, with its `src` and its built `dist`.
 * @param {boolean} checkOnly - Whether to leave the files as they are.
 * @returns {{ declarations: number, found: { file: string, modules: string[] }[] }} How many entry declarations the
 * package has, and for each one with imports its source does not have, its path from the folder and those modules.
 */
function cleanDeclarations(root, checkOnly) {
  const dist = path.join(root, 'dist');
  const files = existsSync(dist)
    ? readdirSync(dist, { recursive: true })
        .map(String)
        .filter((file) => DECLARATION.test(file))
        .sort()
    : [];
  let declarations = 0;
  const found = [];
  for (const file of files) {
    const source = sourceOf(root, file);
    if (!source) continue;
    declarations++;
    const named = modulesOf(readFileSync(source, 'utf8'));
    const text = readFileSync(path.join(dist, file), 'utf8');
    const modules = [];
    const cleaned = text.replace(BARE_IMPORT, (line, _quote, module) => {
      if (named.has(module)) return line;
      modules.push(module);
      return '';
    });
    if (modules.length === 0) continue;
    found.push({ file: path.posix.join('dist', file.split(path.sep).join('/')), modules });
    if (!checkOnly) writeFileSync(path.join(dist, file), cleaned);
  }
  return { declarations, found };
}

const checkOnly = process.argv.includes('--check');
const { declarations, found } = cleanDeclarations(process.cwd(), checkOnly);

if (declarations === 0) {
  console.error('clean-declarations: no declarations of entries in dist. Build the package first.');
  process.exit(1);
}
if (checkOnly) {
  if (found.length > 0) {
    console.error('clean-declarations: declarations import modules their sources do not name:');
    for (const { file, modules } of found) console.error(`  ${file}: ${modules.join(', ')}`);
    process.exit(1);
  }
} else {
  const imports = found.reduce((count, { modules }) => count + modules.length, 0);
  console.log(
    `clean-declarations: ${declarations} declarations, removed ${imports} imports from ${found.length} files`,
  );
}

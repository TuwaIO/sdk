import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, describe, expect, it } from 'vitest';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = path.resolve(packageRoot, '..', '..', 'scripts', 'clean-declarations.mjs');

/** Runs the script in a folder and returns how it ended and what it printed. */
const run = (cwd: string, ...args: string[]) => {
  const result = spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8' });
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
};

// Every entry of the SDK packages only re-exports other packages. The declaration build (tsup, with Rollup) merges
// entries that hold no code into the first of them, which then imports the modules of all the others: the types of
// `@tuwaio/sdk/nova-connect/components` loaded `@tuwaio/nova-connect/evm` and `/solana`, so an app of one network (or
// of none) got the types of both, and of packages it had not installed
describe('the script that cleans the declarations', () => {
  const folder = mkdtempSync(path.join(tmpdir(), 'tuwa-sdk-declarations-'));
  afterAll(() => rmSync(folder, { recursive: true, force: true }));

  const write = (file: string, text: string) => {
    mkdirSync(path.dirname(path.join(folder, file)), { recursive: true });
    writeFileSync(path.join(folder, file), text);
  };
  const read = (file: string) => readFileSync(path.join(folder, file), 'utf8');

  write('src/first.ts', "export * from 'ext-first';\n");
  write('src/second.ts', "// A comment that names 'ext-comment'\nexport * from 'ext-second';\n");
  write(
    'src/own.ts',
    "import 'ext-loaded';\n\nexport { type A, b as c } from 'ext-own';\nexport * from \"ext-star\";\n",
  );
  const merged = "export * from 'ext-first';\nimport 'ext-second';\nimport 'ext-own';\nimport \"ext-star\";\n";
  write('dist/first.d.ts', merged);
  write('dist/first.d.cts', merged);
  write('dist/second.d.ts', "export * from 'ext-second';\n");
  write('dist/second.d.cts', "export * from 'ext-second';\n");
  write(
    'dist/own.d.ts',
    "export { A, b as c } from 'ext-own';\nexport * from 'ext-star';\nimport 'ext-loaded';\nimport 'ext-first';\n",
  );
  // A file of the build without a source of its name (a shared chunk) is not an entry: it stays as it is
  write('dist/chunk-abc.d.ts', "import 'ext-chunk';\nexport declare const shared: number;\n");

  it('reports the imports a source does not have, and changes nothing while it only checks', () => {
    const checked = run(folder, '--check');
    expect(checked.status).toBe(1);
    expect(checked.output).toContain('dist/first.d.ts: ext-second, ext-own, ext-star');
    expect(checked.output).toContain('dist/first.d.cts: ext-second, ext-own, ext-star');
    expect(checked.output).toContain('dist/own.d.ts: ext-first');
    expect(checked.output).not.toContain('second.d');
    expect(checked.output).not.toContain('chunk-abc');
    expect(read('dist/first.d.ts')).toBe(merged);
  });

  it('removes them and keeps what the source names', () => {
    expect(run(folder).status).toBe(0);
    expect(read('dist/first.d.ts')).toBe("export * from 'ext-first';\n");
    expect(read('dist/first.d.cts')).toBe("export * from 'ext-first';\n");
    expect(read('dist/second.d.ts')).toBe("export * from 'ext-second';\n");
    // An import the source has itself stays
    expect(read('dist/own.d.ts')).toBe(
      "export { A, b as c } from 'ext-own';\nexport * from 'ext-star';\nimport 'ext-loaded';\n",
    );
    expect(read('dist/chunk-abc.d.ts')).toBe("import 'ext-chunk';\nexport declare const shared: number;\n");
    expect(run(folder, '--check')).toEqual({ status: 0, output: '' });
  });

  it('fails where there is nothing to clean', () => {
    const empty = mkdtempSync(path.join(tmpdir(), 'tuwa-sdk-declarations-empty-'));
    try {
      expect(run(empty).status).toBe(1);
      expect(run(empty).output).toContain('no declarations');
    } finally {
      rmSync(empty, { recursive: true, force: true });
    }
  });
});

describe('the declarations of @tuwaio/sdk', () => {
  it('name only the modules their sources name', () => {
    // Throws, with the files and the modules, when a declaration imports a module its source does not
    execFileSync(process.execPath, [script, '--check'], { cwd: packageRoot, encoding: 'utf8', stdio: 'pipe' });
  });

  it('do not load a network with the components of Nova Connect', () => {
    for (const file of ['nova-connect-components.d.ts', 'nova-connect-components.d.cts', 'nova-connect.d.ts'])
      expect(readFileSync(path.join(packageRoot, 'dist', file), 'utf8'), file).not.toMatch(
        /@tuwaio\/nova-connect\/(evm|solana)/,
      );
  });
});

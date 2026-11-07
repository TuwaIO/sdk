import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { beforeAll, describe, expect, it } from 'vitest';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const stylesDir = path.join(packageRoot, 'dist', 'styles');

/** The local files a stylesheet names through `url()`, without those of other hosts and inline data. */
const localUrlsOf = (css: string) =>
  [...css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)]
    .map((match) => match[2])
    .filter((url) => !/^(data:|https?:|#)/.test(url));

describe('the stylesheets of @tuwaio/sdk', () => {
  beforeAll(() => {
    execFileSync(process.execPath, ['scripts/bundle-styles.js'], { cwd: packageRoot });
  });

  it('name only files that are published next to them', () => {
    // A bundler fails the build of the app on a url() it cannot resolve
    const named = readdirSync(stylesDir)
      .filter((file) => file.endsWith('.css'))
      .flatMap((file) => localUrlsOf(readFileSync(path.join(stylesDir, file), 'utf8')));

    expect(named.length).toBeGreaterThan(0);
    expect(named.filter((url) => !existsSync(path.join(stylesDir, url)))).toEqual([]);
  });

  it('carry the license of the fonts along with the fonts', () => {
    expect(existsSync(path.join(stylesDir, 'fonts', 'OFL-Geist.txt'))).toBe(true);
  });

  it('keep every Nova package on the mono font of TUWA', () => {
    // Each Nova package builds Tailwind with its own prefix on the default mono, a system font. Nova Core maps them to
    // --tuwa-font-mono, and these copies are taken at build time, so an app sees the mapping only of the version built here.
    const all = readFileSync(path.join(stylesDir, 'all.css'), 'utf8').replace(/\s/g, '');

    expect(all.includes('--novacon-font-mono:var(--tuwa-font-mono)')).toBe(true);
    expect(all.includes('--novatx-font-mono:var(--tuwa-font-mono)')).toBe(true);
  });
});

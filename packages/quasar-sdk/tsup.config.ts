import { defineConfig } from 'tsup';

import pkg from './package.json';

export default defineConfig([
  {
    format: ['cjs', 'esm'],
    entry: {
      index: './src/index.ts',
      react: './src/react/index.tsx',
      'react/evm': './src/react/evm.tsx',
      'react/solana': './src/react/solana.tsx',
      'react/shared': './src/react/shared.ts',
    },
    sourcemap: false,
    splitting: true,
    treeshake: true,
    minify: true,
    clean: true,
    dts: true,
    external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.devDependencies || {})],
  },
]);

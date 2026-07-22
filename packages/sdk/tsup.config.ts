import { defineConfig } from 'tsup';

import pkg from './package.json';

export default defineConfig([
  {
    format: ['cjs', 'esm'],
    entry: [
      './src/pulsar.ts',
      './src/satellite.ts',
      './src/satellite-siwe.ts',
      './src/satellite-siwe-server.ts',
      './src/nova-connect.ts',
      './src/nova-connect-satellite.ts',
      './src/nova-connect-components.ts',
      './src/nova-connect-hooks.ts',
      './src/nova-connect-i18n.ts',
      './src/nova-transactions.ts',
      './src/nova-transactions-providers.ts',
      './src/nova-core.ts',
      './src/orbit.ts',
    ],
    sourcemap: false,
    splitting: true,
    treeshake: true,
    minify: true,
    clean: true,
    dts: true,
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
  },
]);

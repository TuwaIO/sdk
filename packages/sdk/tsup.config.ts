import { defineConfig } from 'tsup';

import pkg from './package.json';

export default defineConfig([
  {
    format: ['cjs', 'esm'],
    entry: [
      './src/pulsar.ts',
      './src/satellite.ts',
      './src/satellite-react.ts',
      './src/siwx.ts',
      './src/siwx-core.ts',
      './src/siwx-server.ts',
      './src/siwx-server-next.ts',
      './src/nova-connect.ts',
      './src/nova-connect-satellite.ts',
      './src/nova-connect-components.ts',
      './src/nova-connect-hooks.ts',
      './src/nova-connect-i18n.ts',
      './src/nova-connect-evm.ts',
      './src/nova-connect-solana.ts',
      './src/nova-transactions.ts',
      './src/nova-transactions-providers.ts',
      './src/nova-transactions-i18n.ts',
      './src/nova-core.ts',
      './src/nova-core-utils.ts',
      './src/nova-core-heroicons.ts',
      './src/nova-icons.ts',
      './src/nova-icons-outline.ts',
      './src/nova-icons-solid.ts',
      './src/nova-icons-tuwa.ts',
      './src/nova-icons-brands.ts',
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

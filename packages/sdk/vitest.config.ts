import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^dayjs\/plugin\/(.*)$/,
        replacement: 'dayjs/plugin/$1.js',
      },
    ],
  },
  test: {
    server: {
      deps: {
        inline: [/@tuwaio\/.*/, /dayjs/],
      },
    },
  },
});

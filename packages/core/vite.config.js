import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { vanillaExtractPluginRollupPlugin } from '../../lib/vanilla-extract-rollup-plugin';

const resolvePath = str => path.resolve(__dirname, str);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.css.ts'),
      formats: ['es'],
      fileName: format => `index.css.js`,
    },
    outDir: './dist',
    rollupOptions: {
      external: [
        'react',
        '@nelson-ui/theme',
        '@vanilla-extract/css',
        '@vanilla-extract/sprinkles',
        '@vanilla-extract/private',
      ],
      plugins: [
        typescript({
          tsconfig: resolvePath('./tsconfig.json'),
          target: 'esnext',
          rootDir: resolvePath('./src'),
          declaration: true,
          declarationDir: resolvePath('./dist/types'),
          // exclude: [resolvePath('./node_modules/**')],
          allowSyntheticDefaultImports: true,
        }),
        vanillaExtractPluginRollupPlugin({
          fileName: 'main.css',
          identifiers: 'short',
        }),
      ],
    },
  },
  plugins: [],
});

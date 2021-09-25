import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

const resolvePath = str => path.resolve(__dirname, str);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => `index.${format}.js`,
    },
    outDir: './dist',
    rollupOptions: {
      external: [
        'react',
        '@nelson-ui/theme',
        '@nelson-ui/core',
        '@vanilla-extract/css',
        '@vanilla-extract/sprinkles',
      ],
      plugins: [
        typescript({
          tsconfig: resolvePath('./tsconfig.build.json'),
          target: 'esnext',
          rootDir: resolvePath('./src'),
          declaration: true,
          declarationDir: resolvePath('./dist/types'),
          exclude: resolvePath('../node_modules/**'),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
  plugins: [],
});

import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

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
    },
  },
  plugins: [vanillaExtractPlugin()],
});

import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import typescript from 'rollup-plugin-typescript2';
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
      external: ['react', '@nelson-ui/theme', '@vanilla-extract/css', '@vanilla-extract/sprinkles'],
      plugins: [
        typescript({
          tsconfig: resolvePath('./tsconfig.types.json'),
          useTsconfigDeclarationDir: true,
        }),
      ],
    },
  },
  plugins: [vanillaExtractPlugin()],
});

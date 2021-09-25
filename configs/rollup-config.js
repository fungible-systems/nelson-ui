import path from 'path';
import dts from 'rollup-plugin-dts';
const { root } = path.parse(process.cwd());

export const generateRollupConfig = input => {
  function external(id) {
    return (!id.startsWith('.') && !id.startsWith(root)) || id.includes('.test.');
  }
  function createDeclarationConfig(input) {
    return {
      input,
      output: {
        dir: 'dist/types',
      },
      external,
      plugins: [dts()],
    };
  }
  return () => [createDeclarationConfig(`src/${input}`, 'dist')];
};

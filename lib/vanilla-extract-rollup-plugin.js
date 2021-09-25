import { cssFileFilter, processVanillaFile, compile } from '@vanilla-extract/integration';

export const vanillaExtractPluginRollupPlugin = ({
  identifiers = 'debug',
  outputCss = true,
  fileName = 'styles.css',
  cwd = process.cwd(),
}) => {
  const processedCssById = new Map();

  return {
    name: 'vanilla-extract',

    async transform(_code, id) {
      if (!cssFileFilter.test(id)) {
        return null;
      }

      const { source, watchFiles } = await compile({
        filePath: id,
        cwd,
      });

      for (const file of watchFiles) {
        this.addWatchFile(file);
      }

      const processedCss = [];

      const result = processVanillaFile({
        source,
        filePath: id,
        outputCss,
        identOption: identifiers,
        serializeVirtualCssPath: ({ base64Source }) => {
          const css = Buffer.from(base64Source, 'base64').toString('utf-8');
          processedCss.push(css);
          return '';
        },
      });

      processedCssById.set(id, processedCss);

      return result;
    },

    generateBundle() {
      if (!outputCss) {
        return;
      }

      const dedupedCss = new Set();

      const moduleIds = [...this.getModuleIds()];
      moduleIds.forEach(moduleId => {
        processedCssById.get(moduleId)?.forEach(css => {
          dedupedCss.add(css);
        });
      });

      if (dedupedCss.size === 0) {
        return;
      }

      const source = [...dedupedCss.values()].join('\n');

      this.emitFile({
        type: 'asset',
        source,
        fileName,
      });
    },
  };
};

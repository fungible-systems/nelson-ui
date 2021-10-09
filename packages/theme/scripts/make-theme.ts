import DATA from './figma.json';
import fs from 'fs';
import path from 'path';
import { transformColors, transformThemes } from './builders/colors';
import {
  makeBorderRadius,
  makeBoxShadow,
  makeFonts,
  makeFontSizes,
  makeFontWeights,
  makeLetterSpacing,
  makeLineHeights,
} from './builders/theme';
import { makeTypeStyles } from './builders/typography';

async function run() {
  const light = transformThemes(DATA.record.values.light.colors);
  const dark = transformThemes(DATA.record.values.dark.colors);
  const foundation = transformColors(DATA.record.values.base.colors);

  const letterSpacing = makeLetterSpacing(DATA.record.values.base.letterSpacing);
  const fontFamilies = makeFonts(DATA.record.values.base.fontFamilies);
  const fontSizes = makeFontSizes(DATA.record.values.base.fontSizes);
  const fontWeights = makeFontWeights(DATA.record.values.base.fontWeights);
  const lineHeights = makeLineHeights(DATA.record.values.base.lineHeights);
  const borderRadius = makeBorderRadius(DATA.record.values.base.borderRadius);
  const boxShadow = makeBoxShadow(DATA.record.values.base.boxShadow, foundation);

  const colors = {
    light,
    dark,
    foundation,
  };

  const types = makeTypeStyles(DATA, {
    letterSpacing,
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
  });

  const fileContents = `export const colors = ${JSON.stringify(colors)} as const;
  export const letterSpacing = ${JSON.stringify(letterSpacing)} as const;
  export const fonts = ${JSON.stringify(fontFamilies)} as const;
  export const fontSizes = ${JSON.stringify(fontSizes)} as const;
  export const borderRadius = ${JSON.stringify(borderRadius)} as const;
  export const boxShadow = ${JSON.stringify(boxShadow)} as const;
  export const lineHeights = ${JSON.stringify(lineHeights)} as const;
  export const typeStyles = ${JSON.stringify(types)} as const;`;

  fs.writeFileSync(path.resolve('./src/generated.ts'), fileContents);
}

run()
  .then(() => {
    process.exit();
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

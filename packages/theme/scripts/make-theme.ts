import DATA from './figma.json';
import fs from 'fs';
import path from 'path';
import { transformColors, transformThemes } from './builders/colors';
import {
  makeBorderRadius,
  makeBoxShadow,
  makeFonts,
  makeFontSizes,
  makeLetterSpacing,
  makeLineHeights,
} from './builders/theme';

async function run() {
  const light = transformThemes(DATA.record.values.light.colors);
  const dark = transformThemes(DATA.record.values.dark.colors);
  const foundation = transformColors(DATA.record.values.base.colors);

  const letterSpacing = makeLetterSpacing(DATA.record.values.base.letterSpacing);
  const fonts = makeFonts(DATA.record.values.base.fontFamilies);
  const fontSizes = makeFontSizes(DATA.record.values.base.fontSizes);
  const lineHeights = makeLineHeights(DATA.record.values.base.lineHeights);
  const borderRadius = makeBorderRadius(DATA.record.values.base.borderRadius);
  const boxShadow = makeBoxShadow(DATA.record.values.base.boxShadow, foundation);

  const colors = {
    light,
    dark,
    foundation,
  };

  const fileContents = `export const colors = ${JSON.stringify(colors)} as const;
export const letterSpacing = ${JSON.stringify(letterSpacing)} as const;
export const fonts = ${JSON.stringify(fonts)} as const;
export const fontSizes = ${JSON.stringify(fontSizes)} as const;
export const borderRadius = ${JSON.stringify(borderRadius)} as const;
export const boxShadow = ${JSON.stringify(boxShadow)} as const;
export const lineHeights = ${JSON.stringify(lineHeights)} as const;`;

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

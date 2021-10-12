import { createStitches } from '@stitches/core';
import { themes } from './theme';
import { utils } from './utilities';
import { CSS } from './stitches-core/css-util';

const { css, getCssText, theme, createTheme, globalCss, prefix, keyframes, config, reset } =
  createStitches({
    theme: themes.light,
    utils,
  });

const darkTheme = createTheme('dark-theme', themes.dark);

export type CSSTypes = CSS<
  typeof config['media'],
  typeof config['theme'],
  typeof config['themeMap'],
  typeof config['utils']
>;

export {
  css,
  getCssText,
  theme,
  createTheme,
  globalCss,
  prefix,
  keyframes,
  config,
  reset,
  darkTheme,
};

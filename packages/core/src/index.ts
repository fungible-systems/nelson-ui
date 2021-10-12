import { createStitches } from '@stitches/core';
import { cleanProps, makeStitchesWithTheme, lightTheme, darkTheme } from './utils';
import { themes } from './theme';
import { utils } from './utilities';

const { css, getCssText, theme, createTheme, globalCss, prefix, keyframes, config, reset } =
  createStitches({
    theme: themes.light,
    utils,
  });

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
  cleanProps,
  makeStitchesWithTheme,
  lightTheme,
  darkTheme,
};

export * from './types';

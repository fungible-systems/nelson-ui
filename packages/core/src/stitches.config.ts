import { createStitches } from '@stitches/core';
import { themes } from './theme';
import type * as CSSUtil from './stitches-core/css-util';
import { PropertyValue } from './stitches-core/css-util';

const { css, getCssText, theme, createTheme, globalCss, prefix, keyframes, config, reset } =
  createStitches({
    media: {
      bp1: '(min-width: 640px)',
      bp2: '(min-width: 768px)',
      bp3: '(min-width: 1024px)',
    },
    theme: themes.light,
    utils: {
      m: (value: PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mt: (value: PropertyValue<'margin'>) => ({
        marginTop: value,
      }),
      mr: (value: PropertyValue<'margin'>) => ({
        marginRight: value,
      }),
      mb: (value: PropertyValue<'margin'>) => ({
        marginBottom: value,
      }),
      ml: (value: PropertyValue<'margin'>) => ({
        marginLeft: value,
      }),
      mx: (value: PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
      p: (value: PropertyValue<'padding'>) => ({
        padding: value,
      }),
      pt: (value: PropertyValue<'padding'>) => ({
        paddingTop: value,
      }),
      pr: (value: PropertyValue<'padding'>) => ({
        paddingRight: value,
      }),
      pb: (value: PropertyValue<'padding'>) => ({
        paddingBottom: value,
      }),
      pl: (value: PropertyValue<'padding'>) => ({
        paddingLeft: value,
      }),
      px: (value: PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      size: (value: PropertyValue<'width'>) => ({
        width: value,
        height: value,
      }),
    },
  });

const darkTheme = createTheme('dark-theme', themes.dark);

export type CSSTypes = CSSUtil.CSS<
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

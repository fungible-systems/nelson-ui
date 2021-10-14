import { colors } from '@nelson-ui/theme';
import { createStitches, defaultThemeMap } from '@stitches/core';
import { PSEUDO_TAGS } from './constants';
import { themes } from './theme';
import { ALL_CSS_PROPS } from './all-css-props';
import { config } from './stitches.config';

const cacheMap = new Map();

export function makeColors(theme: keyof typeof colors) {
  const result: any = {};
  const colorTheme = colors[theme];
  Object.keys(colorTheme).forEach((key: any) => {
    result[key] = `$${colorTheme[key as keyof typeof colorTheme]}`;
  });
  return result as Record<keyof typeof colors.light, string>;
}

export const makeStitchesWithTheme = (key: keyof typeof themes = 'light') => {
  const match = cacheMap.get(key);
  if (match) return cacheMap.get(key);
  if (!themes[key]) throw new TypeError('Incorrect theme passed to "makeStitchesWithTheme".');
  const stitches = createStitches({
    theme: themes[key],
  });
  cacheMap.set(key, stitches);
  return stitches;
};

export const cleanProps = ({ css = {}, ...props }: any) => {
  const keys = Object.keys(props);
  const cssProps: any = {};
  const restProps: any = {};

  keys.forEach(key => {
    if (PSEUDO_TAGS[key]) {
      cssProps[(PSEUDO_TAGS as any)[key as any] as any] = props[key];
    } else {
      (defaultThemeMap as any)[key as any] ||
      ALL_CSS_PROPS.includes(key) ||
      Object.keys(config.utils).includes(key)
        ? (cssProps[key] = props[key])
        : (restProps[key] = props[key]);
    }
  });
  return {
    cssProps: {
      ...cssProps,
      ...css,
    },
    ...restProps,
  };
};

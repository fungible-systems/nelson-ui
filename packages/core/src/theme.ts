import {
  borderRadius,
  boxShadow,
  colors,
  fonts,
  fontSizes,
  lineHeights,
  sizes,
} from '@nelson-ui/theme';
import { makeColors } from './utils';

const baseTheme = {
  colors: colors.foundation,
  space: sizes,
  fontSizes,
  fonts,
  fontWeights: {},
  lineHeights,
  letterSpacings: {},
  sizes: {},
  borderWidths: {},
  borderStyles: {},
  radii: borderRadius,
  shadows: boxShadow,
  zIndices: {},
  transitions: {},
};

export const themes = {
  light: {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...makeColors('light'),
    },
  },
  dark: {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...makeColors('dark'),
    },
  },
};

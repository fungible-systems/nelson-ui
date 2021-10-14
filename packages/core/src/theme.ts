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
  fontWeights: {
    light: 300,
    base: 400,
    semibold: 500,
    bold: 600,
    extrabold: 700,
  },
  lineHeights,
  letterSpacings: {},
  sizes: {},
  borderWidths: {
    base: '1px',
    medium: '2px',
    thick: '3px',
  },
  borderStyles: {
    base: 'solid',
  },
  radii: borderRadius,
  shadows: boxShadow,
  zIndices: {
    base: 10,
    mid: 50,
    high: 100,
    highest: 99,
  },
  transitions: {
    slow: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
    base: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
    fast: 'all 0.125s cubic-bezier(0.23, 1, 0.32, 1)',
  },
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

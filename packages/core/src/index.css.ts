// @ts-nocheck
import {
  borderRadius,
  boxShadow,
  colors,
  fonts,
  fontSizes,
  letterSpacing,
  lineHeights,
  sizes,
} from '@nelson-ui/theme';
import {
  createGlobalTheme,
  createGlobalThemeContract,
  createTheme,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const getColor = (
  color: keyof typeof colors.light | keyof typeof colors.dark,
  theme: typeof colors.light | typeof colors.dark
  // @ts-ignore
) => colors.foundation[theme[color]];

const makeColors = (_colors: typeof colors.light | typeof colors.dark) => {
  const keys = Object.keys(_colors) as (keyof typeof colors.light)[];
  const result = {} as any;
  keys.forEach(key => {
    result[key] = getColor(key, _colors);
  });
  return result as Record<keyof typeof colors.light | keyof typeof colors.dark, string>;
};
const makeContractRecord = <T>(record: T) => {
  const keys = Object.keys(record);
  const result = {} as any;
  keys.forEach(key => {
    result[key] = key;
  });
  return result as Record<keyof typeof record, keyof typeof record>;
};

const colorsContract = createGlobalThemeContract(
  {
    color: makeContractRecord<typeof colors.light>(colors.light),
  },
  value => `colors-${value}`
);

const commonVarsContract = createGlobalThemeContract(
  {
    font: makeContractRecord<typeof fonts>(fonts),
    fontSize: makeContractRecord<typeof fontSizes>(fontSizes),
    boxShadow: makeContractRecord<typeof boxShadow>(boxShadow),
    space: makeContractRecord<typeof sizes>(sizes),
    letterSpacing: makeContractRecord<typeof letterSpacing>(letterSpacing),
    lineHeight: makeContractRecord<typeof lineHeights>(lineHeights),
    borderRadius: makeContractRecord<typeof borderRadius>(borderRadius),
  },
  (value, path) => {
    return `common-${path?.[0]}-${value}`;
  }
);

export const [themeClass, vars] = createTheme({
  ...commonVarsContract,
  ...colorsContract,
});

const colorStyles = defineProperties({
  properties: {
    color: vars.color,
    background: vars.color,
  },
});

const layoutStyles = defineProperties({
  properties: {
    display: [
      'none',
      'inline',
      'inline-flex',
      'inline-block',
      'inline-grid',
      'block',
      'flex',
      'grid',
    ],
    flexDirection: ['row', 'column'],
    alignItems: ['center', 'flex-start', 'flex-end'],
    justifyContent: [
      'center',
      'flex-end',
      'flex-start',
      'space-around',
      'space-between',
      'space-evenly',
    ],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    width: ['100vw', '100%'],
    minWidth: ['none', '100%'],
    fontSize: vars.fontSize,
    // fontWeight: vars.fontWeight,
    lineHeight: vars.lineHeight,
    letterSpacing: vars.letterSpacing,
    boxShadow: vars.boxShadow,
    borderRadius: vars.borderRadius,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

createGlobalTheme(':root', commonVarsContract, {
  font: fonts,
  fontSize: fontSizes,
  boxShadow: boxShadow,
  space: sizes,
  letterSpacing: letterSpacing,
  lineHeight: lineHeights,
  borderRadius: borderRadius,
});

createGlobalTheme(`html.dark-theme`, colorsContract, {
  color: makeColors(colors.dark),
});

createGlobalTheme(`html.light-theme`, colorsContract, {
  color: makeColors(colors.light),
});

export const stackGaps = styleVariants(vars.space, () => ({}));
export const hStack = style({
  display: 'flex',
  flexDirection: 'row',
});
export const vStack = style({});
export const atoms = createSprinkles(layoutStyles, colorStyles);

Object.entries(stackGaps).forEach(([space, className]) => {
  globalStyle(`${className}.${hStack} > *:not(:last-child)`, {
    // @ts-ignore
    marginInlineEnd: vars.space[space],
    marginInlineStart: 0,
  });
  globalStyle(`${className}.${vStack} > *:not(:last-child)`, {
    // @ts-ignore
    marginBottom: vars.space[space] as any,
  });
});

globalStyle('html', {
  background: vars.color.background,
});

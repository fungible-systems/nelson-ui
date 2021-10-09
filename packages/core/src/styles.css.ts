import {
  createGlobalTheme,
  createGlobalThemeContract,
  createTheme,
  globalStyle,
  styleVariants,
} from '@vanilla-extract/css';
import { makeColors, makeContractRecord } from './utils';
import {
  borderRadius,
  boxShadow,
  colors,
  fonts,
  fontSizes,
  letterSpacing,
  lineHeights,
  sizes,
  typeStyles,
} from '@nelson-ui/theme';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

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
    borderColor: vars.color,
    borderTopColor: vars.color,
    borderBottomColor: vars.color,
    borderLeftColor: vars.color,
    borderRightColor: vars.color,
    backgroundColor: vars.color,
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
    borderWidth: ['0px', '1px', '2px', '3px'],
    borderTopWidth: ['0px', '1px', '2px', '3px'],
    borderBottomWidth: ['0px', '1px', '2px', '3px'],
    borderLeftWidth: ['0px', '1px', '2px', '3px'],
    borderRightWidth: ['0px', '1px', '2px', '3px'],
    borderStyle: ['solid', 'none'],
    borderTopStyle: ['solid', 'none'],
    borderBottomStyle: ['solid', 'none'],
    borderLeftStyle: ['solid', 'none'],
    borderRightStyle: ['solid', 'none'],
    border: ['1px solid', '2px solid', '3px solid', 'none'],
    borderTop: ['1px solid', '2px solid', '3px solid', 'none'],
    borderBottom: ['1px solid', '2px solid', '3px solid', 'none'],
    borderLeft: ['1px solid', '2px solid', '3px solid', 'none'],
    borderRight: ['1px solid', '2px solid', '3px solid', 'none'],
    gap: vars.space,
    gridGap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    marginInlineEnd: vars.space,
    marginInlineStart: vars.space,
    width: ['100vw', '100%'],
    minWidth: ['none', '100%'],
    fontSize: vars.fontSize,
    lineHeight: vars.lineHeight,
    letterSpacing: vars.letterSpacing,
    boxShadow: vars.boxShadow,
    borderRadius: vars.borderRadius,
    textDecoration: ['underline', 'unset', 'none'],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
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

export const atoms = createSprinkles(layoutStyles, colorStyles);

globalStyle('html', {
  background: vars.color.background,
});

export const typeStyleClasses = styleVariants(typeStyles);

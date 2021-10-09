// @ts-nocheck
import DATA from '../figma.json';
import { figmaTokenToColorToken } from './colors';
import tinycolor from 'tinycolor2';

export const makeFonts = (
  fontFamilies: typeof DATA.values.base.fontFamilies
): Record<string, string> => {
  const keys = Object.keys(fontFamilies);
  const final = {};
  keys.sort().forEach(key => {
    const entry = fontFamilies[key];
    final[key] = `'${entry.value}'`;
  });

  return final;
};

export const makeLineHeights = (
  lineHeights: typeof DATA.values.base.lineHeights
): Record<string, string> => {
  const keys = Object.keys(lineHeights);
  const final = {};
  keys.sort().forEach(key => {
    const entry = lineHeights[key];
    if (typeof entry === 'object') {
      final[key] = `${entry.value}px`;
    } else {
      final[key] = `${entry}px`;
    }
  });

  return final;
};

export const makeFontSizes = (
  fontSizes: typeof DATA.values.base.fontSizes
): Record<string, string> => {
  const keys = Object.keys(fontSizes);
  const final = {};
  keys.sort().forEach(key => {
    const entry = fontSizes[key];
    if (typeof entry === 'object') {
      final[key] = `${entry.value}px`;
    } else {
      final[key] = `${entry}px`;
    }
  });

  return final;
};

export const makeFontWeights = (
  fontWeights: typeof DATA.values.base.fontWeights
): Record<string, string> => {
  const keys = Object.keys(fontWeights);
  const final = {};
  keys.sort().forEach(key => {
    const entry = fontWeights[key];
    if (typeof entry === 'object') {
      final[key] = `${entry.value}`;
    } else {
      final[key] = `${entry}`;
    }
  });

  return final;
};

export const makeLetterSpacing = (
  letterSpacing: typeof DATA.values.base.letterSpacing
): Record<string, string> => {
  const keys = Object.keys(letterSpacing);
  const final = {};
  keys.sort().forEach(key => {
    const entry = letterSpacing[key];
    if (typeof entry === 'object') {
      final[key] = entry.value;
    } else {
      final[key] = entry;
    }
  });

  return final;
};
export const makeBorderRadius = (
  borderRadius: typeof DATA.values.base.borderRadius
): Record<string, string> => {
  const keys = Object.keys(borderRadius);
  const final = {};
  keys.sort().forEach(key => {
    const entry = borderRadius[key];
    const value = typeof entry === 'object' ? entry.value : entry;
    final[key] = value.includes('%') ? value : `${value}px`;
  });

  return final;
};

const rgbaToThemeColor = (rgbaString: string, colors: Record<string, string>) => {
  const [, end] = rgbaString.split('rgba(');
  const [color, closing] = end.split(',');
  const alpha = closing.replace(')', '');
  const hsl = colors[figmaTokenToColorToken(color)];
  if (!hsl) throw new Error('No theme color for rgbaToThemeColor');
  return tinycolor(hsl).setAlpha(alpha).toHslString();
};
export const makeBoxShadow = (
  boxShadow: typeof DATA.values.base.boxShadow,
  colors: Record<string, string>
): Record<string, string> => {
  const keys = Object.keys(boxShadow);
  const final = {};
  keys.sort().forEach(key => {
    const entry = boxShadow[key];

    final[key] = `${entry.value.x}px ${entry.value.y}px ${entry.value.blur}px ${
      entry.value.spread
    }px ${rgbaToThemeColor(entry.value.color, colors)}`;
  });

  return final;
};

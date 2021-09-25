// @ts-nocheck
import tinycolor from 'tinycolor2';

export const transformColors = palette => {
  const keys = Object.keys(palette);

  const final = {};

  keys.sort().forEach(key => {
    const entry = palette[key];
    const items = Object.keys(entry);
    items.forEach(itemKey => {
      const { value } = entry[itemKey];
      final[`color-${key}-${itemKey}`] = tinycolor(value).toHslString();
    });
  });

  return final;
};

export function figmaTokenToColorToken(figmaToken) {
  return figmaToken.replace('colors', 'color').replace('$', '').replace(/\./g, '-');
}

const foundationalColors = ['base', 'slate', 'grey', 'blue', 'green', 'orange', 'red'];

export const transformThemes = (theme: Record<string, any>, isBase?: boolean) => {
  const categories = Object.keys(theme);

  const final = {};

  categories.forEach(category => {
    const isBaseColorCategory = foundationalColors.includes(category);
    if (isBaseColorCategory) {
      if (!isBase) return;
    } else {
      if (isBase) return;
    }
    const entry = theme[category];
    const items = Object.keys(entry);
    items.sort().forEach(itemKey => {
      const { value } = entry[itemKey];
      final[`${itemKey}`] = figmaTokenToColorToken(value);
    });
  });

  const alphabetical = {};
  Object.keys(final)
    .sort()
    .forEach(key => {
      alphabetical[key] = final[key];
    });
  return alphabetical;
};

export function checkKeys(light, dark) {
  const lightKeys = Object.keys(light);
  const darkKeys = Object.keys(dark);
  const isSame = lightKeys.length === darkKeys.length;
  const lightIsGreater = lightKeys.length > darkKeys.length;
  const getKeysInOther = () => {
    if (!isSame) {
      if (lightIsGreater) {
        return lightKeys.filter(key => {
          return !darkKeys.find(_key => _key === key);
        });
      } else {
        return darkKeys.filter(key => lightKeys.find(_key => key !== key));
      }
    }
  };
  if (lightKeys.length !== darkKeys.length)
    throw Error(
      `Theme key lengths do not match! Light: ${Object.keys(light).length}, Dark: ${
        Object.keys(dark).length
      }, missing keys: ${JSON.stringify(getKeysInOther())}`
    );
}

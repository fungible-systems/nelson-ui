import { colors } from '@nelson-ui/theme';

const getColor = (
  color: keyof typeof colors.light | keyof typeof colors.dark,
  theme: typeof colors.light | typeof colors.dark
  // @ts-ignore
) => colors.foundation[theme[color]];
export const makeColors = (_colors: typeof colors.light | typeof colors.dark) => {
  const keys = Object.keys(_colors) as (keyof typeof colors.light)[];
  const result = {} as any;
  keys.forEach(key => {
    result[key] = getColor(key, _colors);
  });
  return result as Record<keyof typeof colors.light | keyof typeof colors.dark, string>;
};
export const makeContractRecord = <T>(record: T) => {
  const keys = Object.keys(record);
  const result = {} as any;
  keys.forEach(key => {
    result[key] = key;
  });
  return result as Record<keyof typeof record, keyof typeof record>;
};

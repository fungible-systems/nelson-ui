import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@nelson-ui/core/styles.css';

export const stackGaps = styleVariants(vars.space, () => ({}));

export const hStack = style({
  display: 'flex',
  flexDirection: 'row',
});

export const vStack = style({});

Object.entries(stackGaps).forEach(([space, className]) => {
  const value = vars.space[space as keyof typeof vars.space];

  globalStyle(`${className}.${hStack} > *:not(:last-child)`, {
    marginInlineEnd: value,
    marginInlineStart: 0,
  });

  globalStyle(`${className}.${vStack} > *:not(:last-child)`, {
    marginBottom: value,
  });
});

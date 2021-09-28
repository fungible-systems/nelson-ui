import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@nelson-ui/core/styles.css';

export const stackGaps = styleVariants(vars.space, () => ({}));
export const hStack = style({
  display: 'flex',
  flexDirection: 'row',
});
export const vStack = style({});

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

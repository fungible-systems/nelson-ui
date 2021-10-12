import React, { forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import { CssThemeProps, cleanProps, css } from '@nelson-ui/core';

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  'as' | 'color' | 'height' | 'width' | 'content' | 'translate' | 'size'
>;

export interface BoxProps extends CssThemeProps, HTMLProperties {
  as?: React.ElementType;
  className?: string;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Comp = 'div', className, children, css: cssProp, ...props }: BoxProps, ref) => {
    const { cssProps, ...rest } = useMemo(() => cleanProps(props), [props]);
    const stitches = useMemo(
      () => css(cssProps)({ css: cssProp as any }),
      [css, cssProps, cssProp]
    );
    return (
      <Comp ref={ref} className={clsx([className, stitches.className])} {...rest}>
        {children}
      </Comp>
    );
  }
);

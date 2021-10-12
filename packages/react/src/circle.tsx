import React, { forwardRef } from 'react';
import { Grid } from './grid';
import { BoxProps } from './box';

export const Circle = forwardRef<HTMLElement, BoxProps>(
  ({ size = '36px', borderRadius = size, ...rest }, ref) => (
    <Grid ref={ref} placeItems="center" size={size} borderRadius={borderRadius as any} {...rest} />
  )
);

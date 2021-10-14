import React, { forwardRef } from 'react';
import { Grid } from './grid';
import { BoxProps } from './box';

export const Centered = forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Grid ref={ref} placeItems="center" {...props} />
));

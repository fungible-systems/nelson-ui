import React, { forwardRef } from 'react';
import { Box, BoxProps } from './box';

export const Grid = forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box ref={ref} display={'grid'} {...props} />
));
